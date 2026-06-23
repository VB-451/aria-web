export const deleteGroup = async (section: string, key: string) =>{
    await fetch(`${import.meta.env.VITE_BACK_URL}/whitelist/group`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            section,
            key
        })

    })
}