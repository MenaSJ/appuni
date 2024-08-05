import React, { useContext } from 'react';
import { AppContext } from '../../context/Context';
import { useNavigate } from 'react-router-dom';
import './Favorites.css';
import useAuth from '../../hooks/useAuth';

const Favorites = () => {
    const { favorites, eliminarFavorites } = useContext(AppContext); // Cambia removeFavorite por deleteFavorite
    const { auth } = useAuth();
    const navigate = useNavigate();
    console.log(favorites)
    return (
        <div className="favorites main-container">
            <h1>Mis Favoritos</h1>
            <div className="favorites-list">
                {favorites && favorites.length > 0 ? (
                    <table className="favorites-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Acrónimo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {favorites.map(favorite => (
                                <tr key={favorite._id}>
                                    <td style={{"cursor":"pointer"}} onClick={() => navigate(`/details/${favorite.universidadID._id}`)}>{favorite.universidadID.Nombre}</td> {/* Ajusta según la estructura de tus datos */}
                                    <td>{favorite.universidadID.Siglas}</td> {/* Puedes mostrar el acrónimo también */}
                                    <td>
                                        <button className="remove-button" onClick={() => eliminarFavorites(auth.id, favorite._id)} > {/* Cambia removeFavorite por deleteFavorite */}
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
