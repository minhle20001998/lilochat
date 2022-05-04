import React, { useEffect, useRef, useState } from 'react'
import { useFilesUpdate } from '../../../../contexts/FilesContext';
// import useMessengerLoad from '../../../../hooks/useMessengerLoad';
import './Body.css';
import Bubble from './Bubble/Bubble';

export default function Body({ mess, setMess }) {
    const anchorRef = useRef(null);
    const oldAnchorRef = useRef(null);
    const fileDragRef = useRef(null);
    const [oldAnchorIndex, setOldAnchorIndex] = useState(0);
    const [scrolling, setScrolling] = useState(false);
    const [onDrag, setOnDrag] = useState(false);
    const updateFiles = useFilesUpdate();
    // const [pageNumber, setPageNumber] = useState(1)

    // const {
    //     hasMore,
    //     loading,
    //     // error
    // } = useMessengerLoad({ pageNumber, setMess })

    useEffect(() => {
        setOldAnchorIndex(mess[0]?.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!scrolling) {
            anchorRef.current.scrollIntoView()
        }
        if (scrolling) {
            oldAnchorRef.current.scrollIntoView();
            setOldAnchorIndex(mess[0].id)
            setScrolling(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mess])

    const onDragEnter = (e) => {
        setOnDrag(true);
    }

    const onDragLeave = (e) => {
        setOnDrag(false);
    }

    const onDragDrop = (e) => {
        setOnDrag(false);
    }

    const onFileDrop = (e) => {
        updateFiles(e.target.files[0])
        e.target.value = "";
    }

    return (
        <div
            className='w-100 h-100'
            style={{ position: 'relative' }}
            onDragEnter={onDragEnter}
        >
            <div className={`message-chat-body-file-drop ${onDrag ? 'drag-enter' : ''}`}
                ref={fileDragRef}
                onDragLeave={onDragLeave}
                onDrop={onDragDrop}
            >
                <input type="file" className='file-drop-input' onChange={onFileDrop} />
                Drop files here
            </div>
            <div className='message-chat-body'
            >
                {mess.length > 0 && mess.map((m, index) => {
                    return <div key={m.id} >
                        {oldAnchorIndex === m.id && <div ref={oldAnchorRef}></div>}
                        <div
                            className={`${m.sender === 'Me' ? 'message-right' : 'message-left'} }`}
                        >
                            <Bubble mess={m} />
                        </div>
                    </div>
                })}
                <div className='anchor' ref={anchorRef}></div>
            </div>
        </div >
    )
}
