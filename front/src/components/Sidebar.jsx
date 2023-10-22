import React from 'react'
import { BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'


//Sidebaer component
function Sidebar({ openSidebarToggle, OpenSidebar }) {
    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand text-light'>

                </div>
                <span className='icon close_icon' onClick={OpenSidebar}>X</span>
            </div>

            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <Link to="/">
                        <BsGrid1X2Fill className='icon' /> Dashboard
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/college">
                        <BsFillArchiveFill className='icon' /> College
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/course">
                        <BsFillGrid3X3GapFill className='icon' /> Courses
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/student">
                        <BsPeopleFill className='icon' /> Students
                    </Link>
                </li>
            </ul>
        </aside>
    )
}

export default Sidebar