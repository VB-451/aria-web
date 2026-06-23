export const getMessages = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACK_URL}/conversation/last-messages`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return await response.json();

}