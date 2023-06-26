import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import ProfileMainPost from '../../Components/ProfileMainpostContainer/ProfileMainPost'
import Leftbar from '../../Components/LeftpostContainer/Leftbar'
const Profile = () => {
  // bg-rgb-235-238-246
  return (
    <div className='max-h-screen'>
      <Navbar />
      <div className='bg-[#efefef] flex flex-wrap' >
        <div className='hidden md:block md:w-1/4 pl-2 relative '>
          <Leftbar />
        </div>
        <div className='w-full md:w-3/4 flex flex-wap px-4 '>
          <ProfileMainPost />
        </div>
      </div>
    </div>
  )
}

export default Profile