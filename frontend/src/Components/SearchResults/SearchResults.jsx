import "./SearchResults.css";
import { useContext } from "react"
import { AppContext } from "../../context/Context"
import { useNavigate } from 'react-router-dom';

const SearchResults = () => {
    const { searchUnis, loadingResults } = useContext(AppContext);
    return (
        <div className="search-container">
            <div className="search-results">
                {loadingResults
                    ? <><CardLoading /><CardLoading /><CardLoading /></>
                    : <Universidades searchUnis={searchUnis} />
                }
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

// {
//     searchUnis.map((item) => {
//         return (
//             <div className="uni-card">
//                 <img src={item.logo} alt="" />
//                 <div className="uni-card-body">
//                     <h1>{item.nombre}</h1>
//                     <h3>({item.siglas})</h3>
//                     <div className="uni-carreras">
//                         {
//                             item.carreras.map(carrera => {
//                                 return (
//                                     <p>{carrera.nombre}</p>
//                                 )
//                             })
//                         }
//                     </div>
//                 </div>
//             </div>
//         )
//     })
// }