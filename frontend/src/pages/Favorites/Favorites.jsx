import React, { useContext } from 'react';
import { AppContext } from '../../context/Context';
import { useNavigate } from 'react-router-dom';
import './Favorites.css';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate'; // Importa useAxiosPrivate

const FAVORITES_URL = '/favoritos';

const Favorites = () => {
    const { favorites, setFavorites } = useContext(AppContext); // Cambia removeFavorite por deleteFavorite
    const { auth } = useAuth();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate(); // Usa useAxiosPrivate para obtener la instancia de axios

    // Función para eliminar un favorito
    const eliminarFavorite = async (usuarioID, universidadID) => {
        try {
            const response = await axiosPrivate.delete(FAVORITES_URL, {
                data: { usuarioID, universidadID }
            });
            if (response.status === 200) {
                setFavorites(favorites.filter(fav => fav.universidadID !== universidadID));
            }
        } catch (error) {
            console.error("Error removing favorite:", error);
            // Opcionalmente muestra un mensaje amigable al usuario
        }
    };

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
                                    <td style={{ "cursor": "pointer" }} onClick={() => navigate(`/details/${favorite.universidadID._id}`)}>
                                        {favorite.universidadID.Nombre}
                                    </td>
                                    <td>{favorite.universidadID.Siglas}</td>
                                    <td>
                                        <button className="remove-button" onClick={() => eliminarFavorite(auth.id, favorite.universidadID)} >
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
