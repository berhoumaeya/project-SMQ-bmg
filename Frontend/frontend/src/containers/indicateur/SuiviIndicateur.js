import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams ,Link , Navigate} from 'react-router-dom';
import '../DOcumentation/DashboardDocInt.css'


const SuiviIndicateur = () => {
    const { id } = useParams();

    const [all, setindicateurs] = useState([]);
    const [error, setError] = useState(null);
    const [deleteReussi, setDeleteReussi] = useState(false);

    useEffect(() => {
        const fetchindicateurs = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/indicateur/dashboard_SuiviIndicateur/${id}/`);
                setindicateurs(response.data);
            } catch (error) {
                console.error('Error fetching indicateurs:', error);
                setError(error.message || 'Une erreur s\'est produite lors de la récupération des données.');
            }
        };

        fetchindicateurs();
    }, [id]);

    const handleDelete = async (id) => {
        const headers = {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
        };
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/indicateur/delete_SuiviIndicateur/${id}/`, { headers: headers });
            setDeleteReussi(true);
        } catch (error) {
            console.error('Error deleting réunion:', error);
            setError(error.message || 'Une erreur s\'est produite lors de la suppression du réunion.');
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
            <h3>Liste des suivis</h3>
            <div className="documents-container">
                {all.map(indicateurs => (
                    <div  className="document-card">
                        <div className="document-card-body">
                            <p className="document-card-text"><strong>frequence:</strong> {indicateurs.frequence}</p>
                            <p className="document-card-text"><strong>objectif:</strong> {indicateurs.objectif}</p>
                            <p className="document-card-text"><strong>limite_critique:</strong> {indicateurs.limite_critique}</p>
                            <p className="document-card-text"><strong>resultat:</strong> {indicateurs.resultat}</p>
                            <p className="document-card-text"><strong>commentaire:</strong> {indicateurs.commentaire}</p>
                            <p className="document-card-text"><strong>Pièces jointes :</strong> {indicateurs.piece_jointe ? <a href={`${process.env.REACT_APP_API_URL}/indicateur/pieces_jointes_suivi/${id}/`} target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>
                            <p className="document-card-text"><strong>Crée par:</strong> {indicateurs.created_by}</p>
                            <p className="document-card-text"><strong>Crée à:</strong> {indicateurs.created_at}</p>

                            <div className="document-card-buttons">
                                <button onClick={() => handleDelete(indicateurs.id)} className="btn btn-danger">Supprimer</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="dashboard-buttons">
                <Link to={`/indicateurs/`} className="btn btn-secondary">Retour</Link>
            </div>
        </div>
    );
};

export default SuiviIndicateur;
