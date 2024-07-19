import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './reportspage.css';

const ReportsPage = () => {
    const [reports, setReports] = useState([]);

    // Función para cargar reportes desde la API
    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get('/api/reportes');
                setReports(response.data);
            } catch (error) {
                console.error('Error al cargar reportes:', error);
            }
        };
        fetchReports();
    }, []);

    // Función para manejar la eliminación de un reporte
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/reportes/${id}`);
            setReports(reports.filter(report => report.ReporteID !== id));
        } catch (error) {
            console.error('Error al eliminar reporte:', error);
        }
    };

    return (
        <div className="reports-page">
            <h1>Listado de Reportes</h1>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Descripción</th>
                            <th>Fecha</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map(report => (
                            <tr key={report.ReporteID}>
                                <td>{report.ReporteID}</td>
                                <td>{report.Descripcion}</td>
                                <td>{new Date(report.Fecha).toLocaleDateString()}</td>
                                <td>
                                    <button 
                                        className="delete-button" 
                                        onClick={() => handleDelete(report.ReporteID)}
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

export default ReportsPage;
