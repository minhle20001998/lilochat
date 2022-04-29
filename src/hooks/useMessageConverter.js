/* eslint-disable no-control-regex */
import { useEffect, useState } from "react"
import { useCensorship } from "../contexts/CensorContext";
import { emoticon } from "../helpers/emoticons";
import guidGenerator from "../helpers/guiGenerator";
import generateProfanityRegex from "../helpers/profanity";

import urlRegex from "../helpers/urlRegex";

export default function useMessageConverter({ raw }) {
    const [message, setMassage] = useState([])
    const censorship = useCensorship();
    
    useEffect(() => {
        // [text, link, emojiOnly]
        const messageMap = [];
        raw.blocks.forEach((e) => {
            const obj = {};
            const text = e.text;
            const arrayOfIndices = [];
            // detect -------
            arrayOfIndices.push(...detectWords(text, urlRegex, true, 'url-link'))
            censorship && arrayOfIndices.push(...detectWords(text, generateProfanityRegex(), false, 'bad-word'))
            // detect -------
            for (let key of Object.keys(raw.entityMap)) {
                if (raw.entityMap[key].type === 'mention') {
                    if (raw.entityMap[key].data.mention.name in obj) {
                        continue;
                    } else {
                        obj[raw.entityMap[key].data.mention.name] = 1;
                    }
                    const mentionName = `@${raw.entityMap[key].data.mention.name}`
                    const indices = getIndicesOf(mentionName, text, true, raw.entityMap[key].data.mention.link);
                    arrayOfIndices.push(...indices);
                }
            }
            arrayOfIndices.sort((a, b) => {
                return a[0] - b[0]
            })
            //check if only contain simple text
            if (arrayOfIndices.length === 0) {
                const tmpObj = {};
                tmpObj.id = guidGenerator();
                tmpObj.text = (convertTextToEmoji(text)) //text
                if (((text.split(" ")).length === 1 && emoticon[text]) || containsOnlyEmojis(text)) {
                    tmpObj.emojiOnly = (true); //emoji only
                }
                messageMap.push(tmpObj);
            } else {
                //initiate the first splice
                const firstIndex = arrayOfIndices[0][0];
                if (text.substring(0, firstIndex)) {
                    messageMap.push({
                        id: guidGenerator(),
                        text: convertTextToEmoji(text.substring(0, firstIndex))
                    })
                }
                arrayOfIndices.forEach((el, index) => {
                    const firstIndex = el[0];
                    const secondIndex = el[1];
                    const link = el[2];
                    const type = el[3];
                    messageMap.push({
                        id: guidGenerator(),
                        text: text.substring(firstIndex, secondIndex),
                        link: link,
                        type: type
                    })
                    if (index < arrayOfIndices.length - 1) {
                        const firstIndexOfNextElement = arrayOfIndices[index + 1][0];
                        messageMap.push({
                            id: guidGenerator(),
                            text: convertTextToEmoji(text.substring(secondIndex, firstIndexOfNextElement)),
                        })
                    }
                })
                //last splice
                const lastIndex = arrayOfIndices[arrayOfIndices.length - 1][1];
                if (text.substring(lastIndex, text.length - 1)) {
                    messageMap.push({
                        id: guidGenerator(),
                        text: convertTextToEmoji(text.substring(lastIndex, text.length)),
                    })
                };
            }
        })
        setMassage(messageMap);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [raw, censorship])

    const detectWords = (text, regex, isLink, type) => {
        const matched = text.match(regex);
        const result = [];
        matched && matched.forEach(word => {

            let indices = null;
            if (isLink) {
                indices = getIndicesOf(word, text, true, word, type)
            }
            else {
                indices = getIndicesOf(word, text, true, null, type)
            }
            result.push(...indices);
        })
        return result;
    }

    const getIndicesOf = (searchStr, str, caseSensitive, link, type) => {
        var searchStrLen = searchStr.length;
        if (searchStrLen === 0) {
            return [];
        }
        var startIndex = 0,
            index, indices = [];
        if (!caseSensitive) {
            str = str.toLowerCase();
            searchStr = searchStr.toLowerCase();
        }
        while ((index = str.indexOf(searchStr, startIndex)) > -1) {
            if (!str[index - 1] || str[index - 1] === " ") {
                if (link) {
                    indices.push([index, index + searchStrLen, link, type]);
                } else {
                    indices.push([index, index + searchStrLen, null, type]);
                }
            }
            startIndex = index + searchStrLen;
        }
        return indices;
    }

    const convertTextToEmoji = (text) => {
        const arrayText = text.split(" ");
        const newArr = arrayText.map((word) => {
            if (emoticon[word]) {
                return emoticon[word];
            }
            return word;
        })
        return newArr.join(" ");
    }

    const containsOnlyEmojis = (text) => {
        const onlyEmojis = text.replace(new RegExp('[\u0000-\u1eeff]', 'g'), '')
        const visibleChars = text.replace(new RegExp('[\n\r\\s]+|( )+', 'g'), '')
        return onlyEmojis.length === visibleChars.length
    }

    return { message };
}