import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { EditorState } from 'draft-js';
import Editor from "draft-js-plugins-editor";
import createMentionPlugin, {
    defaultSuggestionsFilter
} from "draft-js-mention-plugin";
import editorStyles from './editorStyles.module.css';
import "draft-js-mention-plugin/lib/plugin.css";
import mentionsStyles from './MentionsStyles.module.css';
import './RichTextInput.css'
import { convertToRaw } from 'draft-js';

const mentions = [
    {
        name: "Matthew Russell",
        link: "https://twitter.com/mrussell247",
        avatar:
            "https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg",
        userId: 13
    },
    {
        name: 'hehe',
        link: "https://twitter.com/juliandoesstuff",
        avatar: "https://avatars2.githubusercontent.com/u/1188186?v=3&s=400"
    },
    {
        name: "Jyoti Puri",
        link: "https://twitter.com/jyopur",
        avatar: "https://avatars0.githubusercontent.com/u/2182307?v=3&s=400"
    },
    {
        name: "Nik Graf",
        link: "https://twitter.com/nikgraf",
        avatar: "https://avatars0.githubusercontent.com/u/223045?v=3&s=400"
    },
    {
        name: "Minh",
        link: "https://twitter.com/psbrandt",
        avatar:
            "https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png"
    }
];

export default function RichTextInput() {
    const ref = useRef(null);
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [open, setOpen] = useState(false);
    const [suggestions, setSuggestions] = useState(mentions);
    const [mentionPeople, setMentionPeople] = useState([]);

    useEffect(() => {
        const contentState = editorState.getCurrentContent();
        const raw = convertToRaw(contentState);
        let mentionedUsers = [];
        let obj = {}
        for (let key in raw.entityMap) {
            const ent = raw.entityMap[key];
            if (ent.type === "mention") {
                if (!obj[ent.data.mention.link]) {
                    mentionedUsers.push({ name: ent.data.mention.name, link: ent.data.mention.link });
                    obj[ent.data.mention.link] = 1;
                }
            }
        }
        setMentionPeople(mentionedUsers)
    }, [editorState])

    const { MentionSuggestions, plugins } = useMemo(() => {
        const mentionPlugin = createMentionPlugin({ mentionPrefix: '@', theme: mentionsStyles });
        const { MentionSuggestions } = mentionPlugin;
        const plugins = [mentionPlugin];
        return { plugins, MentionSuggestions };
    }, []);

    const onSearchChange = useCallback(({ value }) => {
        setSuggestions(defaultSuggestionsFilter(value, mentions));
    }, []);

    function getIndicesOf(searchStr, str, caseSensitive, link) {
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
                indices.push([index, index + searchStrLen, link]);
            }
            startIndex = index + searchStrLen;
        }
        return indices;
    }

    function convertToHtml(raw) {
        const container = document.createElement('div');
        raw.blocks.forEach((e) => {
            const obj = {};
            const text = e.text;
            const arrayOfIndices = [];
            for (let key of Object.keys(raw.entityMap)) {
                if (raw.entityMap[key].data.mention.name in obj) {
                    continue;
                } else {
                    obj[raw.entityMap[key].data.mention.name] = 1;
                }
                const mentionName = `@${raw.entityMap[key].data.mention.name}`
                const indices = getIndicesOf(mentionName, text, true, raw.entityMap[key].data.mention.link);
                arrayOfIndices.push(...indices);
            }
            //
            const p = document.createElement('p');

            if (arrayOfIndices.length === 0) {
                const span = document.createElement('span');
                span.textContent = text
                p.appendChild(span);
            } else {
                //initiate the first splice
                const firstIndex = arrayOfIndices[0][0];
                if (text.substring(0, firstIndex)) {
                    const span = document.createElement('span');
                    span.textContent = text.substring(0, firstIndex);
                    p.appendChild(span);
                }
                arrayOfIndices.forEach((el, index) => {
                    const firstIndex = el[0];
                    const secondIndex = el[1];
                    const link = el[2];
                    const a = document.createElement('a');
                    a.href = link;
                    a.textContent = text.substring(firstIndex, secondIndex);
                    p.appendChild(a);
                    if (index < arrayOfIndices.length - 1) {
                        const firstIndexOfNextElement = arrayOfIndices[index + 1][0];
                        const span = document.createElement('span');
                        span.textContent = text.substring(secondIndex, firstIndexOfNextElement);
                        p.appendChild(span);
                    }
                })

                const lastIndex = arrayOfIndices[arrayOfIndices.length - 1][1];
                if (text.substring(lastIndex, text.length - 1)) {
                    const span = document.createElement('span');
                    span.textContent = text.substring(lastIndex, text.length);
                    p.appendChild(span);
                };
            }
            container.appendChild(p);
        })
        return container.innerHTML;
    }

    return (
        <div
            className={editorStyles.editor}
            onClick={() => {
                ref.current.focus();
            }}
        >
            <MentionSuggestions
                open={open}
                suggestions={suggestions}
                onSearchChange={onSearchChange}
                entryComponent={Entry}
            />
            <Editor
                editorKey={'editor'}
                editorState={editorState}
                onChange={setEditorState}
                plugins={plugins}
                ref={ref}
            />

        </div>
    );
}

function Entry(props) {
    const {
        mention,
        theme,
        searchValue,
        isFocused,
        ...parentProps
    } = props;

    return (
        <div {...parentProps} style={{ padding: '8px' }}>
            <div className={theme?.mentionSuggestionsEntryContainer}>
                <div className={theme?.mentionSuggestionsEntryContainerLeft}>
                    <img
                        src={mention.avatar}
                        className={theme?.mentionSuggestionsEntryAvatar}
                        role="presentation"
                        alt='avatar'
                    />
                </div>

                <div className={theme?.mentionSuggestionsEntryContainerRight}>
                    <div className={theme?.mentionSuggestionsEntryText}>
                        {mention.name}
                    </div>

                    <div className={theme?.mentionSuggestionsEntryTitle}>
                        {mention.title}
                    </div>
                </div>
            </div>
        </div>
    );
}
