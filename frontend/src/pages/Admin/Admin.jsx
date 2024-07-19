import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import './Admin.css'; // Asegúrate de tener los estilos necesarios

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:4000/usuarios');
                setUsers(response.data);
            } catch (error) {
                console.error(error);
                setError('Error al recuperar la lista de usuarios');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (correo) => {
        try {
            await axios.delete('http://localhost:4000/usuarios', {
                data: { correo }
            });
            setUsers(users.filter(user => user.correo !== correo));
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            setError('Error al eliminar el usuario');
        }
    };

    return (
        <section>
            <h1>Admins Page</h1>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
            <h2>Lista de Usuarios</h2>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <>
                    {error && <p className="error">{error}</p>}
                    <ul>
                        {users.length > 0 ? (
                            users.map(user => (
                                <li key={user.correo}>
                                    {user.nombre} {user.apellido} - {user.correo}
                                    <button onClick={() => handleDelete(user.correo)}>Eliminar</button>
                                </li>
                            ))
                        ) : (
                            <p>No hay usuarios</p>
                        )}
                    </ul>
                </>
            )}
        </section>
    );
}

export default Admin;
