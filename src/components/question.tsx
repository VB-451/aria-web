import copySvg from "../assets/copy.svg";

export default function Question({content} : {content: string}) {

    const handleCopy = async () => {
        await navigator.clipboard.writeText(content);
    }

    return (
        <>
            <div className="flex flex-col items-end group">
                {/*<p className="font-semibold">V:</p>*/}
                <p className="bg-[#303030] h-fit w-fit max-w-[74%] rounded-2xl px-3 py-2">
                    {content}
                </p>
                <button className={`opacity-0 transition-opacity ease-in-out delay-150 mt-1 ml-1 h-7 w-7 flex items-center justify-center 
                rounded-3xl hover:bg-[#26282a] hover:cursor-pointer group-hover:opacity-100`}
                onClick={handleCopy}
                >
                    <img src={copySvg} alt="Copy"/>
                </button>
            </div>
        </>
    )
}