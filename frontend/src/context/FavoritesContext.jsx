import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const { data } = await axios.get('/api/favoritos');
                setFavorites(data);
            } catch (error) {
                console.error('Error al cargar favoritos:', error);
            }
        };

        fetchFavorites();
    }, []);

    const addFavorite = async (itemId) => {
        try {
            await axios.post('/api/favoritos', { itemId });
            setFavorites([...favorites, { itemId }]); // Ajusta según la respuesta de la API
        } catch (error) {
            console.error('Error al agregar favorito:', error);
        }
    };

    const removeFavorite = async (itemId) => {
        try {
            await axios.delete(`/api/favoritos/${itemId}`);
            setFavorites(favorites.filter(fav => fav.itemId !== itemId));
        } catch (error) {
            console.error('Error al eliminar favorito:', error);
        }
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
