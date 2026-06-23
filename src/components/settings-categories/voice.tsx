import {useSettings} from "../../providers/settings-provider.tsx";
import {useEffect, useState} from "react";
import Range from "../range.tsx";

export default function VoiceCategory(){

    const { settings } = useSettings();

    const [ttsSpeed, setTtsSpeed] = useState(settings.ttsTalkSpeed);
    const [ttsVolume, setTtsVolume] = useState(settings.ttsVolume);

    useEffect(() => {
        setTtsSpeed(settings.ttsTalkSpeed);
        setTtsVolume(settings.ttsVolume);
    }, [settings.ttsTalkSpeed, settings.ttsVolume]);

    return (
        <div>
            <div className="w-full px-1 py-4 border-b border-neutral-900 flex justify-between items-center">
                <div className="text-sm">Text to speech speed: </div>
                <Range arrayOfMargins={[0.5, 2]} step={0.1} value={ttsSpeed} valueName={"ttsTalkSpeed"} onChangeFunction={setTtsSpeed} />
            </div>
            <div className="w-full px-1 py-4 border-b border-neutral-900 flex justify-between items-center">
                <div className="text-sm">Text to speech volume: </div>
                <Range arrayOfMargins={[0, 1]} step={0.01} value={ttsVolume} valueName={"ttsVolume"} onChangeFunction={setTtsVolume} />
            </div>
        </div>

    )
}