import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useEffect, useState } from "react"
import { FaPlus, FaSearch } from "react-icons/fa"
import { Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
//import Lottie from "react-lottie"
//import { animationDefaultOptions, getColor } from "@/lib/utils"
import { apiClient } from "@/lib/api-client"
import { GET_ALL_CONTACTS } from "@/utils/constants"
//import { ScrollArea } from "@/components/ui/scroll-area"
//import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { useAppStore } from "@/store"
import { Button } from "@/components/ui/button"
import MultipleSelector from "@/components/ui/multipleselect"

//import { HOST } from "@/utils/constants"

const CreateChannel = () => {
  const {setSelectedChatType, setSelectedChatData} = useAppStore();
  const [newChannelModal, setNewChannelModal] = useState(false);
  const [contact, setContact] = useState([]);
  const [allContacts, setAllContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [channelName, setChannelName] = useState("");

  useEffect(()=>{
    const getData = async()=>{
      const res = await apiClient.get(GET_ALL_CONTACTS,{
        withCredentials: true,
      });
      setAllContacts(res.data.contacts);
      //console.log(res.data.contacts);
    };
    getData();
  },[])

  const createChannel = async()=>{

  };
  return (
    <>
    <TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
      <FaPlus
      className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300" 
      onClick={()=>setNewChannelModal(true)}
      />
    </TooltipTrigger>
    <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
    Create New Group
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
<Dialog open={newChannelModal} onOpenChange={setNewChannelModal}>
  <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col ">
    <DialogHeader>
      <DialogTitle>Fill up Group Details</DialogTitle>
      <DialogDescription />
    </DialogHeader>
    <div>
      <Input 
        placeholder="Group Name" 
        className="rounded-lg p-6 bg-[#2c2e3b] border-none"
        onChange={(e) => setChannelName(e.target.value)} 
        value={channelName}
      />
    </div>
     <div>
      <MultipleSelector
      className="rounded-lg bg-[#2c2e3b] border-none py-2 text-white" 
      defaultOptions={allContacts}
      placeholder="Search Contacts"
      value={selectedContacts}
      onChange={setSelectedContacts}
      emptyIndicator={
        <p className="text-center text-lg leading-10 text-gray-600">No Result found</p>} />
    </div> 

    <div>
      <Button className="w-full bg-[#5201fe] hover:bg-[#3B0088] transition-all duration-300"
      onClick={createChannel}
      >Create Group</Button>
    </div>
  </DialogContent>
</Dialog>
  </>
  )
}

export default CreateChannel