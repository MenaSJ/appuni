import React, { useState, useContext, useEffect } from 'react';
import "./LoginPopup.css";
import axios from 'axios';
import RegisterForm from '../RegisterForm/RegisterForm';
import { AppContext } from '../../context/Context';
import { assets } from "../../assets/assets";
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4000/usuarios/";

const LoginPopup = ({ setShowLogin }) => {
    const { setUser, setRol } = useContext(AppContext);
    const [currState, setCurrState] = useState('login');
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        estado: '',
        correo: '',
        contrasena: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.correo || (currState === 'register' && (!formData.nombre || !formData.apellido || !formData.estado))) {
            setError('Todos los campos son obligatorios');
            return;
        }
        try {
            const response = await axios.post(URL + currState, formData);

            setUser({ nombre: response.data.nombre, apellido: response.data.apellido, email: response.data.email, _id:response.data._id });
            console.log(response.data);
            setRol(response.data.rol);

            setShowLogin(false);
            navigate('/');
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    setError('Contraseña incorrecta');
                } else if (error.response.status === 404) {
                    setError('Correo incorrecto');
                } else {
                    setError('Error al iniciar sesión');
                }
            } else {
                setError('Error al iniciar sesión');
            }
            console.log(error);
        }
        restartForm();
    };

    const restartForm = () => {
        setFormData({
            nombre: '',
            apellido: '',
            estado: '',
            correo: '',
            contrasena: '',
            nuevaContrasena: ''
        });
    };

    useEffect(() => {
        setFormData({
            nombre: '',
            apellido: '',
            estado: '',
            correo: '',
            contrasena: '',
            nuevaContrasena: ''
        });
    }, [currState]);

    return (
        <div className="login-popup">
            <form className="login-popup-container" onSubmit={handleSubmit}>
                <div className="login-popup-title">
                    <h2>{currState === "login" ? "Login" : currState === "register" ? "Registrarse" : "Recuperar Contrasena"}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === 'register' && (
                        <RegisterForm formData={formData} handleChange={handleChange} />
                    )}
                    <input
                        type="email"
                        name="correo"
                        placeholder="Tu correo"
                        value={formData.correo}
                        onChange={handleChange}
                        required
                    />
                    {currState === "recover" ? null : <input
                        type="password"
                        name="contrasena"
                        placeholder="Tu Contrasena"
                        value={formData.contrasena}
                        onChange={handleChange}
                        required
                    />}
                </div>
                {error && <p className="error-message">{error}</p>}
                {currState === 'register' && (
                    <div className="login-popup-condition">
                        <input type="checkbox" required />
                        <p>Acepto los términos y condiciones</p>
                    </div>
                )}
                {currState === 'login'
                    ? <>
                        <button type="submit">Login</button>
                        <p>¿Crear una nueva cuenta? <span onClick={() => setCurrState('register')}>Clic aquí</span></p>
                    </>
                    : currState === 'register' ?
                        <>
                            <button type="submit">Crear Cuenta</button>
                            <p>¿Ya tienes una cuenta? <span onClick={() => setCurrState('login')}>Login</span></p>
                        </>
                        : <>
                            <button type="submit">Recuperar Contrasena</button>
                            <p>¿Iniciar Sesion? <span onClick={() => setCurrState('login')}>Click aqui</span></p>
                        </>
                }
                {currState === 'login' && <p>¿Olvidaste tu contraseña? <span onClick={() => setCurrState('recover')}>Recupérala aquí</span></p>}
            </form>
        </div>
    );
}

export default LoginPopup;
