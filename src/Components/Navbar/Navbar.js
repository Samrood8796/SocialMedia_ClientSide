import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BellIcon, ChatIcon, SearchIcon } from '../../icons/icons'
import { getAllusers } from '../../state/apiCalls'
import { setLogout } from '../../state/userReducer'
const Navbar = () => {
  const userData = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)
  const [searchitem, setSearchItem] = useState("")
  let [allUsers, setAllusers] = useState([])
  let [filterUsers, setFilterUsers] = useState([])
  const allusers = async () => {
    const users = await getAllusers(token)
    setAllusers(users)
  }
  useEffect(() => {
    allusers()
  }, [])
  const handleSearch = (e) => {
    setSearchItem(e.target.value)
  }
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  const handleLogout = () => {
    dispatch(setLogout())
    navigate('/login')
  }

  useEffect(() => {
    const users = allUsers.filter((user) => {
      return user?.userName?.toLowerCase().includes(searchitem) && user._id !== userData._id
    })
    setFilterUsers(users)
  }, [searchitem])
  return (
    <>
      <nav className='sticky box-border top-0 z-20 w-full bg-[#02abc5] flex  justify-between h-[64px] items-center px-5 shadow-md'>
        <div className='flex item-center space-x-5'>
          <i className='fa-solid fa-bars'></i>
          <h1 className='text-3xl text-white italic from-neutral-700'>Social</h1>
        </div>
        <div className='hidden relative xs:block border rounded sm:flex item-center space-x-5'>
          <input onChange={handleSearch} value={searchitem} className='w-full focus:outline-none py-2 px-5 text-gray ' type='text' placeholder='Search......' />
          <ul className="absolute z-100 top-10 bottom-0 right-0  w-full rounded-md shadow-md mt-1 divide-y divide-gray-200">
            {filterUsers.length > 0 && searchitem !== "" ? filterUsers.map((user) => (
              <li key={user._id} className="bg-white cursor-pointer flex">
                <div className='border p-1 flex w-full hover:bg-gray-100'>
                  {user.profilePic ?
                    <img className=' w-10 h-10 rounded-full' src={user.profilePic} /> :
                    <div className='block border-zinc-400 border w-10 h-10 rounded-full'> 
                      <FaUser className='w-full h-full rounded-full' />
                    </div>
                  }
                  <Link to={`/othersprofile/${user._id}`}>
                    <div className='px-2'>
                      <p>{user.userName}</p>
                      <p className='-mt-1'>{user.name}</p>
                    </div>
                  </Link>
                </div>
              </li>
            )) : ""}
          </ul>
          <div className='pr-3 cursor-pointer py-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
        </div>

        <div className='flex'>
          <div className="flex items-center">
            <div className='px-4'>
              <BellIcon />
            </div>

            <ChatIcon />
          </div>

          {userData &&
            <p className=" px-3 py-3 text-white rounded-md text-sm font-bold">{userData?.userName}</p>
          }

          <div className='relative'>
            {userData.profilePic ?
              <button className='block w-12 h-12 md:hidden' onClick={toggleMenu}>
                <img className='rounded-full h-full w-full' src={userData?.profilePic ? userData?.profilePic : ""} alt=''></img>
              </button> : <div onClick={toggleMenu} className='block md:hidden border bg-white w-10 h-10 rounded-full'>
                <FaUser className='w-full h-full rounded-full' /> </div>}
            {userData.profilePic ?
              <button onClick={() => navigate(`/profile/${userData._id}`)} className='hidden md:block w-12 h-12'>
                <img className='rounded-full h-full w-full' src={userData?.profilePic ? userData?.profilePic : ""} alt=''></img>
              </button> : <div className='hidden md:block  border bg-white border-[#fffff] w-10 h-10 rounded-full'>
                <FaUser className='w-full h-full rounded-full' /> </div>}
            <div className={`absolute top-12 right-0 w-52 justify-start bg-white text-center border border-zinc-400 rounded-lg py-2 ${isOpen ? '' : 'hidden'}`}>
              <p onClick={() => navigate(`/`)} className='m-2 hover:text-white hover:bg-[#02abc5] py-2 rounded transition duration-200'>Home</p>
              <p onClick={() => navigate(`/profile/${userData._id}`)} className='py-2 rounded m-2 hover:text-white hover:bg-[#02abc5] transition duration-200'>Profile</p>
              <p onClick={() => navigate('/chat')} className='py-2 rounded m-2 hover:text-white hover:bg-[#02abc5] transition duration-200'>Messages</p>
              <p onClick={() => navigate('/notifications')} className='py-2 rounded m-2 hover:text-white hover:bg-[#02abc5] transition duration-200'>Notification</p>
              {userData ? <p onClick={handleLogout} className='py-2 rounded m-2 hover:text-white hover:bg-[#02abc5] transition duration-200'>Logout</p> :
                <p onClick={() => navigate('/login')} className='py-2rounded m-2 hover:text-white hover:bg-[#02abc5] transition duration-200'>Login</p>
              }
            </div>
          </div>
          {/* {userData && <p className='p-3 font-bold'>{userData.userName}</p>} */}
        </div>
      </nav>
      {/* search bar for small scree  n */}
      {window.location.pathname !== "/chat" &&
        <div className='relative sm:hidden flex w-full bg-[#efefef] p-2 item-center '>
          <input onChange={handleSearch} value={searchitem} className='w-full border border-black focus:outline-none py-2 px-5  text-gray rounded-l' type='text' placeholder='search....' />
          <div className=' relative border-black bg-[#02abc5] cursor-pointer py-2 px-5  rounded-r-md'>
            <SearchIcon />
            <ul className="absolute z-40 top-10 left-[-300px] w-auto right-20  bg-gray-100 rounded-md shadow-md mt-1 border border-gray-200 divide-y divide-gray-200">
              {filterUsers.length > 0 && searchitem !== "" ? filterUsers.map((user) => (
                <li key={user._id} className="bg-white cursor-pointer flex">
                  <div className='border p-1 flex w-full hover:bg-gray-100'>
                    {user.profilePic ?
                      <img className=' w-10 h-10 rounded-full' src={user.profilePic} /> :
                      <div className='block border-zinc-400 border w-10 h-10 rounded-full'>
                        <FaUser className='w-full h-full rounded-full' />
                      </div>
                    }
                    <Link to={`/othersprofile/${user._id}`}>
                      <div className='px-2'>
                        <p>{user.userName}</p>
                        <p className='-mt-1'>{user.name}</p>
                      </div>
                    </Link>
                  </div>
                </li>
              )) : ""}
            </ul>
          </div>
        </div>
      }
    </>
  )
}

export default Navbar