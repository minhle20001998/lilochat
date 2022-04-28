/* eslint-disable no-control-regex */
import { useEffect, useState } from "react"
import { emoticon } from "../helpers/emoticons";
import urlRegex from "../helpers/urlRegex";

export default function useMessageConverter({ raw }) {
    const [message, setMassage] = useState('')
    useEffect(() => {
        const container = document.createElement('div');
        raw.blocks.forEach((e) => {
            const obj = {};
            const text = e.text;
            const arrayOfIndices = [];
            const matchedLink = text.match(urlRegex);
            matchedLink && matchedLink.forEach(link => {
                const indices = getIndicesOf(link, text, true, link);
                arrayOfIndices.push(...indices);
            })
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
            //
            const p = document.createElement('p');
            p.classList.add('message-bubble-text')
            if (arrayOfIndices.length === 0) {
                if (((text.split(" ")).length === 1 && emoticon[text]) || containsOnlyEmojis(text)) {
                    p.classList.add('message-bubble-icon')
                }
                const span = document.createElement('span');
                span.textContent = convertTextToEmoji(text)
                p.appendChild(span);
            } else {
                //initiate the first splice
                const firstIndex = arrayOfIndices[0][0];
                if (text.substring(0, firstIndex)) {
                    const span = document.createElement('span');
                    span.textContent = convertTextToEmoji(text.substring(0, firstIndex));
                    console.log(convertTextToEmoji(text.substring(0, firstIndex)))
                    p.appendChild(span);
                }
                arrayOfIndices.forEach((el, index) => {
                    const firstIndex = el[0];
                    const secondIndex = el[1];
                    const link = el[2];
                    const a = document.createElement('a');
                    a.href = link;
                    a.classList.add('tag_link')
                    a.target = '_blank';
                    a.textContent = text.substring(firstIndex, secondIndex);
                    p.appendChild(a);
                    if (index < arrayOfIndices.length - 1) {
                        const firstIndexOfNextElement = arrayOfIndices[index + 1][0];
                        const span = document.createElement('span');
                        span.textContent = convertTextToEmoji(text.substring(secondIndex, firstIndexOfNextElement));
                        p.appendChild(span);
                    }
                })
                //last splice
                const lastIndex = arrayOfIndices[arrayOfIndices.length - 1][1];
                if (text.substring(lastIndex, text.length - 1)) {
                    const span = document.createElement('span');
                    span.textContent = convertTextToEmoji(text.substring(lastIndex, text.length));
                    p.appendChild(span);
                };
            }
            container.appendChild(p);
        })

        setMassage(container.innerHTML);
    }, [raw])

    const getIndicesOf = (searchStr, str, caseSensitive, link) => {
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
                    indices.push([index, index + searchStrLen, link]);
                } else {
                    indices.push([index, index + searchStrLen]);
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

    // const convertTextToUrl = (text) => {}

    const containsOnlyEmojis = (text) => {
        const onlyEmojis = text.replace(new RegExp('[\u0000-\u1eeff]', 'g'), '')
        const visibleChars = text.replace(new RegExp('[\n\r\\s]+|( )+', 'g'), '')
        return onlyEmojis.length === visibleChars.length
    }

    return { message };
}