
import React, { useContext, useState } from 'react'

const CensorContext = React.createContext();
const CensorUpdateContext = React.createContext();

export default function CensorProvider({ children }) {
    const [censor, setCensor] = useState(true);

    function toggleCensorship() {
        setCensor((prev) => !prev)
    }

    return (
        <CensorContext.Provider value={censor}>
            <CensorUpdateContext.Provider value={toggleCensorship}>
                {children}
            </CensorUpdateContext.Provider>
        </CensorContext.Provider>
    )
}

export function useCensorship() {
    return useContext(CensorContext);
}

export function useCensorshipUpdate() {
    return useContext(CensorUpdateContext);
}
