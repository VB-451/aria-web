import type {GmailNotificationType} from "../../types/GmailNotificationType.ts";
import emailSvg from "../../assets/email.svg"

export default function GmailNotification({data, leaving} : {data: GmailNotificationType, leaving?: boolean}) {
    return (
        <div className={`rounded-lg border-neutral-800 border h-fit w-fit px-3 py-2 flex items-start gap-2 transform transition-all duration-300 ease-out
                        ${leaving ? "opacity-0 translate-x-6 scale-95" : "opacity-100 translate-x-0 scale-100"}`}>
            <img src={emailSvg} className="pt-1" alt=""/>
            <div className="flex flex-col">
                <span className="font-semibold">You've got mail</span>
                <span>From: <span className="text-primary_blue font-semibold">{data.from}</span></span>
                <span>Subject: <span className="text-primary_blue font-semibold">{data.subject.length > 30 ? `${data.subject.slice(0, 30)}...` : data.subject}</span></span>
            </div>
        </div>
    )
}