export default function Loading() {
    return (
        <div id="answer" className="flex flex-col items-start mb-10 mt-5">
            <p className="bg-primary_purple text-white h-10 w-fit rounded-2xl px-3 py-2 flex items-center">
                <span className="flex space-x-1">
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0s]"></span>
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </span>
            </p>
        </div>
    );
}
