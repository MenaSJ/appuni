// Context.js
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AppContext = createContext();

const AppProvider = (props) => {
    const [unis, setUnis] = useState([]);
    const [searchUnis, setSearchUnis] = useState([]);
    const [loadingResults, setLoadingResults] = useState(false);
    const [user, setUser] = useState({ _id: '', nombre: '', estado: '', email: '' });
    const [favorites, setFavorites] = useState([]);
    const logout = () => {
        setUser({ _id: '', nombre: '', estado: '', email: '' }); // Limpia el estado del usuario
    };
    const fetchUnis = async (url) => {
        try {
            const { data } = await axios.get(url);
            setUnis(data.length > 0 ? data : []);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchFavorites = async () => {
        try {
            const { data } = await axios.get(`http://localhost:4000/favoritos/${user._id}`);
            setFavorites(data.length > 0 ? data : []);
        } catch (error) {
            console.log(error);
        }
    };
    const createFavorite = async (usuarioId, universidadId) => {
        try {
            const { data } = await axios.post('http://localhost:4000/favoritos', { UsuarioID: usuarioId, UniversidadID: universidadId });
            setFavorites([...favorites, data]);
        } catch (error) {
            console.log(error);
        }
    };
    const deleteFavorite = async (favoritoId) => {
        try {
            await axios.delete(`http://localhost:4000/favoritos/${favoritoId}`);
            setFavorites(favorites.filter(fav => fav.FavoritoID !== favoritoId));
        } catch (error) {
            console.log(error);
        }
    };
    const contextValues = {
        unis,
        loadingResults,
        searchUnis,
        setSearchUnis,
        setLoadingResults,
        user,
        setUser,
        logout,
        favorites,
        createFavorite,
        deleteFavorite
    };
    useEffect(() => {
        fetchUnis('http://localhost:4000/universidades');
    }, []);
    useEffect(() => {
        if (user._id) {
            fetchFavorites();
        }
    }, [user]);
    return (
        <AppContext.Provider value={contextValues}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppProvider;
