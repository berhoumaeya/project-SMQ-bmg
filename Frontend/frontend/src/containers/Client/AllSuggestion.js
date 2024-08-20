/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './client.css';

const AllSuggestions = () => {

    const { id } = useParams();

    const [reclamations, setreclamations] = useState([]);
    const [error, setError] = useState(null);
    const [deleteReussi, setDeleteReussi] = useState(false);


    useEffect(() => {
        const fetchreclamations = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/CRM/dashboard_suggestion/${id}/`, {
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
            await axios.delete(`${process.env.REACT_APP_API_URL}/CRM/delete_suggestion/${id}/`, { headers: headers });
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
                <h3>Liste des Suggestions</h3>
            </div>
            <div className="clients-container">
                {reclamations.map(client => (
                    <div key={client.id} className="client-card">
                        <div className="client-card-body">
                            <p className="client-card-text"><strong>Nom Suggestion:</strong> {client.name}</p>
                            <p className="client-card-text"><strong>date:</strong> {client.date}</p>
                            <p className="client-card-text"><strong>type_suggestion:</strong> {client.type_suggestion}</p>
                            <p className="client-card-text"><strong>receptionnaire:</strong> {client.receptionnaire}</p>
                            <p className="client-card-text"><strong>description:</strong> {client.description}</p>
                            <p className="client-card-text"><strong>actions:</strong> {client.actions}</p>
                            <p><strong>Pièces jointes :</strong> {client.pieces_jointes ? <a href={`${process.env.REACT_APP_API_URL}/CRM/pieces_jointes_suggestion_client/${client.id}/`} target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>
                            <p className="client-card-text"><strong>Crée à:</strong> {client.created_at}</p>
                            <p className="client-card-text"><strong>Crée par:</strong> {client.created_by}</p>
                            <p className="client-card-text"><strong>Modifié à:</strong> {client.updated_at}</p>
                            <p className="client-card-text"><strong>Modifié par:</strong> {client.updated_by}</p>
                            <div className="document-card-buttons">
                                <Link to={`/modifierRéclamation/${client.id}`} className="btn btn-primary">Modifier</Link>
                                <button onClick={() => handleDelete(client.id)} className="btn btn-danger">Supprimer</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="dashboard-buttons">
                <Link to={`/CréerSuggestionClient/${id}/`} className="btn btn-primary">Ajouter Enquete</Link>
            </div>
            <div className="dashboard-buttons">
                <Link to={`/ConsulterClient/${id}`} className="btn btn-secondary">Retour</Link>
            </div>
        </div>
    );
};

export default AllSuggestions;*/


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './client.css';
import { FaEdit, FaList, FaTh } from 'react-icons/fa';

const AllSuggestions = () => {
    // Sample static data
    const suggestions = [
        {
            id: 1,
            name: 'Suggestion A',
            date: '2024-08-10',
            type_suggestion: 'Type 1',
            receptionnaire: 'John Doe',
            description: 'Description de la suggestion A',
            actions: 'Action A',
            pieces_jointes: true,
            created_at: '2024-08-10',
            created_by: 'Admin',
            updated_at: '2024-08-11',
            updated_by: 'Admin',
        },
        {
            id: 2,
            name: 'Suggestion B',
            date: '2024-08-11',
            type_suggestion: 'Type 2',
            receptionnaire: 'Jane Doe',
            description: 'Description de la suggestion B',
            actions: 'Action B',
            pieces_jointes: false,
            created_at: '2024-08-11',
            created_by: 'Admin',
            updated_at: '2024-08-12',
            updated_by: 'Admin',
        },
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [view, setView] = useState('list'); // Default view is list

    const filteredSuggestions = suggestions.filter(suggestion =>
        suggestion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        suggestion.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        suggestion.type_suggestion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
            <div className="client-dashboard">
                <div className="row">
                    <div>
                        <br />
                        <div className="table-container">
                            <div className="client-view-toggle">
                                <button className={`client-view-btn ${view === 'list' ? 'client-active' : ''}`} onClick={() => setView('list')}>
                                    <FaList /> 
                                </button>
                                <button className={`client-view-btn ${view === 'grid' ? 'client-active' : ''}`} onClick={() => setView('grid')}>
                                    <FaTh /> 
                                </button>
                            </div>
                            <h3 className='client-formation-title'>Liste des Suggestions</h3>
                            <div className="client-button-container">
                                <Link to={`/CréerSuggestionClient/`}>
                                    <button className="client-button-add">Ajouter</button>
                                </Link>
                                <Link to={`/ConsulterClient/:id/`}>
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
                            {view === 'list' ? (
                                <table className="client-styled-table">
                                    <thead className="table-header">
                                        <tr>
                                            <th scope="col">Nom Suggestion</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Type Suggestion</th>
                                            <th scope="col">Réceptionnaire</th>
                                            <th scope="col">Détails</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredSuggestions.length > 0 ? (
                                            filteredSuggestions.map((suggestion, index) => (
                                                <tr key={index}>
                                                    <td>{suggestion.name}</td>
                                                    <td>{suggestion.date}</td>
                                                    <td>{suggestion.type_suggestion}</td>
                                                    <td>{suggestion.receptionnaire}</td>
                                                    <td>
                                                        <Link to={`/suggestion/${suggestion.id}`} className="btn-view-details">
                                                            <FaEdit />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center">Aucune suggestion disponible</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="client-grid">
                                    {filteredSuggestions.length > 0 ? (
                                        filteredSuggestions.map((suggestion, index) => (
                                            <div key={index} className="client-responsable-item">
                                                <div className="client-responsable-info">
                                                    <h5 className="client-responsable-title">{suggestion.name}</h5>
                                                    <p><strong className="client-responsable-text">Date :</strong> {suggestion.date}</p>
                                                    <p><strong className="client-responsable-text">Type :</strong> {suggestion.type_suggestion}</p>
                                                    <p><strong className="client-responsable-text">Réceptionnaire :</strong> {suggestion.receptionnaire}</p>
                                                    <Link to={`/suggestion/${suggestion.id}`} className="btn btn-outline-info btn-sm">
                                                        <FaEdit />
                                                    </Link>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center">Aucune suggestion disponible</p>
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

export default AllSuggestions;
