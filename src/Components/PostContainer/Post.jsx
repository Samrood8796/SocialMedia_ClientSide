import React from 'react'
import { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { CommentIcon, HeartIcon, MenuIcon, WarningIcon, } from '../../icons/icons'
import axios from '../../utils/axios'
import { deletePost } from '../../utils/constants'
import EditPost from './EditPost'
import Comments from '../comment/Comments'
import { setDeletePost } from '../../state/userReducer'
import { likePost } from '../../state/apiCalls'
import { format } from 'timeago.js'
import ReportPost from './ReportPost'
const Post = (props) => {
    const {
        postId,
        desc,
        author,
        image,
        likes,
        comments,
        render,
        forceRender,
        createdAt } = props;

    const [showComment, setShowComment] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [editPostModal, setEditPostModal] = useState(false)
    const [reportPostModal, setReportPostModal] = useState(false)
    const user = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)
    const dispatch = useDispatch()
    const userLiked = likes && likes[user._id];
    const likeCount = Object.keys(likes).length
    const PatchLike = () => {
        likePost(token, postId, dispatch)
            forceRender(!render)
    }

    const HandleShowComment = () => {
        setShowComment(!showComment)
    }

    const handleDeletePost = async () => {
        try {
            const response = await axios.delete(`${deletePost}/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const id = response.data.id
            dispatch(setDeletePost({ id: id }))

        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className='mt-6 shadow-md  '>
            <div className='bg-white rounded-lg'>
                <div className='p-2'>
                    <div className='justify-between p-4 border-b-2 flex'>
                        <div className=' flex '>
                            {author?.profilePic ?
                                <img className='w-10 rounded-full h-10' src={author?.profilePic} alt='' /> :
                                <div className='border border-[#3d3f50] w-10 h-10 rounded-full'>
                                    <FaUser className='w-full h-full rounded-full' />
                                </div>
                            }
                            <div>
                                <p className='pl-4 font-bold'>{author?.userName}</p>
                                <p className='pl-2 text-sm'>{format(createdAt)}</p>
                            </div>
                        </div>
                        {user?._id === author?._id &&
                            <div className='relative'>
                                <div className='block w-10 h-10 cursor-pointer ' onClick={() => setShowMenu(true)}>
                                    <MenuIcon />
                                </div>
                                {showMenu &&
                                    <div className="absolute border p-2  border-zinc-400 top-8  right-8 w-28 bg-white text-center rounded-lg py-2">
                                        <p onClick={() => handleDeletePost()} className='py-2 rounded hover:text-white hover:bg-[#02abc5]  transition duration-200'>Delete</p>
                                        <p onClick={() => setEditPostModal(true)} className='py-2 rounded hover:text-white hover:bg-[#02abc5]  transition duration-200'>Edit</p>
                                    </div>
                                }
                            </div>
                        }
                        
                        {editPostModal &&
                            <div>
                                <EditPost desc={desc} setShowMenu={setShowMenu} postId={postId} setEditPostModal={setEditPostModal} />
                            </div>
                        }

                        {/* Report Post */}
                        {user?._id !== author?._id &&
                            <div className='relative'>
                                <div className='block w-10 h-10 cursor-pointer ' onClick={() => setReportPostModal(true)}>
                                    <WarningIcon />
                                </div>
                            </div>
                        }

                        {/* reportmodal */} 
                        {reportPostModal &&
                            <div>
                                <ReportPost postId={postId} setReportPostModal={setReportPostModal} />
                            </div>
                        }
                    </div>
                    <p className='bg-white p-5 '>
                        {desc}
                    </p>
                    <div className='flex justify-center ' onClick={() => setShowMenu(false)}>
                        <img className='rounded-md' src={image} alt='' />
                    </div>
                </div>

                <div className='flex'>
                    <div className='flex'>
                        {/* like section   */}
                        <div className='flex p-4'>
                            <div className='cursor-pointer' onClick={PatchLike}>
                                <HeartIcon liked={userLiked} />
                            </div>
                            <p>{likeCount} likes</p>
                        </div>
                        <div className='flex p-4'>
                            <div className='cursor-pointer' onClick={HandleShowComment}>
                                <CommentIcon />
                            </div>
                            <p className='px-1 '>{comments?.length}</p>
                        </div>
                    </div>
                    {/* <div className='ml-auto mr-5 pt-4'>
                        <ShareIcon />
                    </div> */}
                </div>
                {showComment && <Comments render={render} forceRender={forceRender} comments={comments} postId={postId} />}
            </div>
        </div>
    )
}

export default Post