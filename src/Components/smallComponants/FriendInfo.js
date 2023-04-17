import React, { useState } from 'react'
import axios from "../../utils/axios"
import { addFollow, unfollow } from "../../utils/constants"
import { useDispatch, useSelector } from 'react-redux'
import { FaUser } from 'react-icons/fa'
import { setUserData } from '../../state/userReducer'

const FriendInfo = ({ id, userName, profilePic, name }) => {
  const token = useSelector((state) => state.token)
  const user = useSelector((state) => state.user)
  const [Following, setFollowing] = useState(false)
  const dispatch = useDispatch()
  useState(() => {
    setFollowing(user.followings.includes(id))
  }, [])

  const handleFollow = async (friendId) => {
    console.log("follow");
    try {
      const response = await axios.put(addFollow, { friendId }, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Barear ${token}`
        }
      })
      const updatedUserData = response.data
      setFollowing(true)
      dispatch(setUserData({ user: updatedUserData }))
    } catch (err) {
      console.log("error occurred while handling follow");
    }
  }

  const handleUnFollow = async (friendId) => {
    console.log("unfollow");
    try {
      axios.put(unfollow, { unfollowid: friendId }, {
        headers: {
          'Authorization': `Barear ${token}`
        }
      }).then((response) => {
        console.log(response);
        const updatedUserData = response.data
        console.log(updatedUserData);
        dispatch(setUserData({ user: updatedUserData }))
        setFollowing(false)
      })
    } catch (err) {
      console.log("error occurred while handling unfollow");
    }
  }
  return (
    <div className='flex gap-2 border rounded-lg p-2 justify-between'>
      <div className='flex'>
        {profilePic ? <div className='rounded-full overflow-hidden '>
          <img className='w-12 h-12' src={profilePic} alt="" /></div> :
          <div className='border border-[#3d3f50] w-12 h-12 rounded-full'>
            <FaUser className='w-full h-full rounded-full' />
          </div>
        }
        <div className=' pl-2'>
          <h3 className='font-semibold'>{name}</h3>
          <div className='text-sm'>{userName}</div>
        </div>
      </div>

      <div className='pr-3 py-auto '>
        {!Following && user.followers.includes(id) &&
          (<button className= 'rounded-md bg-[#02abc5] my-2 px-3 py-1 text-white' onClick={() => handleFollow(id)}>Follow back</button>)}
        {!Following && !user.followers.includes(id) &&
          (<button className='rounded-md bg-[#02abc5] my-2 px-3 py-1 text-white' onClick={() => handleFollow(id)}>Follow</button>)}
        {Following && (<button className='rounded-md bg-[#02abc5] my-2 px-3 py-1 text-white' onClick={() => handleUnFollow(id)}>Following</button>)}
      
      </div>
    </div>
  )
}

export default FriendInfo   