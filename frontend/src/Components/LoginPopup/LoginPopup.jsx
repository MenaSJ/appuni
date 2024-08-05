import React, { useState, useContext, useEffect, useRef } from 'react';
import "./LoginPopup.css";
import axios from '../../api/axios'
import RegisterForm from '../RegisterForm/RegisterForm';
import { AppContext } from '../../context/Context';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { assets } from "../../assets/assets";
import { useNavigate } from 'react-router-dom';
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register'

const LoginPopup = ({ setShowLogin }) => {
    const { setRol, rol } = useContext(AppContext);
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(username));
    }, [username])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [username, pwd, matchPwd])

    const [formData, setFormData] = useState({
        estado: '',
        email: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = formData.email;
        const estado = formData.estado;
        const v1 = USER_REGEX.test(username);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry")
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                { username, pwd, email, estado },
                {
                    header: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response.data)
            console.log(response.accesToken)
            console.log(JSON.stringify(response))
            setSuccess(true)
        } catch (err) {
            console.log(err)
        }
    };
//Falta darle estado y correro 
    return (
        <>{success ? (
            <div className="login-popup">
                <form className="login-popup-container">
                    <h1>Exitoso</h1>
                    <p>
                        <a href="">Ingresar</a>
                    </p>
                </form>
            </div>
        )   :
            (
                <div className="login-popup">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                        {errMsg}
                    </p>
                    <form action="" className="login-popup-container" onSubmit={handleSubmit}>
                        <div className="login-popup-title" >
                            <h1>Registro</h1>
                            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                        </div>
                        <div className='login-popup-inputs'>
                            <label htmlFor="username">
                                Username:
                                <span className={validName ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validName || !username ? "hide" : "invalid"}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                            <p id="uidnote" className={userFocus && username && !validName ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                4 to 24 characters.<br />
                                Must begin with a letter.<br />
                                Letters, numbers, underscores, hyphens allowed.
                            </p>
                            <label htmlFor="password">
                                Contraseña:
                                <span className={validPwd ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validPwd || !pwd ? "hide" : "invalid"}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                autoComplete="off"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                8 to 24 characters.<br />
                                Must include uppercase and lowercase letters, a number and a special character.<br />
                                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                            </p>
                            <label htmlFor="confirm_pwd">
                                Confirmar Contraseña:
                                <span className={validMatch && matchPwd ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                type="password"
                                id='confirm_pwd'
                                onChange={(e) => setMatchPwd(e.target.value)}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Must match the first password input field.
                            </p>
                            <label htmlFor="email">
                                Correo:
                            </label>
                            <input
                                type="text"
                                name="email"
                                placeholder=""
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
                            <button type='submit' disabled={!validName || !validPwd || !validMatch || !formData.email || !formData.estado ? true : false}>Registarse</button>
                            <p>¿Ya tienes una cuenta? <span >Ingresar</span></p>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}


export default LoginPopup;
