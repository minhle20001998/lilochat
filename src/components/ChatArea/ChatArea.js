import React, { useState } from 'react'
import { useParams } from 'react-router';
import './ChatArea.css';
import MainArea from './MainArea/MainArea';
import SubArea from './SubArea/SubArea';
export default function ChatArea() {
    let { id } = useParams();
    const [groupName, setGroupName] = useState('Group ABCXYZ');

    return (
        <div className='chat-area'>
            <MainArea groupName={groupName} />
            <SubArea setGroupName={setGroupName} />
        </div>
    )
}
