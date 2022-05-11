import React from 'react'
import useMessageConverter from '../../../../../hooks/useMessageConverter'
import './Bubble.css'
export default function Bubble(props) {

	// [text, link, emojiOnly]
	const { message } = useMessageConverter({ raw: props.mess.content })

	const renderContent = (m) => {
		if (m.link) {
			return (
				<a href={m.link}
					rel="noreferrer"
					className={`tag_link ${m.type}`}
					target="_blank"
				>
					{m.text}
				</a>
			)
		}

		if (message.emojiOnly) {
			return <span>{m.text}</span>
		}

		return <span className={m.type}>{m.text}</span>
	}

	return (
		<div className={`message-bubble ${props.mess.sender === 'Me' ? 'message-left' : 'message-left'}`}>
			<div className='message-bubble-sender mb-1'>
				<p className='m-0'>{props.mess.sender}</p>
			</div>
			{/* <div className='message-bubble-content' dangerouslySetInnerHTML={{ __html: message }}>
            </div> */}
			<div className='message-bubble-content'>
				<p className={`message-bubble-text ${message[0]?.emojiOnly ? 'message-bubble-icon' : ''}`}>
					{message.length && message.map(m => {
						return <React.Fragment key={m.id}>{renderContent(m)}</React.Fragment>
					})}
				</p>
			</div>
		</div>
	)
}
