import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../context/Context';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import useAuth from '../../hooks/useAuth';

const Profile = () => {
    const { auth } = useAuth();
    const { setAuth } = useContext(AppContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        setAuth({})
        navigate('/'); // Redirigir al home después del logout
    };

    const handleAdminRedirect = () => {
        navigate('/admin'); // Redirigir a la página de administración
    };

    if (!auth) {
        return <div className="loading">Cargando...</div>;
    }

    return (
        <div className="profile-container main-container">
            <div className="profile-card">
                <h1 className="profile-title">Perfil del usuario</h1>
                <div className="profile-info">
                    <p><strong>Username:</strong> {auth.username}</p>
                    <p><strong>Estado:</strong> {auth.estado}</p>
                    <p><strong>Correo:</strong> {auth.email}</p>
                </div>
                {error && <p className="error">{error}</p>}
                <div className="profile-buttons">
                    <button className="logout-button" onClick={handleLogout}>Log out</button>
                    {auth.rol === 'admin' && ( // Mostrar el botón solo si el usuario es admin
                        <button className="admin-button" onClick={handleAdminRedirect}>Ir a Administración</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;
