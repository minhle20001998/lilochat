import React from 'react'
import './Bubble.css'
export default function Bubble(props) {
    return (
        <div className={`message-bubble ${props.mess.sender === 'Me' ? 'message-right' : 'message-left'}`}>
            {props.mess.sender !== 'Me' && <div className='message-bubble-sender mb-1'>
                <p className='m-0'>{props.mess.sender}</p>
            </div>}
            <div className='message-bubble-content'>
                {props.mess.content}
            </div>
        </div>
    )
}
