export default function ShortCut({function_name, prompt, name, action}: {function_name: string, prompt: string, name:string, action: (prompt: string)=>void}) {

    let color = "";

    switch (function_name) {
        case "Todo": color = "border-primary_brown"; break;
        case "Weather": color = "border-primary_cyan"; break;
        case "Exec": color = "border-primary_green"; break;
    }

    return (
        <button className={`${color} bg-background mr-2 font-mono border-dotted text-[#d8d8d8] font-semibold border-2 px-2 rounded-xl cursor-pointer`}
        onClick={()=>{
             action(prompt);
        }}
        >
            {name}
        </button>
    )
}