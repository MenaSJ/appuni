import "./Details.css";
import { useContext } from "react";
import { AppContext } from "../../context/Context";
import { useParams, useNavigate } from "react-router-dom";

const Details = () => {
    const { searchUnis } = useContext(AppContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const university = searchUnis.find(uni => uni.id === parseInt(id));
    console.log(searchUnis);
    if (!university) {
        return <div className="details">Universidad no encontrada</div>;
    }

    return (
        <div className="details">
            <div className="details-header">
                <img src={university.logo} alt={university.nombre} />
                <h1>{university.nombre} <span>({university.siglas})</span></h1>
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
                <h2>Ubicación</h2>
                <p>{university.detalles}</p>


            </div>
        </div>
    );
}

export default Details;
