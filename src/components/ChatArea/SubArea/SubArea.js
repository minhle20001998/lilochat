import React from 'react'
import ListItem from '../../ChatList/ListItem/ListItem'
import './SubArea.css'

const a = [
    { id: 1, status: 'online', name: 'minh' },
    { id: 2, status: 'offline', name: 'nguyen' },
];

export default function SubArea() {
    return (
        <div className='chat-subarea'>
            <div className='chat-subarea-header'>
                <h5 className='m-0'>Setting</h5>
            </div>
            <div>
                <div className='chat-subarea-items'>
                    Change Group Name
                </div>
                <div className='chat-subarea-items'>
                    Change Group Photo
                </div>
                <div className='chat-subarea-items'>
                    Add people
                </div>
            </div>
            <div className='chat-subarea-header' style={{ borderTop: '1px solid #770000' }}>
                <h5 className='m-0'>Chat Member</h5>
            </div>
            <div className='chat-subarea-members'>
                {a.map(e => {
                    return <ListItem key={e.id} name={e.name} status={e.status} />
                })}
            </div>
        </div>
    )
}
