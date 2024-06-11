import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../DOcumentation/DashboardDocInt.css'

const Actions = () => {
    const [risks, setrisks] = useState([]);
    const [error, setError] = useState(null);
    const [deleteReussi, setDeleteReussi] = useState(false);

    useEffect(() => {
        const fetchrisks = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/action/dashboard_action/`, {
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
            await axios.delete(`${process.env.REACT_APP_API_URL}/action/delete_action/${id}/`, { headers: headers });
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
                <h3>Liste des actions</h3>
            </div>
            <div className="documents-container">
                {risks.map(risk => (
                    <div key={risk.id} className="document-card">
                        <div className="document-card-body">
                            <p className="document-card-text"><strong>nom action:</strong> {risk.nom_action}</p>
                            <p className="document-card-text"><strong>designation:</strong> {risk.designation}</p>
                            <p className="document-card-text"><strong>description:</strong> {risk.description}</p>
                            <p className="document-card-text"><strong>type_action:</strong> {risk.type_action}</p>
                            <p className="document-card-text"><strong>source_action:</strong> {risk.source_action}</p>
                            <p className="document-card-text"><strong>cause_action:</strong> {risk.cause_action}</p>
                            <p className="document-card-text"><strong>gravite_action:</strong> {risk.gravite_action}</p>
                            <p className="document-card-text"><strong>priorite_action:</strong> {risk.priorite_action}</p>
                            <p className="document-card-text"><strong>site:</strong> {risk.site}</p>
                            <p className="document-card-text"><strong>responsable_validation:</strong> {risk.responsable_validation}</p>
                            <p className="document-card-text"><strong>Crée par:</strong> {risk.created_by}</p>
                            <p className="document-card-text"><strong>Crée à:</strong> {risk.created_at}</p>
                            <p><strong>Pièces jointes :</strong> {risk.piece_jointe ? <a href={`${process.env.REACT_APP_API_URL}/action/documents/${risk.id}/`} target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>

                            <p className="document-card-text"><strong>Modifié par:</strong> {risk.updated_by ? risk.updated_by : 'pas de modification'}</p>
                            <p className="document-card-text"><strong>Modifié le :</strong> {risk.updated_at ? risk.updated_at : 'pas de modification'}</p>
                            <div className="document-card-buttons">
                                {/* <Link to={`/ModifierRisk/${risk.id}`} className="btn btn-success mt-3">Modifier</Link> */}
                                <button onClick={() => handleDelete(risk.id)} className="btn btn-danger">Supprimer</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="dashboard-buttons">
                <Link to={`/ajouteraction/`} className="btn btn-primary">ajouter action</Link>
            </div>
            <div className="dashboard-buttons">
                <Link to={`/Dashboard/`} className="btn btn-secondary">Retour</Link>
            </div>
        </div>
    );
};

export default Actions;
