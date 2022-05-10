import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { useCallData } from '../../../contexts/CallDataContext';
import ListItem from '../../ChatList/ListItem/ListItem'
import GroupImageModal from '../../Modals/GroupImageModal/GroupImageModal';
import GroupNameModal from '../../Modals/GroupNameModal/GroupNameModal';
import './SubArea.css'

export default function SubArea({ setGroupName }) {
    const [showGroupNameModal, setShowGroupNameModal] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [toggleSetting, setToggleSetting] = useState(true);
    const [toggleMembers, setToggleMemebers] = useState(true);
    const [toggleActions, setToggleActions] = useState(true);
    let navigate = useNavigate();
    const { users } = useCallData();

    const handleCloseGroupNameModal = () => setShowGroupNameModal(false);

    const handleShowGroupNameModal = () => setShowGroupNameModal(true);

    const handleCloseImageModal = () => setShowImageModal(false);

    const handleShowImageModal = () => setShowImageModal(true);

    const handleOpenCallWindow = () => {
        navigate('/call/1')
    }


    return (
        <div className='chat-subarea'>
            <GroupNameModal
                show={showGroupNameModal}
                handleClose={handleCloseGroupNameModal}
                setGroupName={setGroupName}
            />
            <GroupImageModal
                show={showImageModal}
                handleClose={handleCloseImageModal}
            // setGroupName={setGroupName}
            />
            <div
                className='chat-subarea-header'
                onClick={() => { setToggleSetting(prev => !prev) }}
                style={{
                    cursor: 'pointer',
                    userSelect: 'none'
                }}
            >
                <h5 className='m-0'>Setting</h5>
            </div>
            <div style={{ display: `${toggleSetting ? 'block' : 'none'}` }}>
                <div className='chat-subarea-items' onClick={handleShowGroupNameModal}>
                    Change Group Name
                </div>
                <div className='chat-subarea-items' onClick={handleShowImageModal}>
                    Change Group Photo
                </div>
                <div className='chat-subarea-items'>
                    Add people
                </div>
            </div>
            {/*  */}
            <div className='chat-subarea-header'
                onClick={() => { setToggleActions(prev => !prev) }}
                style={{
                    borderTop: '1px solid #770000',
                    cursor: 'pointer',
                    userSelect: 'none'
                }}
            >
                <h5 className='m-0'>Actions</h5>
            </div>
            <div style={{ display: `${toggleActions ? 'block' : 'none'}` }}>
                <div className='chat-subarea-items' onClick={handleOpenCallWindow}>
                    Voice Call
                </div>
                <div className='chat-subarea-items'>
                    Reminder
                </div>
            </div>
            {/*  */}
            <div className='chat-subarea-header'
                onClick={() => { setToggleMemebers(prev => !prev) }}
                style={{
                    borderTop: '1px solid #770000',
                    cursor: 'pointer',
                    userSelect: 'none'
                }}
            >
                <h5 className='m-0'>Chat Member</h5>
            </div>
            <div
                className='chat-subarea-members'
                style={{ display: `${toggleMembers ? 'block' : 'none'}` }}
            >
                {users.length > 0 && users.map(user => {
                    return <ListItem name={user} status={'online'} />
                })}
            </div>
        </div>
    )
}
