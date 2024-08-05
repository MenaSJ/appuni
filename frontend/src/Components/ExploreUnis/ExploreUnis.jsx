import "./ExploreUnis.css";
import { useContext, useState, useEffect  } from "react";
import { AppContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
const UNIVERSIDADES_URL = '/universidades'

const ExploreUnis = () => {
    const { setUnis } = useContext(AppContext);
    const [universidades, setUniversidades] = useState([]);
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const fetchUniversidades = async () => {
            try {
                const { data } = await axios.get(UNIVERSIDADES_URL,
                    {
                        signal: controller.signal,
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );
                isMounted && setUniversidades(data.length > 0 ? data : []);
                setUnis(data.length > 0 ? data.slice(0, 5) : []);
                localStorage.setItem('universidades', JSON.stringify(data.slice(0,5)))
            } catch (error) {
                console.log(error);
            }
        };
        fetchUniversidades();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);
    const randomUnis = universidades.sort(() => Math.random() - 0.5).slice(0, 4);
    const navigate = useNavigate()
    const handleUniversidadSelec = (item) => {
        localStorage.setItem('universidad', JSON.stringify(item))
        navigate(`/details/${item._id}`)
    }
    return (
        <div className="explore-unis"> 
            <h1>Lo que encontraras</h1>
            <p className="explore-unis-text">
                Podras buscar y obtener información detallada de las universidades de Puebla Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab alias eligendi cupiditate saepe doloribus dolorum sit, itaque voluptatem iure modi iste culpa, deleniti quibusdam quasi minus enim temporibus expedita quod.
            </p>
            <div className="explore-unis-list" >
                {randomUnis.length > 0 ? randomUnis.map(item => { //En el caso de que la variable no este vacia, entcones hacemos un map en la variable
                    return (
                        <div className="uni-item" onClick={() => handleUniversidadSelec(item)}>
                            <img src={item.Logo} />
                            <div className="uni-item-content">
                                <h2>{item.Nombre}</h2>
                                <p>({item.Siglas})</p>
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