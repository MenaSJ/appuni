import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../../context/Context";
import { useContext } from "react";

const RutaProtegida = () => { // componente RutaProtegida, props usuario y redirigir
    const { user } = useContext(AppContext)
    if (user == null) { //
        return <Navigate to='/bloqueado' />// navega a login
    }
    return <Outlet />; // Regresamos un outlet, que nos permite renderizar rutas anidadas dentro de este componente
}

export default RutaProtegida; // exporta a este componente