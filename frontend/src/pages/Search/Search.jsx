import "./Search.css";
import SearchBar from "../../Components/SearchBar/SearchBar"
import SearchResults from "../../Components/SearchResults/SearchResults"

const Search = () => {
    return (
        <div className="search main-container">
            <SearchBar />
            <SearchResults />
        </div>
    )
}

export default Search