import {useSettings} from "../../providers/settings-provider.tsx";
import {useEffect, useState} from "react";
import Range from "../range.tsx";

export default function WatchersCategory(){

    const { settings } = useSettings();

    const [gmailInterval, setGmailInterval] = useState(settings.gmailInterval);
    const [todoInterval, setTodoInterval] = useState(settings.todoInterval);

    useEffect(() => {
        setGmailInterval(settings.gmailInterval);
        setTodoInterval(settings.todoInterval);
    }, [settings.gmailInterval, settings.todoInterval]);


    return (
        <div>
            <div className="w-full px-1 py-4 border-b border-neutral-900 flex justify-between items-center">
                <div className="text-sm">Gmail polling interval: </div>
                <Range arrayOfMargins={[20, 120]} step={1} value={gmailInterval} valueName={"gmailInterval"} onChangeFunction={setGmailInterval} />
            </div>
            <div className="w-full px-1 py-4 border-b border-neutral-900 flex justify-between items-center">
                <div className="text-sm">ToDo polling interval: </div>
                <Range arrayOfMargins={[20, 120]} step={1} value={todoInterval} valueName={"todoInterval"} onChangeFunction={setTodoInterval} />
            </div>
        </div>
    )
}