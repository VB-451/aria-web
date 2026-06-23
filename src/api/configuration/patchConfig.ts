import type {Settings} from "../../providers/settings-provider.tsx";

export const patchConfig = async (config: Settings | null) => {
    const response = await fetch(`${import.meta.env.VITE_BACK_URL}/configuration`, {
        method: 'PATCH',
        body: JSON.stringify(config),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return await response.json()
}