import type {SettingsType} from "../../types/SettingsType.ts";

export const patchConfig = async (config: SettingsType | null) => {
    const response = await fetch(`${import.meta.env.VITE_BACK_URL}/configuration`, {
        method: 'PATCH',
        body: JSON.stringify(config),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return await response.json()
}