import React, { useState } from 'react'
import SideMenu from './SideMenu'
import {HiOutlineMenu, HiOutlineX} from 'react-icons/hi'

function Navbar({activeMenu}) {
  const [openSideMenu, setOpenSideMenu] = useState(false)
  return (
    <div className='flex gap-5 bg-white border border-b border-gray-200/50 backdrop:blur-[2px] py-4 px-7 sticky z-10'>
      <button
      className='block lg:hidden text-black'
      onClick={() => setOpenSideMenu(!openSideMenu)}
      aria-expanded={openSideMenu}
      >
        {
            openSideMenu ? (
                <HiOutlineX className='text-2xl'/>
            ) : (
                <HiOutlineMenu className='text-2xl'/>
            )
        }
      </button>
      <h2 className='text-lg font-medium text-black'>Expense Tracker</h2>
      {
        openSideMenu && (
            <div className='fixed top-[61px] -ml-4 bg-white'>
                <SideMenu activeMenu={activeMenu} />
            </div>
        )
      }
    </div>
  )
}

export default Navbar
