import copySvg from "../assets/copy.svg";
import cancelSvg from "../assets/cancel.svg";
import {deleteFromIndex} from "../utils/deleteFromIndex.ts";

export default function Question({content, id, callback} : {content: string, id: number, callback: (index: number) => void}) {

    const handleCopy = async () => {
        await navigator.clipboard.writeText(content);
    }

    const handleDelete = async () => {
        await deleteFromIndex(id);
        callback(id)
    }

    return (
        <>
            <div className="flex flex-col items-end group">
                <p className="bg-[#303030] h-fit w-fit max-w-[74%] rounded-2xl px-3 py-2 whitespace-pre-line">
                    {content}
                </p>
                <div className="flex mt-1 ml-1">
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
                </div>
            </div>
        </>
    )
}