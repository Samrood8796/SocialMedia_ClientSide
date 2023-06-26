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
    const chat = useSelector((state)=>state.chat)
    console.log("chat");
    console.log(chat);
    const dispatch = useDispatch()
    const [messages, setMessages] = useState([])
    useEffect(() => {
        const getConversations = async () => {
            try {
                const response = await axios.get(`${conversations}/${user._id}`, {
                    'Authorization': `barear ${token}`
                })
                dispatch(setConversation(response.data))
            } catch (err) {
                console.log(err)
            }
        }
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
            <div className=' flex  mr-2'>
                <div className=' hidden md:block w-1/4 p-2 relative '>
                    <Leftbar />
                </div>
                
                <div className={`h-full w-full md:w-1/4 p-4 ${chat.showContact} md:block`}>
                    <Contact  currentUser={user}  />
                </div>
                <div className={`rounded-md ${chat.showMessage}  md:block w-full md:w-2/4 md:bg-white mt-[16px]`}>
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