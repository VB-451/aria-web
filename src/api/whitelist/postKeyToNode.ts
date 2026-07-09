import type {NodeEntryType} from "../../types/NodeEntryType.ts";

export const postKeyToNode = async (name: string, entry: NodeEntryType) =>{
    await fetch(`${import.meta.env.VITE_BACK_URL}/whitelist/node`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            entry
        })

    })
}