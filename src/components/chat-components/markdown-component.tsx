import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function MarkdownComponent({ assistantContent, color } : { assistantContent: string, color: string }) {
    return (
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
            >{assistantContent}</ReactMarkdown>
        </div>
    )
}