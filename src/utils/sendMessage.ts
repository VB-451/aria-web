export const sendMessage = async (prompt: string) => {
    const response = await fetch(`${import.meta.env.VITE_BACK_URL}/chat/message`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt,
        })
    })
    return await response.json()
}