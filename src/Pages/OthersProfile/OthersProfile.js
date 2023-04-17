import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import ProfileMainPost from '../../Components/ProfileMainpostContainer/ProfileMainPost'
// import Leftbar from '../../Components/LeftpostContainer/Leftbar'
const OthersProfile = () => {
  // bg-rgb-235-238-246
  return (
    <>
    <Navbar />
      <div className='bg-[#efefef] flex flex-wrap' >
        <div className='w-full mx-44 flex flex-wap px-4'>
          <ProfileMainPost />
        </div>
      </div>
    </>
  )
}

export default OthersProfile