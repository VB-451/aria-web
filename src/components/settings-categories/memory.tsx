import {useSettings} from "../../providers/settings-provider.tsx";
import {useEffect, useState} from "react";
import Range from "../range.tsx";

export default function MemoryCategory(){

    const { settings } = useSettings();

    const [memoryThreshold, setMemoryThreshold] = useState(settings.memorySearchThreshold);

    useEffect(() => {
        setMemoryThreshold(settings.memorySearchThreshold);
    }, [settings.memorySearchThreshold]);

    return (
        <div>
            <div className="w-full px-1 py-4 border-b border-neutral-900 flex justify-between items-center">
                <div className="text-sm">Memory search threshold: </div>
                <Range arrayOfMargins={[0.4,0.8]} step={0.01} value={memoryThreshold} valueName={"memorySearchThreshold"} onChangeFunction={setMemoryThreshold} />
            </div>
        </div>
    )
}