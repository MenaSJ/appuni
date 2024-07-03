import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import SearchResults from '../Components/SearchResults/SearchResults';

export const AppContext = createContext();

const AppProvider = (props) => {
    const [unis, setUnis] = useState([])
    const [searchUnis, setSearchUnis] = useState([]);
    const contextValues = {
        unis, searchUnis, setSearchUnis
    }
    const fetchUnis = async (url) => {
        try {
            const {data} = await axios.get(url);
            if (data.length > 0) {
                setUnis(data)
            } else {
                setUnis([])
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchUnis('http://localhost:4000/universidades');
    }, [])
    return <AppContext.Provider value={contextValues}>
        {props.children}
    </AppContext.Provider>
}

export default AppProvider