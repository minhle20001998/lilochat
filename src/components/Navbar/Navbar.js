import React from 'react'
import './Navbar.css'
export default function Navbar({ isLogin }) {
    return (
        <div style={{ position: 'relative' }}>
            <nav>
                <h2 className="my-0">
                    <span style={{ color: 'red' }}>N</span>
                    <span>i</span>
                    <span style={{ color: 'red' }}>N</span>
                    <span>o</span>
                </h2>
                {!isLogin ? <div className="inputs">
                    <form>
                        <div className='h-100'>
                            <label style={{ marginRight: '10px' }}>Username</label>
                            <input placeholder='Enter your username' />
                        </div>
                        <div className='h-100'>
                            <label style={{ marginRight: '10px' }}>Password</label>
                            <input placeholder='Enter your password' type="password" />
                        </div>
                    </form>
                </div> : <></>}
            </nav>
            <div style={{ height: '60px' }}></div>
        </div>
    )
}
