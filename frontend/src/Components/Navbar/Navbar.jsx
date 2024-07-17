import { useState } from "react";
import { assets } from "../../assets/assets";
import "./Navbar.css";
import { useNavigate } from 'react-router-dom';

const Navbar = ({setShowLogin}) => {
    const [menu, setMenu] = useState("home");
    const navigate = useNavigate();

    const handleSearchNavigate = () => {
        navigate('/search');
        setMenu('');
    }

    const handleMenuNavigate = (section) => {
        if (section === "home") {
            navigate('/');
        } else if (section === "acerca") {
            navigate('/about');
        } else if (section === "contacto") {
            navigate('/contact');
        }
        setMenu(section);
    }

    return (
        <div className="navbar">
            <img src={assets.logoG} onClick={() => handleMenuNavigate("home")} style={{cursor: "pointer"}} className="logo" />
            <ul className="navbar-menu">
                <li onClick={() => handleMenuNavigate("home")} className={menu === "home" ? "active" : ""}>Home</li>
                <li onClick={() => handleMenuNavigate("acerca")} className={menu === "acerca" ? "active" : ""}>Acerca de nosotros</li>
                <li onClick={() => handleMenuNavigate("contacto")} className={menu === "contacto" ? "active" : ""}>Contacto</li>
            </ul>
            <div className="navbar-right">
                <img onClick={handleSearchNavigate} src={assets.search_icon} alt="" />
                <div className="navbar-favorites-icon">
                    <img src={assets.favorites_icon} alt="" />
                    <div className="dot"></div>
                </div>
                <button onClick={() => setShowLogin(true)} className="btn">Login</button>
            </div>
        </div>
    );
}

export default Navbar;
