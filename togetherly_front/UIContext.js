import React, { createContext, useReducer } from "react";
import { light, dark } from "./globals";
const UIContext = createContext();
const UIReducer = (state, action) => {
    switch (action.type) {
        case "SET_HEADER_SHADOW": {
            return {
                ...state,
                headerShadow: action.payload,
            };
        }
        case "SET_THEME": {
            return {
                ...state,
                theme: action.payload == "light" ? light : dark,
            };
        }
        case "SET_DARK_MODE": {
            return {
                ...state,
                darkMode: action.payload,
            };
        }
    }
};
const UIProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UIReducer, {
        headerShadow: true,
        theme: dark,
        darkMode: false,
    });
    const value = { state, dispatch };
    return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};
export { UIContext, UIProvider };
