import "./Contact.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
    return (
        <div className="contacto main-container">
            <div className="contact-header">
                <h1>Contáctanos</h1>
                <p>Si tienes alguna pregunta o necesitas más información, no dudes en ponerte en contacto con nosotros.</p>
            </div>
            <div className="contact-content">
                <ul className="contact-info">
                    <li><FontAwesomeIcon icon={faEnvelope} /> <strong>Correo Electrónico:</strong> uniexplore@gmail.com</li>
                    <li><FontAwesomeIcon icon={faPhone} /> <strong>Teléfono:</strong> 222-364-58-90</li>
                    <li><FontAwesomeIcon icon={faFacebook} /> <strong>Facebook:</strong> UniExplore</li>
                    <li><FontAwesomeIcon icon={faInstagram} /> <strong>Instagram:</strong> unni_explore</li>
                </ul>
                <p className="contact-message">¡Estamos aquí para ayudarte a encontrar la universidad de tus sueños!</p>
            </div>
        </div>
    )
}

export default Contact;
