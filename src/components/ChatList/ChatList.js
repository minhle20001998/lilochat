import React from 'react'
import './ChatList.css';
import ListItem from './ListItem/ListItem';
export default function ChatList() {

    const a = [
        { id: 1, status: 'online', name: 'minh' },
        { id: 2, status: 'offline', name: 'nguyen' },
        { id: 3, status: 'iddle', name: 'vinh' },
        { id: 4, status: 'disturb', name: 'duk' },
        { id: 5, status: 'disturb', name: 'duk' },
        { id: 6, status: 'disturb', name: 'duk' },
        { id: 7, status: 'disturb', name: 'duk' },
        { id: 8, status: 'disturb', name: 'duk' },
        { id: 9, status: 'disturb', name: 'duk' },
        { id: 10, status: 'disturb', name: 'duk' },
        { id: 11, status: 'disturb', name: 'duk' },
        { id: 12, status: 'disturb', name: 'duk' },
    ];

    const b = [
        { id: 1, name: 'group1' },
        { id: 2, name: 'group12' },
        { id: 3, name: 'group13' },
        { id: 4, name: 'group141' },
        { id: 5, name: 'group1123' },
        { id: 6, name: 'group113' },
       
    ];

    return (
        <div className='chat-list'>
            <div className="list-friend-container">
                <div className='list-friend-header'>
                    <h4 className='m-0'> List of friends</h4>
                </div>
                <div className='list-friend-body'>
                    {a.map(e => {
                        return <ListItem key={e.id} status={e.status} name={e.name} />
                    })}
                </div>
            </div>
            <div className="list-group-container">
                <div className='list-group-header'>
                    <h4 className='m-0'> List of groups</h4>
                </div>
                <div className='list-group-body'>
                    {b.map(e => {
                        return <ListItem key={e.id} name={e.name} />
                    })}
                </div>
            </div>
        </div>
    )
}
