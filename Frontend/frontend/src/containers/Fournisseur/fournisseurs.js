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
import SubNavbarfou from './SubNavbarfou';
import { FaEdit } from 'react-icons/fa';
import './fournisseur.css';

const sampleFournisseurs = [
    { id: 1, nom: 'Fournisseur A', prénom: 'ca', code_fournisseur: 'FA123', email: 'a@gmail.com' },
    { id: 2, nom: 'Fournisseur B', prénom: 'ca', code_fournisseur: 'FB456', email: 'b@gmail.com' },
];

const AllFournisseurs = () => {
    const [fournisseurs, setFournisseurs] = useState(sampleFournisseurs);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('list');
    const [sortConfig, setSortConfig] = useState({ key: 'nom', direction: 'ascending' });
    const [filterBy, setFilterBy] = useState('nom');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value); // Updated here
    };

    const handleFilterChange = (e) => {
        setFilterBy(e.target.value);
    };

    const filteredFournisseurs = fournisseurs
        .filter(fournisseur => {
            const value = fournisseur[filterBy]?.toString().toLowerCase();
            return value.includes(searchQuery.toLowerCase());
        })
        .sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortArrow = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? '🔼' : '🔽';
        }
        return '↕️';
    };

    return (
        <>
            <SubNavbarfou viewMode={viewMode} setViewMode={setViewMode} />
            <main>
                <div className="container fournisseur-dashboard">
                    <div className="row">
                        <div>
                            <br />
                            <br />
                            <div className="fournisseur-table-container">
                                <h3 className='fournisseur-formation-title'>Liste des Fournisseurs</h3>
                                <br />
                                <div className="risk-search-container">
                                    <select
                                        onChange={handleFilterChange}
                                        value={filterBy}
                                        className="risk-filter-select"
                                    >
                                        <option value="id">Numéro</option>
                                        <option value="nom">Nom</option>
                                        <option value="code_fournisseur">Code</option>
                                        <option value="email">Email</option>
                                    </select>
                                    <input
                                        type="text"
                                        value={searchQuery} 
                                        onChange={handleSearchChange}
                                        placeholder="Rechercher..."
                                        className="risk-search-input"
                                    />
                                </div>
                                <br />
                                <div>
                                    {viewMode === 'list' ? (
                                        <table className="fournisseur-styled-table">
                                            <thead className="fournisseur-table-header">
                                                <tr>
                                                    <th scope="col" onClick={() => requestSort('code_fournisseur')}>Code Fournisseur {getSortArrow('code_fournisseur')}</th>
                                                    <th scope="col" onClick={() => requestSort('nom')}>Nom Fournisseur {getSortArrow('nom')}</th>
                                                    <th scope="col" onClick={() => requestSort('prénom')}>Prénom Fournisseur {getSortArrow('prénom')}</th>
                                                    <th scope="col" onClick={() => requestSort('email')}>Email {getSortArrow('email')}</th>
                                                    <th scope="col">Détails</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredFournisseurs.length > 0 ? (
                                                    filteredFournisseurs.map(fournisseur => (
                                                        <tr key={fournisseur.id}>
                                                            <td>{fournisseur.code_fournisseur}</td>
                                                            <td>{fournisseur.nom}</td>
                                                            <td>{fournisseur.prénom}</td>
                                                            <td>{fournisseur.email}</td>
                                                            <td>
                                                                <Link to={`/ConsulterFournisseur/${fournisseur.id}`} className="client-btn">
                                                                    <FaEdit />
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="5" className="text-center">Aucun fournisseur disponible</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <div className="fournisseur-grid">
                                            {filteredFournisseurs.length > 0 ? (
                                                filteredFournisseurs.map(fournisseur => (
                                                    <div key={fournisseur.id} className="fournisseur-responsable-item">
                                                        <img src="https://via.placeholder.com/100" alt={`${fournisseur.nom}`} className="fournisseur-responsable-img" />
                                                        <div className="fournisseur-responsable-info">
                                                            <h5 className="fournisseur-responsable-title">{fournisseur.nom} {fournisseur.prénom}</h5>
                                                            <p><strong className="fournisseur-responsable-text">Code :</strong> {fournisseur.code_fournisseur}</p>
                                                            <p><strong className="fournisseur-responsable-text">Email</strong> {fournisseur.email}</p>
                                                            <Link to={`/ConsulterFournisseur/${fournisseur.id}`} className="client-btn">
                                                                <FaEdit />
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
        </>
    );
};

export default AllFournisseurs;
