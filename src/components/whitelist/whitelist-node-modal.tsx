import {useWhitelist} from "../../providers/whitelist-provider.tsx";
import {useState} from "react";
import {getDirectoryPath} from "../../api/launcher/getDirectoryPath.ts";
import {useModal} from "../../providers/modal-provider.tsx";
import Delete from "../../assets/delete.svg";

export default function WhitelistNodeModal({name} : {name: string}){

    const { closeModal } = useModal();
    const { whitelist, removeGroup, upsertNodeGroup } = useWhitelist()

    const nodeAppData = whitelist.node[name] || {
        "directory" : "",
        "script": "",
        "webpage": ""
    }

    const [groupname, setGroupname] = useState(name);
    const [directory, setDirectory] = useState<string>(nodeAppData.directory);
    const [script, setScript] = useState(nodeAppData.script);
    const [webpage, setWebpage] = useState<string>(nodeAppData.webpage);

    const isNotValidated = !groupname || !directory || !script;

    const handleSelectDirectory = async () =>{
        const res = await getDirectoryPath();
        if (res.directory){
            setDirectory(res.directory);
        }
    }

    return (
        <form className="bg-background w-[400px] h-fit py-5 px-4 rounded-lg flex flex-col items-center gap-4">
            <div className="grid w-[89%] grid-cols-3 items-center mb-2">
                <div />
                <input type="text" value={groupname} onChange={e => setGroupname(e.target.value)} placeholder="Node Group Name:"
                       className="justify-self-center w-fit text-lg font-semibold text-center outline-0 placeholder:text-neutral-600 h-9 px-1 rounded transition-colors delay-50 duration-350 hover:bg-white/3" />
                <button className={"justify-self-end p-2 not-disabled:  hover:bg-white/5 rounded-full transition-colors"} type={"button"}
                onClick={() => {
                    removeGroup("node", groupname);
                    closeModal()
                }}
                disabled={!groupname}>
                    <img className="w-5" src={Delete} alt="" />
                </button>
            </div>
            <button type="button" className="w-full h-9 px-2 text-left bg-white/3 rounded transition-colors delay-50 duration-350 hover:bg-white/5"
            onClick={handleSelectDirectory}>
                {(directory || "Select directory:").slice(0, 40)}{directory.length >= 40 && ("...")}
            </button>
            <input type="text" value={script} onChange={e => setScript(e.target.value)} placeholder="Node Script Name:"
                   className="w-full outline-0 placeholder:text-neutral-600 h-9 px-2 rounded transition-colors delay-50 duration-350 hover:bg-white/3"/>
            <input type="text" value={webpage} onChange={e => setWebpage(e.target.value)} placeholder="Webpage:"
                   className="w-full outline-0 placeholder:text-neutral-600 h-9 px-2 rounded transition-colors delay-50 duration-350 hover:bg-white/3"/>
            <button type="submit"
                    onClick={()=> {
                        upsertNodeGroup(groupname, {directory, script, webpage})
                        closeModal()
                    }}
                    disabled={isNotValidated}
                    className={`px-2 py-1 font-semibold rounded bg-primary_purple hover:bg-primary_purple/80 transition-colors disabled:bg-neutral-800`}
            >Save</button>
        </form>
    )

}