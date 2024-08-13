/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './client.css';

const AllEnquetes = () => {

    const { id } = useParams();

    const [reclamations, setreclamations] = useState([]);
    const [error, setError] = useState(null);
    const [deleteReussi, setDeleteReussi] = useState(false);


    useEffect(() => {
        const fetchreclamations = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/CRM/dashboard_enquete/`, {
                    headers: {
                        'Accept': '*//*',
                    }
                });
                setreclamations(response.data);
            } catch (error) {
                console.error('Error fetching enquetes:', error);
                setError(error.message || 'Une erreur s\'est produite lors de la récupération des données.');
            }
        };

        fetchreclamations();
    }, [id]);

    const handleDelete = async (id) => {
        const headers = {
            'Accept': '*//*',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
        };
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/CRM/delete_enquete/${id}/`, { headers: headers });
            setDeleteReussi(true);
        } catch (error) {
            console.error('Error deleting enquete:', error);
            setError(error.message || 'Une erreur s\'est produite lors de la suppression du enquete.');
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
            <div className="header">
                <h3>Liste des Enquetes</h3>
            </div>
            <div className="clients-container">
                {reclamations.map(client => (
                    <div key={client.id} className="client-card">
                        <div className="client-card-body">
                            <p className="client-card-text"><strong>Name Enquete:</strong> {client.name_enquete}</p>
                            <p className="client-card-text"><strong>Date debut:</strong> {client.date_debut}</p>
                            <p className="client-card-text"><strong>Date fin:</strong> {client.date_fin}</p>
                            <p className="client-card-text"><strong>Type questionnaire:</strong> {client.type_questionnaire}</p>
                            <p className="client-card-text"><strong>les clients:</strong> {client.clients.join(', ')}</p>
                            <p><strong>Pièces jointes :</strong> {client.pieces_jointes ? <a href={`${process.env.REACT_APP_API_URL}/CRM/pieces_jointes_enquete_client/${client.id}/`} target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>
                            <p className="client-card-text"><strong>Crée à:</strong> {client.created_at}</p>
                            <p className="client-card-text"><strong>Crée par:</strong> {client.created_by}</p>
                            <p className="client-card-text"><strong>Modifié à:</strong> {client.updated_at ? client.updated_at : 'Pas de modification'}</p>
                            <p className="client-card-text"><strong>Modifié par:</strong> {client.updated_by ? client.updated_by : 'Pas de modification'}</p>
                            <div className="document-card-buttons">
                                <Link to={`/modifierRéclamation/${client.id}`} className="btn btn-primary">Modifier</Link>
                                <button onClick={() => handleDelete(client.id)} className="btn btn-danger">Supprimer</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="dashboard-buttons">
                <Link to={`/CréerEnquete/`} className="btn btn-primary">Ajouter Enquete</Link>
            </div>
            <div className="dashboard-buttons">
                <Link to={`/DashboardClient/`} className="btn btn-secondary">Retour</Link>
            </div>
        </div>
    );
};

export default AllEnquetes;*/

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaEdit, FaList, FaTh } from 'react-icons/fa';
import './client.css';

const AllEnquetes = () => {
    const { id } = useParams();

    const [reclamations, setReclamations] = useState([
        {
            id: 1,
            name_enquete: 'Enquête 1',
            date_debut: '2023-01-01',
            date_fin: '2023-01-10',
            type_questionnaire: 'Type 1',
            clients: ['Client A', 'Client B'],
            pieces_jointes: true,
            created_at: '2023-01-01T12:00:00Z',
            created_by: 'User 1',
            updated_at: '2023-01-05T12:00:00Z',
            updated_by: 'User 2',
        },
        {
            id: 2,
            name_enquete: 'Enquête 2',
            date_debut: '2023-02-01',
            date_fin: '2023-02-10',
            type_questionnaire: 'Type 2',
            clients: ['Client C', 'Client D'],
            pieces_jointes: false,
            created_at: '2023-02-01T12:00:00Z',
            created_by: 'User 3',
            updated_at: null,
            updated_by: null,
        },
    ]);

    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [view, setView] = useState('list'); // State to manage list or grid view

    const handleDelete = (reclamationId) => {
        setReclamations(prevReclamations => prevReclamations.filter(client => client.id !== reclamationId));
    };

    const filteredReclamations = reclamations.filter(reclamation =>
        reclamation.name_enquete.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reclamation.type_questionnaire.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reclamation.clients.join(', ').toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div>Chargement...</div>;
    }

    return (
        <main style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
            <div className="client-dashboard">
                <div className="row">
                    <div>
                        <br />
                        <br />
                        <div className="client-table-container">
                            <div className="client-view-toggle">
                                <button className={`client-view-btn ${view === 'list' ? 'client-active' : ''}`} onClick={() => setView('list')}>
                                    <FaList />
                                </button>
                                <button className={`client-view-btn ${view === 'grid' ? 'client-active' : ''}`} onClick={() => setView('grid')}>
                                    <FaTh />
                                </button>
                            </div>
                            <h3 className='client-formation-title'>Liste des Enquêtes</h3>
                            <div className="client-button-container">
                                <Link to={`/CréerEnquete/`}>
                                    <button className="client-button-add">Ajouter Enquête</button>
                                </Link>
                                <Link to={`/consulterclient/01/`}>
                                    <button className="client-retour">Retour</button>
                                </Link>
                            </div>
                            <div className="client-search-container">
                                <input
                                    type="text"
                                    className="client-search-input"
                                    placeholder="Rechercher..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <br />
                            <div>
                                {view === 'list' ? (
                                    <table className="client-styled-table">
                                        <thead className="table-header">
                                            <tr>
                                                <th scope="col">Nom Enquête</th>
                                                <th scope="col">Date Début</th>
                                                <th scope="col">Date Fin</th>
                                                <th scope="col">Type Questionnaire</th>
                                                <th scope="col">Clients</th>
                                                <th scope="col">Détails</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredReclamations.length > 0 ? (
                                                filteredReclamations.map((reclamation, index) => (
                                                    <tr key={index}>
                                                        <td>{reclamation.name_enquete}</td>
                                                        <td>{reclamation.date_debut}</td>
                                                        <td>{reclamation.date_fin}</td>
                                                        <td>{reclamation.type_questionnaire}</td>
                                                        <td>{reclamation.clients.join(', ')}</td>
                                                        <td>
                                                            <Link to={`/DetailEnquete/${reclamation.id}`} className="btn-view-details">
                                                                <FaEdit />
                                                            </Link>
                                                            
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="6" className="text-center">Aucune enquête disponible</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="client-grid">
                                        {filteredReclamations.length > 0 ? (
                                            filteredReclamations.map((reclamation, index) => (
                                                <div key={index} className="client-responsable-item">
                                                    <div className="client-responsable-info">
                                                        <h5 className="client-responsable-title">{reclamation.name_enquete}</h5>
                                                        <p><strong className="client-responsable-text">Date Début :</strong> {reclamation.date_debut}</p>
                                                        <p><strong className="client-responsable-text">Date Fin :</strong> {reclamation.date_fin}</p>
                                                        <p><strong className="client-responsable-text">Type Questionnaire :</strong> {reclamation.type_questionnaire}</p>
                                                        <p><strong className="client-responsable-text">Clients :</strong> {reclamation.clients.join(', ')}</p>
                                                        <Link to={`/ModifierReclamation/${reclamation.id}`} className="btn btn-outline-info btn-sm">
                                                            <FaEdit />
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-center">Aucune enquête disponible</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AllEnquetes;



















