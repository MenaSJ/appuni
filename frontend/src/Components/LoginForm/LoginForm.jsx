import React, { useState, useContext, useEffect, useRef } from 'react';
import axios from '../../api/axios'
import { assets } from "../../assets/assets";
import useAuth from '../../hooks/useAuth';
const LOGIN_URL = '/auth'

const LoginForm = ({ setShowLogin, setShowPopup }) => {
    const { setAuth } = useAuth();
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                { username, pwd },
                {
                    header: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data))
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            const email = response?.data?.email;
            const estado = response?.data?.estado;
            const id = response?.data?.id;
            setAuth({ username, pwd, roles, accessToken, email, estado, id})
            setUsername('');
            setPwd('');
            setSuccess(true)
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Username o Contrasena Incorrectos');
            } else {
                setErrMsg('Fallo de Login')
            }
            errRef.current.focus();
        }
    };
    //Falta darle estado y correro 
    return (
        <div className="login-popup">
            <form action="" className="login-popup-container" onSubmit={handleSubmit}>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                    {errMsg}
                </p>
                <div className="login-popup-title" >
                    <h1>Iniciar Sesion</h1>
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
                        required
                    />
                    <label htmlFor="password">
                        Contraseña:
                    </label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                    <button type='submit'>Iniciar Sesion</button>
                    <p>¿No tienes cuenta? <span onClick={() => setShowLogin(false)} >Registrate</span></p>
                </div>
            </form>
        </div>
    );
}


export default LoginForm;
