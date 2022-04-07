import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar/Navbar';
export default function BasicLayout() {
    return (
        <>
            <Navbar isLogin={true} />
            
            <Outlet />
        </>
    )
}
