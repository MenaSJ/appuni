import React, { useContext } from 'react';
import { AppContext } from '../../context/Context';
import './Favorites.css';

const Favorites = () => {
    const { favorites, removeFavorite } = useContext(AppContext);

    return (
        <div className="favorites main-container">
            <h1>Mis Favoritos</h1>
            <div className="favorites-list">
                {favorites && favorites.length > 0 ? (
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

export default Favorites;
