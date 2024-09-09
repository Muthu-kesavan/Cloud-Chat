import { useAppStore } from "@/store";
import moment from "moment";
import { useEffect, useRef } from "react";
import './messageContainer.css';
import { apiClient } from "@/lib/api-client";
import { GET_MESSAGES } from "@/utils/constants";

const MessageContainer = () => {
  const scrollRef = useRef();
  const { 
    selectedChatType, 
    selectedChatData, 
    selectedChatMessages, 
    setSelectedChatMessages, 
    userInfo } = useAppStore();

  useEffect(()=>{
    const getMessages = async ()=>{
      try{
        const res = await apiClient.post(GET_MESSAGES,{id: selectedChatData._id},{withCredentials: true});
        if(res.data.messages) {
          setSelectedChatMessages(res.data.messages);
        }
      }catch(err){
        console.log({err});
      }

    }
    if(selectedChatData._id){
      if(selectedChatType === 'contact'){
        getMessages();
      }
      }

  },[selectedChatData, selectedChatType, setSelectedChatMessages])
  
  //console.log("Selected Chat Messages:", selectedChatMessages);

  
  useEffect(() => {
    if (scrollRef.current) {
      //console.log("Scrolling to the latest message");
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  
  const renderMessages = () => {
    let lastDate = null;

    return selectedChatMessages.map((message, index) => {
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;

      //console.log("Rendering message:", message.content);

      return (
        <div key={index}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.timestamp).format("LL")}
            </div>
          )}

          
          {selectedChatType === "contact" && renderDmMessages(message)}
        </div>
      );
    });
  };

  
  const renderDmMessages = (message) => {
    //console.log("Rendering DM Message:", message);

    return (
      <div className={`${message.sender === selectedChatData._id ? "text-left rounded-full" : "text-right rounded-full"}`}>
        {message.messageType === "text" && (
          <div
            className={`${
              message.sender !== selectedChatData._id
              ? "bg-senderBubble text-senderText border-senderBorder"
              : "bg-receiverBubble text-receiverText border-receiverBorder"
          } message-bubble`}
          >
            {message.content}
          </div>
        )}
        <div className="text-xs text-gray-600">
          {moment(message.timestamp).format("LT")}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lh:w-[70vw] xl:w-[80vw] w-full">
      {renderMessages()}
      <div ref={scrollRef} />
    </div>
  );
};


export default MessageContainer;
