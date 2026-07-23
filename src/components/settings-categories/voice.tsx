import Range from "../range.tsx";
import {useSelector} from "react-redux";

export default function VoiceCategory(){

    const ttsSpeed= useSelector(state => state.settings.ttsTalkSpeed)
    const ttsVolume = useSelector(state => state.settings.ttsVolume)

    return (
        <div>
            <div className="w-full px-1 py-4 border-b border-neutral-900 flex justify-between items-center">
                <div className="text-sm">Text to speech speed: </div>
                <Range arrayOfMargins={[0.5, 2]} step={0.1} value={ttsSpeed} valueName={"ttsTalkSpeed"} />
            </div>
            <div className="w-full px-1 py-4 border-b border-neutral-900 flex justify-between items-center">
                <div className="text-sm">Text to speech volume: </div>
                <Range arrayOfMargins={[0, 1]} step={0.01} value={ttsVolume} valueName={"ttsVolume"} />
            </div>
        </div>

    )
}