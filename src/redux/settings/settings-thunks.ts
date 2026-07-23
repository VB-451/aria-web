import {createAsyncThunk} from "@reduxjs/toolkit";
import {getConfig} from "../../api/configuration/getConfig.ts";
import type {RootState} from "@reduxjs/toolkit/query";
import {patchConfig} from "../../api/configuration/patchConfig.ts";

export const loadSettings = createAsyncThunk("settings/load", async () => {
    return await getConfig()
});

export const saveSettings = createAsyncThunk("settings/save", async (_, {getState})=>{
    const settings = (getState() as RootState).settings;
    await patchConfig(settings)
})