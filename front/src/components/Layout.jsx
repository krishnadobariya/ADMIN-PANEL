import React, { useState } from "react"
import Header from './Header';
import Sidebar from './Sidebar';

import { Outlet } from 'react-router-dom';

//Layout Component
function Layout() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }

    return (
        <div className='grid-container'>
            <Header OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <Outlet />
        </div>
    )
}

export default Layout