export default function ShortCut({color, name, use, remove}: {color: string, name:string, use: ()=>void, remove: () => void}) {

    let borderColor = "";

    switch (color) {
        case "brown": borderColor = "border-primary_brown"; break;
        case "cyan": borderColor = "border-primary_cyan"; break;
        case "green": borderColor = "border-primary_green"; break;
        case "blue": borderColor = "border-primary_blue"; break;
        default: borderColor = "border-primary_mauve"
    }

    return (
        <button className={`${borderColor} bg-background shrink-0 font-mono border-dotted text-[#d8d8d8] font-semibold border-2 px-2 rounded-xl cursor-pointer`}
        onClick={()=>{
             use();
        }}
        onContextMenu={(e)=>{
            e.preventDefault();
            remove()
        }}
        >
            {name}
        </button>
    )
}