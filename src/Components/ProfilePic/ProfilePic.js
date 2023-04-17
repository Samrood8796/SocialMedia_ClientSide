import React, { useState } from 'react';
import { FaEdit, FaUser, } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../../state/userReducer';
import axios from '../../utils/axios';
import { addProfilePic } from '../../utils/constants'
const ProfilePic = ({ profileId, profilePic }) => {
    const [showInput, setShowInput] = useState(false);
    const [image, setImage] = useState(null);
    const userData = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)
    const dispatch = useDispatch()
    function handleImageChange(e) {
        const file = e.target.files[0];
        setImage(file)
    }
    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', image);
        formData.append('userId', userData._id);
        axios.post(addProfilePic, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
                dispatch(setUserData({ user: response.data }))
                setShowInput(false)
            })
            .catch(error => {
                console.error(error);
            });
    }
    return (
        <>
            <div className='flex flex-wrap'>
                {userData._id == profileId ?
                userData.profilePic ?
                    <div className='-mt-24 flex justify-start pl-20'>
                        <div className='w-40 h-40 rounded-full shadow-md shadow-gray-600 overflow-hidden'>
                            <img className='w-full h-full rounded-full' src={userData.profilePic} alt='profile' />
                        </div>
                    </div>
                    :
                    <div className='-mt-24 flex justify-start pl-20'>
                        <div className='w-40 h-40  border border-[#3d3f50] bg-white rounded-full'>
                            <FaUser className='w-full h-full rounded-full' />
                        </div>
                    </div>
                :
                profilePic ?
                    <div className='-mt-24 flex justify-start pl-20'>
                        <div className='w-40 h-40 rounded-full shadow-md shadow-gray-600 overflow-hidden'>
                            <img className='w-full h-full rounded-full' src={profilePic} alt='profile' />
                        </div>
                    </div>
                    :
                    <div className='-mt-24 flex justify-start pl-20'>
                        <div className='w-40 h-40  border border-[#3d3f50] bg-white rounded-full'>
                            <FaUser className='w-full h-full rounded-full' />
                        </div>
                    </div>
                }

                {userData._id === profileId &&
                    <div onClick={() => setShowInput(true)}>
                        <label htmlFor='file' className='cursor-pointer'>
                            <div className=' w-8 h-8'>
                                <FaEdit className='w-full text-[#3d3f50] h-full rounded-full' />
                            </div>
                            <input type="file" id='file' onChange={handleImageChange} hidden />
                        </label>
                        {showInput === true &&

                            <button className='font-bold border text-white rounded-lg ml-2 px-2 py-1 bg-[#3d3f50]  ' onClick={handleSubmit}>Submit</button>
                        }
                    </div>
                }

            </div>
        </>
    )
}

export default ProfilePic