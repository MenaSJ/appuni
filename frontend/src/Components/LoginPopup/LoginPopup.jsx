import React, { useState } from "react"
import "./LoginPopup.css"
import { assets } from "../../assets/assets"

const LoginPopup = ({setShowLogin}) => {
    
    const [currState, setCurrState] = useState("Login")

    return (
        <div className="login-popup">
            <form className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popus-inputs">
                    {currState==="Login"?<></>:<input type="text" placeholder="Tu nombre" required />}
                    <input type="email" placeholder="Tu correo" required />
                    <input type="password" placeholder="Tu contraseña" required />
                </div>
                <button>{currState==="Registrate"?"Crear cuenta":"Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>Acepto los términos y condiciones</p>
                </div>
                {currState==="Login"
                    ? <p>¿Crear una nueva cuenta? <span onClick={() => setCurrState("Registrate")}> Clic aquí</span></p>
                :
                <p>¿Ya tienes una cuenta?<span onClick={()=>setCurrState("Login")}> Login</span> </p>     
                }
                
            </form>
        </div>
    )
}

export default LoginPopup