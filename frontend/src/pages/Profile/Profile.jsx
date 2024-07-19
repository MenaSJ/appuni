// Profile.js
import "./Profile.css";
import { useContext } from 'react';
import { AppContext } from '../../context/Context';

const Profile = () => {
    const { user } = useContext(AppContext);

    return (
        <div className="perfil">
            <h2>Perfil del usuario</h2>
            <p><strong>Nombre:</strong> {user.nombre}</p>
            <p><strong>Apellido:</strong> {user.apellido}</p>
            <p><strong>Estado:</strong> {user.estado}</p>
            <p><strong>Email:</strong> {user.email}</p>
        </div>
    )
}

export default Profile;
