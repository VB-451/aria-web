import sendSvg from '../assets/send.svg'
import addSvg from '../assets/add.svg'
import Question from "./chat-components/question.tsx";
import Answer from "./chat-components/answer.tsx";
import {useEffect, useMemo, useRef, useState} from "react";
import {sendMessage} from "../api/sendMessage.ts";
import Loading from "./chat-components/loading.tsx";
import {getMessages} from "../api/conversation/getMessages.ts";
import type {ConversationType} from "../types/ConversationType.ts";
import {
    addSibling,
    appendAssistantMessage,
    appendUserMessage,
    deleteSubtree,
    getPath,
    switchBranch
} from "../utils/conversation.ts";
import {fetchSwitchBranch} from "../api/conversation/fetchSwitchBranch.ts";
import {deleteMessageFromID} from "../api/conversation/deleteMessageFromID.ts";
import Streaming from "./chat-components/streaming.tsx";
import { marked } from "marked";
import { convert } from "html-to-text";
import {postTTS} from "../api/postTTS.ts";
import {useSettings} from "../providers/settings-provider.tsx";
import Shortcuts from "./shortcuts/shortcuts.tsx";


export default function Chat({autoTTSState} : {autoTTSState: boolean}) {

    const [conversation, setConversation] = useState<ConversationType>({nodes: {}, currentNodeId:"123412", rootId:""});
    const [input, setInput] = useState("");
    const [userMessage, setUserMessage] = useState<string>("");
    const [showShortCuts, setShowShortCuts] = useState(true);
    const [loading, setLoading] = useState(false);
    const [streamingMessage, setStreamingMessage] = useState<string>("");
    const [streamingFunction, setStreamingFunction] = useState<string>("");

    const { settings } = useSettings();

    const visibleMessages = useMemo(() => {
        return getPath(conversation, conversation.currentNodeId)
    }, [conversation])

    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const buttonRef =useRef<HTMLButtonElement | null>(null);
    const streamingFunctionRef = useRef("");

    const shortCuts = JSON.parse(localStorage.getItem("shortCuts")) || [];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const getData = async () =>{
            const lastMessages = await getMessages();
            setConversation(lastMessages);
            console.log(lastMessages);

            if(Object.keys(lastMessages.nodes).length > 1){
                setShowShortCuts(false);
            }
        }
        getData();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [visibleMessages, streamingMessage]);

    useEffect(() => {
        if (!inputRef.current) return
        const el = inputRef.current;
        el.style.height = "53px";
        el.style.height = Math.min(el.scrollHeight, 93) + "px";
        if (!inputRef.current || !buttonRef.current) return;
        buttonRef.current.style.height = inputRef.current.offsetHeight + "px";
    }, [input]);

    const handleSendMessage = async (text?: string, regenerateID?: string, regenerateAnswer?: boolean) => {

        if(loading || streamingMessage){
            return;
        }

        const messageToSend = text ?? input;
        if (!messageToSend) return;
        setUserMessage(messageToSend);
        setInput("");
        setLoading(true);
        setShowShortCuts(false);
        setStreamingMessage(" ")

        let accumulated = "";

        await sendMessage(messageToSend,

            (functionType) =>{
                setLoading(false);
                streamingFunctionRef.current = functionType
                setStreamingFunction(functionType);
            },

            (chunk) =>{
                accumulated += chunk;
                setStreamingMessage(accumulated);
            },

            (meta) =>{
                setConversation(prev =>{
                    let next = prev;
                    if(!regenerateID){
                        next = appendUserMessage(prev, messageToSend, meta.parent_id);
                        next = appendAssistantMessage(next, accumulated, meta.id, streamingFunctionRef.current)
                    } else if(regenerateAnswer){
                        next = addSibling(next, regenerateID, accumulated, meta.id, streamingFunctionRef.current, true)
                    } else {
                        next = addSibling(next, regenerateID, messageToSend, meta.parent_id, null, false)
                        next = appendAssistantMessage(next, accumulated, meta.id, streamingFunctionRef.current)
                    }
                    return next;
                })
            },
            regenerateID,
            regenerateAnswer
        )

        setStreamingMessage("")
        setStreamingFunction("")
        if(autoTTSState){
            const clearedText = convert(marked(accumulated));
            await postTTS(clearedText, settings.ttsVolume)
        }

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

    const deleteMessagesByID = (id: string) => {
        setConversation(prev => deleteSubtree(prev, id));
        deleteMessageFromID(id);
    };

    const regenerateAnswer = async (id: string) => {
        const selectedMessageParentID = conversation.nodes[id].parentId;
        const aboveParentID = conversation.nodes[selectedMessageParentID].parentId;
        setConversation(prev => {
            return {
                ...prev,
                currentNodeId: aboveParentID
            }
        })
        await handleSendMessage(conversation.nodes[selectedMessageParentID].content, id, true)
    }

    const editQuestion = async (id: string, newContent: string) => {
        const selectedMessageParentID = conversation.nodes[id].parentId;
        setConversation(prev => {
            return {
                ...prev,
                currentNodeId: selectedMessageParentID
            }
        })
        await handleSendMessage(newContent, id, false);
    }

    const switchSiblingBranch = async (id: string) => {
        setConversation(prev => switchBranch(prev, id));
        await fetchSwitchBranch(id)
    }


    return (
        <>
            <div className="h-9 w-full bg-linear-to-b from-black absolute z-5" />
            <div id="chat" className="w-full h-screen overflow-hidden z-2">
                <div id="messages" className={`${(visibleMessages.length > 1) || loading || streamingMessage ? "h-[95vh]" : "h-[30vh]"} overflow-y-auto flex justify-center flex-wrap pt-24 pb-12`}>
                    <div className="w-[40%] flex flex-col justify-end">
                        {visibleMessages.map((message) => {
                            if (message.role === "user") {
                                const parent = conversation.nodes[message.parentId]
                                const siblings = parent.childrenIds.length > 1 ? parent.childrenIds : [];
                                return <Question key={message.id} content={message.content} id={message.id} siblings={siblings}
                                                 onDelete={deleteMessagesByID} onSwitchBranch={switchSiblingBranch} onEdit={editQuestion}/>
                            } else if(message.role === "assistant") {
                                const parent = conversation.nodes[message.parentId]
                                const siblings = parent.childrenIds.length > 1 ? parent.childrenIds : [];
                                return <Answer key={message.id} content={message.content} id={message.id} onRegenerate={regenerateAnswer}
                                               function_type={message.function_type} siblings={siblings} onSwitchBranch={switchSiblingBranch}/>
                            }
                        })}
                        {streamingMessage && (
                            <Streaming userContent={userMessage} assistantContent={streamingMessage} function_type={streamingFunction} />
                        )}
                        {loading && (
                            <Loading />
                        )}
                        <div ref={messagesEndRef}/>
                    </div>
                </div>
                <div id="input" className={`${(visibleMessages.length > 1) || loading || streamingMessage  ? "absolute bottom-0" : ""} w-full flex flex-col justify-center items-center mb-5`}>
                    {(visibleMessages.length === 1 && !streamingMessage && !loading) && (
                        <p className={`text-3xl font-semibold ${showShortCuts ? "mb-1" : "mb-10"}`}>
                            <span className="bg-linear-to-r from-primary_purple to-primary_mauve bg-clip-text text-transparent text-4xl">Aria </span>
                            is your personal
                            <span className="bg-linear-to-l from-primary_purple to-primary_mauve bg-clip-text text-transparent text-3xl"> AI </span>
                            assistant
                        </p>
                    )}
                    {showShortCuts && (<Shortcuts onHandleShortcut={handleShortCut} />)}
                    <div className="w-[40%] flex rounded-3xl flex-row justify-center">
                        <div className="w-1/20 flex justify-center items-center rounded-l-3xl bg-[#303030]">
                            <button className="ml-1 p-1 inline-flex rounded-3xl hover:bg-[#444444]"
                                    onClick={toggleShortCuts}>
                                <img className="shrink-0 w-6 h-6" src={addSvg} alt="Add"/>
                            </button>
                        </div>
                        <textarea
                            className="bg-[#303030] w-18/20 pl-1 pr-4 pt-3 pb-2 outline-0 resize-none"
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
                        <button className={`${(loading || !input) || (streamingMessage) ? "bg-[#303030]" : "bg-primary_purple hover:cursor-pointer"}
                     t w-1/20 h-auto rounded-r-3xl flex items-center justify-center transition ease-in-out`}
                                ref={buttonRef}
                                onClick={()=>{handleSendMessage()}}
                                disabled={(loading || !input) || (streamingMessage)}>
                            <img src={sendSvg} className={`${(loading || !input) ? "invisible" : ""} transition ease-in-out`} alt="Send"/>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
