import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Navigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './forms.css';

const CreateSuggestion = () => {
    const { id } = useParams();
    const [errors, setErrors] = useState({});
    const [pieces_jointes, setPiecesJointes] = useState(null);
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [type_suggestion, setTypeSuggestion] = useState('');
    const [actions, setActions] = useState('');
    const [receptionnaire, setReceptionnaire] = useState('');
    const [receptionnaires, setReceptionnaires] = useState([]);
    const [ajoutReussi, setAjoutReussi] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/user/users/`)
            .then(response => setReceptionnaires(response.data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setPiecesJointes(selectedFile);
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
                console.log('Suggestion créée avec succès:', response.data);
                setName('');
                setDate('');
                setDescription('');
                setTypeSuggestion('');
                setActions('');
                setReceptionnaire('');
                setAjoutReussi(true);
            })
            .catch(error => {
                console.error('Error creating suggestion:', error);
                setErrors(error.response?.data || { message: 'Une erreur s\'est produite lors de la création du document.' });
            });
    };

    if (ajoutReussi) {
        return <Navigate to={`/AllSuggestion/${id}/`} />;
    }

    return (
        <main style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="container ajout-form">
                <div className="contact-image">
                    <img src="/images/add.png" alt="add_suggestion" />
                    <div className="button-container">
                        <Link to={`/AllSuggestion`}>
                            <button className="retour">Retour</button>
                        </Link>
                        <button className="button-add" type="submit" form="add-suggestion-form">Ajouter une suggestion</button>
                    </div>
                </div>
                <form id="add-suggestion-form" onSubmit={handleSubmit} className="row">
                    <div className="col-md-6">
                        <div className="form-label">
                            <label className="form-label">Nom:</label>
                            <input type="text" className="form-control" placeholder='Nom*' value={name} onChange={(e) => setName(e.target.value)} />
                            {errors.name && <p className="error-text">{errors.name}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Date:</label>
                            <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} />
                            {errors.date && <p className="error-text">{errors.date}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Description:</label>
                            <input type="text" className="form-control" placeholder='Description*' value={description} onChange={(e) => setDescription(e.target.value)} />
                            {errors.description && <p className="error-text">{errors.description}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Actions:</label>
                            <input type="text" className="form-control" placeholder='Actions' value={actions} onChange={(e) => setActions(e.target.value)} />
                            {errors.actions && <p className="error-text">{errors.actions}</p>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-label">
                            <label className="form-label">Type de Suggestion:</label>
                            <select className="form-control" value={type_suggestion} onChange={(e) => setTypeSuggestion(e.target.value)}>
                                <option value="">Sélectionner...</option>
                                <option value="FEATURE_REQUEST">FEATURE_REQUEST</option>
                                <option value="BUG_REPORT">BUG_REPORT</option>
                                <option value="GENERAL_FEEDBACK">GENERAL_FEEDBACK</option>
                            </select>
                            {errors.type_suggestion && <p className="error-text">{errors.type_suggestion}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Réceptionnaire:</label>
                            <select className="form-control" value={receptionnaire} onChange={(e) => setReceptionnaire(e.target.value)}>
                                <option value="">Sélectionner...</option>
                                {receptionnaires.map((user) => (
                                    <option key={user.id} value={user.id}>{user.username}</option>
                                ))}
                            </select>
                            {errors.receptionnaire && <p className="error-text">{errors.receptionnaire}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Pièces Jointes:</label>
                            <input type="file" className="form-control" onChange={handleFileChange} />
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default CreateSuggestion;
