import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../DOcumentation/DashboardDocInt.css';

const DashboardRisk = () => {
    const [risks, setRisks] = useState([]);
    const [error, setError] = useState(null);
    const [deleteReussi, setDeleteReussi] = useState(false);

    useEffect(() => {
        const fetchRisks = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/risk/risques/`, {
                    headers: {
                        'Accept': '*/*',
                    }
                });
                setRisks(response.data);
            } catch (error) {
                console.error('Error fetching risks:', error);
                setError(error.message || 'Une erreur s\'est produite lors de la récupération des données.');
            }
        };

        fetchRisks();
        const successMessage = localStorage.getItem('successMessage');
        if (successMessage) {
            toast.success(successMessage);
            localStorage.removeItem('successMessage');
        }
    }, []);

    const handleDelete = async (id) => {
        const headers = {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
        };
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/risk/risques/${id}/`, { headers: headers });
            setDeleteReussi(true);
            setRisks(prevRisks => prevRisks.filter(risk => risk.id !== id));
        } catch (error) {
            console.error('Error deleting document:', error);
            setError(error.message || 'Une erreur s\'est produite lors de la suppression du document.');
        }
    };

    if (error) {
        return <div className="error-message">Erreur : {error}</div>;
    }

    return (
        <div className="dashboard-doc-int">
            <div className="header">
                <h3>Liste des risques</h3>
            </div>
            <div className="documents-container">
                {risks.map(risk => (
                    <div key={risk.id} className="document-card">
                        <div className="document-card-body">
                            <p className="document-card-text"><strong>nom risque:</strong> {risk.nom}</p>
                            <p className="document-card-text"><strong>date_declaration:</strong> {risk.date_declaration}</p>
                            <p className="document-card-text"><strong>declencheur:</strong> {risk.declencheur}</p>
                            <p className="document-card-text"><strong>liste_concernee:</strong> {risk.liste_concernee}</p>
                            <p className="document-card-text"><strong>type_risque:</strong> {risk.type_risque}</p>
                            <p className="document-card-text"><strong>Critères:</strong></p>
                            <ul>
                                {risk.criteres.map((critere, index) => (
                                    <li key={`${risk.id}-critere-${index}`}>
                                        <strong>Nom:</strong> {critere.nom}, <strong>Note:</strong> {critere.note}
                                    </li>
                                ))}
                            </ul>
                            <p className="document-card-text"><strong>Gravité:</strong> {risk.methode_calcul}</p>
                            <p className="document-card-text"><strong>Crée par:</strong> {risk.created_by}</p>
                            <p className="document-card-text"><strong>Crée à:</strong> {risk.created_at}</p>
                            <p className="document-card-text"><strong>Modifié par:</strong> {risk.updated_by ? risk.updated_by : 'pas de modification'}</p>
                            <p className="document-card-text"><strong>Modifié le :</strong> {risk.updated_at ? risk.updated_at : 'pas de modification'}</p>
                            <div className="document-card-buttons">
                                <Link to={`/ModifierRisk/${risk.id}`} className="btn btn-success mt-3">Modifier</Link>
                                <button onClick={() => handleDelete(risk.id)} className="btn btn-danger">Supprimer</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="dashboard-buttons">
                <Link to={`/AjouterRisk/`} className="btn btn-primary">Traiter risque</Link>
            </div>
            <div className="dashboard-buttons">
                <Link to={`/Dashboard/`} className="btn btn-secondary">Retour</Link>
            </div>
        </div>
    );
};

export default DashboardRisk;
