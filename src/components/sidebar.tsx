import newChatSvg from "../assets/newchat.svg";
import ttsState from "../assets/ttsState.svg";
import settingsSvg from "../assets/settings.svg";
import {newChat} from "../api/conversation/newChat.ts";
import {useModal} from "../providers/modal-provider.tsx";
import Settings from "./settings.tsx";

export default function Sidebar({autoTTSState, toggleTTS} : {autoTTSState: boolean, toggleTTS: ()=> void}) {

    const { showModal } = useModal();

    const handleNewChat = async () =>{
        await newChat();
        window.location.reload();
    }

    return (
        <div className="absolute top-0 left-0 h-screen flex flex-col justify-between w-[52px] bg-background border-r border-gray-800 items-center z-6">
            <div className={"flex flex-col mt-3"}>
                <button className="p-2 rounded-xl hover:bg-[#26282a] cursor-pointer"
                        onClick={handleNewChat}>
                    <img src={newChatSvg} alt="New Chat"/>
                </button>
                <button className="p-2 rounded-xl hover:bg-[#26282a] cursor-pointer"
                        onClick={toggleTTS}>
                    <img className={`${autoTTSState ? "" : "opacity-40"}`} src={ttsState} alt="TTS"/>
                </button>
            </div>
            <button className="mb-5 p-2 rounded-xl hover:bg-[#26282a] cursor-pointer"
                    onClick={()=>{showModal(<Settings />)}}>
                <img src={settingsSvg} alt=""/>
            </button>
        </div>
    )
}