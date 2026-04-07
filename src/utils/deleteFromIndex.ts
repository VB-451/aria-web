export const deleteFromIndex = async (index: number) => {
    const response = await fetch(`${import.meta.env.VITE_BACK_URL}/chat/message`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            index,
        })
    })
    return response;
}