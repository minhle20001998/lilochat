import React, { useState } from 'react'
import ChatInput from '../../Inputs/ChatInput/ChatInput';
import Body from './Body/Body';
import './MainArea.css';

const messTest = [
    {
        id: 1,
        sender: 'Nguyen',
        content: 'Hhehe'
    },
    {
        id: 2,
        sender: 'Me',
        content: 'Hahaha'
    },
]

export default function MainArea() {

    const src = 'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg'

    const [mess, setMess] = useState(messTest);

    return (
        <div className="chat-mainarea">
            <div className='chat-mainarea-header'>
                <img className='avatar' src={src} alt='' />
                <h5 className='m-0' style={{ fontSize: '20px' }}>Group ABCXYZ</h5>
            </div>
            <div className='chat-mainarea-body'>
                <Body mess={mess} />
            </div>
            <div className='chat-mainarea-footer'>
                <ChatInput mess={mess} setMess={setMess} />
            </div>
        </div>
    )
}
