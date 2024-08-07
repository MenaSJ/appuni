import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import axios from "../../api/axios";
import "./ResetPassword.css";

// Definición de las expresiones regulares para la validación
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const ResetPassword = () => {
    const { token } = useParams();
    const [text, setText] = useState({ password: '', passwordr: '' });
    const [errMsg, setErrMsg] = useState(null);
    const [validPwd, setValidPwd] = useState(false);
    const [validMatch, setValidMatch] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(text.password));
        setValidMatch(text.password === text.passwordr);
        setErrMsg('');
    }, [text.password, text.passwordr]);

    const handleInputChange = (e) => {
        let { id, value } = e.target;
        setText(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validPwd && validMatch) {
            try {
                const response = await axios.post(`/recover/${token}`, text);
                console.log(response);
                if (response.status === 200) {
                    setErrMsg("Se ha actualizado tu contraseña");
                    setTimeout(() => navigate('/login'), 2000); // Redirige al usuario después de 2 segundos
                }
            } catch (error) {
                setErrMsg("Error al actualizar la contraseña");
            }
        } else {
            setErrMsg("La contraseña no cumple con los requisitos o no coinciden");
        }
    };

    return (
        <div className="container main-container">
            <div className="form-wrapper">
                <form onSubmit={handleSubmit} className="login-form">
                    <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                        {errMsg}
                    </p>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        onChange={handleInputChange}
                        value={text.password}
                        required={true}
                        type="password"
                        id="password"
                    />
                    <p className={!validPwd && text.password ? "instructions" : "offscreen"}>
                        La contraseña debe tener entre 8 y 24 caracteres,<br />
                        incluir letras mayúsculas y minúsculas, un número y un carácter especial.<br />
                        Caracteres especiales permitidos: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>
                    <label htmlFor="passwordr">Repetir Contraseña:</label>
                    <input
                        onChange={handleInputChange}
                        value={text.passwordr}
                        required={true}
                        type="password"
                        id="passwordr"
                    />
                    <div className="buttons">
                        <button className="btn btn-login" type="submit">Actualizar contraseña</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
