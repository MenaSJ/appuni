import { assets } from "../../assets/assets"
import "./Footer.css";

const Footer = () => {
    return (
        <div className="footer" id="footer">
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src="" alt="" />
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos quo eveniet beatae blanditiis amet architecto unde placeat laudantium quos incidunt dolores, facilis deserunt natus a minus in non, at explicabo.</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANIA</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Contact us</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>CONTACTO</h2>
                    <ul>
                        <li>+52-223-533-3264</li>
                        <li>contacto@alumno.utpuebla.edu.mx</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">Copyright 2024 @ UniversidadesApp.com - Todos los Derechos Reservados.</p>
        </div>
    )
}

export default Footer