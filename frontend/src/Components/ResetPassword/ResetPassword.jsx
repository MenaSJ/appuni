import { Link, useNavigate, useParams } from "react-router-dom"
import { useState, useContext, useEffect } from 'react';
import { AppContext } from "../../context/Context";
import axios from "axios";
import "./ResetPassword.css"

const ResetPassword = () => {
    const { token } = useParams();
    const {  } = useContext(AppContext);
    const [text, setText] = useState({ password: '', passwordr: '' })
    const [mensajeError, setMensajeError] = useState(null);
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        let { id, value } = e.target;
        setText(userObject => ({
            ...userObject,
            [id]: value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (text.password === text.passwordr) {
            try {
                const response = await axios.post(`http://localhost:4000/reset-password/${token}`, text);
                console.log(response);
                if (response.status === 200) {
                    setMensajeError("Se ha actualizado tu contraseña");
                }
                return
            } catch (error) {
                setMensajeError(error.response.data)
                return error
            }
        } else {
            setMensajeError("No coinciden")
        }
    }
    return (
        <div className="container main-container">
            <div className="form-wrapper">
                <form onSubmit={handleSubmit} className="login-form">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        onChange={handleInputChange}
                        value={text.password}
                        required={true}
                        type="password"
                        id="password" />
                    <label htmlFor="passwordr">Repetir Contraseña:</label>
                    <input
                        onChange={handleInputChange}
                        value={text.passwordr}
                        required={true}
                        type="password"
                        id="passwordr" />
                    <div className="buttons">
                        {mensajeError ? <p className="mensaje-error">{mensajeError}</p> : null}
                        <button className="btn btn-login" type="submit">Actualizar contraseña</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword