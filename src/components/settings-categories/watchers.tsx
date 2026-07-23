import Range from "../range.tsx";
import {useSelector} from "react-redux";

export default function WatchersCategory(){

    const gmailInterval = useSelector(state => state.settings.gmailInterval)
    const todoInterval = useSelector(state => state.settings.todoInterval)


    return (
        <div>
            <div className="w-full px-1 py-4 border-b border-neutral-900 flex justify-between items-center">
                <div className="text-sm">Gmail polling interval: </div>
                <Range arrayOfMargins={[20, 120]} step={1} value={gmailInterval} valueName={"gmailInterval"} />
            </div>
            <div className="w-full px-1 py-4 border-b border-neutral-900 flex justify-between items-center">
                <div className="text-sm">ToDo polling interval: </div>
                <Range arrayOfMargins={[20, 120]} step={1} value={todoInterval} valueName={"todoInterval"} />
            </div>
        </div>
    )
}