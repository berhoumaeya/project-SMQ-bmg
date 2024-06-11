import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './client.css';

const AllEnquetes = () => {

    const { id } = useParams();

    const [reclamations, setreclamations] = useState([]);
    const [error, setError] = useState(null);
    const [deleteReussi, setDeleteReussi] = useState(false);


    useEffect(() => {
        const fetchreclamations = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/CRM/dashboard_enquete/`, {
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
            await axios.delete(`${process.env.REACT_APP_API_URL}/CRM/delete_enquete/${id}/`, { headers: headers });
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
                <h3>Liste des Enquetes</h3>
            </div>
            <div className="clients-container">
                {reclamations.map(client => (
                    <div key={client.id} className="client-card">
                        <div className="client-card-body">
                            <p className="client-card-text"><strong>Name Enquete:</strong> {client.name_enquete}</p>
                            <p className="client-card-text"><strong>Date debut:</strong> {client.date_debut}</p>
                            <p className="client-card-text"><strong>Date fin:</strong> {client.date_fin}</p>
                            <p className="client-card-text"><strong>Type questionnaire:</strong> {client.type_questionnaire}</p>
                            <p className="client-card-text"><strong>les clients:</strong> {client.clients.join(', ')}</p>
                            <p><strong>Pièces jointes :</strong> {client.pieces_jointes ? <a href={`${process.env.REACT_APP_API_URL}/CRM/pieces_jointes_enquete_client/${client.id}/`} target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>
                            <p className="client-card-text"><strong>Crée à:</strong> {client.created_at}</p>
                            <p className="client-card-text"><strong>Crée par:</strong> {client.created_by}</p>
                            <p className="client-card-text"><strong>Modifié à:</strong> {client.updated_at ? client.updated_at : 'Pas de modification'}</p>
                            <p className="client-card-text"><strong>Modifié par:</strong> {client.updated_by ? client.updated_by : 'Pas de modification'}</p>
                            <div className="document-card-buttons">
                                <Link to={`/modifierRéclamation/${client.id}`} className="btn btn-primary">Modifier</Link>
                                <button onClick={() => handleDelete(client.id)} className="btn btn-danger">Supprimer</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="dashboard-buttons">
                <Link to={`/CréerEnquete/`} className="btn btn-primary">Ajouter Enquete</Link>
            </div>
            <div className="dashboard-buttons">
                <Link to={`/DashboardClient/`} className="btn btn-secondary">Retour</Link>
            </div>
        </div>
    );
};

export default AllEnquetes;
