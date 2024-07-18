import "./Details.css";
import { useContext } from "react";
import { AppContext } from "../../context/Context";
import { useParams, useNavigate } from "react-router-dom";
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';

const Details = () => {
    const { searchUnis } = useContext(AppContext);
    const { id } = useParams();
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDU21-y6wfNlFNnZWca7dlBFBu-O6sBlgU",
        libraries: ['places']
    });
    const navigate = useNavigate();
    const university = searchUnis.find(uni => uni.id === parseInt(id));

    const coordinates = { lat: 19.332183, lng: -99.186000 }; // Random coordinates for UNAM

    if (!university) {
        return <div className="details">Universidad no encontrada</div>;
    }

    if (loadError) {
        return <div className="details">Error loading map</div>;
    }

    return (
        <div className="details">
            <div className="details-header">
                <h1>{university.nombre} <span>({university.siglas})</span></h1>
                <img src={university.logo} alt={university.nombre} />
            </div>
            <div className="details-body">
                <h2>Misión</h2>
                <p>{university.mision}</p>
                <h2>Visión</h2>
                <p>{university.vision}</p>
                <h2>Ir a la página oficial:</h2>
                <p>
                    <a href={university.pagina_web} target="_blank" rel="noopener noreferrer">
                        {university.pagina_web}
                    </a>
                </p>
                
                <h2>Carreras</h2>
                {/* <ul>
                    {university.carreras.map((carrera, index) => (
                        <li key={index}>{carrera}</li>
                    ))}
                </ul> */}

                <h2>Ubicación</h2>
                <p>{university.detalles}</p>
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
    );
}

export default Details;
