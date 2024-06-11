import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './client.css';

const AllSuggestions = () => {

    const { id } = useParams();

    const [reclamations, setreclamations] = useState([]);
    const [error, setError] = useState(null);
    const [deleteReussi, setDeleteReussi] = useState(false);


    useEffect(() => {
        const fetchreclamations = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/CRM/dashboard_suggestion/${id}/`, {
                    headers: {
                        'Accept': '*/*',
                    }
                });
                setreclamations(response.data);
            } catch (error) {
                console.error('Error fetching enquetes:', error);
                setError(error.message || 'Une erreur s\'est produite lors de la récupération des données.');
            }
        };

        fetchreclamations();
    }, [id]);

    const handleDelete = async (id) => {
        const headers = {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
        };
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/CRM/delete_suggestion/${id}/`, { headers: headers });
            setDeleteReussi(true);
        } catch (error) {
            console.error('Error deleting enquete:', error);
            setError(error.message || 'Une erreur s\'est produite lors de la suppression du enquete.');
        }
    };

    if (error) {
        return <div className="error-message">Erreur : {error}</div>;
    }

    if (deleteReussi) {
        window.location.reload();
    }

    return (
        <div className="dashboard-client-int">
            <div className="header">
                <h3>Liste des Suggestions</h3>
            </div>
            <div className="clients-container">
                {reclamations.map(client => (
                    <div key={client.id} className="client-card">
                        <div className="client-card-body">
                            <p className="client-card-text"><strong>Nom Enquete:</strong> {client.name}</p>
                            <p className="client-card-text"><strong>date:</strong> {client.date}</p>
                            <p className="client-card-text"><strong>type_suggestion:</strong> {client.type_suggestion}</p>
                            <p className="client-card-text"><strong>receptionnaire:</strong> {client.receptionnaire}</p>
                            <p className="client-card-text"><strong>description:</strong> {client.description}</p>
                            <p className="client-card-text"><strong>actions:</strong> {client.actions}</p>
                            <p><strong>Pièces jointes :</strong> {client.pieces_jointes ? <a href={`${process.env.REACT_APP_API_URL}/CRM/pieces_jointes_suggestion_client/${client.id}/`} target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>
                            <p className="client-card-text"><strong>Crée à:</strong> {client.created_at}</p>
                            <p className="client-card-text"><strong>Crée par:</strong> {client.created_by}</p>
                            <p className="client-card-text"><strong>Modifié à:</strong> {client.updated_at}</p>
                            <p className="client-card-text"><strong>Modifié par:</strong> {client.updated_by}</p>
                            <div className="document-card-buttons">
                                <Link to={`/modifierRéclamation/${client.id}`} className="btn btn-primary">Modifier</Link>
                                <button onClick={() => handleDelete(client.id)} className="btn btn-danger">Supprimer</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="dashboard-buttons">
                <Link to={`/CréerSuggestionClient/${id}/`} className="btn btn-primary">Ajouter Enquete</Link>
            </div>
            <div className="dashboard-buttons">
                <Link to={`/ConsulterClient/${id}`} className="btn btn-secondary">Retour</Link>
            </div>
        </div>
    );
};

export default AllSuggestions;
