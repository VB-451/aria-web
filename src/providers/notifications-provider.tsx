import type {GmailNotificationType} from "../types/GmailNotificationType.ts";
import type {TodoNotificationType} from "../types/TodoNotificationType.ts";
import {createContext, type PropsWithChildren, useContext, useEffect, useState} from "react";
import {createPortal} from "react-dom";
import GmailNotification from "../components/notifications/gmail-notification.tsx";
import TodoNotification from "../components/notifications/todo-notification.tsx";


type Notification = {
    id: string;
    source: string;
    type: string;
    timestamp: number;
    data: GmailNotificationType | TodoNotificationType;

    read: boolean;

    toastVisible: boolean;
    leaving: boolean;
}

type NotificationsProviderType = {
    notifications: Notification[];
    markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationsProviderType | null>(null)

export function NotificationProvider({children}: PropsWithChildren){
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        const source = new EventSource(`${import.meta.env.VITE_BACK_URL}/notifications`);

        source.onmessage = (event: MessageEvent) => {
            const id = crypto.randomUUID();

            const notification = JSON.parse(event.data);
            notification.id = id;

            console.log(notification);

            setNotifications(prev => [
                ...prev,
                {
                    ...notification,
                    id,
                    read: false,
                    toastVisible: true,
                    leaving: false,
                }
            ]);

            setTimeout(() => {
                setNotifications((prev) =>
                    prev.map((n) =>
                        n.id === id ? { ...n, leaving: true } : n
                    )
                );

                setTimeout(() => {
                    setNotifications(prev =>
                        prev.map(n =>
                            n.id === id
                                ? {
                                    ...n,
                                    leaving: false,
                                    toastVisible: false,
                                }
                                : n
                        )
                    );
                }, 300);

            }, 3000);

        }

        return () => source.close();
    }, [])

    const markAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notification => ({
                ...notification,
                read: true,
            }))
        );
    };

    return (
        <NotificationContext.Provider value={{notifications, markAllAsRead}}>
            {children}
            {mounted &&
                createPortal(
                    <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2 pointer-events-auto">
                        {notifications.filter(n => n.toastVisible).map((n) => {
                            switch (n.source) {
                                case "gmail": return <GmailNotification data={n.data} leaving={n.leaving} />
                                case "todo": return <TodoNotification data={n.data} leaving={n.leaving} />
                            }
                        })}
                    </div>,
                    document.getElementById("toast-root")!
                )}
        </NotificationContext.Provider>
    )
}

export const useNotifications = () => {
    const context = useContext(NotificationContext);

    if (!context) {
        throw new Error("useNotifications must be used inside NotificationsProvider");
    }

    return context;
}