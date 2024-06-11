import React, { useState } from 'react';
import axios from 'axios';
import {useParams, Navigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const CreateSuiviIndicateurForm = () => {
    const { id } = useParams();

    const [formData, setFormData] = useState({
        frequence: '',
        objectif: '',
        limite_critique: '',
        resultat: '',
        commentaire: '',
        piece_jointe: null
    });
    const [ajoutReussi, setAjoutReussi] = useState(false);


    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'piece_jointe') {
            setFormData({
                ...formData,
                [name]: files[0]
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('frequence', formData.frequence);
        data.append('objectif', formData.objectif);
        data.append('limite_critique', formData.limite_critique);
        data.append('resultat', formData.resultat);
        data.append('commentaire', formData.commentaire);
        if (formData.piece_jointe) {
            data.append('piece_jointe', formData.piece_jointe);
        }

        try {
              axios.post(`${process.env.REACT_APP_API_URL}/indicateur/create_SuiviIndicateur/${id}/`, data, {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': Cookies.get('csrftoken')
                }
            });

            setMessage('Suivi indicateur créé avec succès.');
            setErrors({});
            setAjoutReussi(true);
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            } else {
                setMessage('Erreur lors de la création du suivi indicateur.');
            }
        }
    };

    if (ajoutReussi) {
        return <Navigate to="/indicateurs" />;
    }

    return (
        <div className="form-container">
            <div className="form-card">
            <h2> Suivre Indicateur</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label>Fréquence:</label>
                    <input type="text" name="frequence" value={formData.frequence} onChange={handleChange} required />
                    {errors.frequence && <span>{errors.frequence}</span>}
                </div>
                <div className="form-group">
                    <label>Objectif:</label>
                    <textarea name="objectif" value={formData.objectif} onChange={handleChange} required />
                    {errors.objectif && <span>{errors.objectif}</span>}
                </div>
                <div className="form-group">
                    <label>Limite Critique:</label>
                    <input type="number" step="0.01" name="limite_critique" value={formData.limite_critique} onChange={handleChange} required />
                    {errors.limite_critique && <span>{errors.limite_critique}</span>}
                </div>
                <div className="form-group">
                    <label>Résultat:</label>
                    <input type="number" step="0.01" name="resultat" value={formData.resultat} onChange={handleChange} required />
                    {errors.resultat && <span>{errors.resultat}</span>}
                </div>
                <div className="form-group">
                    <label>Commentaire:</label>
                    <textarea name="commentaire" value={formData.commentaire} onChange={handleChange} required />
                    {errors.commentaire && <span>{errors.commentaire}</span>}
                </div>
                <div className="form-group">
                    <label>Pièce Jointe:</label>
                    <input type="file" name="piece_jointe" onChange={handleChange} />
                    {errors.piece_jointe && <span>{errors.piece_jointe}</span>}
                </div>
                <div className="button-group">
                        <button className="btn btn-primary" type="submit">suivre</button>
                        <Link to="/indicateurs" className="btn btn-secondary">Retour au tableau de bord</Link>
                    </div>
            </form>
            {message && <p>{message}</p>}
        </div>
        </div>
    );
};

export default CreateSuiviIndicateurForm;
