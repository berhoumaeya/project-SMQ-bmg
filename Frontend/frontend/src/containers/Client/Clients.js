import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './client.css';

const AllClients = () => {
    const [clients, setclients] = useState([]);
    const [error, setError] = useState(null);
   

    useEffect(() => {
        const fetchclients = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/CRM/client/`, {
                    headers: {
                        'Accept': '*/*',
                    }
                });
                setclients(response.data);
            } catch (error) {
                console.error('Error fetching clients:', error);
                setError(error.message || 'Une erreur s\'est produite lors de la récupération des données.');
            }
        };

        fetchclients();
    }, []);

    if (error) {
        return <div className="error-message">Erreur : {error}</div>;
    }

    return (
        <div className="dashboard-client-int">
            <div className="header">
                <h3>Liste des clients</h3>
               
            </div>
            <div className="clients-container">
                {clients.map(client => (
                    <div key={client.id} className="client-card">
                        <div className="client-card-body">
                            <p className="client-card-text"><strong>nom client:</strong> {client.nom}</p>
                            <p className="client-card-text"><strong>Code client:</strong> {client.code_client}</p>
                            <div className="client-card-buttons">
                                <Link to={`/ConsulterClient/${client.id}/`} className="btn btn-primary">Consulter</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="dashboard-buttons">
                <Link to={`/CréerClient/`} className="btn btn-primary">Ajouter Client</Link>
            </div>
            <div className="dashboard-buttons">
                <Link to={`/DashboardClient/`} className="btn btn-secondary">Retour</Link>
            </div>
        </div>
    );
};

export default AllClients;
