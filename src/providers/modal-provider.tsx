import { createContext, useContext, useState, type ReactNode, type PropsWithChildren } from "react";
import Modal from "../components/modal.tsx";

type ModalContextType = {
    showModal: (content: ReactNode) => void;
    closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: PropsWithChildren) {
    const [stack, setStack] = useState<ReactNode[]>([]);

    const showModal = (content: ReactNode) => {
        setStack(prev => [...prev, content]);
    };

    const closeModal = () => {
        setStack(prev => prev.slice(0, -1));
    };


    return (
        <ModalContext.Provider value={{ showModal, closeModal }}>
            {children}

            {
                stack.map((content, index) => (
                    <Modal
                        key={index}
                        onClose={closeModal}
                        hidden={index !== stack.length - 1}
                    >
                        {content}
                    </Modal>
                ))
            }
        </ModalContext.Provider>
    );
}

export const useModal = () => {
    const context = useContext(ModalContext);

    if (!context) {
        throw new Error("useModal must be used inside ModalProvider");
    }

    return context;
}