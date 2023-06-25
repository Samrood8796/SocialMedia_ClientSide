import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Contact from '../../Components/Contact/Contact'
import ChatContainer from '../../Components/ChatContainer/ChatContainer'
import Leftbar from '../../Components/LeftpostContainer/Leftbar'
import { useDispatch, useSelector } from 'react-redux'
import { conversations } from '../../utils/constants'
import axios from '../../utils/axios';
import { setConversation } from '../../state/userReducer'

const Chat = () => {
    let currentChat = useSelector((state) => state.currentChat)
    const user = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)
    // const [conversation, setConversation] = useState([])
    // const [currentChat, setCurrentChat] = useState(null)
    const dispatch = useDispatch()
    const [messages, setMessages] = useState([])
    useEffect(() => {
        const getConversations = async () => {
            try {
                const response = await axios.get(`${conversations}/${user._id}`, {
                    'Authorization': `barear ${token}`
                })
                console.log("response");
                console.log(response);
                dispatch(setConversation(response.data))
            } catch (err) {
                console.log(err)
            }
        }
        console.log("response.data======");
        getConversations();
    }, [user,token])

    useEffect(() => {
        const getMessages = async () => {
            const response = await axios.get(`/api/messages/${currentChat?._id}`)
            setMessages(response.data)
        }
        currentChat && getMessages();
    }, [currentChat])
    return (
        <div className='h-screen bg-[#efefef]'>
            <Navbar />
            <div className=' flex flex-wrap mr-2'>
                <div className=' hidden md:block w-1/4 p-2 relative '>
                    <Leftbar />
                </div>
                
                <div className='w-1/4 p-4 '>
                    <Contact  currentUser={user}  />
                </div>
                <div className='rounded-md w-3/4 md:w-2/4 bg-white mt-4'>
                    {currentChat ?
                        <ChatContainer messages={messages} setMessages={setMessages} currentChat={currentChat} /> :
                        <div className='bg-white m-5'><div className=' p-24 text-2xl italic'>open a chat to start a conversation</div></div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Chat