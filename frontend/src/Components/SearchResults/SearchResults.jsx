import { useContext } from "react"
import { AppContext } from "../../context/Context"

const SearchResults = () => {
    const { searchUnis } = useContext(AppContext);
    return (
        <div className="search-container">
            <div className="search-results">
                {searchUnis.map(item => {
                    return (
                        <div className="uni-card">
                            <img src={item.Logo} alt="" />
                            <div className="uni-card-body">
                                <h1>{item.Nombre}</h1>
                                <p>{item.Acronimo}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SearchResults