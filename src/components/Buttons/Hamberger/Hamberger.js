import React from 'react'
import './Hamberger.css'
export default function Hamberger({ onClick }) {
    return (
        <div className='hamberger-icon' onClick={onClick}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
