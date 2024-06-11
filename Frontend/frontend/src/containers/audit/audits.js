import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../DOcumentation/DashboardDocInt.css'

const Audits = () => {
    const [risks, setrisks] = useState([]);
    const [error, setError] = useState(null);
    const [deleteReussi, setDeleteReussi] = useState(false);

    useEffect(() => {
        const fetchrisks = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/audit/dashboard_audit_all/`, {
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
            await axios.delete(`${process.env.REACT_APP_API_URL}/audit/delete_audit/${id}/`, { headers: headers });
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
                <h3>Liste des audits</h3>
            </div>
            <div className="documents-container">
                {risks.map(risk => (
                    <div key={risk.id} className="document-card">
                        <div className="document-card-body">
                            <p className="document-card-text"><strong>Reference audit:</strong> {risk.reference}</p>
                            <p className="document-card-text"><strong>designation:</strong> {risk.designation}</p>
                            <p className="document-card-text"><strong>type_audit:</strong> {risk.type_audit}</p>
                            <p className="document-card-text"><strong>statut:</strong> {risk.statut}</p>
                            <div className="document-card-buttons">
                                <button onClick={() => handleDelete(risk.id)} className="btn btn-danger">Supprimer</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="dashboard-buttons">
                <Link to={`/valideraudit/`} className="btn btn-primary">valider audit</Link>
            </div>
            <div className="dashboard-buttons">
                <Link to={`/ajouteraudit/`} className="btn btn-primary">ajouter audit</Link>
            </div>
            <div className="dashboard-buttons">
                <Link to={`/Dashboard/`} className="btn btn-secondary">Retour</Link>
            </div>
        </div>
    );
};

export default Audits;
