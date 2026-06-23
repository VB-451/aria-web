export const getExecutablePath = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACK_URL}/launcher/select-executable`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return await response.json()
}