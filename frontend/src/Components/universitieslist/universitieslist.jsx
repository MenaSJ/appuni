import React from 'react';
import './universitieslist.css';

const UniversitiesList = ({ universities, onEdit, onDelete }) => {
    return (
        <div className="universities-list">
            <h1>Listado de Universidades</h1>
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
                    {universities.map((uni) => (
                        <tr key={uni.id}>
                            <td>{uni.id}</td>
                            <td>{uni.nombre}</td>
                            <td>{uni.acronimo}</td>
                            <td>
                                <button onClick={() => onEdit(uni.id)}>Editar</button>
                                <button onClick={() => onDelete(uni.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UniversitiesList;
