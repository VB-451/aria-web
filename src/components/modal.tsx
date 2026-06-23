import { useEffect, type PropsWithChildren } from "react";

type ModalProps = PropsWithChildren<{onClose: () => void; hidden: boolean}>;

export default function Modal({ children, onClose, hidden }: ModalProps) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    useEffect(() => {
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, []);

    return (
        <div className={`${hidden ? "hidden" : ""} fixed top-0 left-0 w-full h-full bg-black/60 flex justify-center items-center z-10`} onMouseDown={onClose}>
            <div onMouseDown={(event) => event.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}