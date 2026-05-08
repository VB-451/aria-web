import React, {useState} from "react";
import copySvg from "../assets/copy.svg";
import cancelSvg from "../assets/cancel.svg";
import editSvg from "../assets/edit.svg";

function Question({content, id, siblings, onDelete, onSwitchBranch, onEdit } : {content: string, id: string, siblings:string[], onDelete: (id: string) => void, onSwitchBranch: (id: string) => void, onEdit: (id: string, newContent: string) => void}) {

    const currentSiblingIndex = siblings.indexOf(id);

    const [editValue, setEditValue] = useState(content);
    const [showEdit, setShowEdit] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(content);
    }

    const handleDelete = async () => {
        onDelete(id)
    }

    const handleEdit = async () => {
        setShowEdit(false)
        onEdit(id, editValue)
    }

    const handleSwitch = (direction: string) => {
        if(direction === "next"){
            onSwitchBranch(siblings[currentSiblingIndex + 1])
        } else if(direction === "prev"){
            onSwitchBranch(siblings[currentSiblingIndex - 1])
        }
    }

    return (
        <>
            <div className={`flex flex-col items-end ${showEdit ? "" : "group"}`}>
                {showEdit ? (
                    <div className="bg-[#303030] w-full h-43 rounded-3xl px-5 py-3">
                        <textarea className="h-25 w-full outline-0 resize-none"
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                        >

                        </textarea>
                        <div className="flex items-center justify-end">
                            <button className="mr-3 bg-background px-3 py-2 rounded-3xl font-semibold hover:cursor-pointer"
                            onClick={()=>{setShowEdit(false)}}>Cancel</button>
                            <button className="bg-primary_purple px-3 py-2 rounded-3xl font-semibold hover:cursor-pointer"
                            onClick={handleEdit}>Send</button>
                        </div>
                    </div>
                ) : (
                    <p className="bg-[#303030] h-fit w-fit max-w-[74%] rounded-2xl px-3 py-2 whitespace-pre-line">
                        {content}
                    </p>
                )}
                <div className="flex mt-1 ml-1">
                    <button className={`opacity-0 transition-opacity delay-150 ease-in-out h-7 w-7 flex items-center
                    justify-center rounded-3xl hover:bg-[#26282a]  hover:cursor-pointer group-hover:opacity-100`}
                    onClick={()=> {setShowEdit(true)}}>
                        <img src={editSvg} alt="Edit"/>
                    </button>
                    <button className={`opacity-0 transition-opacity delay-150 ease-in-out h-7 w-7 flex items-center
                    justify-center rounded-3xl hover:bg-[#26282a] hover:cursor-pointer group-hover:opacity-100`}
                            onClick={handleCopy}>
                        <img src={copySvg} alt="Copy"/>
                    </button>
                    <button className={`opacity-0 transition-opacity delay-150 ease-in-out h-7 w-7 flex items-center
                    justify-center rounded-3xl hover:bg-[#26282a] hover:cursor-pointer group-hover:opacity-100`}
                            onClick={handleDelete}>
                        <img src={cancelSvg} alt="Delete"/>
                    </button>
                    {siblings.length > 0 && (
                        <div className={`opacity-0 transition-opacity delay-150 ease-in-out group-hover:opacity-100
                     ml-2 w-16 flex justify-between items-center`}>
                            <button className={`text-lg ${currentSiblingIndex === 0 ? "opacity-40 cursor-default" : "cursor-pointer"}`}
                                    disabled={currentSiblingIndex === 0}
                                    onClick={()=>{handleSwitch("prev")}}>{'<'}</button>
                            <p className="font-semibold">{currentSiblingIndex + 1} / {siblings.length}</p>
                            <button className={`text-lg ${currentSiblingIndex === siblings.length - 1 ? "opacity-40 cursor-default" : "cursor-pointer"}`}
                                    disabled={currentSiblingIndex === siblings.length - 1}
                                    onClick={()=>{handleSwitch("next")}}>{'>'}</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default React.memo(Question);