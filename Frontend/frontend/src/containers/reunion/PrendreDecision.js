import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {useParams, Navigate ,Link} from 'react-router-dom';

const AddDecision = () => {

    const { id } = useParams();

    const [errors, setErrors] = useState({});
    const [actions, setactions] = useState([]);
    const [action_prise, setaction_prise] = useState('');
    const [decision_text, setdecision_text] = useState('');
    const [ajoutReussi, setAjoutReussi] = useState(false);


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/action/dashboard_action/`)
            .then(response => setactions(response.data))
            .catch(error => console.error('Error fetching responsables:', error));
    }, [id]);


   


    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('action_prise', action_prise);
        formData.append('decision_text', decision_text);
        axios.post(`${process.env.REACT_APP_API_URL}/reunion/create_Decision/${id}/`, formData, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            }
        })
        .then(response => {
            console.log('réunion added successfully:', response.data);
            setAjoutReussi(true);
            setaction_prise('');
            setdecision_text('');
        })
        .catch(error => {
            console.error('There was an error adding the réunion:', error.response.data);
            setErrors(error.response?.data || { message: 'Une erreur s\'est produite lors de la création du réunion.' });
        });
    };

    if (ajoutReussi) {
        return <Navigate to={`/ConsulterReunion/${id}/`} />;
    }

    return (
        <div className="form-container">
        <div className="form-card">
            <h3>Ajouter risque</h3>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label>decision :</label>
                    {errors.decision_text && <p className="error-text">{errors.decision_text}</p>}
                    <input type="text" name="decision_text" value={decision_text} onChange={(e) => setdecision_text(e.target.value)} />
                </div>
                <div className="form-group">
                        <label>Plan Actions:</label>
                        {errors.action_prise && <p className="error-text">{errors.action_prise}</p>}
                        <select value={action_prise} onChange={(e) => setaction_prise(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            {actions.map(action_prise => (
                                <option key={action_prise.id} value={action_prise.id}>{action_prise.nom_action}</option>
                            ))}
                        </select>
                    </div>
                <div className="button-group">
                    <button className="btn btn-primary" type="submit">Prendre décision</button>
                    <Link to="/allreunion" className="btn btn-secondary">Retour au tableau de bord</Link>
                </div>
            </form>
        </div>
    </div>
);
};

export default AddDecision;
