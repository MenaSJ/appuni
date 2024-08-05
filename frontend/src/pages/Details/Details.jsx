import "./Details.css";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import axios from "../../api/axios";
import Comentarios from "../../Components/Comentarios/Comentarios";
import { assets } from "../../assets/assets";
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

const UNIVERSIDADES_URL = '/universidades/';

const Details = () => {
    const { id } = useParams(); // Obtiene el ID de la URL
    const [uniDetalles, setUniDetalles] = useState({}); // Estado para la universidad
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: apiKey,
        libraries: ['places']
    });
    console.log(`${UNIVERSIDADES_URL}${id}`)
    useEffect(() => {
        let Loading = true;
        const fetchUniversidades = async () => {
            try {
                const { data } = await axios.get(`${UNIVERSIDADES_URL}${id}`, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
                setUniDetalles(data ? data : {}); // Suponiendo que el resultado es un solo objeto
            } catch (error) {
                console.log(error);
            }
        };
        fetchUniversidades();
        Loading = false;
    }, []);

    if (!uniDetalles) {
        return <div className="details main-container">Universidad no encontrada</div>;
    }
    if (loadError) {
        return <div className="details main-container">Error cargando mapa</div>;
    }
    console.log(uniDetalles)
    if (uniDetalles) return (
        <div className="details main-container">
            <div className="details-header">
                <div className="details-title">
                    <h1>{uniDetalles.Nombre}</h1>
                    <h4>({uniDetalles.Siglas})</h4>
                </div>
            </div>
            <div className="details-body">
                <div className="details-row row1">
                    <div className="details-box">
                        <a href={uniDetalles.Pagina_Web} target="_blank" rel="noopener noreferrer">
                            <img className="details-img" src={uniDetalles.Logo} alt={uniDetalles.Nombre} />
                        </a>
                    </div>
                    <div className="details-box">
                        <h2>Carreras</h2>
                        <ul>
                            {uniDetalles.Carreras ? uniDetalles.Carreras.map((carrera, index) => (
                                <li key={index}>{carrera.Carrera}</li>
                            )) : null}
                        </ul>
                    </div>
                </div>
                <div className="details-row row2">
                    <div className="details-box">
                        <h2>Misión</h2>
                        <p>{uniDetalles.Mision}</p>
                    </div>
                    <div className="details-box">
                        <img src={assets.mision} alt="Misión" />
                    </div>
                </div>
                <div className="details-row row1">
                    <div className="details-box">
                        <img src={assets.vision} alt="Visión" />
                    </div>
                    <div className="details-box">
                        <h2>Visión</h2>
                        <p>{uniDetalles.Vision}</p>
                    </div>
                </div>
                <div className="details-map row2">
                    <div className="details-box-map">
                        <h2>Ubicación</h2>
                        {isLoaded ? (
                            <div style={{ height: '600px', width: '100%' }}>
                                <GoogleMap
                                    center={{ lat: uniDetalles.Latitud, lng: uniDetalles.Longitud }}
                                    zoom={15}
                                    mapContainerStyle={{ width: "100%", height: "100%" }}
                                >
                                    <Marker position={{ lat: uniDetalles.Latitud, lng: uniDetalles.Longitud }} />
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
