import axios from '../../utils/axios'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ImageIcon } from '../../icons/icons'
import { addPost } from '../../utils/constants'
import { FaUser } from 'react-icons/fa'
import { setPosts } from '../../state/userReducer'
import toast, { Toaster } from 'react-hot-toast';

const ContentPost = () => {
  const userData = useSelector((state) => state.user)
  const posts = useSelector((state) => state.posts)
  const desc = useRef()
  const dispatch = useDispatch()
  const [file, setFile] = useState()
  const handleImageChange = (e) => {
    setFile(e.target.files[0])
  }
  const handlePost = async (e) => {
    e.preventDefault()
    var formData = new FormData()
    formData.append("file", file)
    formData.append("userId", userData._id)
    formData.append("desc", desc.current.value)
    try {
      if (desc.current.value != "") {
        const response = await axios.post(addPost, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        const post = response.data
        desc.current.value = ""
        setFile(null)
        dispatch(setPosts({ posts: [post, ...posts] }))
      }else{
        toast.error("please write something in the post",{
          position:'top-center' 
        })
      }
    } catch (err) {

    }
  }
  return (
    <div className='bg-white w-full shadow-md rounded-md'>
      <form onSubmit={handlePost}>
        <div className='flex p-4 '>
          {userData.profilePic ?
            <img className='w-14 rounded-full h-14' src={userData.profilePic} alt='' /> :
            <div className='border border-[#3d3f50] w-14 rounded-full h-14'>
              <FaUser className='w-full h-full rounded-full' />
            </div>
          }
          <div className='pt-3'>
            <input ref={desc} className='pl-4 w-full h-10 focus:outline-none' type='text' placeholder='type....' />
          </div>
        </div>
        <div className='flex justify-between p-5'>
          <div className='flex'>
            <div className='flex px-2 text-slate-600'>
              <label htmlFor='file' className='cursor-pointer'>
                <ImageIcon />
                <input type='file' accept='.jpg,.jpeg,.png' onChange={handleImageChange} name='file' id='file' hidden />
              </label>
              <span className='px-1'>Photo</span>
            </div>

          </div>
          <div className='mr-3'>
            <button type='submit' className='h-8 cursor-pointer text-lg text-white bg-[#02abc5] rounded w-20'>Post</button>
          </div>
        </div>
        <Toaster/>
      </form>
    </div>
  )
}

export default ContentPost