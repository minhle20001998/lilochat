import React, { useState } from 'react'
import Hamberger from '../../Buttons/Hamberger/Hamberger';
import RichTextInput from '../../Inputs/RichTextInput/RichTextInput';
import Body from './Body/Body';
import './MainArea.css';

export default function MainArea({ groupName, setActiveChatList, setActiveChatSetting }) {

    const src = 'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg'

    const [mess, setMess] = useState([]);




    return (
        <div className="chat-mainarea" style={{ position: 'relative' }}>
            <div className='chat-mainarea-header'>
                <div className='d-flex align-items-center flex-row'>
                    <Hamberger onClick={() => { setActiveChatList(true) }} />
                    <img className='avatar' src={src} alt='' />
                    <h5 className='group-name-title'>
                        {groupName}
                    </h5>
                </div>
                <Hamberger onClick={() => { setActiveChatSetting(true) }} />
            </div>
            <div className='chat-mainarea-body'>
                <Body mess={mess} setMess={setMess} />
            </div>
            <div className='chat-mainarea-footer'>
                <RichTextInput setMess={setMess} />
            </div>
        </div >
    )
}
