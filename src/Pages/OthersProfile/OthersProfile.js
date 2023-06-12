import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import ProfileMainPost from '../../Components/ProfileMainpostContainer/ProfileMainPost'
// import Leftbar from '../../Components/LeftpostContainer/Leftbar'
const OthersProfile = () => {
  // bg-rgb-235-238-246
  return (
    <>
    <Navbar />
      <div className='bg-[#efefef] w-full flex md:flex-wrap' >
        <div className='w-full md:mx-44 px-4'>
          <ProfileMainPost />
        </div>
      </div>
    </>
  )
}

export default OthersProfile