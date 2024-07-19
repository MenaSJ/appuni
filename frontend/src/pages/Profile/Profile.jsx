import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../context/Context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import './Profile.css';

const Profile = () => {
    const { user, logout } = useContext(AppContext);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Inicializar useNavigate

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/usuarios/datos', {
                    params: { correo: user.email }
                });
                setUserData(response.data);
            } catch (error) {
                console.error(error);
                setError('Error al recuperar los datos del usuario');
            }
        };

        if (user.email) {
            fetchUserData();
        }
    }, [user.email]);

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirigir al home después del logout
    };

    if (!userData) {
        return <div className="loading">Cargando...</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h1 className="profile-title">Perfil del usuario</h1>
                <div className="profile-info">
                    <p><strong>Nombre:</strong> {userData.nombre}</p>
                    <p><strong>Apellido:</strong> {userData.apellido}</p>
                    <p><strong>Estado:</strong> {userData.estado}</p>
                    <p><strong>Correo:</strong> {userData.correo}</p>
                </div>
                {error && <p className="error">{error}</p>}
                <button className="logout-button" onClick={handleLogout}>Log out</button> {/* Usar handleLogout */}
            </div>
        </div>
    );
}

export default Profile;
