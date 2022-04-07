import React, { useState } from 'react';
import ChatArea from '../../components/ChatArea/ChatArea';
import ChatList from '../../components/ChatList/ChatList';
import './Chat.css';
export default function Chat() {

    return (
        <section className='chat'>
            <ChatList />
            <ChatArea />
        </section>
    )
}
