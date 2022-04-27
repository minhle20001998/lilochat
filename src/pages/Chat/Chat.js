import React from 'react';
import ChatArea from '../../components/ChatArea/ChatArea';
import ChatList from '../../components/ChatList/ChatList';
import useResponsiveChatList from '../../hooks/useResponsiveChatList';
import useResponsiveChatSetting from '../../hooks/useResponsiveChatSetting';
import './Chat.css';
export default function Chat() {

    const [setActiveChatList] = useResponsiveChatList();
    const [setActiveChatSetting] = useResponsiveChatSetting();

    return (
        <section className='chat'>
            <div className='exit-btn' onClick={() => {
                setActiveChatList(false);
                setActiveChatSetting(false);
            }}>
                x
            </div>
            <ChatList />
            <ChatArea setActiveChatList={setActiveChatList} setActiveChatSetting={setActiveChatSetting} />
        </section>
    )
}
