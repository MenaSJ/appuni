import React, { useContext } from 'react';
import { AppContext } from '../../context/Context';
import './Favorites.css';

const Favorites = () => {
    const { favorites, deleteFavorite } = useContext(AppContext); // Cambia removeFavorite por deleteFavorite
    console.log(favorites);

    return (
        <div className="favorites main-container">
            <h1>Mis Favoritos</h1>
            <div className="favorites-list">
                {favorites && favorites.length > 0 ? (
                    <table className="favorites-table">
                        <thead>
                            <tr>
                                <th>Nombre del ítem</th>
                                <th>Nombre</th>
                                <th>Acrónimo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {favorites.map(favorite => (
                                <tr key={favorite._id}>
                                    <td>{favorite.itemName}</td> {/* Ajusta según la estructura de tus datos */}
                                    <td>{favorite.Nombre}</td> {/* Ajusta según la estructura de tus datos */}
                                    <td>{favorite.Acronimo}</td> {/* Puedes mostrar el acrónimo también */}
                                    <td>
                                        <button className="remove-button" onClick={() => deleteFavorite(favorite.UsuarioID, favorite._id)}> {/* Cambia removeFavorite por deleteFavorite */}
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No tienes favoritos aún.</p>
                )}
            </div>
        </div>
    );
};

export default Favorites;
