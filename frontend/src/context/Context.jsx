import { createContext, useDebugValue, useState } from 'react';

export const AppContext = createContext();

const AppProvider = (props) => {
    const contextValues = {

    }
    return <AppContext.Provider value={contextValues}>
        {props.children}
    </AppContext.Provider>
}

export default AppProvider