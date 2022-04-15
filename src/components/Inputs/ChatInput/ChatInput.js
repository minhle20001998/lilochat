import React, { useState } from 'react'
import './ChatInput.css'
export default function ChatInput({ mess, setMess }) {
    const [input, setInput] = useState("");
    const [show, setShow] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input) {
            return;
        }
        setMess([...mess, {
            id: Date.now(),
            sender: (Math.floor(Math.random() * 10)) % 2 === 0 ? "Me" : "Nguyen",
            content: input
        }]);
        setInput("");
        setShow(false);
    }

    const handleEmoji = () => {
        setShow((show) => !show);
    }

    return (
        <div className='chat-input-area' style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: -340, display: `${show ? 'block' : 'none'}` }}>
            </div>
            <form onSubmit={handleSubmit}>
                <button className='me-2' onClick={handleEmoji}>Emoji</button>
                <input value={input} placeholder='Aa' onInput={(e) => { setInput(e.target.value) }} />
                <button type='submit' className='submit-btn'>Send</button>
            </form>
        </div>
    )
}
