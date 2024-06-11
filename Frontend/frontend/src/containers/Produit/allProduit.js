import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../DOcumentation/DashboardDocInt.css';

const DashboardProduit = () => {
    const [risks, setRisks] = useState([]);
    const [error, setError] = useState(null);
    const [deleteReussi, setDeleteReussi] = useState(false);

    useEffect(() => {
        const fetchRisks = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/produit/dashboard_Produit/`, {
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
            await axios.delete(`${process.env.REACT_APP_API_URL}/produit/delete_Produit/${id}/`, { headers: headers });
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
                <h3>Liste des Non conforme</h3>
            </div>
            <div className="documents-container">
                {risks.map(risk => (
                    <div key={risk.id} className="document-card">
                        <div className="document-card-body">
                            <p className="document-card-text"><strong>Fiche Non Conforme N°:</strong> {risk.id}</p>
                            <p className="document-card-text"><strong>date_detection:</strong> {risk.date_detection}</p>
                            <p className="document-card-text"><strong>designation_produit_non_conforme:</strong> {risk.designation_produit_non_conforme}</p>
                            <p className="document-card-text"><strong>reclamation_client:</strong> {risk.reclamation_client}</p>
                            <p className="document-card-text"><strong>description_non_conformite:</strong> {risk.description_non_conformite}</p>
                            <p className="document-card-text"><strong>produits_non_conformes:</strong> {risk.produits_non_conformes}</p>
                            <p className="document-card-text"><strong>type_non_conformite:</strong> {risk.type_non_conformite}</p>
                            <p className="document-card-text"><strong>source_non_conformite:</strong> {risk.source_non_conformite}</p>
                            <p className="document-card-text"><strong>niveau_gravite:</strong> {risk.niveau_gravite}</p>
                            <p className="document-card-text"><strong>reclamation_client:</strong> {risk.reclamation_client}</p>

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
                <Link to={`/AjouterNonConforme/`} className="btn btn-primary">Ajouter Non conforme</Link>
            </div>
            <div className="dashboard-buttons">
                <Link to={`/Dashboard/`} className="btn btn-secondary">Retour</Link>
            </div>
        </div>
    );
};

export default DashboardProduit;
