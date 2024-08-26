/*import React, { useState, useEffect } from 'react';
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
                        'Accept': '*//*',
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
            'Accept': '*//*',
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

export default DashboardConformite;*/




import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaList, FaTh, FaEdit } from 'react-icons/fa';
import './allConformite.css'; // Updated to match the new component

const DashboardConformite = () => {
    const [conformites, setConformites] = useState([
        {
            id: 1,
            nom: "Conformité A",
            type_fiche: "Type 1",
            type_decideur: "Decideur A",
        },
        {
            id: 2,
            nom: "Conformité B",
            type_fiche: "Type 2",
            type_decideur: "Decideur B",
        },
        // Add more mock conformity objects as needed
    ]);

    const [viewMode, setViewMode] = useState('list');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterBy, setFilterBy] = useState('id');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilterBy(e.target.value);
    };

    const handleDelete = (id) => {
        const updatedConformites = conformites.filter(conformite => conformite.id !== id);
        setConformites(updatedConformites);
    };

    const filteredConformites = conformites.filter((conformite) => {
        const value = conformite[filterBy]?.toString().toLowerCase();
        return value.includes(searchTerm.toLowerCase());
    });

    return (
        <main className="conformite-dashboard">
            <div className="container conformite-dashboard-container">
                <div className="conformite-view-toggle">
                    <button
                        className={`conformite-view-btn ${viewMode === 'list' ? 'conformite-active' : ''}`}
                        onClick={() => setViewMode('list')}
                    >
                        <FaList />
                    </button>
                    <button
                        className={`conformite-view-btn ${viewMode === 'grid' ? 'conformite-active' : ''}`}
                        onClick={() => setViewMode('grid')}
                    >
                        <FaTh />
                    </button>
                </div>
                <h3 className="conformite-formation-title">Liste des Conformités</h3>
                <div className="conformite-button-container">
                    <Link to="/Dashboard/">
                        <button className="conformite-retour">Retour</button>
                    </Link>
                    <Link to="/AjouterConformite/">
                        <button className="conformite-button-add">Ajouter Conformité</button>
                    </Link>
                </div>
                <div className="conformite-search-container">
                    <select
                        onChange={handleFilterChange}
                        value={filterBy}
                        className="conformite-filter-select"
                    >
                        <option value="id">Numéro</option>
                        <option value="nom">Nom</option>
                        <option value="type_fiche">Type de Fiche</option>
                        <option value="type_decideur">Type de Decideur</option>
                    </select>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Rechercher..."
                        className="conformite-search-input"
                    />
                </div>
                {viewMode === 'list' ? (
                    <table className="conformite-styled-table">
                        <thead>
                            <tr>
                                <th>Numéro</th>
                                <th>Nom</th>
                                <th>Type de Fiche</th>
                                <th>Type de Decideur</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredConformites.map((conformite) => (
                                <tr key={conformite.id}>
                                    <td>{conformite.id}</td>
                                    <td>{conformite.nom}</td>
                                    <td>{conformite.type_fiche}</td>
                                    <td>{conformite.type_decideur}</td>
                                    <td>
                                        <Link to={`/ModifierConformite/${conformite.id}`} className="conformite-btn">
                                            <FaEdit />
                                        </Link>
                                       
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="conformite-grid">
                        {filteredConformites.map((conformite) => (
                            <div key={conformite.id} className="conformite-responsable-item">
                                <h4>{conformite.nom}</h4>
                                <p>Type: {conformite.type_fiche}</p>
                                <p>Decideur: {conformite.type_decideur}</p>
                                <Link to={`/ModifierConformite/${conformite.id}`} className="conformite-btn">
                                    <FaEdit />
                                </Link>
                              
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default DashboardConformite;
