import Delete from "../../assets/delete.svg"
import Remove from "../../assets/cancel.svg"
import {extractPath} from "../../utils/extract-path.ts";
import {useModal} from "../../providers/modal-provider.tsx";
import WhitelistNewEntry from "./whitelist-new-entry.tsx";
import {useWhitelist} from "../../providers/whitelist-provider.tsx";
import {useState} from "react";

export default function WhitelistModal({name, type} : {name: string, type: string}) {

    const { showModal, closeModal } = useModal();
    const { whitelist, removeItem, removeGroup } = useWhitelist();

    const [groupname, setGroupname] = useState(name);

    const items = whitelist[type][groupname] || [];

    return (
        <div className="bg-background w-[600px] h-80 p-5 rounded-lg flex flex-col items-center">
            <div className="grid w-[89%] grid-cols-3 items-center">
                <div />
                <input type="text" value={groupname} onChange={e => setGroupname(e.target.value)} placeholder="Node Group Name:"
                       className="justify-self-center w-fit text-lg font-semibold text-center
                       outline-0 placeholder:text-neutral-600 h-9 px-1 rounded transition-colors delay-50 duration-350 hover:bg-white/3" />
                <button className="justify-self-end p-2 not-disabled:hover:bg-white/5 rounded-full transition-colors"
                        onClick={async () => {
                            await removeGroup(type, groupname);
                            closeModal()
                        }}
                        disabled={!groupname}
                >
                    <img className="w-5" src={Delete} alt="" />
                </button>
            </div>
            <div className="w-full mt-5 flex flex-col items-center gap-2 h-fit max-h-48 overflow-y-auto">
                {items.map((item, index) => (
                    <div className="flex items-center gap-3">
                        <span className="px-3 py-2 w-[450px] whitespace-nowrap text-center rounded-lg bg-white/3 hover:bg-white/5 transition-colors">
                            {type === "links" ? item.slice(0, 50) : (extractPath(item)).slice(0, 50)}{item.length >= 50 && "..."}
                        </span>
                        <button className="h-fit p-1.5 hover:bg-white/5 rounded-full transition-colors"
                        onClick={()=>{removeItem(type, name, index)}}>
                            <img className="w-5" src={Remove} alt=""/>
                        </button>
                    </div>
                ))}
            </div>
            <button className="px-3 py-2 mt-2 mr-11 w-md text-center rounded-lg bg-white/3 not-disabled:hover:bg-white/5 transition-colors"
                    onClick={()=>{showModal(<WhitelistNewEntry name={groupname} type={type} /> )}}
                    disabled={!groupname}
            >+</button>
        </div>
    )
}