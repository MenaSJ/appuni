// Context.js
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AppContext = createContext();

const AppProvider = (props) => {
    const [unis, setUnis] = useState([]);
    const [searchUnis, setSearchUnis] = useState([]);
    const [loadingResults, setLoadingResults] = useState(false);
    const [user, setUser] = useState({ email: '' });

    const logout = () => {
        setUser({ email: null }); // Limpia el estado del usuario
        console.log("Sesión cerrada");
    };

    const contextValues = {
        unis,
        loadingResults,
        searchUnis,
        setSearchUnis,
        setLoadingResults,
        user,
        setUser,
        logout
    };

    const fetchUnis = async (url) => {
        try {
            const { data } = await axios.get(url);
            setUnis(data.length > 0 ? data : []);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUnis('http://localhost:4000/universidades');
    }, []);

    return (
        <AppContext.Provider value={contextValues}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppProvider;
