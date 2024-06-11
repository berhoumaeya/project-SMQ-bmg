import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import '../DOcumentation/DashboardDocInt.css'

const DashboardConformite = () => {
    const [risks, setrisks] = useState([]);
    const [error, setError] = useState(null);
    const [deleteReussi, setDeleteReussi] = useState(false);

    useEffect(() => {
        const fetchrisks = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/conformite/dashboard_Exigence/`, {
                    headers: {
                        'Accept': '*/*',
                    }
                });
                setrisks(response.data);
            } catch (error) {
                console.error('Error fetching risks:', error);
                setError(error.message || 'Une erreur s\'est produite lors de la récupération des données.');
            }
        };

        fetchrisks();
    }, []);

    const handleDelete = async (id) => {
        const headers = {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
        };
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/conformite/delete_Exigence/${id}/`, { headers: headers });
            setDeleteReussi(true);
        } catch (error) {
            console.error('Error deleting document:', error);
            setError(error.message || 'Une erreur s\'est produite lors de la suppression du document.');
        }
    };


    if (error) {
        return <div className="error-message">Erreur : {error}</div>;
    }

    if (deleteReussi) {
        window.location.reload();
    }

    return (
        <div className="dashboard-doc-int">
            <div className="header">
                <h3>Liste des Conformité reglementaire</h3>
            </div>
            <div className="documents-container">
                {risks.map(risk => (
                    <div key={risk.id} className="document-card">
                        <div className="document-card-body">
                            <p className="document-card-text"><strong>nom conformite:</strong> {risk.nom}</p>
                            <p className="document-card-text"><strong>type_fiche:</strong> {risk.type_fiche}</p>
                            <p className="document-card-text"><strong>source:</strong> {risk.source}</p>
                            <p className="document-card-text"><strong>type_decideur:</strong> {risk.type_decideur}</p>
                            <p className="document-card-text"><strong>Crée par:</strong> {risk.created_by}</p>
                            <p className="document-card-text"><strong>Crée à:</strong> {risk.created_at}</p>
                            <p className="document-card-text"><strong>Modifié par:</strong> {risk.updated_by ? risk.updated_by : 'pas de modification'}</p>
                            <p className="document-card-text"><strong>Modifié le :</strong> {risk.updated_at ? risk.updated_at : 'pas de modification'}</p>
                            <p><strong>Pièces jointes :</strong> {risk.pieces_jointes ? <a href={`${process.env.REACT_APP_API_URL}/conformite/pieces_jointes_conformité/${risk.id}/`} target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>
                            <p className="document-card-text"><strong>exigence_dec:</strong> {risk.exigence_dec ? 'exist' : 'Non' }</p>
                            {risk.exigence_dec ? (
                                <>
                                 <p className="document-card-text"><strong>nom_reglementation:</strong> {risk.nom_reglementation}</p>
                                 <p className="document-card-text"><strong>applicable:</strong> {risk.applicable ? 'oui' : 'Non'}</p>
                                 <p className="document-card-text"><strong>plan_action:</strong> {risk.plan_action ? risk.plan_action : 'null'}</p>
                                 </>
                            ):(
                                <></>
                            )}
                            <div className="document-card-buttons">
                                <Link to={`/ModifierConformite/${risk.id}`} className="btn btn-success mt-3">Modifier</Link>
                                <button onClick={() => handleDelete(risk.id)} className="btn btn-danger">Supprimer</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="dashboard-buttons">
                <Link to={`/AjouterConformite/`} className="btn btn-primary">Ajouter Conformité</Link>
            </div>
            <div className="dashboard-buttons">
                <Link to={`/Dashboard/`} className="btn btn-secondary">Retour</Link>
            </div>
        </div>
    );
};

export default DashboardConformite;
