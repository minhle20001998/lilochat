import React from 'react'
import useMessageConverter from '../../../../../hooks/useMessageConverter'
import './Bubble.css'
export default function Bubble(props) {

    const { message } = useMessageConverter({ raw: props.mess.content })

    return (
        <div className={`message-bubble ${props.mess.sender === 'Me' ? 'message-right' : 'message-left'}`}>
            {props.mess.sender !== 'Me' && <div className='message-bubble-sender mb-1'>
                <p className='m-0'>{props.mess.sender}</p>
            </div>}
            <div className='message-bubble-content' dangerouslySetInnerHTML={{ __html: message }}>
            </div>
        </div>
    )
}
