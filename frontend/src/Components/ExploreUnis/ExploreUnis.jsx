import "./ExploreUnis.css";
import { useContext } from "react";
import { AppContext } from "../../context/Context";

const ExploreUnis = () => {
    const { unis } = useContext(AppContext);
    const randomUnis = unis.sort(() => Math.random() - 0.5).slice(0, 4);
    return (
        <div className="explore-unis"> 
            <h1>Lo que encontraras</h1>
            <p className="explore-unis-text">
                Podras buscar y obtener información detallada de las universidades de Puebla Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab alias eligendi cupiditate saepe doloribus dolorum sit, itaque voluptatem iure modi iste culpa, deleniti quibusdam quasi minus enim temporibus expedita quod.
            </p>
            <div className="explore-unis-list">
                {randomUnis.length > 0 ? randomUnis.map(item => { // en el caso de que la variable no este vacia, etncones hacemos un map en la variable
                    return (
                        <div className="uni-item">
                            <img src={item.Logo} />
                            <div className="uni-item-content">
                                <h2>{item.Nombre}</h2>
                                <p>({item.Acronimo})</p>
                            </div>
                        </div>
                    )
                }) : null /*En el caso de que la variable este vacia*/} 
            </div>
            <div className="boton">
                <button className="btn">Explora más</button>
            </div>
        </div>
    )
}

export default ExploreUnis