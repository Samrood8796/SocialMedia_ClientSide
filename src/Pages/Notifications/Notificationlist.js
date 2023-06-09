import React from 'react'
import { FaUser } from 'react-icons/fa'

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)

const Notificationlist = ({ type, user, friend, content, post, createdAt }) => {
    const timeAgo = new TimeAgo('en-US')
    return (
        <div className=''>
            <div className='flex p-2 bg-gray-100 border m-1 rounded-lg'>
                {friend?.profilePic ?
                    <img className='rounded-full mx-2 w-10 h-10' src={friend?.profilePic} alt='profile-pic' /> :
                    <div className='border mx-2 border-[#3d3f50] w-10 h-10 rounded-full'>
                        <FaUser className='w-full h-full rounded-full' />
                    </div>
                }
                <div>
                <p>{`${friend?.userName} ${content}`}</p>
                {/* <p>{format(createdAt)}</p> */}
                <p>{timeAgo.format(new Date(createdAt))}</p>
                </div>
                {post &&
                    <img className=' mx-3 w-10 h-10' src={post?.image} alt='postimage' />
                }
            </div>
        </div>
    )
}

export default Notificationlist