import React from 'react'
import { Outlet } from 'react-router'
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
export default function BasicLayout() {
    return (
        <>
            <Navbar isLogin={true} />
            <Link to="/1"><button>Link</button></Link>
            <Outlet />
        </>
    )
}
