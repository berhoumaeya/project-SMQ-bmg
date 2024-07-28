/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Client/client.css';

const AllFournisseurs = () => {
    const [fournisseurs, setfournisseurs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchfournisseurs = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/fournisseur/dashboard_Fournisseur/`, {
                    headers: {
                        'Accept': '*//*',
                    }
                });
                setfournisseurs(response.data);
            } catch (error) {
                console.error('Error fetching fournisseurs:', error);
                setError(error.message || 'Une erreur s\'est produite lors de la récupération des données.');
            }
        };

        fetchfournisseurs();
    }, []);

    if (error) {
        return <div className="error-message">Erreur : {error}</div>;
    }

    return (
        <div className="dashboard-client-int">
            <div className="header">
                <h3>Liste des fournisseurs</h3>
            </div>
            <div className="clients-container">
                {fournisseurs.map(fournisseur => (
                    <div key={fournisseur.id} className="client-card">
                        <div className="client-card-body">
                            <p className="client-card-text"><strong>nom Fournisseur:</strong> {fournisseur.nom}</p>
                            <p className="client-card-text"><strong>Code Fournisseur:</strong> {fournisseur.code_fournisseur}</p>
                            <div className="client-card-buttons">
                                <Link to={`/ConsulterFournisseur/${fournisseur.id}/`} className="btn btn-primary">Consulter</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="dashboard-buttons">
                <Link to={`/CréerFournisseur/`} className="btn btn-primary">Ajouter Fournisseur</Link>
            </div>
            <div className="dashboard-buttons">
                <Link to={`/Dashboard/`} className="btn btn-secondary">Retour</Link>
            </div>
        </div>
    );
};

export default AllFournisseurs;*/

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GrView } from 'react-icons/gr';
import { FaList, FaTh } from 'react-icons/fa';
import '../RH/list.css';

const sampleFournisseurs = [
    { id: 1, nom: 'Fournisseur A', code_fournisseur: 'FA123' },
    { id: 2, nom: 'Fournisseur B', code_fournisseur: 'FB456' },
    { id: 3, nom: 'Fournisseur C', code_fournisseur: 'FC789' },
];

const AllFournisseurs = () => {
    const [fournisseurs, setfournisseurs] = useState(sampleFournisseurs);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('list');

    const filteredFournisseurs = fournisseurs.filter(fournisseur =>
        fournisseur.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fournisseur.code_fournisseur.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
            <div className="container dashboard">
                <div className="row">
                    <div>
                        <br />
                        <br />
                        <div className="table-container">
                            <div className="view-toggle">
                                <button className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>
                                    <FaList />
                                </button>
                                <button className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>
                                    <FaTh />
                                </button>
                            </div>
                            <h3 className="formation-title">Liste des Fournisseurs</h3>
                            <div className="button-container">
                                <Link to="/DashboardRH/">
                                    <button className="retour">Retour</button>
                                </Link>
                                <Link to={`/CréerFournisseur/`}>
                                    <button className="button-add">Ajouter Fournisseur</button>
                                </Link>
                            </div>
                            <br />
                            <div className="search-container">
                                <input
                                    type="text"
                                    placeholder="Rechercher..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="search-input"
                                />
                            </div>
                            <br />
                            <div>
                                {viewMode === 'list' ? (
                                    <table>
                                        <thead className="table-header">
                                            <tr>
                                                <th scope="col">ID</th>
                                                <th scope="col">Nom Fournisseur</th>
                                                <th scope="col">Code Fournisseur</th>
                                                <th scope="col">Détails</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredFournisseurs.length > 0 ? (
                                                filteredFournisseurs.map(fournisseur => (
                                                    <tr key={fournisseur.id}>
                                                        <td>{fournisseur.id}</td>
                                                        <td>{fournisseur.nom}</td>
                                                        <td>{fournisseur.code_fournisseur}</td>
                                                        <td>
                                                            <Link to={`/ConsulterFournisseur/${fournisseur.id}`} className="btn btn-outline-info btn-sm">
                                                                <GrView />
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="text-center">Aucun fournisseur disponible</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="grid">
                                        {filteredFournisseurs.length > 0 ? (
                                            filteredFournisseurs.map(fournisseur => (
                                                <div key={fournisseur.id} className="responsable-item">
                                                    <img src="https://via.placeholder.com/100" alt={`${fournisseur.nom}`} className="responsable-img" />
                                                    <div className="responsable-info">
                                                        <h5 className="responsable-title">{fournisseur.nom}</h5>
                                                        <p><strong className="responsable-text">Code :</strong> {fournisseur.code_fournisseur}</p>
                                                        <Link to={`/ConsulterFournisseur/${fournisseur.id}`} className="btn btn-outline-info btn-sm" >
                                                            <GrView />
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-center">Aucun fournisseur disponible</p>
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

export default AllFournisseurs;
