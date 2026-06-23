export const postNewGroupItem = async (section: string, key: string, item: string) =>{
    await fetch(`${import.meta.env.VITE_BACK_URL}/whitelist/new-group-item`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            section,
            key,
            item
        })

    })
}