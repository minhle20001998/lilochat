import React, { useState } from 'react'
import './ChatInput.css'
export default function ChatInput({ mess, setMess }) {
    const [input, setInput] = useState("");

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
    }

    return (
        <div className='chat-input-area'>
            <form onSubmit={handleSubmit}>
                <input value={input} placeholder='Aa' onInput={(e) => { setInput(e.target.value) }} />
                <button type='submit' className='submit-btn'>Send</button>
            </form>
        </div>
    )
}
