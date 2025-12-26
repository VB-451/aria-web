export const newChat = async () => {
    await fetch(`http://localhost:4000/chat`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
    })
}