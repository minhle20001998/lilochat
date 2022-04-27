import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { EditorState, ContentState, SelectionState, Modifier } from 'draft-js';
import Editor from "draft-js-plugins-editor";
import createMentionPlugin, {
    defaultSuggestionsFilter
} from "draft-js-mention-plugin";
import editorStyles from './editorStyles.module.css';
import 'draft-js/dist/Draft.css';
import "draft-js-mention-plugin/lib/plugin.css";
import mentionsStyles from './MentionsStyles.module.css';
import './RichTextInput.css'
import { convertToRaw } from 'draft-js';
import getDefaultKeyBinding from 'draft-js/lib/getDefaultKeyBinding';
import { RichUtils } from 'draft-js';

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

export default function RichTextInput({ setMess }) {
    const ref = useRef(null);
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
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

    const removeSelectedBlocksStyle = (editorState) => {
        const newContentState = RichUtils.tryToRemoveBlockStyle(editorState);
        if (newContentState) {
            return EditorState.push(editorState, newContentState, 'change-block-type');
        }
        return editorState;
    }

    const getResetEditorState = (editorState) => {
        const blocks = editorState
            .getCurrentContent()
            .getBlockMap()
            .toList();
        const updatedSelection = editorState.getSelection().merge({
            anchorKey: blocks.first().get('key'),
            anchorOffset: 0,
            focusKey: blocks.last().get('key'),
            focusOffset: blocks.last().getLength(),
        });
        const newContentState = Modifier.removeRange(
            editorState.getCurrentContent(),
            updatedSelection,
            'forward'
        );

        const newState = EditorState.push(editorState, newContentState, 'remove-range');
        return removeSelectedBlocksStyle(newState)
    }

    const submit = () => {
        if (editorState.getCurrentContent().hasText()) {
            setMess((prev) => {
                return [...prev,
                {
                    id: Date.now(),
                    sender: 'Me',
                    content: convertToRaw(editorState.getCurrentContent())
                }]
            })
            const editor = getResetEditorState(editorState);
            setEditorState(editor)
        }
    }

    const handleKeyCommand = (command) => {
        if (command === 'enter_command') {
            submit();
            return 'handled';
        }
        return 'not-handled';
    }

    const myKeyBindingFn = (e) => {
        if (e.keyCode === 13 /* `enter` key */) {
            if (e.nativeEvent.shiftKey) {
                // Alt + Enter
            } else {
                // Enter
                return 'enter_command';
            }
        }
        //else...
        return getDefaultKeyBinding(e);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div
                className={editorStyles.editor}
                style={{ width: '100%' }}
                onClick={() => {
                    ref.current.focus();
                }}
            >
                <MentionSuggestions
                    suggestions={suggestions}
                    onSearchChange={onSearchChange}
                    entryComponent={Entry}
                />
                <Editor
                    placeholder='aA'
                    editorKey={'editor'}
                    editorState={editorState}
                    onChange={setEditorState}
                    handleKeyCommand={handleKeyCommand}
                    keyBindingFn={myKeyBindingFn}
                    plugins={plugins}
                    ref={ref}
                />
            </div>
            <div className='d-flex flex-column justify-content-end'>
                <button className='submit-btn' onClick={submit}>Send</button>
            </div>
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
