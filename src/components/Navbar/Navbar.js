import React from 'react'
import { Form } from 'react-bootstrap'
import { useCensorship, useCensorshipUpdate } from '../../contexts/CensorContext';
import './Navbar.css'
export default function Navbar({ isLogin }) {
    const censorship = useCensorship();
    const updateCensorship = useCensorshipUpdate();

    return (
        <div style={{ position: 'relative' }}>
            <nav className='master-nav'>
                <h2 className="my-0">
                    <span style={{ color: 'red' }}>L</span>
                    <span>i</span>
                    <span style={{ color: 'red' }}>L</span>
                    <span>o</span>
                </h2>
                <div>
                    <Form.Check
                        checked={censorship}
                        onChange={updateCensorship}
                        type="switch"
                        id="disabled-custom-switch"
                    />
                </div>
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
            {/* <div style={{ height: '60px' }}></div> */}
        </div>
    )
}
