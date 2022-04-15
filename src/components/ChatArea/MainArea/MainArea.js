import React, { useState } from 'react'
import ChatInput from '../../Inputs/ChatInput/ChatInput';
import RichTextInput from '../../Inputs/RichTextInput/RichTextInput';
import Body from './Body/Body';
import './MainArea.css';

const messTest = [
    {
        id: 1,
        sender: 'Nguyen',
        content: 'Hhehe'
    },
    {
        id: 22,
        sender: 'Me',
        content: 'Hahaha'
    },
    {
        id: 12,
        sender: 'Nguyen',
        content: 'Hhehe'
    },
    {
        id: 21,
        sender: 'Me',
        content: 'Hahaha'
    },
    {
        id: 16,
        sender: 'Nguyen',
        content: 'Hhehe'
    },
    {
        id: 29,
        sender: 'Me',
        content: 'Hahaha'
    },
    {
        id: 17,
        sender: 'Nguyen',
        content: 'Hhehe'
    },
    {
        id: 25,
        sender: 'Me',
        content: 'Hahaha'
    },
    {
        id: 33,
        sender: 'Nguyen',
        content: 'Hhehe'
    },
    {
        id: 44,
        sender: 'Me',
        content: 'Hahaha'
    },
    {
        id: 5,
        sender: 'Nguyen',
        content: 'Hhehe'
    },
    {
        id: 6,
        sender: 'Me',
        content: 'Hahaha'
    },
    {
        id: 7,
        sender: 'Nguyen',
        content: 'Hhehe'
    },
    {
        id: 8,
        sender: 'Me',
        content: 'Hahaha'
    },
    {
        id: 9,
        sender: 'Nguyen',
        content: 'Hhehe'
    },
    {
        id: 10,
        sender: 'Me',
        content: 'Hahaha'
    },
]

export default function MainArea({ groupName }) {

    const src = 'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg'

    const [mess, setMess] = useState(messTest);

    return (
        <div className="chat-mainarea" style={{ position: 'relative' }}>
            <div className='chat-mainarea-header'>
                <img className='avatar' src={src} alt='' />
                <h5 className='m-0' style={{ fontSize: '20px' }}>{groupName}</h5>
            </div>
            <div className='chat-mainarea-body'>
                <Body mess={mess} setMess={setMess} />
            </div>
            <div className='chat-mainarea-footer'>
                {/* <ChatInput mess={mess} setMess={setMess} /> */}
                <RichTextInput />
            </div>
        </div>
    )
}
