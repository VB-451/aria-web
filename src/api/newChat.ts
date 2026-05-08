export const newChat = async () => {
    await fetch(`${import.meta.env.VITE_BACK_URL}/conversation/last-messages`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
    })
}