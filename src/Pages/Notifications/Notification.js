import { useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Leftbar from '../../Components/LeftpostContainer/Leftbar'
import { getNotifications } from '../../state/apiCalls'
import Notificationlist from './Notificationlist'
const Notification = () => {
    const token = useSelector((state) => state.token)
    const [notification, setNotification] = useState([])

    useEffect(() => {
        const fetchNotification = async () => {
            const response = await getNotifications(token)
            setNotification(response)
        }

        fetchNotification()
    },[token])
    const containerStyle = {
        height: `calc(100vh - 200px)`,
      };
    return (
        <>
            <Navbar />
            <div className='bg-[#efefef] flex  pt-8 h-screen' >
                <div className=' hidden md:block w-1/4 p-2 relative '>
                    <Leftbar />
                </div>
                <div className=' p-2 mt-2 w-full md:w-3/4 '>
                    <div className="bg-white rounded-md shadow-md  ">
                        <div className="pt-4 pl-4">
                            <p>Notifications</p>
                        </div>
                        <div style={containerStyle} className='p-4 overflow-y-scroll overflow scrollbar-hide'> 

                        {notification.length !== 0 ? notification.map(({type, user, friend, content, postId,createdAt},index)=>(
                            <React.Fragment  key={index}>
                        <Notificationlist type={type} createdAt={createdAt} user={user} friend={friend} content={content} post={postId}/>
                        </React.Fragment>
                        )):<div className='p-28 text-2xl font-semibold'>No Notifications</div>
                        }
                        </div>   
                    </div>
                </div>

            </div>
        </>
    )
}

export default Notification