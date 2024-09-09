import { useAppStore } from '@/store';
import { useSocket } from '@/context/socketContext';
import EmojiPicker from 'emoji-picker-react';
import React, { useEffect, useRef, useState } from 'react'
import{GrAttachment}from "react-icons/gr"
import { IoSend } from 'react-icons/io5';
import { RiEmojiStickerLine } from 'react-icons/ri';


const MessageBar = () => {
  const {selectedChatType, selectedChatData, userInfo} = useAppStore();
  const socket = useSocket();
  const emojiRef = useRef();
  const [message, setMessage] = useState("");
  const [emojiOpen, setEmojiOpen] = useState(false)
   useEffect(()=>{
    function handleClickOutside(e) {
      if (emojiRef.current && !emojiRef.current.contains(e.target)){
        setEmojiOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return ()=>{
      document.removeEventListener("mousedown", handleClickOutside)
    }
   }, [emojiRef]);

  const handleEmoji = (emoji)=>{
    setMessage((msg)=>msg+emoji.emoji);
  }
  const handleSendMsg = async()=> {
    if( selectedChatType === "contact"){
      socket.emit("sendMessage",{
        sender:userInfo.id,
        content: message,
        recipient: selectedChatData._id,
        messageType: "text",
        fileUrl: undefined,
      });
      setMessage("");
    } else{
      console.log("Socket is not working");
    }

  };
  return (
    <div className='h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6'>
      
      <div className='flex-1 flex bg-[#2a2b33] rounded-full items-center gap-5 pr-5'>
        <input type='text' 
        className='flex-1 p-5 bg-transparent rounded-full focus:border-none focus:outline'
        placeholder='Enter Message'
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        
        />
        <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all'
        //onClick={}
        >
          <GrAttachment className='text-2xl' />
        </button>
        <div className='relative'>
        <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all'
        onClick={()=>setEmojiOpen(true)}
        >
          <RiEmojiStickerLine className='text-2xl' />
        </button>
        <div className='absolute bottom-16 right-0'ref={emojiRef}>
          <EmojiPicker 
          theme='dark'
          open={emojiOpen} 
          onEmojiClick={handleEmoji} 
          autoFocusSearch={false} 
          />
        </div>
        </div>
      </div>
      <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all'
        onClick={handleSendMsg}
        >
          <IoSend className='text-[#5201fe] hover:text-[#7A33FF]  text-2xl' />
        </button>
      </div>
  )
}

export default MessageBar