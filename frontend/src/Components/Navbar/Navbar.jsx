import { useState } from "react";
import { assets } from "../../assets/assets"
import "./Navbar.css";

const Navbar = () => {
    const [menu, setMenu] = useState("home")
    return (
        <div className="navbar"> 
            <img src={assets.logoG} className="logo" />
            <ul className="navbar-menu">
                <li onClick={() => setMenu("home")} className={(menu ==="home"?"active":"")}>Home</li>
                <li onClick={() => setMenu("acerca")} className={(menu==="acerca"?"active":"")}>Acerca de nosotros</li>
                <li onClick={() => setMenu("contacto")} className={(menu==="contacto"?"active":"")}>Contacto</li>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
                <div className="navbar-favorites-icon">
                    <img src={assets.favorites_icon} alt="" />
                    <div className="dot"></div>
                </div>
                <button className="btn">Registrate</button>
            </div>
        </div>
    )
}

export default Navbar