import copySvg from "../assets/copy.svg"
import ReactMarkdown from "react-markdown";

export default function Answer({content, function_type = "null"} : {content: string, function_type?: string} ) {

    let color : string;
    let role : string;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(content);
    }

    switch (function_type) {
        case "ytt": color = "bg-primary_red"; role=" (YTT)"; break;
        case "execute": color = "bg-primary_green"; role=" (Execute)"; break;
        case "todo": color = "bg-primary_brown"; role=" (To Do)"; break;
        case "search": color = "bg-primary_zvet"; role=" (Search)";break;
        case "weather.now": color = "bg-linear-to-l from-primary_purple to-primary_cyan"; role=" (Weather)";break;
        case "weather.week": color = "bg-primary_cyan"; role=" (Weather)"; break;
        default: color = "bg-linear-to-r from-primary_purple to-primary_zvet"; role="";
    }

    return (
        <div id="answer" className="group flex flex-col items-start mb-5 w-fit">
            <p className="ml-3 mb-1 font-semibold w-fit">{`Aria${role}:`}</p>
            <div className={`${color} whitespace-pre-line h-fit w-fit max-w-[84%] rounded-2xl px-3 py-2`}>
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
            <button className={`opacity-0 transition-opacity delay-150 ease-in-out mt-1 ml-1 h-7 w-7 flex items-center
             justify-center rounded-3xl hover:bg-[#26282a] hover:cursor-pointer group-hover:opacity-100`}
            onClick={handleCopy}
            >
                <img src={copySvg} alt="Copy"/>
            </button>
        </div>
    )
}