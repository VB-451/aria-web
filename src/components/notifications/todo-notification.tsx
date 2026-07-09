import type {TodoNotificationType} from "../../types/TodoNotificationType.ts";
import taskSvg from "../../assets/task.svg";
import {useEffect, useState} from "react";
import {dateTimeDiff} from "../../utils/dateTimeDiff.ts";

export default function TodoNotification({data, leaving} : {data: TodoNotificationType, leaving?: boolean}) {

    const [remainingTime, setRemainingTime] = useState({
        days: 0,
        hours: 0,
        minutes: 0
    });

    useEffect(() => {
        setRemainingTime(dateTimeDiff(data.due))
    }, [data.due])

    setInterval(() => {
        setRemainingTime(dateTimeDiff(data.due));
    }, 60000)


    return (
        <div className={`rounded-lg border-neutral-800 border h-fit w-fit min-w-64 px-3 py-2 flex gap-2 items-start transform transition-all duration-300 ease-out
                        ${leaving ? "opacity-0 translate-x-6 scale-95" : "opacity-100 translate-x-0 scale-100"}`}>
            <img src={taskSvg} className="pt-1" alt=""/>
            <div className="flex flex-col">
                <span className="font-semibold">Deadline approaching for:</span>
                <span>Task: <span className="text-primary_brown font-semibold">{data.task}</span></span>
                <span>In: <span className="text-primary_brown font-semibold">
                {[
                    remainingTime.days > 0 && `${remainingTime.days} days`,
                    remainingTime.hours > 0 && `${remainingTime.hours} hours`,
                    remainingTime.minutes > 0 && `${remainingTime.minutes} minutes`,
                ]
                    .filter(Boolean)
                    .join(", ")}
                </span>
                </span>
            </div>
        </div>
    )
}