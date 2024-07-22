import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/Context';

const Comentarios = ({ universidadID }) => {
    const { user } = useContext(AppContext);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState('');
    const nombreEntero = `${user.nombre} ${user.apellido}`
    console.log(user);
    console.log(nombreEntero)
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/comentarios/${universidadID}`);
                setComments(response.data);
                console.log(comments)
            } catch (error) {
                console.error(error);
                setError('Error al obtener los comentarios');
            }
        };
        fetchComments();
    }, [universidadID]);

    const handleAddComment = async () => {
        if (!newComment) return;
        try {
            await axios.post('http://localhost:4000/comentarios', {
                UniversidadID: universidadID,
                UsuarioID: user._id, // Replace with actual user ID
                Comentario: newComment
            });
            setNewComment('');
            setComments([...comments, { Comentario: newComment, Fecha: new Date(), Usuario: nombreEntero }]);
            console.log(comments)
        } catch (error) {
            console.error(error);
            setError('Error al agregar el comentario');
        }
    };

    return (
        <div className="comment-list">
            <h2>Comentarios</h2>
            {error && <p className="error">{error}</p>}
            <ul>
                {comments.map(comment => (
                    <li key={comment.ComentarioID}>
                        <p><strong>{comment.nombre} {comment.apellido}</strong> ({new Date(comment.Fecha).toLocaleString()}):</p>
                        <p>{comment.Comentario}</p>
                    </li>
                ))}
            </ul>
            {user.email ? 
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
    );
};

export default Comentarios;
