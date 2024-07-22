import "./Details.css";
import { useContext } from "react";
import { AppContext } from "../../context/Context";
import { useParams, useNavigate } from "react-router-dom";
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import Comentarios from "../../Components/Comentarios/Comentarios";
import { assets } from "../../assets/assets";

const Details = () => {
    const { searchUnis, unis } = useContext(AppContext);
    const { id } = useParams();
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDU21-y6wfNlFNnZWca7dlBFBu-O6sBlgU",
        libraries: ['places']
    });
    console.log(searchUnis)
    const findUni = searchUnis.find(uni => uni.id === parseInt(id));
    let university;
    if (!findUni) {
        university = unis.find(uni => uni.id === parseInt(id));
    } else {
        university = searchUnis.find(uni => uni.id === parseInt(id));
    }
    const coordinates = { lat: 19.332183, lng: -99.186000 }; // Random coordinates for UNAM
    if (!university) {
        return <div className="details main-container">Universidad no encontrada</div>;
    }
    if (loadError) {
        return <div className="details main-container">Error loading map</div>;
    }
    return (
        <div className="details main-container">
            <div className="details-header">
                <div className="details-title">
                    <h1>{university.nombre}</h1>
                    <h4>({university.siglas})</h4>
                </div>
            </div>
            <div className="details-body">
                <div className="details-row row1">
                    <div className="details-box">
                        <h2>Carreras</h2>
                        <ul>
                            {
                                university.carreras.map(carrera => {
                                    return (
                                        <li>{carrera.nombre}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="details-box">
                        <a href={university.pagina_web} target="_blank" rel="noopener noreferrer">
                            <img className="details-img" src={university.logo} alt={university.nombre} />
                        </a>
                    </div>
                </div>
                <div className="details-row row2">
                    <div className="details-box">
                        <h2>Misión</h2>
                        <p>{university.mision}</p>
                    </div>  
                    <div className="details-box">
                        <img src={assets.mision} alt="" />
                    </div>
                </div>
                <div className="details-row row1">
                    <div className="details-box">
                        <img src={assets.vision} alt="" />
                    </div>
                    <div className="details-box">
                        <h2>Visión</h2>
                        <p>{university.vision}</p>
                    </div>
                </div>
                <div className="details-map row2">
                    <div className="details-box-map">
                        <h2>Ubicación</h2>
                        {isLoaded ? (
                            <div style={{ height: '400px', width: '100%' }}>
                                <GoogleMap
                                    center={coordinates}
                                    zoom={15}
                                    mapContainerStyle={{ width: "100%", height: "100%" }}
                                >
                                    <Marker position={coordinates} />
                                </GoogleMap> 
                            </div>
                        ) : (
                            <div>Loading map...</div>
                        )}
                    </div>
                </div>
                <Comentarios universidadID={id} />
            </div>
        </div>
    );
}

export default Details;
