import React, { useState, useEffect, useContext } from 'react';
import axios from '../../api/axios';
import "./Comentarios.css";
import { AppContext } from '../../context/Context';
const COMENTARIOS_URL = '/comentarios'

const Comentarios = ({ universidadID }) => {
    const { auth } = useContext(AppContext);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState('');
    const fetchComments = async () => {
        try {
            const response = await axios.get(COMENTARIOS_URL,
                {params: { universidadID }}
            );
            console.log(response.data)
            setComments(response.data);
        } catch (error) {
            console.error(error);
            setError('Error al obtener los comentarios');
        }
    };
    useEffect(() => {
        fetchComments();
    }, []);

    const handleAddComment = async () => {
        if (!newComment) return;
        try {
            await axios.post(COMENTARIOS_URL, {
                universidadID: universidadID,
                usuarioID: auth.id, // Replace with actual user ID
                comentario: newComment
            });
            setNewComment('');
            fetchComments();
        } catch (error) {
            console.error(error);
            setError('Error al agregar el comentario');
        }
    };

    return (
        <div className="comments row1">
            <h2>Comentarios</h2>
            {error && <p className="error">{error}</p>}
            <div className="comments-body">
                <ul>
                    {comments.map(comment => (
                        <li key={comment._id}>
                            <p><strong>{comment.usuarioID.username}</strong>: {comment.comentario}</p>
                            <p id='date'>({new Date(comment.fecha).toLocaleString()})</p>
                        </li>
                    ))}
                </ul>
                {auth.email ?
                    <>
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Añadir un comentario..."
                        />
                        <button onClick={handleAddComment}>Agregar Comentario</button>
                    </> :
                    <p>Para comentar debes primero iniciar sersion</p>
                }
            </div>
        </div>
    );
};

export default Comentarios;
