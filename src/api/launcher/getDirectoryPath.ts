export const getDirectoryPath = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACK_URL}/launcher/select-directory`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return await response.json()
}