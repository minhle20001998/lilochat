import React from 'react'
import './ListItem.css'
export default function ListItem({ status, name }) {
    const src = 'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg'

    const renderStatus = () => {
        switch (status) {
            case 'online':
                return <div className='online'></div>
            case 'iddle':
                return <div className='iddle'></div>
            case 'disturb':
                return <div className='disturb'></div>
            case 'offline':
                return <div className='offline'></div>
            default:
                return <></>
        }
    }

    return (
        <div className='list-friend-item'>
            <div className='d-flex flex-row w-100' style={{ overflow: 'hidden' }}>
                <img className='avatar' src={src} alt='' />
                <div className='name w-100' style={{ overflow: 'hidden' }}><p className='m-0' >{name}</p></div>
            </div>
            <div className='status'>
                {/* <div className='online'></div> */}
                {/* <div className='iddle'></div> */}
                {/* <div className='disturb'></div> */}
                {/* <div className='offline'></div> */}
                {renderStatus()}
            </div>
        </div>
    )
}
