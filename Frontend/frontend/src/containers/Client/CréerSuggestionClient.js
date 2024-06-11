import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Navigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const CreateSuggestion = () => {

    const { id } = useParams();

    const [errors, setErrors] = useState({});

    const [pieces_jointes, setpieces_jointes] = useState(null);
    const [ajoutReussi, setAjoutReussi] = useState(false);

    const [name, setname] = useState('');
    const [date, setdate] = useState('');
    const [description, setDescription] = useState('');
    const [type_suggestion, settype_suggestion] = useState('');
    const [actions, setactions] = useState('');
    const [receptionnaire, setreceptionnaire] = useState('');
    const [receptionnaires, setreceptionnaires] = useState([]);



    useEffect(() => {
        
        axios.get(`${process.env.REACT_APP_API_URL}/user/users/`)
            .then(response => setreceptionnaires(response.data))
            .catch(error => console.error('Error fetching user:', error));

    }, [id]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setpieces_jointes(selectedFile);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('actions', actions);
        formData.append('type_suggestion', type_suggestion);
        formData.append('date', date);
        formData.append('receptionnaire', receptionnaire);
        
        if (pieces_jointes) {
            formData.append('pieces_jointes', pieces_jointes);
        }

        const headers = {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': Cookies.get('csrftoken')
        };

        axios.post(`${process.env.REACT_APP_API_URL}/CRM/create_suggestion/${id}/`, formData, { headers })
            .then(response => {
                console.log('Document interne créé avec succès:', response.data);
                setname('');
                setreceptionnaire('');
                setDescription('');
                setdate('');
                setactions('');
                setreceptionnaire('');

                setAjoutReussi(true);
            })
            .catch(error => {
                console.error('Error creating document:', error);
                setErrors(error.response?.data || { message: 'Une erreur s\'est produite lors de la création du document.' });
            });


        }

    if (ajoutReussi) {
        return <Navigate to={`/AllSuggestion/${id}/`} />;
    }

    return (
        <div className="form-container">
            <div className="form-card">
                <h3>Ajouter Suggestion</h3>
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label>name:</label>
                        {errors.name && <p className="error-text">{errors.name}</p>}
                        <input type="text" name="name" value={name} onChange={(e) => setname(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        {errors.description && <p className="error-text">{errors.description}</p>}
                        <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Actions:</label>
                        {errors.actions && <p className="error-text">{errors.actions}</p>}
                        <input type="text" name="actions" value={actions} onChange={(e) => setactions(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Type Suggestion:</label>
                        {errors.type_suggestion && <p className="error-text">{errors.type_suggestion}</p>}
                        <select value={type_suggestion} onChange={(e) => settype_suggestion(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            <option value="FEATURE_REQUEST">FEATURE_REQUEST</option>
                            <option value="BUG_REPORT">BUG_REPORT</option>
                            <option value="GENERAL_FEEDBACK">GENERAL_FEEDBACK</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Date :</label>
                        <input type="date" name="date" value={date} onChange={(e) => setdate(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Receptionnaire:</label>
                        {errors.receptionnaire && <p className="error-text">{errors.receptionnaire}</p>}
                        <select value={receptionnaire} onChange={(e) => setreceptionnaire(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            {receptionnaires.map(receptionnaire => (
                                <option key={receptionnaire.id} value={receptionnaire.id}>{receptionnaire.username}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Pièces jointes :</label>
                        <input type="file" onChange={(e) => handleFileChange(e, setpieces_jointes)} />
                    </div>
                    <div className="button-group">
                        <button className="btn btn-success mt-3" type="submit">Ajouter Réclamation</button>
                        <Link to={`/AllSuggestion/${id}`} className="btn btn-gray mt-3">Retour au tableau de bord</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateSuggestion;
