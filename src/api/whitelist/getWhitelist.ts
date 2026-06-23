export const getWhitelist = async () =>{
    const response = await fetch(`${import.meta.env.VITE_BACK_URL}/whitelist`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return await response.json();
}