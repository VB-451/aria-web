import {useEffect, useState} from "react";
import ShortCut from "./shortcut.tsx";
import {useModal} from "../../providers/modal-provider.tsx";
import NewShortcutModal from "./new-shortcut-modal.tsx";

export default function Shortcuts({onHandleShortcut} : {onHandleShortcut: (prompt: string) => void}) {
    const [shortcutsArray, setShortcutsArray] = useState(() => {
        const stored = localStorage.getItem("shortCuts");
        return stored ? JSON.parse(stored) : [];
    });

    const { showModal } = useModal();

    useEffect(() => {
        console.log(shortcutsArray)
        localStorage.setItem("shortCuts", JSON.stringify(shortcutsArray));
    }, [shortcutsArray]);

    const removeByIndex = (indexToRemove: number) => {
        setShortcutsArray(prev =>
            prev.filter((_, index) => index !== indexToRemove)
        );
    };

    const addShortcut = (name: string, color: string, prompt: string) => {
        setShortcutsArray(prev => [...prev, { name, color, prompt }]);
    };

    return (
        <div className="max-w-1/3 overflow-x-auto scrollbar-hide mb-2 px-5 animate-fadeIn flex flex-nowrap items-center gap-1">
            <button className="border-white bg-background font-mono border-dotted text-[#d8d8d8] font-semibold border-2 px-2 rounded-xl cursor-pointer"
                    onClick={() => showModal(<NewShortcutModal add={addShortcut} />)}
            >
                +
            </button>
            {shortcutsArray.map((shortcut, index) => {
                return <ShortCut color={shortcut.color} key={index} name={shortcut.name}
                                 use={()=>{onHandleShortcut(shortcut.prompt)}} remove={()=>{removeByIndex(index)}} />
            })}
        </div>
    )
}