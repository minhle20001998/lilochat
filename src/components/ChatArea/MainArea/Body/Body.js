import React, { useEffect, useRef } from 'react'
import './Body.css';
import Bubble from './Bubble/Bubble';
export default function Body({ mess }) {

    const anchorRef = useRef(null);

    useEffect(() => {
        anchorRef.current.scrollIntoView();
    }, [mess])

    return (
        <div className='message-chat-body'>
            {mess.map(m => {
                return <div className={`${m.sender === 'Me' ? 'message-right' : 'message-left'}`}>
                    <Bubble key={m.id} mess={m} />
                </div>
            })}
            <div className='anchor' ref={anchorRef}></div>
        </div>
    )
}
