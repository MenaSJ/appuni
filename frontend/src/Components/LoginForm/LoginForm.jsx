import React, { useState, useEffect, useRef } from 'react';
import axios from '../../api/axios';
import { assets } from "../../assets/assets";
import useAuth from '../../hooks/useAuth';

const LOGIN_URL = '/auth';
const RECOVER_URL = '/recover'; // Ruta para recuperar la contraseña

const LoginForm = ({ setShowLogin, setShowPopup }) => {
    const { setAuth } = useAuth();
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [showRecover, setShowRecover] = useState(false); // Estado para mostrar el formulario de recuperación

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [username, pwd]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                { username, pwd },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            const email = response?.data?.email;
            const estado = response?.data?.estado;
            const id = response?.data?.id;
            setAuth({ username, pwd, roles, accessToken, email, estado, id });
            setUsername('');
            setPwd('');
            setShowPopup(false);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Username or Password Incorrect');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    };

    const handleRecoverPassword = async (e) => {
        e.preventDefault();
        try {
            await axios.post(RECOVER_URL, { email: username }, {
                headers: { 'Content-Type': 'application/json' }
            });
            setSuccess(true);
            setErrMsg('Checa tu email para mas instrucciones.');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 404) {
                setErrMsg('Email not found');
            } else {
                setErrMsg('Recovery Failed');
            }
            errRef.current.focus();
        }
    };

    return (
        <div className="login-popup">
            {showRecover ? (
                <form className="login-popup-container" onSubmit={handleRecoverPassword}>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                        {errMsg}
                    </p>
                    <div className="login-popup-title">
                        <h1>Recover Password</h1>
                        <img onClick={() => { setShowPopup(false); setShowRecover(false); }} src={assets.cross_icon} alt="" />
                    </div>
                    <div className='login-popup-inputs'>
                        <label htmlFor="email">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            ref={userRef}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <button type='submit'>Send Recovery Email</button>
                        <p>Iniciar Sesion? <span onClick={() => setShowRecover(false)}>Login</span></p>
                    </div>
                </form>
            ) : (
                <form className="login-popup-container" onSubmit={handleLogin}>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                        {errMsg}
                    </p>
                    <div className="login-popup-title">
                        <h1>Login</h1>
                        <img onClick={() => setShowPopup(false)} src={assets.cross_icon} alt="" />
                    </div>
                    <div className='login-popup-inputs'>
                        <label htmlFor="username">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                        />
                        <label htmlFor="password">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button type='submit'>Login</button>
                        <p>Olvidaste tu contraseña? <span onClick={() => setShowRecover(true)}>Recuperala</span></p>
                        <p>No tienes una cuenta? <span onClick={() => setShowLogin(false)}>Registrate</span></p>
                    </div>
                </form>
            )}
        </div>
    );
}

export default LoginForm;
