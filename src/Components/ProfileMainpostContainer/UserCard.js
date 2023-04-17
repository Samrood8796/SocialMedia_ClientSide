import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { handleFollow, handleUnFollow, handleRemoveFollower } from '../../state/apiCalls'
import { useNavigate } from 'react-router-dom'
import { setUserData } from '../../state/userReducer'
const UserCard = ({ name, userName, profilePic, id, type, forceRender, render }) => {
    const token = useSelector((state) => state.token)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [status, setStatus] = useState("following")
    const [followerStat, setFollowerStat] = useState("remove")
    const user = useSelector((state) => state.user)
    const removeFolllower = async () => {
       const response =  await handleRemoveFollower(id, token, setFollowerStat, dispatch)
           dispatch(setUserData({user:response}))
        forceRender(!render)
        setFollowerStat('removed')
    }
    if (type === 'followers') {
        return (
            <>
                <div className={`bg-white m-2 p-2 border border-zinc-400 rounded-lg shadow-md flex flex-col justify-center`}>
                    {profilePic ?
                        <img onClick={() => navigate(`/othersprofile/${user._id}`)} src={profilePic} alt={name} className="w-16 h-16 rounded-full mx-auto" /> :
                        <div onClick={() => navigate(`/othersprofile/${user._id}`)} className='border border-zinc-400 w-16 h-16 rounded-full mx-auto'>
                            <FaUser className='w-full h-full rounded-full' />
                        </div>
                    }
                    <h3 className="text-gray-900 font-semibold text-lg text-center mt-4">{name}</h3>
                    <p className="text-gray-500 text-sm text-center">{userName}</p>

                    <button onClick={removeFolllower} className=" h-8 text-blue-400 font-bold rounded-md px-3 mx-4 ">
                        {followerStat}
                    </button>
                </div>
            </>
        )

    } else
        return (
            <>
                <div className="bg-white m-2 p-2 border border-zinc-400 rounded-lg shadow-md flex flex-col justify-center">
                    {profilePic ?
                        <img src={profilePic} alt={name} className="w-16 h-16 rounded-full mx-auto" /> :
                        <div className='border border-zinc-400 w-16 h-16 rounded-full mx-auto'>
                            <FaUser className='w-full h-full rounded-full' />
                        </div>
                    }
                    <h3 className="text-gray-900 font-semibold text-lg text-center mt-4">{name}</h3>
                    <p className="text-gray-500 text-sm text-center">{userName}</p>

                    {status === 'following' &&
                        <button onClick={() => handleUnFollow(id, token, setStatus, dispatch)} className=" h-8 text-blue-400 font-bold rounded-md px-3 mx-4 ">
                            {status}
                        </button>}
                    {status === 'follow' &&
                        <button onClick={() => handleFollow(id, token, setStatus, dispatch)} className=" h-8 text-blue-400 font-bold rounded-md px-3 mx-4 ">
                            {status}
                        </button>}
                </div>
            </>
        )
}

export default UserCard

