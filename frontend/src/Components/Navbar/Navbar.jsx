import { assets } from "../../assets/assets"
import "./Navbar.css";

const Navbar = () => {
    return (
        <div className="navbar">
            <img src={assets.logoG} className="logo" />
            <ul className="navbar-menu">
                <li className="active">Home</li>
                <li className="">Acerca de nosotros</li>
                <li className="">Contacto</li>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
                <div className="navbar-favorites-icon">
                    <img src={assets.favorites_icon} alt="" />
                    <div className="dot"></div>
                </div>
                <button>Registrate</button>
            </div>
        </div>
    )
}

export default Navbar