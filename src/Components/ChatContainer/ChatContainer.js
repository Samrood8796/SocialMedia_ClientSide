import React, { useEffect, useRef, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import ChatBox from '../ChatBox/ChatBox';
import { useSelector } from 'react-redux';
import axios from '../../utils/axios';
import io from 'socket.io-client';
import { getUser } from '../../state/apiCalls';
import { SubmitIcon } from '../../icons/icons';

const socket = io.connect("wss://zwatch.tk")
const ChatContainer = ({ messages, currentChat, setMessages }) => {
  const user = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)
  const [newMessage, setNewMessage] = useState("")
  const [friend, setFriend] = useState()
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const scrollRef = useRef()
  useEffect(() => {
    socket?.emit("addUser", user._id)
  }, [user])
  useEffect(() => {
    socket?.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now()
      })
    })
  }, [])
  const getUserInfo = async () => {
    const friendId = currentChat.members.find(member => member !== user._id)
    const response = await getUser(token, friendId)
    setFriend(response)
  }
  useEffect(() => {
    arrivalMessage && currentChat.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage])
    getUserInfo();
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const message = {
      senderId: user._id,
      text: newMessage,
      chatId: currentChat._id
    }
    const recieverId = currentChat.members.find(member => member !== user._id)
    socket?.emit('sendMessage', ({
      senderId: user._id,
      text: newMessage,
      recieverId: recieverId
    }))

    try {
      const response = await axios.post('/api/messages', { message }, {
        headers: {
          "Authorization": `Barear ${token}`
        }
      })
      setMessages([...messages, response.data])
      setNewMessage("")
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className='flex flex-col justify-between' style={{"--navbar-height": "100px", height: "calc(100vh - var(--navbar-height))"}}>
      {/* Chat header */}
      <div className=' p-2'>
        <div className='flex bg-[#02abc5] rounded-md p-2 items-center'>
          {friend?.profilePic ?
            <img className='w-10 h-10 rounded-full' src={friend?.profilePic} alt='profilepic' /> :
            <div className='border border-[#3d3f50] w-10 h-10 rounded-full'>
              <FaUser className='w-full h-full rounded-full' />
            </div>
          }
          <div className='pl-2'>
            <h3 className='text-white font-medium'>{friend?.name}</h3>
            <div className='text-sm font-medium'>online</div>
          </div>
        </div>
      </div>
      {/* Chat messages */}
      <div className='h-60 md:h-[356px] overflow-y-scroll px-2 py-1'>
        {messages.map((m, index) => (
          <div ref={scrollRef} key={index} >
            <ChatBox message={m} own={m.senderId === user._id} />
          </div>
        ))}
      </div>
      {/* Chat input */}
      <div className='rounded-md mr-5 ml-2 mb-3 box-content  bg-[#02abc5] p-2'>
        <form>
          <div className='flex items-center box-border '>
            <div className='border bg-white w-10 h-10 rounded-full'>
              <FaUser className='w-full h-full rounded-full' />
            </div>
            <input onChange={(e) => setNewMessage(e.target.value)} value={newMessage} className='flex-1 ml-2 h-10 rounded-2xl px-4 focus:outline-none ' type="text" placeholder='Send a message........' />
            <div className='ml-2'>
              <button onClick={handleSubmit} className='bg-white rounded-full px-4 py-2 focus:outline-none'>
                <SubmitIcon />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatContainer;
