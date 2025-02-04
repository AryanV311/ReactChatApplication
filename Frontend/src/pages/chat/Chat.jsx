import { useAppStore } from "@/store"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { ChatContainer } from "./components/chat-container/ChatContainer"
import { EmptyChatContainer } from "./components/empty-chat-container/EmptyChatContainer"
import { ContactContainer } from "./components/contact-container/ContactContainer"


export const Chat = () => {

  const {userInfo, selectedChatType} = useAppStore()
  const navigate = useNavigate()

  useEffect(() => {

    if(!userInfo.profileSetup){
      toast("please setup profile to continue")
      navigate("/profile")
    }

  },[userInfo, navigate])


  return (
    <div className="flex h-[100vh] text-white overflow-hidden">
      <ContactContainer />
      {
        selectedChatType === undefined ? <EmptyChatContainer /> : <ChatContainer />
      }
    </div>
  )
}
