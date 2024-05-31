import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams ,Link , Navigate} from 'react-router-dom';
import '../Client/client.css';


const Fournisseur = () => {
    const { id } = useParams();

    const [fournisseurs, setfournisseurs] = useState([]);
    const [error, setError] = useState(null);
    const [deleteReussi, setDeleteReussi] = useState(false);

    useEffect(() => {
        const fetchfournisseurs = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/fournisseur/Fournisseur/${id}/`, {
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
    }, [id]);

    const handleDelete = async (id) => {
        const headers = {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
        };
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/fournisseur/delete_Fournisseur/${id}/`, { headers: headers });
            setDeleteReussi(true);
        } catch (error) {
            console.error('Error deleting fournisseur:', error);
            setError(error.message || 'Une erreur s\'est produite lors de la suppression du fournisseur.');
        }
    };


    if (error) {
        return <div className="error-message">Erreur : {error}</div>;
    }

    if (deleteReussi) {
        return  <Navigate to="/fournisseurs" />
    }

    return (
        <div className="dashboard-doc-int">
            <div className="clients-container">
                {fournisseurs ? (
                    <div  className="document-card">
                        <div className="document-card-body">
                            <p className="document-card-text"><strong>nom Fournisseur:</strong> {fournisseurs.nom}</p>
                            <p className="document-card-text"><strong>Code Fournisseur:</strong> {fournisseurs.code_fournisseur}</p>
                            <p className="document-card-text"><strong>Raison sociale:</strong> {fournisseurs.raison_sociale}</p>
                            <p className="document-card-text"><strong>Adresse:</strong> {fournisseurs.adresse}</p>
                            <p className="document-card-text"><strong>Code Fournisseur:</strong> {fournisseurs.code_fournisseur}</p>
                            <p className="document-card-text"><strong>Numéro:</strong> {fournisseurs.numero_telephone}</p>
                            <p className="document-card-text"><strong>Email:</strong> {fournisseurs.email}</p>
                            <p className="document-card-text"><strong>Type Fournisseur:</strong> {fournisseurs.type_fournisseur}</p>
                            <p className="document-card-text"><strong>Categorie Fournisseur:</strong> {fournisseurs.categorie}</p>
                            <p className="document-card-text"><strong>Agréé:</strong> {fournisseurs.fournisseur_agree ? 'Oui' : 'Non'}</p>
                            <p className="document-card-text"><strong>Périodicité d'évaluation:</strong> {fournisseurs.periodicite_evaluation}</p>
                            <p className="document-card-text"><strong>Modifié par:</strong> {fournisseurs.updated_by}</p>
                            <p className="document-card-text"><strong>Modifié le :</strong> {fournisseurs.updated_at}</p>
                            <p className="document-card-text"><strong>Crée par:</strong> {fournisseurs.created_by}</p>
                            <p className="document-card-text"><strong>Crée à:</strong> {fournisseurs.created_at}</p>
                            <p><strong>Pièces jointes :</strong> {fournisseurs.pieces_jointes ? <a href={`${process.env.REACT_APP_API_URL}/fournisseur/pieces_jointes_fournisseur/${fournisseurs.id}/`} target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>
                            <div className="document-card-buttons">
                                <Link to={`/modifierFournisseur/${fournisseurs.id}`} className="btn btn-primary">Modifier</Link>
                                <button onClick={() => handleDelete(fournisseurs.id)} className="btn btn-danger">Supprimer</button>
                            </div>
                        </div>
                    </div>
                ):(
                    <p>Chargement...</p>
                )}
            </div>
            <div className="dashboard-buttons">
                <Link to={`/AllReclamationFournisseur/${id}/`} className="btn btn-primary">Consulter réclamation</Link>
            </div>
            <div className="dashboard-buttons">
                <Link to={`/AllEvaluationFournisseur/${id}/`} className="btn btn-primary">Consulter Evaluation</Link>
            </div>
            <div className="dashboard-buttons">
                <Link to={`/fournisseurs/`} className="btn btn-secondary">Retour</Link>
            </div>
        </div>
    );
};

export default Fournisseur;
