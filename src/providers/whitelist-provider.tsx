import {createContext, type PropsWithChildren, useContext, useEffect, useState} from "react";
import type {NodeEntry} from "../types/NodeEntry.ts";
import {getWhitelist} from "../api/whitelist/getWhitelist.ts";
import {deleteGroup} from "../api/whitelist/deleteGroup.ts";
import {deleteItem} from "../api/whitelist/deleteItem.ts";
import {postKeyToNode} from "../api/whitelist/postKeyToNode.ts";
import {postNewGroupItem} from "../api/whitelist/postNewGroupItem.ts";

type Whitelist = {
    apps: Record<string, string[]>;
    links: Record<string, string[]>;
    node: Record<string, {
            directory: string;
            script: string;
            webpage: string;
        }
    >;
};

type WhitelistProviderType = {
    whitelist: Whitelist;
    removeGroup: (section: string, key: string) => Promise<void>;
    removeItem: (section: string, key: string, index: number) => Promise<void>;
    upsertNodeGroup: (name: string, entry: NodeEntry) => Promise<void>;
    addItem : (section: string, key: string, item: string) => Promise<void>;
}

const WhitelistContext = createContext<WhitelistProviderType | null>(null);

export function WhitelistProvider({ children }: PropsWithChildren){
    const [whitelist, setWhitelist] = useState({});

    useEffect(() => {
        const handleWhitelistLoading = async () =>{
            const response = await getWhitelist()
            setWhitelist(response)
        }
        handleWhitelistLoading()
    }, [])

    const removeGroup = async (section: string, key: string) => {
        await deleteGroup(section, key);
        setWhitelist(prev => {
            const { [key]: _, ...remaining } = prev[section];

            return {
                ...prev,
                [section]: remaining,
            };
        });
    };

    const removeItem = async (section: string, key: string, index: number) => {
        await deleteItem(section, key, index);
        setWhitelist(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: prev[section][key].filter((_, i) => i !== index),
            },
        }));
    };

    const upsertNodeGroup = async (name: string, entry: NodeEntry) => {
        await postKeyToNode(name, entry);
        setWhitelist((previous) => ({
            ...previous,
            node: {
                ...previous.node,
                [name]: entry,
            },
        }));
    };

    const addItem = async (section: string, key: string, item: string) => {
        await postNewGroupItem(section, key, item);
        setWhitelist((previous) => ({
            ...previous,
            [section]: {
                ...previous[section],
                [key]: [
                    ...(previous[section][key] ?? []),
                    item,
                ],
            },
        }));
    };

    return (
        <WhitelistContext.Provider value={{whitelist, removeGroup, removeItem, upsertNodeGroup, addItem}}>
            {children}
        </WhitelistContext.Provider>
    )

}

export const useWhitelist = () =>{
    const context = useContext(WhitelistContext);

    if (!context) {
        throw new Error("useWhitelist must be used within useWhitelistProvider");
    }

    return context;
}