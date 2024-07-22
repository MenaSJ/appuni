import "./ExploreUnis.css";
import { useContext } from "react";
import { AppContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";

const ExploreUnis = () => {
    const { unis } = useContext(AppContext);
    const randomUnis = unis.sort(() => Math.random() - 0.5).slice(0, 4);
    const navigate = useNavigate()
    return (
        <div className="explore-unis"> 
            <h1>Lo que encontraras</h1>
            <p className="explore-unis-text">
                Podras buscar y obtener información detallada de las universidades de Puebla Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab alias eligendi cupiditate saepe doloribus dolorum sit, itaque voluptatem iure modi iste culpa, deleniti quibusdam quasi minus enim temporibus expedita quod.
            </p>
            <div className="explore-unis-list" >
                {randomUnis.length > 0 ? randomUnis.map(item => { //En el caso de que la variable no este vacia, entcones hacemos un map en la variable
                    return (
                        <div className="uni-item" onClick={() => navigate(`/details/${item.id}`)}>
                            <img src={item.logo} />
                            <div className="uni-item-content">
                                <h2>{item.nombre}</h2>
                                <p>({item.siglas})</p>
                            </div>
                        </div>
                    )
                }) : null /*En el caso de que la variable este vacia*/} 
            </div>
            <div className="boton">
                <button className="btn" onClick={() => navigate('/search')}>Explora más</button>
            </div>
        </div>
    )
}

export default ExploreUnis