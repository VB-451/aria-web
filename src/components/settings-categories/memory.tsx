import Range from "../range.tsx";
import {useSelector} from "react-redux";

export default function MemoryCategory(){

    const memoryThreshold = useSelector(state => state.settings.memorySearchThreshold)

    return (
        <div>
            <div className="w-full px-1 py-4 border-b border-neutral-900 flex justify-between items-center">
                <div className="text-sm">Memory search threshold: </div>
                <Range arrayOfMargins={[0.4,0.8]} step={0.01} value={memoryThreshold} valueName={"memorySearchThreshold"} />
            </div>
        </div>
    )
}