import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './client.css';

const Allreclamations = () => {

    const { id } = useParams();

    const [reclamations, setreclamations] = useState([]);
    const [error, setError] = useState(null);
    const [deleteReussi, setDeleteReussi] = useState(false);


    useEffect(() => {
        const fetchreclamations = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/CRM/dashboard_reclamation_client/${id}/`, {
                    headers: {
                        'Accept': '*/*',
                    }
                });
                setreclamations(response.data);
            } catch (error) {
                console.error('Error fetching reclamations:', error);
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
            await axios.delete(`${process.env.REACT_APP_API_URL}/CRM/delete_reclamation_client/${id}/`, { headers: headers });
            setDeleteReussi(true);
        } catch (error) {
            console.error('Error deleting réclamation:', error);
            setError(error.message || 'Une erreur s\'est produite lors de la suppression du réclamation.');
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
                <h3>Liste des reclamations</h3>
            </div>
            <div className="reclamations-container">
                {reclamations.map(client => (
                    <div key={client.id} className="client-card">
                        <div className="client-card-body">
                            <p className="client-card-text"><strong>Code Réclamation:</strong> {client.code}</p>
                            <p className="client-card-text"><strong>description:</strong> {client.description}</p>
                            <p className="client-card-text"><strong>type reclamation:</strong> {client.type_reclamation}</p>
                            <p className="client-card-text"><strong>date livraison:</strong> {client.date_livraison}</p>
                            <p className="client-card-text"><strong>gravite:</strong> {client.gravite}</p>
                            <p className="client-card-text"><strong>responsable_traitement:</strong> {client.responsable_traitement}</p>
                            <p className="client-card-text"><strong>decisions:</strong> {client.decisions}</p>
                            <p className="client-card-text"><strong>Crée à:</strong> {client.created_at}</p>
                            <p className="client-card-text"><strong>Crée par:</strong> {client.created_by}</p>
                            <p className="client-card-text"><strong>Modifié à:</strong> {client.updated_at}</p>
                            <p className="client-card-text"><strong>Modifié par:</strong> {client.updated_by}</p>


                        </div>
                        <div className="document-card-buttons">
                                <Link to={`/modifierRéclamation/${client.id}`} className="btn btn-primary">Modifier</Link>
                                <button onClick={() => handleDelete(client.id)} className="btn btn-danger">Supprimer</button>
                            </div>
                    </div>
                ))}
            </div>
            <div className="dashboard-buttons">
                <Link to={`/CréerReclamationClient/${id}/`} className="btn btn-primary">Ajouter Réclamation</Link>
            </div>
            <div className="dashboard-buttons">
                <Link to={`/ConsulterClient/${id}`} className="btn btn-secondary">Retour</Link>
            </div>
        </div>
    );
};

export default Allreclamations;
