import React, { useState } from 'react'
import RichTextInput from '../../Inputs/RichTextInput/RichTextInput';
import Body from './Body/Body';
import './MainArea.css';

export default function MainArea({ groupName, setActiveChatList, setActiveChatSetting }) {

    const src = 'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg'

    const [mess, setMess] = useState([]);




    return (
        <div className="chat-mainarea" style={{ position: 'relative' }}>
            <div className='chat-mainarea-header'
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}
                >
                    <div className='hamberger-icon' onClick={() => { setActiveChatList(true) }}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <img className='avatar' src={src} alt='' />
                    <h5 className='m-0' style={{
                        fontSize: '20px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '200px'
                    }}>
                        {groupName}
                    </h5>
                </div>
                <div>
                    <div className='hamberger-icon'
                        style={{ marginRight: 0 }}
                        onClick={() => { setActiveChatSetting(true) }}
                    >
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
            <div className='chat-mainarea-body'>
                <Body mess={mess} setMess={setMess} />
            </div>
            <div className='chat-mainarea-footer'>
                {/* <ChatInput mess={mess} setMess={setMess} /> */}
                <RichTextInput setMess={setMess} />
            </div>
        </div >
    )
}
