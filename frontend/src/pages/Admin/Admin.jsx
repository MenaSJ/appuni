import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import './Admin.css'; 

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
        <section className='main-container admin'>
            <h1 className='admin-title'>Admins Page</h1>
            <div className="flexGrow admin-header">
                <Link to="/" className='admin-box'>Home</Link>
            </div>
            <h2 className='admin-body'>Lista de Usuarios</h2>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <>
                    {error && <p className="error">{error}</p>}
                    {users.length > 0 ? (
                        <table className='admin-table'>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Correo</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.correo}>
                                        <td>{user.nombre}</td>
                                        <td>{user.apellido}</td>
                                        <td>{user.correo}</td>
                                        <td>
                                            <button onClick={() => handleDelete(user.correo)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No hay usuarios</p>
                    )}
                </>
            )}
        </section>
    );
}

export default Admin;
