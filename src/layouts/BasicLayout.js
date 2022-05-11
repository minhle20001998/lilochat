import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import Fallback from '../components/Fallback/Fallback';
import BeingCall from '../components/Modals/BeingCall/BeingCall';
import Navbar from '../components/Navbar/Navbar';
import socket from '../helpers/socket';

export default function BasicLayout() {

    const [openBeingCall, setOpenBeingCall] = useState(false);

    useEffect(() => {
        socket.on('callUser', ({ from, name: callerName, signal }) => {
            setOpenBeingCall(true);
        })
    }, [])


    return (
        <>
            <Navbar isLogin={true} />
            <React.Suspense fallback={<Fallback />}>
                <BeingCall show={openBeingCall} handleClose={() => { setOpenBeingCall(false) }} />
                <Outlet />
            </React.Suspense>
        </>
    )
}
