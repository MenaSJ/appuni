import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AppContext = createContext();

const getItem = () => {
    let elRol
    if (localStorage.getItem('rol')) {
        elRol = JSON.parse(localStorage.getItem('rol')).rol
        
    } else {
        elRol = '';
    }
    return elRol;
}
const AppProvider = (props) => {
    const [unis, setUnis] = useState([]);
    const [searchUnis, setSearchUnis] = useState([]);
    const [loadingResults, setLoadingResults] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || { _id: '', nombre: '', apellido: '', estado: '', email: '', rol: '' });
    const [rol, setRol] = useState( getItem());
    const [favorites, setFavorites] = useState([]);
    const logout = () => {
        setUser({ _id: '', nombre: '', apellido: '', estado: '', email: '', rol: '' }); // Limpia el estado del usuario
        setRol('');
        localStorage.removeItem('user');
        localStorage.removeItem('rol');
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
            console.log(data)
            setFavorites(data.length > 0 ? data : []);
        } catch (error) {
            console.log(error);
        }
    };

    const createFavorite = async (UsuarioID, UniversidadID) => {
        try {
            const { data } = await axios.post('http://localhost:4000/favoritos', { UsuarioID: UsuarioID, UniversidadID: UniversidadID });
            setFavorites([...favorites, data]);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteFavorite = async (userId, favoritoId) => {
        try {
            await axios.delete(`http://localhost:4000/favoritos/${userId}/${favoritoId}`);
            // Optionally update the favorites state here if not done in the component
            setFavorites(favorites.filter(fav => fav._id !== favoritoId));
        } catch (error) {
            console.error("Error al eliminar el favorito: ", error);
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
        deleteFavorite,
        rol,
        setRol,
        setFavorites
    };

    useEffect(() => {
        fetchUnis('http://localhost:4000/universidades');
    }, []);

    useEffect(() => {
        if (user._id) {
            fetchFavorites();
        } else if (favorites) {
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
