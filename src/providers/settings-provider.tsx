import {createContext, type PropsWithChildren, useContext, useEffect, useRef, useState} from "react";
import {getConfig} from "../api/configuration/getConfig.ts";
import {patchConfig} from "../api/configuration/patchConfig.ts";

export type Settings = {
    "memorySearchThreshold": number,
    "ttsTalkSpeed": number,
    "ttsVolume": number,
    "numberOfInteractionsContext": number,
    "gmailInterval": number,
    "todoInterval": number
}

type SettingsContextType = {
    settings: Settings;
    updateSettings: (patch: Partial<Settings>) => void
    resetSettings: () => void;
}

const defaultConfig = {
    "memorySearchThreshold": 0.67,
    "ttsTalkSpeed": 1.3,
    "ttsVolume": 0.37,
    "numberOfInteractionsContext": 2,
    "gmailInterval": 60,
    "todoInterval": 60,
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: PropsWithChildren){
    const [settings, setSettings] = useState<Settings>();
    const initialized = useRef(false);

    useEffect(() => {
        const getConfiguration = async () => {
            const configuration = await getConfig();
            setSettings(configuration);
            initialized.current = true;
        }
        getConfiguration();
    }, [])

    useEffect(() => {
        if (!initialized.current || !settings) {
            return;
        }
        patchConfig(settings);
    }, [settings]);

    const resetSettings = () => {
        setSettings(defaultConfig);
    }

    const updateSettings = (patch: Partial<Settings>) => {
        setSettings(prev => ({
            ...prev,
            ...patch
        }));
    };

    return (
        <SettingsContext.Provider value={{settings, resetSettings, updateSettings}}>
            {children}
        </SettingsContext.Provider>
    );
}

export const useSettings = () => {
    const context = useContext(SettingsContext);

    if (!context) {
        throw new Error("useSettings must be used within useSettingsProvider");
    }

    return context;
}