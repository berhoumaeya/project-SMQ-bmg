import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link,useParams } from 'react-router-dom';
import './DashboardDocInt.css';

const Archive = () => {
    const { id } = useParams();
    const [documents, setDocuments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/doc/historique/${id}`);
                setDocuments(response.data);
            } catch (error) {
                console.error('Error fetching documents:', error);
                setError(error.message || 'Une erreur s\'est produite lors de la récupération des données.');
            }
        };

        fetchDocuments();
    }, [id]);



    if (error) {
        return <div className="error-message">Erreur : {error}</div>;
    }
    return (
        <div className="dashboard-doc-int">
            <div className="header">
                <h3>Liste d'archive du document</h3>
            </div>
            <div className="documents-container">
                {documents.map(doc => (
                    <div key={doc.id} className="document-card">
                        <div className="document-card-body">
                            <p className="document-card-text"><strong>libelle:</strong> {doc.libelle}</p>
                            <p className="document-card-text"><strong>Type:</strong> {doc.type}</p>
                            <p className="document-card-text"><strong>Site:</strong> {doc.selection_site}</p>
                            <p className="document-card-text"><strong>Activité:</strong> {doc.selection_activite}</p>
                            <p className="document-card-text"><strong>Vérificateur:</strong> {doc.selection_verificateur}</p>
                            <p className="document-card-text"><strong>Approbateur:</strong> {doc.selection_approbateur}</p>
                            <p className="document-card-text"><strong>Liste informée:</strong> {doc.liste_informee.join(', ')}</p>
                            <p className="document-card-text"><strong>Modifié par:</strong> {doc.updated_by}</p>
                            <p className="document-card-text"><strong>Modifié le :</strong> {doc.updated_at}</p>
                            <p className="document-card-text"><strong>Crée par:</strong> {doc.selection_redacteur}</p>
                            <p className="document-card-text"><strong>Crée à:</strong> {doc.created_at}</p>
                            <p className="document-card-text"><strong>statut:</strong> {doc.statut}</p>
                            <p><strong>Pièces jointes :</strong> {doc.fichier ? <a href={`${process.env.REACT_APP_API_URL}/doc/documents/${doc.id}/`} target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="dashboard-buttons">
                <Link to={`/DashboardDocInt/`}><button className="retour">Retour </button></Link>
            </div>
        </div>
    );
};

export default Archive;
