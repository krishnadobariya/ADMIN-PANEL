import React from 'react'
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs'

//Heder Component
function Header({ OpenSidebar }) {
    return (
        <header className='header'>
            <div className='menu-icon'>
                <BsJustify className='icon' onClick={OpenSidebar} />
            </div>
            <div className='header-left'>
                <BsSearch className='icon' />
            </div>
            <div className='header-right'>
                <BsFillBellFill className='icon icons-head' />
                <BsFillEnvelopeFill className='icon icons-head' />
                <BsPersonCircle className='icon icons-head' />
            </div>
        </header>
    )
}

export default Header