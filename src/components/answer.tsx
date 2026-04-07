import copySvg from "../assets/copy.svg"
import ttsSvg from "../assets/tts.svg"
import regenerateSvg from "../assets/regenerate.svg"
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { marked } from "marked";
import { convert } from "html-to-text";
import {deleteFromIndex} from "../utils/deleteFromIndex.ts";

export default function Answer({content, id, regenerateFunction, function_type = "null"} : {content: string, id: number, regenerateFunction: (id: number)=>void,  function_type?: string} ) {

    let color : string;
    let role : string;
    const simpleText = convert(marked(content))


    const handleCopy = async () => {
        await navigator.clipboard.writeText(simpleText);
    }

    const handleTTS = async () => {
        const res = await fetch("http://localhost:4000/tts/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: simpleText})
        });
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.volume = 0.37;
        audio.play();

    }

    const handleRegenerate = async () => {
        await deleteFromIndex(id);
        regenerateFunction(id);
    }

    switch (function_type) {
        case "ytt": color = "text-primary_red"; break;
        case "execute": color = "text-primary_green"; break;
        case "todo": color = "text-primary_brown"; break;
        case "search": color = "text-primary_purple"; break;
        case "weather.now": color = "text-primary_cyan"; break;
        case "weather.week": color = "text-primary_cyan"; break;
        default: color = "text-primary_zvet";
    }

    return (
        <div id="answer" className="group flex flex-col items-start mb-5 w-full">
            <div className={`whitespace-pre-line h-fit w-fit max-w-full rounded-2xl`}>
                <ReactMarkdown
                    components={{
                        ol: ({...props}) => (
                            <ol className="list-decimal pl-4" {...props} />
                        ),
                        ul: ({...props}) => (
                            <ul className="list-disc pl-4" {...props} />
                        ),
                        strong: ({...props}) => (
                            <strong className={`${color}`} {...props} />
                        ),
                        h1: ({...props}) => (
                            <h1 className={`font-semibold text-4xl ${color}`} {...props} />
                        ),
                        h3: ({...props}) => (
                            <h3 className={`font-semibold text-2xl ${color}`} {...props} />
                        ),
                        hr: ({...props}) => (
                            <hr className={`text-white/8`} {...props} />
                        ),
                        code({node, inline, className, children, ...props}) {
                            const match = /language-(\w+)/.exec(className || "");

                            return !inline && match ? (
                                <SyntaxHighlighter
                                    style={atomDark}
                                    customStyle={{
                                        maxHeight: "500px",
                                        overflowY: "auto",
                                        borderRadius: "8px"
                                    }}
                                    language={match[1]}
                                    PreTag="div"
                                    {...props}
                                >
                                    {String(children).replace(/\n$/, "")}
                                </SyntaxHighlighter>
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            );
                        }
                    }}
                >{content}</ReactMarkdown>
            </div>
            <div className="flex mt-1">
                <button className={`opacity-0 transition-opacity delay-150 ease-in-out h-7 w-7 flex items-center
             justify-center rounded-3xl hover:bg-[#26282a] hover:cursor-pointer group-hover:opacity-100`}
                        onClick={handleCopy}>
                    <img src={copySvg} alt="Copy"/>
                </button>
                <button className={`opacity-0 transition-opacity delay-150 ease-in-out h-7 w-7 flex items-center
             justify-center rounded-3xl hover:bg-[#26282a] hover:cursor-pointer group-hover:opacity-100`}
                        onClick={handleTTS}>
                    <img src={ttsSvg} alt="Copy"/>
                </button>
                <button className={`opacity-0 transition-opacity delay-150 ease-in-out h-7 w-7 flex items-center
             justify-center rounded-3xl hover:bg-[#26282a] hover:cursor-pointer group-hover:opacity-100`}
                        onClick={handleRegenerate}>
                    <img src={regenerateSvg} alt="Copy"/>
                </button>
            </div>
        </div>
    )
}