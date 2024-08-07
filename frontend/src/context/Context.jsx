// context/Context.js
import React, { createContext, useState, useEffect } from 'react';
import axios from '../api/axios';

export const AppContext = createContext();

const FAVORITES_URL = '/favoritos';

const AppProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [unis, setUnis] = useState(JSON.parse(localStorage.getItem('universidades')) || []);
    const [loadingResults, setLoadingResults] = useState(false);
    const [favorites, setFavorites] = useState([]);

    const fetchFavorites = async () => {
        try {
            const response = await axios.get(FAVORITES_URL, {
                params: { q: auth.id },
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            setFavorites(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const eliminarFavorites = async (usuarioID, favoritoID) => {
        try {
            const response = await axios.delete(FAVORITES_URL, {
                data: { favoritoID, usuarioID }
            });
            if (response.status === 200) {
                const updatedFavoritos = favorites.filter(favorite => favorite._id !== favoritoID);
                setFavorites(updatedFavoritos);
            }
        } catch (error) {
            console.error('Error al eliminar favorito:', error);
        }
    };

    useEffect(() => {
        if (auth.username) {
            fetchFavorites();
        }
    }, [auth]);

    const contextValues = {
        unis,
        setUnis,
        loadingResults,
        setLoadingResults,
        favorites,
        setFavorites,
        auth,
        setAuth,
        eliminarFavorites
    };

    return (
        <AppContext.Provider value={contextValues}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
