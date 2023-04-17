import { getFrieds } from '../../utils/constants'
import { useParams } from 'react-router-dom'
import { PhotoIcon, PostIcon, UserGroupIcon } from '../../icons/icons'
import { useSelector } from 'react-redux'
import { fetchMypost, getProfileUser } from '../../state/apiCalls'
import React, { useEffect, useState } from 'react'
import Feed from '../PostContainer/Feed'
import Card from '../smallComponants/Card'
import Friends from './Friends'
import Images from './Images'
import ProfilePic from '../ProfilePic/ProfilePic'
import EditProfile from '../EditProfile/EditProfile'
import axios from '../../utils/axios'

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
  return (
    <>
      <div className='w-full mt-4'>
        <Card noPadding={false} className="bg-white mb-5">
          <div>
            <div className='h-44 bg-[#02abc5] mx-1'>
              {/* <img className='w-full h-48' src='https://www.nationsonline.org/gallery/Greece/Acropolis-Athens.jpg' alt='' /> */}
              <div className=' w-full h-full'> </div>
            </div>
            <div className=' border-b-2 border-[#3d3f50]'>
              <>
                <ProfilePic profilePic={profileUser.profilePic} profileId={profileId} />
                <div className='ml-24'>
                  <h1 className=' text-2xl font-semibold capitalize'>
                    {profileUser?.userName}
                  </h1 >
                  <div className='flex flex-wrapjustify-self-auto w-32'>
                    <p className='text-gray-500 w-full leading-4'>{profileUser?.bio}</p>
                  </div>
                </div>
                {userData._id === profileId &&
                  <div className='flex justify-end mr-4 -mt-3 font-bold '>
                    <div onClick={() => setIsModal(true)} className='bg-[#02abc5] mb-2 text-white cursor-pointer rounded-md px-2 py-1'>
                      Edit Profile</div>
                  </div>
                }
                {isModal && <div className=' w-full'><EditProfile setIsModal={setIsModal} /></div>}
              </>
            </div>
            <div>

              <div className=' flex gap-0 '>
                <p onClick={() => setTab('posts')} className={tab === "posts" ? active : nonActive}>
                  <PostIcon /> Posts
                </p>
                <p onClick={() => setTab('images')} className={tab === "images" ? active : nonActive}>
                  <PhotoIcon />
                  Photos</p>
                <p onClick={() => setTab('followings')} className={tab === "followings" ? active : nonActive}>
                  <UserGroupIcon />Followings </p>
                <p onClick={() => setTab('followers')} className={tab === "followers" ? active : nonActive}>
                  <UserGroupIcon /> Followers
                </p>
              </div>

              {tab === "followings" && <Friends data={followings} type={"followings"} />}
              {tab === "posts" && <Feed Profileposts={posts} profileId={profileId} isMypost={true} />}
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