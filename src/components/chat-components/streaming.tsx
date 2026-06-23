import MarkdownComponent from "./markdown-component.tsx";

export default function Streaming({userContent, assistantContent, function_type} : {userContent: string, assistantContent: string, function_type: string}) {

    let color : string;

    switch (function_type) {
        case "ytt": color = "text-primary_red"; break;
        case "execute": color = "text-primary_green"; break;
        case "todo": color = "text-primary_brown"; break;
        case "search": color = "text-primary_purple"; break;
        case "weather.now": case "weather.week": color = "text-primary_cyan"; break;
        case "gmail.recent": case "gmail.read" : color = "text-primary_blue"; break;
        default: color = "text-primary_mauve";
    }

    return (
        <>
            <div className="flex flex-col items-end group">
                <p className="bg-[#303030] h-fit w-fit max-w-[74%] rounded-2xl px-3 py-2 whitespace-pre-line">
                    {userContent}
                </p>
            </div>
            <MarkdownComponent assistantContent={assistantContent} color={color} />
        </>
    )
}