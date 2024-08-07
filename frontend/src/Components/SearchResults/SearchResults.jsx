import "./SearchResults.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/Context";
import { useNavigate } from 'react-router-dom';
import { assets } from "../../assets/assets";
import useAxiosPrivate from "../../hooks/useAxiosPrivate"; // Importa useAxiosPrivate
import useAuth from "../../hooks/useAuth";

const FAVORITES_URL = '/favoritos';

const SearchResults = () => {
    const { unis, favorites, LoadingResults, setFavorites } = useContext(AppContext);
    const { auth } = useAuth();
    const [searchUnis, setSearchUnis] = useState([]);
    const [startUp, setStartUp] = useState(true);
    const axiosPrivate = useAxiosPrivate(); // Usa useAxiosPrivate para obtener la instancia de axios

    useEffect(() => {
        if (searchUnis.length > 0 || LoadingResults) {
            setStartUp(false);
        }
    }, [searchUnis, LoadingResults]);

    if (unis.length < 1) {
        return (
            <div className="search-container">
                <div className="search-results">
                    <h2>Lo sentimos, no se han encontrado resultados para tu búsqueda</h2>
                </div>
            </div>
        );
    }

    if (LoadingResults) {
        return (
            <div className="search-container">
                <div className="search-results">
                    <CardLoading /><CardLoading />
                </div>
            </div>
        );
    }

    if (startUp) {
        return (
            <div className="search-container">
                <div className="search-results">
                    <Universidades unis={unis} favorites={favorites} auth={auth} />
                </div>
            </div>
        );
    }

    return (
        <div className="search-container">
            <div className="search-results">
                {/* <Universidades searchUnis={searchUnis} favorites={favorites} /> */}
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

const Universidades = ({ unis, favorites, auth }) => {
    const { setFavorites } = useContext(AppContext);
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate(); // Usa useAxiosPrivate para obtener la instancia de axios

    // Check if a university is in the user's favorites
    const isFavorite = (universidadId) => {
        if (favorites.find(fav => fav.universidadID._id === universidadId)) return true;
        else return false;
    };

    // Add a university to favorites
    const crearFavorite = async (usuarioID, universidadID) => {
        try {
            const response = await axiosPrivate.post(FAVORITES_URL, {
                usuarioID,
                universidadID
            });
            if (response.status === 201) {
                setFavorites([...favorites, response.data]);
            }
        } catch (error) {
            console.error("Error adding favorite:", error);
            // Optionally show a user-friendly message
        }
    };

    // Remove a university from favorites
    const eliminarFavorite = async (usuarioID, universidadID) => {
        try {
            const response = await axiosPrivate.delete(FAVORITES_URL, {
                data: { usuarioID, universidadID }
            });
            if (response.status === 200) {
                setFavorites(favorites.filter(fav => fav.universidadID._id !== universidadID));
            }
        } catch (error) {
            console.error("Error removing favorite:", error);
            // Optionally show a user-friendly message
        }
    };

    return (
        <>
            {unis.map((item, index) => (
                <div className="uni-card" key={index}>
                    <img
                        src={item.Logo}
                        alt={item.Nombre}
                        onClick={() => navigate(`/details/${item._id}`)}
                    />
                    <div className="uni-card-body">
                        <div className="uni-title">
                            <h1>{item.Nombre} <span>({item.Siglas})</span></h1>
                            {auth.username && isFavorite(item._id) ? (
                                <img
                                    src={assets.heart_full}
                                    onClick={() => eliminarFavorite(auth.id, item._id)}
                                    className="btn-not-liked"
                                    alt="Remove from Favorites"
                                />
                            ) : (
                                <img
                                    src={assets.heart}
                                    onClick={() => crearFavorite(auth.id, item._id)}
                                    className="btn-liked"
                                    alt="Add to Favorites"
                                />
                            )}
                        </div>
                        <div className="uni-carreras">
                            <b>Misión:</b> {item.Mision}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default SearchResults;
