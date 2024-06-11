import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams, Link } from 'react-router-dom';
import Cookies from 'js-cookie';


const DashboardCompetence = () => {
    const { id } = useParams();

    const [competences, setFormations] = useState([]);
    const [deleteReussi, setDeleteReussi] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFormations = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_evaluation_competence/${id}/`, {
                    headers: {
                        'Accept': '*/*', 
                    }
                });
                setFormations(response.data);
            } catch (error) {
                console.error('Error fetching formations:', error);
                setError(error.message || 'Une erreur s\'est produite lors de la récupération des données.');
            }
        };

        fetchFormations();
    }, [id]);
    const handleDelete = async (id) => {
        const headers = {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
        };
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/RH/delete_evaluation_competence/${id}/`, { headers: headers });
            setDeleteReussi(true);
        } catch (error) {
            console.error('Error deleting document:', error);
            setError(error.message || 'Une erreur s\'est produite lors de la suppression du document.');
        }
    };

    if (error) {
        return <div>Erreur : {error}</div>;
    }
    if (deleteReussi) {
        window.location.reload();
    }

    return (
        <div className="dashboard-doc-int">
        <div className="header">
            <h3>Evaluations :</h3>
        </div>
        <div className="documents-container">
            {competences.map(risk => (
                <div key={risk.id} className="document-card">
                    <div className="document-card-body">
                        <p className="document-card-text"><strong>nom evaluation:</strong> {risk.name}</p>
                        <p className="document-card-text"><strong>commentaires:</strong> {risk.commentaires}</p>
                        <p className="document-card-text"><strong>Competences:</strong></p>
                        <ul>
                            {risk.criteres.map((critere, index) => (
                                <li key={`${risk.id}-critere-${index}`}>
                                    <strong>Nom:</strong> {critere.skills_acquis}, <strong>Note acquis:</strong> {critere.note_acquis} , <strong>Note requis:</strong> {critere.note_requis}
                                </li>
                            ))}
                        </ul>
                        <p className="document-card-text"><strong>total_acquis:</strong> {risk.total_acquis}</p>
                        <p className="document-card-text"><strong>total_requis:</strong> {risk.total_requis}</p>
                        <p className="document-card-text"><strong>Crée par:</strong> {risk.created_by}</p>
                        <p className="document-card-text"><strong>Crée à:</strong> {risk.created_at}</p>
                        <div className="document-card-buttons">
                            <button onClick={() => handleDelete(risk.id)} className="btn btn-danger">Supprimer</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className="dashboard-buttons">
            <Link to={`/ajouter-competence/${id}`} className="btn btn-primary">Evaluer</Link>
        </div>
        <div className="dashboard-buttons">
            <Link to={`/employe/${id}/`} className="btn btn-secondary">Retour</Link>
        </div>
    </div>
    );
};

export default DashboardCompetence;
