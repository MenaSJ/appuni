import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/Context';
import "./LoginPopup.css";
import { assets } from "../../assets/assets";

const LoginPopup = ({ setShowLogin }) => {
    const { login } = useContext(AppContext);
    const [currState, setCurrState] = useState('Login');
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        estado: '',
        correo: '',
        contrasena: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post(`http://localhost:4000/usuarios/${currState === 'Registrate' ? 'register' : 'login'}`, formData);
        } catch (error) {
            setError(`Error al ${currState === 'Registrate' ? 'registrar' : 'iniciar sesión'} el usuario`);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.correo || !formData.contrasena || (currState === 'Registrate' && (!formData.nombre || !formData.apellido || !formData.estado))) {
            setError('Todos los campos son obligatorios');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.correo)) {
            setError('Por favor, introduce una dirección de correo electrónico válida');
            return;
        }
        handleLogin();
        setFormData({
            nombre: '',
            apellido: '',
            estado: '',
            correo: '',
            contrasena: ''
        });
    };

    return (
        <div className="login-popup">
            <form className="login-popup-container" onSubmit={handleSubmit}>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {currState === 'Registrate' && (
                        <RegisterOptions formData={formData} handleChange={handleChange} />
                    )}
                    <input
                        type="email"
                        name="correo"
                        placeholder="Tu correo"
                        value={formData.correo}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="contrasena"
                        placeholder="Tu contraseña"
                        value={formData.contrasena}
                        onChange={handleChange}
                        required
                    />
                </div>
                {currState === 'Registrate' && (
                    <div className="login-popup-condition">
                        <input type="checkbox" required />
                        <p>Acepto los términos y condiciones</p>
                    </div>
                )}
                <button type="submit">{currState === 'Registrate' ? 'Registrate' : 'Login'}</button>
                {currState === 'Login'
                    ? <p>¿Crear una nueva cuenta? <span onClick={() => setCurrState('Registrate')}>Clic aquí</span></p>
                    : <p>¿Ya tienes una cuenta? <span onClick={() => setCurrState('Login')}>Login</span></p>
                }
                <p>¿Olvidaste tu contraseña? <span>Recupérala aquí</span></p>
            </form>
        </div>
    );
};

function RegisterOptions({formData, handleChange}) {
    return (
        <>
            <input
                type="text"
                name="nombre"
                placeholder="Tu nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="apellido"
                placeholder="Tu apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
            />
            <select
                className="estados"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                required>
                <option value="" disabled>Selecciona tu estado</option>
                <option value="Aguascalientes">Aguascalientes</option>
                <option value="Baja California">Baja California</option>
                <option value="Baja California Sur">Baja California Sur</option>
                <option value="Campeche">Campeche</option>
                <option value="Chiapas">Chiapas</option>
                <option value="Chihuahua">Chihuahua</option>
                <option value="Ciudad de México">Ciudad de México</option>
                <option value="Coahuila">Coahuila</option>
                <option value="Colima">Colima</option>
                <option value="Durango">Durango</option>
                <option value="Guanajuato">Guanajuato</option>
                <option value="Guerrero">Guerrero</option>
                <option value="Hidalgo">Hidalgo</option>
                <option value="Jalisco">Jalisco</option>
                <option value="México">México</option>
                <option value="Michoacán">Michoacán</option>
                <option value="Morelos">Morelos</option>
                <option value="Nayarit">Nayarit</option>
                <option value="Nuevo León">Nuevo León</option>
                <option value="Oaxaca">Oaxaca</option>
                <option value="Puebla">Puebla</option>
                <option value="Querétaro">Querétaro</option>
                <option value="Quintana Roo">Quintana Roo</option>
                <option value="San Luis Potosí">San Luis Potosí</option>
                <option value="Sinaloa">Sinaloa</option>
                <option value="Sonora">Sonora</option>
                <option value="Tabasco">Tabasco</option>
                <option value="Tamaulipas">Tamaulipas</option>
                <option value="Tlaxcala">Tlaxcala</option>
                <option value="Veracruz">Veracruz</option>
                <option value="Yucatán">Yucatán</option>
                <option value="Zacatecas">Zacatecas</option>
            </select>
        </>
    )
}

export default LoginPopup;

