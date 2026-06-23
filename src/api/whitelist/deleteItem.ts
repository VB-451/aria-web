export const deleteItem = async (section: string, key: string, index: number) =>{
    await fetch(`${import.meta.env.VITE_BACK_URL}/whitelist/item`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            section,
            key,
            index
        })

    })
}