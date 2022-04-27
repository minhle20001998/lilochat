import React, { useState } from 'react'
import ListItem from '../../ChatList/ListItem/ListItem'
import GroupImageModal from '../../Modals/GroupImageModal/GroupImageModal';
import GroupNameModal from '../../Modals/GroupNameModal/GroupNameModal';
import './SubArea.css'

const a = [
    { id: 1, status: 'online', name: 'minh' },
    { id: 2, status: 'offline', name: 'nguyen' },
];

export default function SubArea({ setGroupName }) {
    const [showGroupNameModal, setShowGroupNameModal] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);

    const handleCloseGroupNameModal = () => setShowGroupNameModal(false);

    const handleShowGroupNameModal = () => setShowGroupNameModal(true);

    const handleCloseImageModal = () => setShowImageModal(false);

    const handleShowImageModal = () => setShowImageModal(true);


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
            <div className='chat-subarea-header'>
                <h5 className='m-0'>Setting</h5>
            </div>
            <div>
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
