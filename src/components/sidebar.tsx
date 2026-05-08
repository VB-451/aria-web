import newChatSvg from "../assets/newchat.svg";
import {newChat} from "../api/newChat.ts";

export default function Sidebar() {

    const handleNewChat = async () =>{
        await newChat();
        window.location.reload();
    }

    return (
        <div className="absolute top-0 left-0 h-screen w-[52px] bg-background border-r border-gray-800 flex flex-col items-center z-6">
            <button className="mt-3 p-2 rounded-xl hover:bg-[#26282a] cursor-pointer"
            onClick={handleNewChat}
            >
                <img src={newChatSvg} alt="New Chat"/>
            </button>
        </div>
    )
}