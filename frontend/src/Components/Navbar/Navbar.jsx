import { useState } from "react";
import { assets } from "../../assets/assets"
import "./Navbar.css";
import { useNavigate } from 'react-router-dom';

const Navbar = ({setShowLogin}) => {
    const [menu, setMenu] = useState("home")
    const navigate = useNavigate();
    return (
        <div className="navbar"> 
            <img src={assets.logoG} onClick={() => navigate('/')} className="logo" />
            <ul className="navbar-menu">
                <li onClick={() => setMenu("home")} className={(menu ==="home"?"active":"")}>Home</li>
                <li onClick={() => setMenu("acerca")} className={(menu==="acerca"?"active":"")}>Acerca de nosotros</li>
                <li onClick={() => setMenu("contacto")} className={(menu==="contacto"?"active":"")}>Contacto</li>
            </ul>
            <div className="navbar-right">
                <img onClick={() => navigate('/search')} src={assets.search_icon} alt="" />
                <div className="navbar-favorites-icon">
                    <img src={assets.favorites_icon} alt="" />
                    <div className="dot"></div>
                </div>
                <button onClick={()=>setShowLogin(true)} className="btn">Login</button>
            </div>
        </div>
    )
}

export default Navbar