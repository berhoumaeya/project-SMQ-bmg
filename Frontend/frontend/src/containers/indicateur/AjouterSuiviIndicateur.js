import React, { useState } from 'react';
import axios from 'axios';
import { useParams, Navigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../Client/forms.css';

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
            await axios.post(`${process.env.REACT_APP_API_URL}/indicateur/create_SuiviIndicateur/${id}/`, data, {
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
        <main style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="container ajout-form">
                <div className="contact-image">
                    <img src="/images/add.png" alt="add_indicateur" />
                    <div className="button-container">
                        <Link to="/indicateurs">
                            <button className="retour">Retour au tableau de bord</button>
                        </Link>
                        <button className="button-add" type="submit" form="create-suivi-form">Suivre</button>
                    </div>
                </div>
                <form id="create-suivi-form" onSubmit={handleSubmit} className="row">
                    <div className="col-md-6">
                        <div className="form-label">
                            <label className="form-label">Fréquence:</label>
                            <input type="text" className="form-control" placeholder='Fréquence*' name="frequence" value={formData.frequence} onChange={handleChange} />
                            {errors.frequence && <p className="error-text">{errors.frequence}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Objectif:</label>
                            <textarea className="form-control" placeholder='Objectif*' name="objectif" value={formData.objectif} onChange={handleChange} />
                            {errors.objectif && <p className="error-text">{errors.objectif}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Limite Critique:</label>
                            <input type="number" step="0.01" className="form-control" placeholder='Limite Critique*' name="limite_critique" value={formData.limite_critique} onChange={handleChange} />
                            {errors.limite_critique && <p className="error-text">{errors.limite_critique}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Résultat:</label>
                            <input type="number" step="0.01" className="form-control" placeholder='Résultat*' name="resultat" value={formData.resultat} onChange={handleChange} />
                            {errors.resultat && <p className="error-text">{errors.resultat}</p>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-label">
                            <label className="form-label">Commentaire:</label>
                            <textarea className="form-control" placeholder='Commentaire' name="commentaire" value={formData.commentaire} onChange={handleChange} />
                            {errors.commentaire && <p className="error-text">{errors.commentaire}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Pièce Jointe:</label>
                            <input type="file" className="form-control" name="piece_jointe" onChange={handleChange} />
                            {errors.piece_jointe && <p className="error-text">{errors.piece_jointe}</p>}
                        </div>
                    </div>
                </form>
                {message && <p className="success-message">{message}</p>}
            </div>
        </main>
    );
};

export default CreateSuiviIndicateurForm;
