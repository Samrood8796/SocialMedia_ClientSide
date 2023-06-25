import { addFollow, getFrieds, unfollow } from '../../utils/constants'
import { useNavigate, useParams } from 'react-router-dom'
import { PhotoIcon, PostIcon, UserGroupIcon } from '../../icons/icons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMypost, getProfileUser, handleChat } from '../../state/apiCalls'
import React, { useEffect, useState } from 'react'
import Feed from '../PostContainer/Feed'
import Card from '../smallComponants/Card'
import Friends from './Friends'
import Images from './Images'
import ProfilePic from '../ProfilePic/ProfilePic'
import EditProfile from '../EditProfile/EditProfile'
import axios from '../../utils/axios'
import { setUserData } from '../../state/userReducer'

const ProfileMainPost = () => {
  const params = useParams()
  const profileId = params.id
  const userData = useSelector((state) => state.user)
  //editprofile modal
  const [isModal, setIsModal] = useState(false)
  const [tab, setTab] = useState('posts')
  const active = 'transition duration-200 hover:bg-zinc-300 rounded flex gap-1 px-2 md:px-4 py-1 items-center border-black border-b text-blue-600'
  const nonActive = "transition duration-200 hover:bg-gray-300 rounded flex gap-1 px-2 md:px-4 py-1 items-center"

  // followings followers
  const [followings, setFollowings] = useState([])
  const [followers, setFollowers] = useState([])
  const [posts, setPosts] = useState([])
  const [profileUser, setProfileUser] = useState([])
  const [render, forceRender] = useState(false)
  const token = useSelector((state) => state.token)
  const user = useSelector((state) => state.user)
  const conversation = useSelector((state) => state.conversation)
const navigate = useNavigate()
  const getFollowers = () => {
    axios.get(`${getFrieds}/${profileId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).then((response) => {
      setFollowings(response.data.followings)
      setFollowers(response.data.followers)
    })
  }
  const fetchProfileUser = async () => {
    const profileUser = await getProfileUser(token, profileId)
    setProfileUser(profileUser)
  }
  useEffect(() => {
    getFollowers()
    fetchImages()
    fetchProfileUser()
  }, [render])

  const fetchImages = async () => {
    const response = await fetchMypost(token, profileId)
    setPosts(response)
  }

  const [Following, setFollowing] = useState(false)
  const dispatch = useDispatch()
  useState(() => {
    setFollowing(user.followings.includes(profileId))
  }, [])
  //profile follow
  const handleFollow = async (friendId) => {
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
    try {
      axios.put(unfollow, { unfollowid: friendId }, {
        headers: {
          'Authorization': `Barear ${token}`
        }
      }).then((response) => {
        const updatedUserData = response.data
        dispatch(setUserData({ user: updatedUserData }))
        setFollowing(false)
      })
    } catch (err) {
      console.log("error occurred while handling unfollow");
    }
  }

  return (
    <>
      <div className='w-full mt-4'>
        <Card noPadding={false} className="bg-white mb-5">
          <div>
            <div className='h-44 bg-[#02abc5] mx-1'>
              <div className=' w-full h-full'> </div>
            </div>
            <div className=' border-b-2 border-[#3d3f50]'>
              <>
                <ProfilePic profilePic={profileUser.profilePic} profileId={profileId} />
                <div className='mx-24 flex flex-col' >
                  <h1 className='text-2xl text-red-900 font-semibold px-2 '>
                    {profileUser?.userName}
                  </h1>
                  {userData._id !== profileId &&
                  <div className='flex'>
                    <div className='pr-3'>
                      {!Following && user.followers.includes(profileId) &&
                        (<button className='rounded-md bg-[#02abc5] my-2 px-3 py-1 text-white' onClick={() => handleFollow(profileId)}>Follow back</button>)}
                      {!Following && !user.followers.includes(profileId) &&
                        (<button className='rounded-md bg-[#02abc5] my-2 px-3 py-1 text-white' onClick={() => handleFollow(profileId)}>Follow</button>)}
                      {Following && (<button className='rounded-md bg-[#02abc5] my-2 px-3 py-1 text-white' onClick={() => handleUnFollow(profileId)}>Following</button>)}
                    </div>
                    <button className='rounded-md bg-[#02abc5] my-2 px-3 py-1 text-white' onClick={()=>{handleChat(token,userData._id,profileId,conversation,dispatch).then(()=>navigate('/chat'))}}>message</button>
                    </div>
                  }
                </div>
                <div className='px-2'>
                  <div className='text-gray-500 w-32 sm:w-auto box-content'>
                    <p className='whitespace-normal text-green-500 break-words'>
                      {user.bio}
                    </p>
                  </div>
                </div>
                {userData._id === profileId &&
                  <div className='flex justify-end mr-4 mt-3 font-bold '>
                    <div onClick={() => setIsModal(true)} className='bg-[#02abc5] mb-2 text-white cursor-pointer rounded-md px-2 py-1'>
                      Edit Profile</div>
                  </div>
                }
                {isModal && <div className=' w-full'><EditProfile setIsModal={setIsModal} /></div>}
              </>
            </div>
            <div>

              <div className=' flex'>
                <div onClick={() => setTab('posts')} className={tab === "posts" ? active : nonActive}>
                  <PostIcon />
                  <p className='hidden md:block'>Posts</p>
                </div>
                <div onClick={() => setTab('images')} className={tab === "images" ? active : nonActive}>
                  <PhotoIcon />
                  <p className='hidden md:block'>Photos</p>
                </div>
                <div onClick={() => setTab('followings')} className={tab === "followings" ? active : nonActive}>
                  <UserGroupIcon />
                  <p className='hidden md:block'>Followings</p>
                </div>
                <div onClick={() => setTab('followers')} className={tab === "followers" ? active : nonActive}>
                  <UserGroupIcon />
                  <p className='hidden md:block'>Followers</p>
                </div>
              </div>

              {tab === "followings" && <Friends data={followings} type={"followings"} />}
              {tab === "posts" && <Feed Profileposts={posts} profileId={profileId} render={render} forceRender={forceRender} isMypost={true} />}
              {tab === "followers" && <Friends forceRender={forceRender} render={render} data={followers} type={"followers"} />}
              {tab === "images" && <Images post={posts} />}
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
export default ProfileMainPost