import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { setLogout } from '../../state/userReducer';
import { FaUser } from 'react-icons/fa'
import { persistor } from '../../state/store';

const Leftbar = () => {
  // Get the user data from the Redux store
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [hover,setHover]=useState("")
  const active =""
  const activehover ="bg-[#02abc5] hover:text-white"
  return (
    <div className=' rounded-md shadow-md  bg-white sticky left-0 top-28 z-10 '>
      <div className='p-4'>
        <Link to='/' className='text-xl font-medium block mb-4'>
          {/* My Social Media App */}
        </Link>
        <div onClick={() => navigate(`/profile/${userData?._id}`)} className='bg-[#02abc5] rounded-md p-2 cursor-pointer flex items-center mb-4'>
          {userData?.profilePic ?
            <img
              src={userData?.profilePic}
              alt='Profile'
              className='w-12 h-12 rounded-full'
            />:
            <div className='border bg-white w-10 h-10 rounded-full'>
            <FaUser className='w-full h-full rounded-full'/>
            </div>
          }
          <div className='ml-2 '>
            <p className='text-white'>{userData.name}</p>
            <p className='text-white text-sm'>{userData?.userName}</p>
          </div>
        </div>
        <nav>
          <Link
            to='/'
            onClick={()=>setHover("home")}
            className={`block py-2 px-4 hover:${activehover} rounded ${hover==="home" ? active: ' '} transition duration-200`}
          >
            Home
          </Link>
          <Link
            to={`/profile/${userData?._id}`}
            onClick={()=>setHover("profile")}
            className={`block py-2 px-4 hover:${activehover} rounded ${hover==="profile" ? active: ' '} transition duration-200`}
          >
            Profile
          </Link>
          <Link
            to='/notifications'
            onClick={()=>setHover("notfication")}
            className={`block py-2 px-4 hover:${activehover} rounded ${hover==="notfication" ? active: ' '}  transition duration-200`}
          >
            Notifications
          </Link>
          <Link
            to='/chat'
            onClick={()=>setHover("messages")}
            className={`block py-2 px-4 hover:${activehover} rounded ${hover==="messages" ? active: ' '}  transition duration-200`}
          >
            Messages
          </Link>
        </nav>
      </div>
      <div className='p-4 border-t border-gray-700'>
        <p
          onClick={() => {

            dispatch(setLogout())
            persistor.purge();
            navigate('/')
          }}
          className={` hover:${activehover} ${hover==="logout" ? active: ' '} rounded-md p-2 cursor-pointer transition duration-200`}
        >
          Logout
        </p>
      </div>
    </div>
  )
}

export default Leftbar







// import React from 'react'
// import { useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom'
// const Leftbar = () => {
//   // Get the user data from the Redux store
//   const userData = useSelector((state) => state.user);
//   const navigate = useNavigate()

//   return (
//     <div className='hidden md:block rounded-2xl p-5'>
//       <div className=' left-0 bg-white sticky top-32'>
//         <div className='p-4'>
//           <Link to='/' className='text-xl font-medium block mb-4'>
//             {/* My Social Media App */}
//           </Link>
//           <div className='flex items-center mb-4'>
//             <img
//               src={userData.profilePic ? userData.profilePic : '/default-profile-pic.png'}
//               alt='Profile'
//               className='w-12 h-12 rounded-full'
//             />
//             <div className='ml-2'>
//               <p>{userData.userName}</p>
//               <p className='text-gray-500 text-sm'>View Profile</p>
//             </div>
//           </div>
//           <nav>
//             <Link
//               to='/'
//               className='block py-2 px-4 rounded hover:bg-gray-700 hover:text-white transition duration-200'
//             >
//               Home
//             </Link>
//             <Link
//             // onClick={()=>navigate(`/profile/${userData._id}`)}
//               to={`/profile/${userData._id}`}
//               className='block py-2 px-4 rounded hover:bg-gray-700 hover:text-white transition duration-200'
//             >
//               Profile
//             </Link>
//             <Link
//               to='/notifications'
//               className='block py-2 px-4 rounded hover:bg-gray-700 hover:text-white transition duration-200'
//             >
//               Notifications
//             </Link>
//             <Link
//               to='/messages'
//               className='block py-2 px-4 rounded hover:bg-gray-700 hover:text-white  transition duration-200'
//             >
//               Messages
//             </Link>
//           </nav>
//         </div>
//         <div className='p-4 border-t border-gray-700'>
//           <Link
//             to='/settings'
//             className=' hover:text-gray-400 transition duration-200'
//           >
//             Settings
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Leftbar