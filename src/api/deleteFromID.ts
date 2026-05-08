export const deleteFromID = async (userNodeID: string) => {
    const response = await fetch(`${import.meta.env.VITE_BACK_URL}/conversation/message`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userNodeID,
        })
    })
    return response;
}