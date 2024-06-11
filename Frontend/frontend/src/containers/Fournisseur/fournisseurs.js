import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Client/client.css';

const AllFournisseurs = () => {
    const [fournisseurs, setfournisseurs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchfournisseurs = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/fournisseur/dashboard_Fournisseur/`, {
                    headers: {
                        'Accept': '*/*',
                    }
                });
                setfournisseurs(response.data);
            } catch (error) {
                console.error('Error fetching fournisseurs:', error);
                setError(error.message || 'Une erreur s\'est produite lors de la récupération des données.');
            }
        };

        fetchfournisseurs();
    }, []);

    if (error) {
        return <div className="error-message">Erreur : {error}</div>;
    }

    return (
        <div className="dashboard-client-int">
            <div className="header">
                <h3>Liste des fournisseurs</h3>
            </div>
            <div className="clients-container">
                {fournisseurs.map(fournisseur => (
                    <div key={fournisseur.id} className="client-card">
                        <div className="client-card-body">
                            <p className="client-card-text"><strong>nom Fournisseur:</strong> {fournisseur.nom}</p>
                            <p className="client-card-text"><strong>Code Fournisseur:</strong> {fournisseur.code_fournisseur}</p>
                            <div className="client-card-buttons">
                                <Link to={`/ConsulterFournisseur/${fournisseur.id}/`} className="btn btn-primary">Consulter</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="dashboard-buttons">
                <Link to={`/CréerFournisseur/`} className="btn btn-primary">Ajouter Fournisseur</Link>
            </div>
            <div className="dashboard-buttons">
                <Link to={`/Dashboard/`} className="btn btn-secondary">Retour</Link>
            </div>
        </div>
    );
};

export default AllFournisseurs;
