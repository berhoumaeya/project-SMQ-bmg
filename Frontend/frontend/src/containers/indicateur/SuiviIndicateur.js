/*import React, { useState, useEffect } from 'react';
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
            'Accept': '*//*',
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

export default SuiviIndicateur;*/
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaList, FaTh, FaEdit, FaTrash } from 'react-icons/fa';
import { RiChatFollowUpLine } from "react-icons/ri";
import './indicateur.css'; // Ensure this path is correct

const SuiviIndicateur = () => {
    const [viewMode, setViewMode] = useState('list'); // State to toggle between list and grid views
    const [all, setIndicateurs] = useState([
        {
            id: 1,
            frequence: 'Mensuel',
            objectif: 'Améliorer la qualité',
            limite_critique: '90%',
            resultat: '85%',
            commentaire: 'Bonnes pratiques recommandées',
            piece_jointe: true,
            created_by: 'Admin',
            created_at: '2024-08-21T10:00:00Z'
        },
        {
            id: 2,
            frequence: 'Trimestriel',
            objectif: 'Réduire les coûts',
            limite_critique: '5%',
            resultat: '3%',
            commentaire: 'Objectif atteint avec succès',
            piece_jointe: false,
            created_by: 'User',
            created_at: '2024-08-20T14:00:00Z'
        },
        // Add more static data as needed
    ]);

    const handleDelete = (id) => {
        setIndicateurs(prevIndicateurs => prevIndicateurs.filter(indicateur => indicateur.id !== id));
    };

    return (
        <main style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
            <div className="container indicateur-dashboard">
                <div className="row">
                    <div>
                        <div className="indicateur-table-container">
                            <div className="indicateur-view-toggle">
                                <button className={`indicateur-view-btn ${viewMode === 'list' ? 'indicateur-active' : ''}`} onClick={() => setViewMode('list')}>
                                    <FaList /> 
                                </button>
                                <button className={`indicateur-view-btn ${viewMode === 'grid' ? 'indicateur-active' : ''}`} onClick={() => setViewMode('grid')}>
                                    <FaTh /> 
                                </button>
                            </div>
                            <h3 className='indicateur-formation-title'>Liste des Suivis</h3>
                            <div className="indicateur-button-container">
                                <Link to={`/ConsulterIndicateur/:id/`}>
                                    <button className="indicateur-retour">Retour</button>

                                </Link>
                                <Link to="/AjouterSuiviIndicateur/:id/">
                                    <button className="indicateur-button-add">Ajouter suivi</button>
                                </Link>

                            </div>
                            <br />
                            {viewMode === 'list' ? (
                                <table className="indicateur-styled-table">
                                    <thead className="indicateur-table-header">
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Fréquence</th>
                                            <th scope="col">Objectif</th>
                                            <th scope="col">Limite Critique</th>
                                         
                                            
                                            <th scope="col">Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {all.length > 0 ? (
                                            all.map(indicateur => (
                                                <tr key={indicateur.id}>
                                                    <td>{indicateur.id}</td>
                                                    <td>{indicateur.frequence}</td>
                                                    <td>{indicateur.objectif}</td>
                                                    <td>{indicateur.limite_critique}</td>
                                                    
                                                   
                                                    <td>
                                                        <Link to={`/ConsulterSuivi/${indicateur.id}`} className="btn-view-details">
                                                            <FaEdit /> 
                                                        </Link>
                                                     
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="10" className="text-center">Aucun suivi disponible</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="indicateur-grid">
                                    {all.length > 0 ? (
                                        all.map(indicateur => (
                                            <div key={indicateur.id} className="indicateur-responsable-item">
                                                <div className="indicateur-responsable-info">
                                                    <p><strong className="indicateur-responsable-text">Fréquence:</strong> {indicateur.frequence}</p>
                                                    <p><strong className="indicateur-responsable-text">Objectif:</strong> {indicateur.objectif}</p>
                                                    <p><strong className="indicateur-responsable-text">Limite critique:</strong> {indicateur.limite_critique}</p>

                                                    <div className="document-card-buttons">
                                                        <Link to={`/ConsulterSuivi/${indicateur.id}`} className="btn-view-details">
                                                            <FaEdit /> 
                                                        </Link>
                                                       
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center">Aucun suivi disponible</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default SuiviIndicateur;
