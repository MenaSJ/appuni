import "./SearchResults.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/Context";
import { useNavigate } from 'react-router-dom';
import { assets } from "../../assets/assets";

const SearchResults = () => {
    const { searchUnis, loadingResults, user, createFavorite, deleteFavorite, favorites } = useContext(AppContext);
    const [startUp, setStartUp] = useState(true);

    useEffect(() => {
        let load = loadingResults;
        if (searchUnis.length > 0 || load) {
            setStartUp(false);
        }
    }, [searchUnis, loadingResults]);

    const handleAddFavorite = (universidadId) => {
        createFavorite(user._id, universidadId);
    };

    const handleDeleteFavorite = (favoritoId) => {
        deleteFavorite(favoritoId);
    };

    if (startUp) {
        return (
            <div className="search-container">
                <div className="search-results">
                    <h2>Aqui podras buscar universidades</h2>
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
                    <h2>Lo sentimos, No se han encontrado resultados para tu búsqueda</h2>
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
        return favorites.some(fav => fav.UniversidadID === universidadId);
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
                                <img src={assets.heart_full} onClick={() => handleDeleteFavorite(item.id)} className="btn-not-liked"/>
                            ) : (
                                <img src={assets.heart} onClick={() => handleAddFavorite(item.id)} className="btn-liked"/>
                            )}
                        </div>
                        <div className="uni-carreras">
                            <b>Mision</b>
                            {item.mision}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default SearchResults;
