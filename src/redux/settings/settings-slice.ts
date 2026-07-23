import { createSlice } from "@reduxjs/toolkit";
import type {SettingsType} from "../../types/SettingsType.ts";
import {loadSettings} from "./settings-thunks.ts";

const defaultConfig: SettingsType = {
    "memorySearchThreshold": 0.67,
    "ttsTalkSpeed": 1.3,
    "ttsVolume": 0.37,
    "numberOfInteractionsContext": 2,
    "gmailInterval": 60,
    "todoInterval": 60,
}

const settingSlice = createSlice({
    name: "settings",
    initialState: defaultConfig,
    reducers: {
        resetSettings: () => defaultConfig,
        updateSettings: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadSettings.fulfilled, (state, action) => {
            return action.payload
        })
    }
})

export const { resetSettings, updateSettings } = settingSlice.actions;
export default settingSlice.reducer;