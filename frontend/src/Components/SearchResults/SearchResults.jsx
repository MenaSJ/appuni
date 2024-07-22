import "./SearchResults.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/Context";
import { useNavigate } from 'react-router-dom';
import { assets } from "../../assets/assets";
import axios from "axios";

const SearchResults = () => {
    const { searchUnis, loadingResults, user, createFavorite, deleteFavorite, favorites, setFavorites } = useContext(AppContext);
    const [startUp, setStartUp] = useState(true);
    useEffect(() => {
        if (searchUnis.length > 0 || loadingResults) {
            setStartUp(false);
        }
    }, [searchUnis, loadingResults]);

    const handleAddFavorite = (universidadId, nombre, siglas) => {
        createFavorite(user._id, universidadId)
            .then(() => {
                // Actualizar el estado local de favoritos después de agregar
                setFavorites([...favorites, { UniversidadID: universidadId, Nombre: nombre, Acronimo: siglas }]);
            })
            .catch((error) => {
                console.error("Error adding favorite:", error);
            });
    };

    const handleDeleteFavorite = (universidadId) => {
        // Encontrar el favorito en la lista de favoritos
        const favorite = favorites.find(fav => fav.UniversidadID === universidadId);
        if (!favorite) return;

        deleteFavorite(user._id, favorite._id)
            .then(() => {
                // Actualizar el estado local de favoritos después de eliminar
                setFavorites(favorites.filter(fav => fav.UniversidadID !== universidadId));
            })
            .catch((error) => {
                console.error("Error deleting favorite:", error);
            });
    };

    if (startUp) {
        return (
            <div className="search-container">
                <div className="search-results">
                    <h2>Aquí podrás buscar universidades</h2>
                </div>
            </div>
        );
    }

    if (loadingResults) {
        return (
            <div className="search-container">
                <div className="search-results">
                    <CardLoading /><CardLoading />
                </div>
            </div>
        );
    }

    if (searchUnis.length < 1) {
        return (
            <div className="search-container">
                <div className="search-results">
                    <h2>Lo sentimos, no se han encontrado resultados para tu búsqueda</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="search-container">
            <div className="search-results">
                <Universidades searchUnis={searchUnis} handleAddFavorite={handleAddFavorite} handleDeleteFavorite={handleDeleteFavorite} favorites={favorites} />
            </div>
        </div>
    );
};

function CardLoading() {
    return (
        <div className="card-container-load">
            <div className="img-load"></div>
            <div className="uni-card-body-load">
                <h2 className="card-title-load"></h2>
                <h2 className="card-title-load"></h2>
                <h2 className="card-title-load"></h2>
            </div>
        </div>
    );
}

const Universidades = ({ searchUnis, handleAddFavorite, handleDeleteFavorite, favorites }) => {
    const navigate = useNavigate();

    const isFavorite = (universidadId) => {
        console.log(favorites.find(fav => fav.UniversidadID === universidadId))
        return favorites.find(fav => fav.UniversidadID === universidadId);
    };

    return (
        <>
            {searchUnis.map((item, index) => (
                <div className="uni-card" key={index}>
                    <img src={item.logo} alt={item.nombre} onClick={() => navigate(`/details/${item.id}`)} />
                    <div className="uni-card-body">
                        <div className="uni-title">
                            <h1>{item.nombre} <span>({item.siglas})</span></h1>
                            {isFavorite(item.id) ? (
                                <img
                                    src={assets.heart_full}
                                    onClick={() => handleDeleteFavorite(item.id)}
                                    className="btn-not-liked"
                                    alt="Remove from Favorites"
                                />
                            ) : (
                                <img
                                    src={assets.heart}
                                    onClick={() => handleAddFavorite(item.id, item.nombre, item.siglas)}
                                    className="btn-liked"
                                    alt="Add to Favorites"
                                />
                            )}
                        </div>
                        <div className="uni-carreras">
                            <b>Misión:</b> {item.mision}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default SearchResults;
