export const sendMessage = async (prompt: string, endpoint: string) => {
    const response = await fetch(`http://localhost:4000/${endpoint}`, {
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