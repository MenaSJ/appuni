import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom"; // importa los componentes de la libreria react-router-dom
import { AppContext } from "../../context/Context";

const RutaProtegidaRol = () => { // RutaProtegida por rol, con parametros usuario y rol
    const { user, rol } = useContext(AppContext)
    console.log(rol)
    if (user.email == "" && rol == "") { // si no hay un usuario o rol
        return <Navigate to='/' /> // navegamos al login
    } else if (user.email && rol !== 'admin') // si hay usuario, pero no hay un rol permitido
        return <Navigate to={'/bloqueado'} />; // regresamos la ruta /sinpermiso
    else if (user.email && rol == 'admin') // si hay usuario y tiene rol permitido
        return <Outlet /> // Regresamos un outlet, que nos permite renderizar rutas anidadas dentro de este componente
}

export default RutaProtegidaRol;