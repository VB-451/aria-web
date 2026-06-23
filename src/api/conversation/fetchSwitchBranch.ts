export const fetchSwitchBranch = async (id: string) => {
    const response = await fetch(`${import.meta.env.VITE_BACK_URL}/conversation/branch-switch`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nodeID: id
        })
    })
    return await response;
}