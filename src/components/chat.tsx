import sendSvg from '../assets/send.svg'
import addSvg from '../assets/add.svg'
import Question from "./question.tsx";
import Answer from "./answer.tsx";
import {useEffect, useRef, useState} from "react";
import {sendMessage} from "../utils/sendMessage.ts";
import Loading from "./loading.tsx";
import {getMessages} from "../utils/getMessages.ts";
import ShortCut from "./shortcut.tsx";


export default function Chat() {

    const [messages, setMessages] = useState<{ role: string; content: string; id: number; step1_decision?: {function: string} }[]>([]);
    const [input, setInput] = useState("");
    const [showShortCuts, setShowShortCuts] = useState(true);
    const [loading, setLoading] = useState(false);
    const [streaming, setStreaming] = useState<boolean>(false);
    const [counter, setCounter] = useState(0);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const buttonRef =useRef<HTMLButtonElement | null>(null);

    const shortCuts = [
        {
            function: "Todo",
            name:"All",
            prompt: "How's the todo looking?"
        },
        {
            function: "Todo",
            name:"Due Today",
            prompt: "Are there any tasks due today?"
        },
        {
            function: "Weather",
            name:"Now",
            prompt: "How's the weather now?"
        },
        {
            function: "Weather",
            name:"Week",
            prompt: "Summarise the next 7 days weather."
        },
        {
            function: "Exec",
            name:"Daily",
            prompt: "Launch the daily links."
        },
        {
            function: "Exec",
            name:"Auditorium",
            prompt: "Run the auditorium apps."
        }
    ]

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const getData = async () =>{
            const lastMessages = await getMessages();
            setMessages(lastMessages.messages);
            setCounter(lastMessages.counter);
            console.log(lastMessages);
            if(lastMessages.messages.length){
                setShowShortCuts(false);
            }
        }
        getData();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (!inputRef.current) return
        const el = inputRef.current;
        el.style.height = "53px";
        el.style.height = Math.min(el.scrollHeight, 93) + "px";
        if (!inputRef.current || !buttonRef.current) return;
        buttonRef.current.style.height = inputRef.current.offsetHeight + "px";
    }, [input]);

    const handleSendMessage = async (text?: string) => {
        const messageToSend = text ?? input;
        if (!messageToSend) return;

        setCounter(prev => prev + 1);

        setMessages(prev => [
            ...prev,
            { role: "user", content: messageToSend, id: counter },
            { role: "assistant", content: "", id: counter}
        ]);

        setInput("");
        setLoading(true);
        setShowShortCuts(false);

        let accumulated = "";

        await sendMessage(
            messageToSend,

            (functionType) => {
                setLoading(false);
                setStreaming(true);
                setMessages(prev =>
                    prev.map(msg =>
                        (msg.id === counter) && (msg.role === "assistant")
                            ? { ...msg, step1_decision:{function: functionType} }
                            : msg
                    )
                );
            },

            (chunk) => {
                accumulated += chunk;
                setMessages(prev =>
                    prev.map(msg =>
                        (msg.id === counter) && (msg.role === "assistant")
                            ? { ...msg, content: accumulated }
                            : msg
                    )
                );
            },

            (meta) => {
                setStreaming(false)
                setMessages(prev =>
                    prev.map(msg =>
                        (msg.id === counter) && (msg.role === "assistant")
                            ? {
                                ...msg,
                                id: meta.id,
                                step1_decision: meta.step1_decision,
                                relevantMemories: meta.relevantMemories,
                            }
                            : msg
                    )
                );
            }
        );
    };

    const handleShortCut = (prompt: string) => {
        if(!loading){
            setInput(prompt);
            handleSendMessage(prompt);
        }
    }

    const toggleShortCuts = () => {
        setShowShortCuts(!showShortCuts);
    }

    const deleteMessagesByIndex = (index: number) => {
        setMessages(prevMessages => {
            return prevMessages.filter(msg => msg.id < index);
        });
    };

    const regenerateMessage = async (id: number) => {
        const question = messages.find(message => message.id === id) || {id:0, content:""};
        deleteMessagesByIndex(question.id);
        await handleSendMessage(question.content);
    }

    return (
        <>
            <div className="h-9 w-full bg-linear-to-b from-black absolute z-5" />
            <div id="chat" className="w-full h-screen overflow-hidden z-2">
                <div id="messages" className={`${messages.length ? "h-[95vh]" : "h-[30vh]"} overflow-y-auto flex justify-center flex-wrap pt-24 pb-12`}>
                    <div className="w-[40%] flex flex-col justify-end">
                        {messages.map((message, index) => {
                            if (message.role === "user") {
                                return <Question key={index} content={message.content} id={message.id} callback={deleteMessagesByIndex}/>
                            } else if(message.content.length) {
                                return <Answer key={index} content={message.content} id={message.id} regenerateFunction={regenerateMessage}
                                               function_type={message.step1_decision?.function}/>
                            }
                        })}

                        {loading && (
                            <Loading />
                        )}
                        <div ref={messagesEndRef}/>
                    </div>
                </div>
                <div id="input" className={`${messages.length ? "absolute bottom-0" : ""} w-full flex flex-col justify-center items-center mb-5`}>
                    {!messages.length && (
                        <p className={`text-3xl font-semibold ${showShortCuts ? "mb-1.5" : "mb-11"}`}>
                            <span className="bg-linear-to-r from-primary_purple to-primary_zvet bg-clip-text text-transparent text-4xl">Aria </span>
                            is your personal
                            <span className="bg-linear-to-l from-primary_purple to-primary_zvet bg-clip-text text-transparent text-3xl"> AI </span>
                            assistant
                        </p>
                    )}
                    {showShortCuts && (
                        <div className="w-fit h-[30px] mb-2 flex px-5 animate-fadeIn">
                            {shortCuts.map((shortcut, index) => {
                                return <ShortCut function_name={shortcut.function} prompt={shortcut.prompt}
                                                 action={handleShortCut} key={index} name={shortcut.name}/>
                            })}
                        </div>
                    )}
                    <div className="w-[40%] flex rounded-3xl flex-row justify-center">
                        <div className="w-1/20 flex justify-center items-center rounded-l-3xl bg-[#303030]">
                            <button className="ml-1 p-1 inline-flex rounded-3xl hover:bg-[#444444]"
                                    onClick={toggleShortCuts}>
                                <img className="shrink-0 w-6 h-6" src={addSvg} alt="Add"/>
                            </button>
                        </div>
                        <textarea
                            className="bg-[#303030] w-18/20 pl-1 pr-4 pt-3 pb-2 flex items-center justify-center outline-0 resize-none"
                            ref={inputRef}
                            placeholder={loading ? "Loading..." : "Say hi to Aria..."}
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage();
                                }
                            }}
                            readOnly={loading}
                        ></textarea>
                        <button className={`${(loading || !input) ? "bg-[#303030]" : "bg-primary_purple hover:cursor-pointer"}
                     t w-1/20 h-auto rounded-r-3xl flex items-center justify-center transition ease-in-out transition-height`}
                                ref={buttonRef}
                                onClick={()=>{handleSendMessage()}}
                                disabled={(loading || !input) || streaming}>
                            <img src={sendSvg} className={`${(loading || !input) ? "invisible" : ""} transition ease-in-out`} alt="Send"/>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
