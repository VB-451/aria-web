export const getConfig = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACK_URL}/configuration`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return await response.json()
}