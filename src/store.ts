import {configureStore} from "@reduxjs/toolkit";
import settingsReducer from "./redux/settings/settings-slice.ts";

export const store = configureStore({
    reducer: {
        settings: settingsReducer
    }
});