import React from 'react'
import { useParams } from 'react-router';
import './ChatArea.css';
import MainArea from './MainArea/MainArea';
import SubArea from './SubArea/SubArea';
export default function ChatArea() {
    let { id } = useParams();

    return (
        <div className='chat-area'>
            <MainArea />
            <SubArea />
        </div>
    )
}
