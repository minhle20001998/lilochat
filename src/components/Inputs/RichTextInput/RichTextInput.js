import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { EditorState, Modifier, convertToRaw, RichUtils } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createMentionPlugin, {
    defaultSuggestionsFilter
} from "@draft-js-plugins/mention";
import createEmojiPlugin from '@draft-js-plugins/emoji';
import editorStyles from './editorStyles.module.css';
import 'draft-js/dist/Draft.css';
import '@draft-js-plugins/mention/lib/plugin.css';
import '@draft-js-plugins/emoji/lib/plugin.css';
import './RichTextInput.css'
import mentionsStyles from './MentionsStyles.module.css';
import getDefaultKeyBinding from 'draft-js/lib/getDefaultKeyBinding';
import PasteImageArea from '../../PasteImageArea/PasteImageArea';

const mentions = [
    {
        name: "Vinh",
        link: "https://twitter.com/psbrandt",
        avatar:
            "https://scontent.fhan15-2.fna.fbcdn.net/v/t1.6435-9/45008430_1100045520175733_1722673612483198976_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=TVdF2phEHuoAX-MMkO4&_nc_ht=scontent.fhan15-2.fna&oh=00_AT8qlPoUbNY_UdkSsdnpAqzJr7ZyOoium6jHGkV1DTJvLg&oe=62989C2C",
        userId: 13
    },
    {
        name: 'Nguyen',
        link: "https://twitter.com/psbrandt",
        avatar: "https://scontent.fhan15-2.fna.fbcdn.net/v/t1.6435-1/38028711_1332203606915524_589850110985240576_n.jpg?stp=dst-jpg_s320x320&_nc_cat=101&ccb=1-5&_nc_sid=7206a8&_nc_ohc=UP_tTWlWZY4AX_t0m1W&_nc_oc=AQntzOS9KgqTcFgRBXrUvJQTc3vTdxBXw4CFOjPR7u-mbCC6zZYEjO0plz4QWJa_FuZ-yim5CvhKV-939Mb4x0wT&_nc_ht=scontent.fhan15-2.fna&oh=00_AT-X6KcbTwBDPZDwWNgQX_NSQ-zUkLnr4kBIlnVwqdpkHQ&oe=62983DF8"
    },
    {
        name: "Thinh",
        link: "https://twitter.com/psbrandt",
        avatar: "https://scontent.fhan15-2.fna.fbcdn.net/v/t1.6435-9/46293645_319028038895772_5817295248358899712_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=sUn3hq4iPawAX-VfmhB&tn=3N_8jSrqGPPu2ZTd&_nc_ht=scontent.fhan15-2.fna&oh=00_AT87x9ZdX8grIQytpW1pdYkCufDmedrQyqQJYgBP3IsFdw&oe=6294F256"
    },
    {
        name: "Gsu",
        link: "https://twitter.com/psbrandt",
        avatar: "https://scontent.fhan15-2.fna.fbcdn.net/v/t1.6435-9/83879772_1272555119610923_3400956865356496896_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=c67z_OQNGo8AX-RnNqH&_nc_ht=scontent.fhan15-2.fna&oh=00_AT-z_-xhB-jF5NKnDp8IHMhUBMcY_YfP7Wbp7x4vmsoYfg&oe=6296B6FD"
    },
    {
        name: "Đứk",
        link: "https://twitter.com/psbrandt",
        avatar: "https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-1/275240617_1553854601662540_3964833341271906446_n.jpg?stp=dst-jpg_p320x320&_nc_cat=111&ccb=1-5&_nc_sid=7206a8&_nc_ohc=7mmnmPWzAREAX_h6z5O&_nc_ht=scontent.fhan15-2.fna&oh=00_AT-hMg3JCVAcqLjA7SKo-M-T07Vfio5FVB-hw37dCM-87A&oe=62769CBD"
    }
];

export default function RichTextInput({ setMess }) {
    const ref = useRef(null);
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [suggestions, setSuggestions] = useState(mentions);
    const [mentionPeople, setMentionPeople] = useState([]);
    const [pastedImages, setPastedImages] = useState([]);
    const [open, setOpen] = useState(false);

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

    const onOpenChange = useCallback((_open) => {
        setOpen(_open);
    }, []);

    const { MentionSuggestions, plugins, EmojiSelect } = useMemo(() => {
        //mention
        const mentionPlugin = createMentionPlugin({
            mentionPrefix: '@',
            theme: mentionsStyles
        });
        const { MentionSuggestions } = mentionPlugin;
        //emoji
        const emojiPlugin = createEmojiPlugin({
            useNativeArt: true,
        });
        const { EmojiSelect } = emojiPlugin;
        // 
        const plugins = [mentionPlugin, emojiPlugin];
        return { plugins, MentionSuggestions, EmojiSelect };
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
            const clearedEditor = getResetEditorState(editorState);
            setEditorState(clearedEditor)
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

    const handleImagePaste = (pasteEvent) => {
        const item = pasteEvent.clipboardData.items[0];
        if (item.type.indexOf("image") === 0) {
            setPastedImages([...pastedImages, item.getAsFile()]);
        }
    }

    return (
        <div>
            {pastedImages.length > 0 && <PasteImageArea pastedImages={pastedImages} setPastedImages={setPastedImages} />}
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div className='emoji-btn-wrapper d-flex flex-column justify-content-end'>
                    <EmojiSelect />
                </div>
                <div
                    className={editorStyles.editor}
                    style={{ width: '100%' }}
                    onClick={() => {
                        ref.current.focus();
                    }}
                    onPaste={handleImagePaste}
                >
                    <MentionSuggestions
                        suggestions={suggestions}
                        onSearchChange={onSearchChange}
                        entryComponent={Entry}
                        open={open}
                        onOpenChange={onOpenChange}
                    />
                    <Editor
                        placeholder='@ to tag someone'
                        plugins={plugins}
                        editorKey={'editor'}
                        editorState={editorState}
                        onChange={setEditorState}
                        handleKeyCommand={handleKeyCommand}
                        keyBindingFn={myKeyBindingFn}
                        ref={ref}
                    />
                </div>
                <div className='d-flex flex-column justify-content-end'>
                    <button className='submit-btn' onClick={submit}>Send</button>
                </div>
            </div >
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

    const { selectMention, ...rest } = parentProps;

    return (
        <div {...rest} style={{ padding: '8px' }}>
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
