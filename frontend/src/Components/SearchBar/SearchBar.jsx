import { useState, useContext, useEffect } from "react";
import { assets } from "../../assets/assets"
import axios from "../../api/axios";
import "./SearchBar.css";
import { AppContext } from "../../context/Context";
const UNIVERSIDADES_URL= '/universidades/search'

const SearchBar = () => {
    const { setLoadingResults, setUnis } = useContext(AppContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [text, setText] = useState("");

    const fetchUniversidades = async () => {
        try {
            const { data } = await axios.get(UNIVERSIDADES_URL,
                {
                    params: {
                        q: searchTerm
                    },
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setUnis(data.length > 0 ? data : []);
        } catch (error) {
            setUnis([]);
            console.log(error);
        }
        setTimeout(() => { setLoadingResults(false); }, 100)
    };
    //Llamaremos a la api de busqueda cada que la variable de estado 'searchTerm' cambie.
    useEffect(() => {
        if(!searchTerm) return //Si la variable 'searchTerm' es null, return.
        fetchUniversidades();
    }, [searchTerm])
    const onSubmit = (e) => {
        e.preventDefault();
        if (text) {
            setSearchTerm(text);
            setText("");
        }
    }
    return (
        <div className="search-form">
            <form onSubmit={onSubmit} action="">
                <input
                    onChange={(e) => setText(e.target.value)}
                    type="search" value={text} name="search" id="search" placeholder="Universidad Tecno..." />
                <button
                    type="submit"><img src={assets.search_icon} alt="" /></button>
            </form>
        </div>
    )
} 

export default SearchBar 