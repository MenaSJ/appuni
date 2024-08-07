import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Admin.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth'; // Importa el hook useAuth

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const { auth } = useAuth(); // Usa el hook useAuth para obtener el nombre de usuario

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.post('/usuarios',
                    { username: auth?.username }, // Envía el nombre de usuario en el cuerpo de la solicitud
                    { signal: controller.signal }
                );
                console.log(response.data);
                if (isMounted) {
                    setUsers(response.data);
                }
            } catch (err) {
                console.error(err);
                if (err.response?.status === 403) {
                    navigate('/login', { state: { from: location }, replace: true });
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [axiosPrivate, navigate, location, auth]);

    useEffect(() => {
        setError('');
    }, []);

    const handleDelete = async (username) => {
        try {
            await axiosPrivate.delete('/usuarios', {
                data: { username }
            });
            setUsers(users.filter(user => user.username !== username));
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            setError('Error al eliminar el usuario');
        }
    };

    return (
        <section className='main-container admin'>
            <h1 className='admin-title'>Página de Administradores</h1>
            <div className="flexGrow admin-header">
                <Link to="/" className='admin-box'>Inicio</Link>
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
                                    <th>Nombre de Usuario</th>
                                    <th>Estado</th>
                                    <th>Correo</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.email}>
                                        <td>{user.username}</td>
                                        <td>{user.estado}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <button onClick={() => handleDelete(user.username)}>Eliminar</button>
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
};

export default Admin;
