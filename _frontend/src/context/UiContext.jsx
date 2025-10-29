import { createContext, useContext, useState } from "react";

const UiContext = createContext();

export const UiProvider = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <UiContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
            {children}
        </UiContext.Provider>
    );
};

export const useUi = () => useContext(UiContext);

export default UiContext;
