import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams, Link } from 'react-router-dom';
import '../Client/client.css';

const AllReclamation = () => {

    const { id } = useParams();

    const [reclamations, setreclamations] = useState([]);
    const [error, setError] = useState(null);
    const [deleteReussi, setDeleteReussi] = useState(false);

    useEffect(() => {
        const fetchReclamations = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/fournisseur/ReclamationFournisseur/${id}/`);
                setreclamations(response.data);
            } catch (error) {
                console.error('Error fetching reclamations:', error);
                setError(error.message || 'Une erreur s\'est produite lors de la récupération des données.');
            }
        };

        fetchReclamations();
    }, [id]);

    const handleDelete = async (id) => {
        const headers = {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
        };
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/fournisseur/delete_ReclamationFournisseur/${id}/`, { headers: headers });
            setDeleteReussi(true);
        } catch (error) {
            console.error('Error deleting evaluation:', error);
            setError(error.message || 'Une erreur s\'est produite lors de la suppression du evaluation.');
        }
    };



    if (error) {
        return <div className="error-message">Erreur : {error}</div>;
    }

    if (deleteReussi) {
        window.location.reload();
    }

    return (
        <div className="dashboard-client-int">
           <div className="evaluations-header">
            <h3>Liste des Réclamations</h3>
        </div>

            <div className="clients-container">
                {reclamations.map(evaluation => (
                    <div key={evaluation.id} className="client-card">
                        <div className="client-card-body">
                            <p><strong>Réclamation N°:</strong> {evaluation.numero_sequentiel}</p>
                            <p><strong>date reclamation:</strong> {evaluation.date_reclamation}</p>
                            <p><strong>description:</strong> {evaluation.description}</p>
                            <p><strong>designation:</strong> {evaluation.designation}</p>
                            <p><strong>type reclamation:</strong> {evaluation.type_reclamation}</p>
                            <p><strong>gravite:</strong> {evaluation.gravite}</p>
                            <p><strong>actions:</strong> {evaluation.actions}</p>
                            <p><strong>Réclamation Client:</strong> {evaluation.reclamation_client}</p>
                            <p><strong>Créé par:</strong> {evaluation.created_by}</p>
                            <p><strong>crée à:</strong> {evaluation.created_at}</p>
                            <p><strong>modifié par:</strong> {evaluation.updated_by}</p>
                            <p><strong>modifié à:</strong> {evaluation.updated_at}</p>
                            <p><strong>Pièces jointes :</strong> {evaluation.pieces_jointes ? <a href={`${process.env.REACT_APP_API_URL}/fournisseur/pieces_jointes_reclamation_fournisseur/${evaluation.id}/`} target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>
                            <div className="document-card-buttons">
                                <Link to={`/modifierDocInt/${evaluation.id}`} className="btn btn-primary">Modifier</Link>
                                <button onClick={() => handleDelete(evaluation.id)} className="btn btn-danger">Supprimer</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="dashboard-buttons">
                <Link to={`/CréerRéclamationFournisseur/${id}/`} className="btn btn-primary">Ajouter réclamation</Link>
            </div>
            <div className="dashboard-buttons">
                <Link to={`/ConsulterFournisseur/${id}`} className="btn btn-secondary">Retour</Link>
            </div>
        </div>
    );
};

export default AllReclamation;
