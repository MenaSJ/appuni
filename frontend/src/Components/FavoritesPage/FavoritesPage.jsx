import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext'; // Importa el contexto
import './favoritespage.css';

const FavoritesPage = () => {
    const { favorites, removeFavorite } = useContext(FavoritesContext);

    return (
        <div className="favorites-page">
            <h1>Mis Favoritos</h1>
            <div className="favorites-list">
                {favorites.length > 0 ? (
                    favorites.map(favorite => (
                        <div className="favorite-item" key={favorite.itemId}>
                            <span>{favorite.itemName}</span> {/* Ajusta según la estructura de tus datos */}
                            <button className="remove-button" onClick={() => removeFavorite(favorite.itemId)}>
                                Eliminar
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No tienes favoritos aún.</p>
                )}
            </div>
        </div>
    );
};

export default FavoritesPage;
