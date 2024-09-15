import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState } from "react"
import { FaPlus, FaSearch } from "react-icons/fa"
import { Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import Lottie from "react-lottie"
import { animationDefaultOptions, getColor } from "@/lib/utils"
import { apiClient } from "@/lib/api-client"
import { SEARCH_CONTACTS } from "@/utils/constants"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { useAppStore } from "@/store"
import { HOST } from "@/utils/constants"
const CreateChannel = () => {
  const {setSelectedChatType, setSelectedChatData} = useAppStore();
  const [openModal, setOpenModal] = useState(false);
  const [contact, setContact] = useState([]);

  const searchContacts = async (searchTerm) =>{
    try{
      if (searchTerm.length > 0){
        const res = await apiClient.post(SEARCH_CONTACTS,
          {searchTerm},
          {withCredentials: true}
        );
        if (res.status === 200 && res.data.contacts){
          setContact(res.data.contacts)
        }
      } else{
        setContact([]);
      }
    }catch(err){
      console.log({err});
    }
  };

  const selectNewContact =(contact)=>{
    setOpenModal(false);
    setSelectedChatType("contact");
    setSelectedChatData(contact);
    setContact([]);
  };
  return (
    <>
    <TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
      <FaPlus
      className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300" 
      onClick={()=>setOpenModal(true)}
      />
    </TooltipTrigger>
    <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
    Select New Contact
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
<Dialog open={openModal} onOpenChange={setOpenModal}>
  <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col ">
    <DialogHeader>
      <DialogTitle>Please Select a Contact</DialogTitle>
      <DialogDescription />
    </DialogHeader>

    
    <div>
      <Input 
        placeholder="Search Contact" 
        className="rounded-lg p-6 bg-[#2c2e3b] border-none"
        onChange={e => searchContacts(e.target.value)} 
      />
    </div>
  </DialogContent>
</Dialog>


  </>
  )
}

export default CreateChannel