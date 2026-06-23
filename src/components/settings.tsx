import {useSettings} from "../providers/settings-provider.tsx";
import {useState} from "react";

import General from "../assets/settings.svg"
import Memory from "../assets/memory.svg"
import Voice from "../assets/ttsState.svg"
import Watchers from "../assets/timer.svg"
import Whitelist from "../assets/list.svg"
import GeneralCategory from "./settings-categories/general.tsx";
import MemoryCategory from "./settings-categories/memory.tsx";
import VoiceCategory from "./settings-categories/voice.tsx";
import WatchersCategory from "./settings-categories/watchers.tsx";
import WhitelistCategory from "./settings-categories/whitelist.tsx";

export default function Settings(){
    const { resetSettings } = useSettings();
    const [selectedCategory, setSelectedCategory] = useState<string>("General")

    const categories = [
        { name: "General", icon: General },
        { name: "Memory", icon: Memory },
        { name: "Voice", icon: Voice },
        { name: "Watchers", icon: Watchers },
        { name: "Whitelist", icon: Whitelist}
    ];

    return (
        <div className="bg-background w-[800px] h-[400px] rounded-lg flex">
            <div className="w-3/10 h-full flex flex-col justify-between items-center border-r border-neutral-800 px-2 py-2">
                <div className="flex flex-col w-full">
                    {categories.map((category) => (
                        <button key={category.name}
                                onClick={()=>{setSelectedCategory(category.name)}}
                                className={`flex items-center mb-2 p-2 rounded-lg hover:bg-white/5 
                            ${category.name === selectedCategory ? "bg-white/5" : ""}`}>
                            <img className="w-5 mr-2" src={category.icon} alt=""/>
                            <div className="text-sm">{category.name}</div>
                        </button>
                    ))}
                </div>
                <button className="hover:bg-primary_red/85 transition-colors w-fit px-2 py-1 rounded"
                onClick={resetSettings}
                >Reset to default</button>
            </div>
            <div className="px-2 w-full">
                {selectedCategory === "General" && (<GeneralCategory />)}
                {selectedCategory === "Memory" && (<MemoryCategory />)}
                {selectedCategory === "Voice" && (<VoiceCategory />)}
                {selectedCategory === "Watchers" && (<WatchersCategory />)}
                {selectedCategory === "Whitelist" && (<WhitelistCategory />)}
            </div>
        </div>
    )
}