/* eslint-disable react/prop-types */
import { createContext } from "react";
import { doctors } from "../assets/assets";

// Create the AppContext using createContext
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const value = {
        doctors,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
