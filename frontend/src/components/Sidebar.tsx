import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='border-r-[1px] border-gray-300 fixed  left-0 h-full top-[85px] w-[60px]'>
        <div className=' flex justify-center pt-2'>
           <Link  to="/jobpost">
           <img src="/home.svg" alt="" width="40" height="40"  className=' '/>
           
           </Link>
        </div>
    </div>
  )
}

export default Sidebar
