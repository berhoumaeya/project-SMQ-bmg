import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './accept.css'

const DemandeAcc = () => {
    const [demandes, setFormations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFormations = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/doc/document-Accepted/`, {
                    headers: {
                        'Accept': '*/*', 
                    }
                });
                setFormations(response.data);
            } catch (error) {
                console.error('Error fetching demandes:', error);
                setError(error.message || 'Une erreur s\'est produite lors de la récupération des données.');
            }
        };

        fetchFormations();
    }, []);

    if (error) {
        return <div>Erreur : {error}</div>;
    }

    return (
        <div className="demandes-container">
        <div className="demandes-header">
            <h3>Liste des Demandes Acceptées</h3>
        </div>
        <div className="card-list">
            {demandes.map(demande => (
                <div key={demande.id} className="demande-card">
                    <div className="demande-details">
                        <p className="demande-id">Demande N°: {demande.id}</p>
                        <p className="demande-type">Type document: {demande.type}</p>
                        <p className="demande-object">Objet: {demande.document_object}</p>
                        <p className="demande-status">Statut: {demande.statut}</p>
                    </div>
                    <div className="demande-footer">
                        <Link to={`/CréerDocInt/${demande.id}`} className="btn btn-primary">Créer document</Link>
                    </div>
                </div>
            ))}
        </div>
        <div className="button-group">
            <Link to={`/CréerDemande/`} className="btn btn-primary">Ajouter demande</Link>
            <Link to={`/DashboardDocInt/`} className="btn btn-secondary">Retour</Link>
        </div>
    </div>
    
    );
};

export default DemandeAcc;
