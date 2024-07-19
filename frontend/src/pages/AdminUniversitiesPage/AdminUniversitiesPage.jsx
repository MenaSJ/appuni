import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminUniversitiesPage.css'; // Importa el CSS

const AdminUniversitiesPage = () => {
    const [universities, setUniversities] = useState([]);

    // Función para cargar universidades desde la API
    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                const response = await axios.get('/api/universidades');
                setUniversities(response.data);
            } catch (error) {
                console.error('Error al cargar universidades:', error);
            }
        };
        fetchUniversities();
    }, []);

    // Función para manejar la eliminación de una universidad
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/universidades/${id}`);
            setUniversities(universities.filter(uni => uni.UniversidadID !== id));
        } catch (error) {
            console.error('Error al eliminar universidad:', error);
        }
    };

    return (
        <div className="admin-universities-page">
            <h1>Listado de Universidades</h1>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Acrónimo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {universities.map(uni => (
                            <tr key={uni.UniversidadID}>
                                <td>{uni.UniversidadID}</td>
                                <td>{uni.Nombre}</td>
                                <td>{uni.Acronimo}</td>
                                <td>
                                    <button 
                                        className="edit-button" 
                                        onClick={() => console.log('Editar universidad con ID:', uni.UniversidadID)}
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        className="delete-button" 
                                        onClick={() => handleDelete(uni.UniversidadID)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUniversitiesPage;
