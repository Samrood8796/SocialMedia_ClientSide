import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { SubmitIcon } from '../../icons/icons'
import { setPost } from '../../state/userReducer'
import axios from '../../utils/axios'
const Comments = ({ postId ,comments}) => {
    const user = useSelector((state)=>state.user);
    const token = useSelector((state) => state.token)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()
    const HandleComment = () => {
        if(comment === '')return;
        axios.post(`/api/posts/${postId}/comment`, { comment }, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).then((response)=>{
            dispatch(setPost({posts:response.data}))
            setComment('')
        })
    }
    return (
        <>
            <div>
                <div className='flex m-2 p-5 justify-between border-2 border-zinc-400'>
                    <div className='pl-4 flex'>
                        {user?.profilePic ?
                            <img className='w-10 rounded-full h-10' src={user.profilePic} alt='' /> :
                            <div className='border border-[#3d3f50] w-10 h-10 rounded-full'>
                                <FaUser className='w-full h-full rounded-full' />
                            </div>
                        }
                        <div className='pl-4'>
                            <input className='w-72 h-12 focus:outline-none' type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder='comment' />
                        </div>
                    </div>
                    {/* comment sending icon */}
                    <div className='p-2' onClick={HandleComment}>
                        <SubmitIcon />
                    </div>
                </div>
                {comments && comments.map((item) => (
                    <div className='flex p-2 gap-2 border-y border-zinc-100' key={item._id}>
                        {item?.author?.profilePic ?
                            <img className='w-10 rounded-full h-10' src={item?.author?.profilePic} alt='' /> :
                            <div className='border border-[#3d3f50] w-10 h-10 rounded-full'>
                                <FaUser className='w-full h-full rounded-full' />
                            </div>
                        }
                        <div>
                            <p className=''>{item?.author?.userName}</p>
                            <p>{item?.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Comments