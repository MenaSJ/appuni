import "./SearchResults.css";
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../context/Context"
import { useNavigate } from 'react-router-dom';

const SearchResults = () => {
    const { searchUnis, loadingResults } = useContext(AppContext);
    const [startUp, setStartUp] = useState(true);
    useEffect(() => {
        let load = loadingResults;
        if (searchUnis.length > 0 || load) {
            setStartUp(false);
        }
    },[searchUnis])
    if (startUp) {
        return (
            <div className="search-container">
                <div className="search-results">
                    <h2>Aqui podras buscar universidades</h2>
                </div>
            </div>
        )
    }
    if (loadingResults) {
        return (
            <div className="search-container">
                <div className="search-results">
                    <CardLoading /><CardLoading />
                </div>
            </div>
        )
    }
    if (searchUnis.length < 1) {
        return (
            <div className="search-container">
                <div className="search-results">
                    <h2>Lo sentimos, No se han encontrado resultados para tu búsqueda</h2>
                </div>
            </div>
        )
    }
    return (
        <div className="search-container">
            <div className="search-results">
                <Universidades searchUnis={searchUnis} />
            </div>
        </div>
    )
}
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
    )
}
const Universidades = ({ searchUnis }) => {
    const navigate = useNavigate();
    console.log(searchUnis);
    return (
        <>
            {searchUnis.map((item, index) => (
                <div className="uni-card" onClick={() => navigate(`/details/${item.id}`)} key={index}>
                    <img src={item.logo} alt={item.nombre} />
                    <div className="uni-card-body">
                        <h1>{item.nombre} <span>({item.siglas})</span></h1>
                        <div className="uni-carreras">
                            <b>Mision</b>
                            {item.mision}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}


export default SearchResults