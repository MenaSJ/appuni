import { useContext } from "react"
import { AppContext } from "../../context/Context"

const SearchResults = () => {
    const { searchUnis } = useContext(AppContext);
    console.log(searchUnis)
    return (
        <div className="search-container">
            <div className="search-results">
                {searchUnis.map((item) => {
                    return (
                        <div className="uni-card">
                            <img src={item.logo} alt="" />
                            <div className="uni-card-body">
                                <h1>{item.nombre}</h1>
                                <p>{item.siglas}</p>
                            </div>
                            <div className="uni-carreras">
                                {
                                    item.carreras.map(carrera => {
                                        return (
                                            <p>{carrera.nombre}</p>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SearchResults