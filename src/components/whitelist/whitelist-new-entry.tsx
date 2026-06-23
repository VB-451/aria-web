import {type FormEvent, useState} from "react";
import {getExecutablePath} from "../../api/launcher/getExecutablePath.ts";
import {useWhitelist} from "../../providers/whitelist-provider.tsx";
import {useModal} from "../../providers/modal-provider.tsx";

export default function WhitelistNewEntry({name, type} : {name: string, type: string}) {

    const { addItem } = useWhitelist()
    const { closeModal } = useModal()

    const [filePath, setFilePath] = useState<string>("");
    const [execArguments, setExecArguments] = useState<string>("");
    const [link, setLink] = useState<string>("");

    const handleSelectExe = async () =>{
        const res = await getExecutablePath();
        if (res.executablePath){
            setFilePath(res.executablePath);
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        addItem(type, name, result)
        closeModal()
    }

    const fileWithArguments = execArguments ? `start \"\" \"${filePath}\" ${execArguments}` : filePath
    const result = type === "links" ? link : fileWithArguments;

    return (
        <form className="bg-background w-[400px] h-fit p-5 rounded-lg flex flex-col items-center gap-4" onSubmit={handleSubmit}>
            {type === "apps" && (
                <>
                    <button type="button"
                            onClick={handleSelectExe}
                           className="w-full text-left h-9 px-2 bg-white/3 rounded transition-colors delay-50 duration-350 hover:bg-white/5"
                    >
                        {(filePath || "Select .exe").slice(0, 40)}{filePath.length >= 40 && ("...")}
                    </button>
                    <input type="text"
                           value={execArguments}
                           onChange={(e) => setExecArguments(e.target.value)}
                           placeholder="(Optional) Arguments:"
                           className="w-full outline-0 placeholder:text-neutral-600 h-9 px-2 rounded transition-colors delay-50 duration-350 hover:bg-white/3"
                    />
                </>
            )}
            {type === "links" && (
                <input type="text"
                       value={link}
                       onChange={(e) => setLink(e.target.value)}
                       placeholder="Enter new link:"
                       className="w-full outline-0 placeholder:text-neutral-600 h-9 px-2 rounded transition-colors delay-50 duration-350 hover:bg-white/3"
                />
            )}
            <button
                type="submit"
                disabled={(!filePath && type === "apps") || (!link && type === "links")}
                className={`px-2 py-1 rounded bg-primary_purple hover:bg-primary_purple/80 transition-colors
                disabled:bg-neutral-800`}
            >Add</button>
        </form>
    )
}