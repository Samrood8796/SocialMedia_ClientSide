import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from '../smallComponants/Card'
const Images = ({post}) => {
  const token = useSelector((state) => state.token)
const [posts, setPosts] = useState([])
  useEffect(()=>{
    setPosts(post)
  },[posts])
  return (

    <div>
      <Card>
        <div>
          <div className='flex flex-wrap'>
            {posts?.length < 1 ? <div className='p-20 text-3xl font-semibold'>No Photos !!</div> : posts?.map((post) => (
              <div className='w-1/4 p-1'>
                <img className='w-full h-full' src={post?.image} alt='post' />
              </div>
            ))}

          </div>
        </div>

      </Card>
    </div>
  )
}

export default Images