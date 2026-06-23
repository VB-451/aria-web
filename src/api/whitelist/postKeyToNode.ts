import type {NodeEntry} from "../../types/NodeEntry.ts";

export const postKeyToNode = async (name: string, entry: NodeEntry) =>{
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