import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useSelector } from 'react-redux';
import { getUser } from '../../state/apiCalls';

const ContactList = ({ conversation, currentUser }) => {
  const token = useSelector((state) => state.token)
  const [user, setUser] = useState(null)
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id)
    console.log("friendId");
    console.log(friendId);
    const getUserInfo = async () => {
      const response = await getUser(token,friendId)
      setUser(response)
    }
    getUserInfo()
  },[currentUser,conversation])
  return (
    <div className="flex items-center justify-start space-x-4 p-2 my-1 bg-white shadow-md border-1 shadow-gray-200 rounded-md">
      {user?.profilePic ?
        <img className='w-10 h-10 rounded-full' src={user?.profilePic} alt='profilepic' /> :
        <div className='border border-[#3d3f50]  rounded-full'>
          <FaUser className='w-10 h-10 rounded-full' /> 
        </div>
      }
      <div className='hidden md:block'>
        <h3 className="text-xs md:text-lg font-medium text-gray-700">{user?.name}</h3>
        <p className="text-sm text-gray-500">{user?.userName}</p>
      </div>
    </div>
  )
}

export default ContactList