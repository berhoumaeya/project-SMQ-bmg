/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../DOcumentation/DashboardDocInt.css';

const DashboardRisk = () => {
    const [risks, setRisks] = useState([]);
    const [error, setError] = useState(null);
    const [deleteReussi, setDeleteReussi] = useState(false);

    useEffect(() => {
        const fetchRisks = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/risk/risques/`, {
                    headers: {
                        'Accept': '*//*',
                    }
                });
                setRisks(response.data);
            } catch (error) {
                console.error('Error fetching risks:', error);
                setError(error.message || 'Une erreur s\'est produite lors de la récupération des données.');
            }
        };

        fetchRisks();
        const successMessage = localStorage.getItem('successMessage');
        if (successMessage) {
            toast.success(successMessage);
            localStorage.removeItem('successMessage');
        }
    }, []);

    const handleDelete = async (id) => {
        const headers = {
            'Accept': '*//*',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
        };
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/risk/risques/${id}/`, { headers: headers });
            setDeleteReussi(true);
            setRisks(prevRisks => prevRisks.filter(risk => risk.id !== id));
        } catch (error) {
            console.error('Error deleting document:', error);
            setError(error.message || 'Une erreur s\'est produite lors de la suppression du document.');
        }
    };

    if (error) {
        return <div className="error-message">Erreur : {error}</div>;
    }

    return (
        <div className="dashboard-doc-int">
            <div className="header">
                <h3>Liste des risques</h3>
            </div>
            <div className="documents-container">
                {risks.map(risk => (
                    <div key={risk.id} className="document-card">
                        <div className="document-card-body">
                            <p className="document-card-text"><strong>nom risque:</strong> {risk.nom}</p>
                            <p className="document-card-text"><strong>date_declaration:</strong> {risk.date_declaration}</p>
                            <p className="document-card-text"><strong>declencheur:</strong> {risk.declencheur}</p>
                            <p className="document-card-text"><strong>liste_concernee:</strong> {risk.liste_concernee}</p>
                            <p className="document-card-text"><strong>type_risque:</strong> {risk.type_risque}</p>
                            <p className="document-card-text"><strong>Critères:</strong></p>
                            <ul>
                                {risk.criteres.map((critere, index) => (
                                    <li key={`${risk.id}-critere-${index}`}>
                                        <strong>Nom:</strong> {critere.nom}, <strong>Note:</strong> {critere.note}
                                    </li>
                                ))}
                            </ul>
                            <p className="document-card-text"><strong>Gravité:</strong> {risk.methode_calcul}</p>
                            <p className="document-card-text"><strong>Crée par:</strong> {risk.created_by}</p>
                            <p className="document-card-text"><strong>Crée à:</strong> {risk.created_at}</p>
                            <p className="document-card-text"><strong>Modifié par:</strong> {risk.updated_by ? risk.updated_by : 'pas de modification'}</p>
                            <p className="document-card-text"><strong>Modifié le :</strong> {risk.updated_at ? risk.updated_at : 'pas de modification'}</p>
                            <div className="document-card-buttons">
                                <Link to={`/ModifierRisk/${risk.id}`} className="btn btn-success mt-3">Modifier</Link>
                                <button onClick={() => handleDelete(risk.id)} className="btn btn-danger">Supprimer</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="dashboard-buttons">
                <Link to={`/AjouterRisk/`} className="btn btn-primary">Traiter risque</Link>
            </div>
            <div className="dashboard-buttons">
                <Link to={`/Dashboard/`} className="btn btn-secondary">Retour</Link>
            </div>
        </div>
    );
};

export default DashboardRisk;*/


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaList, FaTh, FaEdit } from 'react-icons/fa';
import './allRisk.css';

const DashboardRisk = () => {
    const [risks, setRisks] = useState([
        { id: 1, nom: 'Risque A', date_declaration: '2024-01-10', declencheur: 'Déclencheur A' },
        { id: 2, nom: 'Risque B', date_declaration: '2024-02-15', declencheur: 'Déclencheur B' },
        { id: 3, nom: 'Risque C', date_declaration: '2024-03-20', declencheur: 'Déclencheur C' },
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

    const filteredRisks = risks.filter((risk) => {
        const value = risk[filterBy]?.toString().toLowerCase();
        return value.includes(searchTerm.toLowerCase());
    });

    return (
        <main className="risk-dashboard">
            <div className="container risk-dashboard-container">
                <div className="risk-view-toggle">
                    <button
                        className={`risk-view-btn ${viewMode === 'list' ? 'risk-active' : ''}`}
                        onClick={() => setViewMode('list')}
                    >
                        <FaList />
                    </button>
                    <button
                        className={`risk-view-btn ${viewMode === 'grid' ? 'risk-active' : ''}`}
                        onClick={() => setViewMode('grid')}
                    >
                        <FaTh />
                    </button>
                </div>
                <h3 className="risk-formation-title">Liste des Risques</h3>
                <div className="risk-button-container">
                    <Link to="/Dashboard/">
                        <button className="risk-retour">Retour</button>
                    </Link>
                    <Link to="/AjouterRisk/">
                        <button className="risk-button-add">Ajouter Risque</button>
                    </Link>
                </div>
                <div className="risk-search-container">
                    <select
                        onChange={handleFilterChange}
                        value={filterBy}
                        className="risk-filter-select"
                    >
                        <option value="id">Numéro</option>
                        <option value="nom">Nom</option>
                        <option value="date_declaration">Date</option>
                        <option value="declencheur">Déclencheur</option>
                    </select>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Rechercher..."
                        className="risk-search-input"
                    />
                </div>
                {viewMode === 'list' ? (
                    <table className="risk-styled-table">
                        <thead>
                            <tr>
                                <th>Numéro</th>
                                <th>Nom</th>
                                <th>Date</th>
                                <th>Déclencheur</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRisks.map((risk) => (
                                <tr key={risk.id}>
                                    <td>{risk.id}</td>
                                    <td>{risk.nom}</td>
                                    <td>{risk.date_declaration}</td>
                                    <td>{risk.declencheur}</td>
                                    <td>
                                                            <Link to={`/ModifierRisk/${risk.id}`} className="produit-btn">
                                                                <FaEdit />
                                                            </Link>
                                                        </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="risk-grid">
                        {filteredRisks.map((risk) => (
                            <div key={risk.id} className="risk-responsable-item">
                                <h4>{risk.nom}</h4>
                                <p>Date: {risk.date_declaration}</p>
                                <p>Déclencheur: {risk.declencheur}</p>
                                <p>   <Link to={`/ModifierRisk/${risk.id}`} className="produit-btn">
                                                                <FaEdit />
                                                            </Link></p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default DashboardRisk;
