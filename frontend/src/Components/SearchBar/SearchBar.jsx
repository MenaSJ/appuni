import { useState, useContext, useEffect } from "react";
import { assets } from "../../assets/assets"
import axios from "axios";
import "./SearchBar.css";
import { AppContext } from "../../context/Context";

const SearchBar = () => {
    const { setSearchUnis, setLoadingResults } = useContext(AppContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [text, setText] = useState("");
    const fetchUnis = async (url) => {
        setLoadingResults(true);
        try {
            const { data } = await axios.get(url, {
                params: {
                    q: searchTerm
                }
            });
            if (data.length > 0) {
                setSearchUnis(data);
            } else {
                setSearchUnis([]);
            }
        } catch (error) {
            console.log(error);
        }
        setTimeout(() => { setLoadingResults(false); }, 1000)
    }
    //Llamaremos a la api de busqueda cada que la variable de estado 'searchTerm' cambie.
    useEffect(() => {
        if(!searchTerm) return //Si la variable 'searchTerm' es null, return.
        fetchUnis('http://localhost:4000/universidades/search');
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