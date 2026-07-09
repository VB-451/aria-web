import {useNotifications} from "../../providers/notifications-provider.tsx";
import GmailNotification from "./gmail-notification.tsx";
import TodoNotification from "./todo-notification.tsx";

export default function NotificationList() {
    const { notifications } = useNotifications();

    return (
        <div className="h-96 overflow-y-auto w-fit min-w-68 p-3 bg-background absolute top-27 left-15 rounded-lg flex flex-col gap-2">
            {notifications.length === 0 && (
                <span className="font-semibold">No notifications.</span>
            )}
            {notifications.map((n) => {
                switch (n.source) {
                    case "gmail": return <GmailNotification data={n.data} />
                    case "todo": return <TodoNotification data={n.data} />
                }
            })}
        </div>
    )
}