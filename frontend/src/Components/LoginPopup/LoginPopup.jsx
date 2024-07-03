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
                    {currState==="Login"?<></>:<input type="text" placeholder="Tu apellido" required />}
                    {currState==="Login"?<></>:
                        <select className="estados"  required>
                        <option value="" disabled selected>Selecciona tu estado</option>
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
                    </select>}
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