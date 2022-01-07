import React, { createContext, useReducer } from "react";
const UIContext = createContext();
const UIReducer = (state, action) => {
    switch (action.type) {
        case "SET_HEADER_SHADOW": {
            return {
                ...state,
                headerShadow: action.payload,
            };
        }
    }
};
const UIProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UIReducer, {
        headerShadow: true,
    });
    const value = { state, dispatch };
    return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};
export { UIContext, UIProvider };
