import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaList, FaTh, FaEdit } from 'react-icons/fa';
import './allProduit.css';

const DashboardProduit = () => {
    const [risks, setRisks] = useState([
        { id: 1, date_detection: '2024-01-01', designation_produit_non_conforme: 'Produit 1', reclamation_client: 'Client 1' },
        { id: 2, date_detection: '2024-02-01', designation_produit_non_conforme: 'Produit 2', reclamation_client: 'Client 2', type_non_conformite: 'type2' },

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

    const filteredRisks = risks.filter(risk => {
        const value = risk[filterBy]?.toString().toLowerCase();
        return value.includes(searchTerm.toLowerCase());
    });

    return (
        <main style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
            <div className="container produit-dashboard">
                <div className="row">
                    <div>
                        <br />
                        <br />
                        <div className="produit-table-container">
                            <div className="produit-view-toggle">
                                <button className={`produit-view-btn ${viewMode === 'list' ? 'produit-active' : ''}`} onClick={() => setViewMode('list')}>
                                    <FaList />
                                </button>
                                <button className={`produit-view-btn ${viewMode === 'grid' ? 'produit-active' : ''}`} onClick={() => setViewMode('grid')}>
                                    <FaTh />
                                </button>
                            </div>
                            <h3 className='produit-formation-title'>Liste des Non Conformités</h3>
                            <div className="produit-button-container">
                                <Link to="/Dashboard/">
                                    <button className="produit-retour">Retour</button>
                                </Link>
                                <Link to="/FormProduit/">
                                    <button className="produit-button-add">Ajouter Non Conforme</button>
                                </Link>
                            </div>
                            <br />
                            <div className="produit-search-container">
                                <select onChange={handleFilterChange} value={filterBy} className="produit-filter-select">
                                    <option value="id">Numéro</option>
                                    <option value="date_detection">Date</option>
                                    <option value="designation_produit_non_conforme">Désignation</option>
                                    <option value="reclamation_client">Réclamation</option>
                                </select>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    placeholder="Rechercher..."
                                    className="produit-search-input"
                                />
                            </div>
                            <br />
                            <div>
                                {viewMode === 'list' ? (
                                    <table className="produit-styled-table">
                                        <thead className="produit-table-header">
                                            <tr>
                                                <th scope="col">Fiche N°</th>
                                                <th scope="col">Date de Détection</th>
                                                <th scope="col">Désignation Produit</th>
                                                <th scope="col">Réclamation Client</th>
                                                <th scope="col">Détails</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredRisks.length > 0 ? (
                                                filteredRisks.map(risk => (
                                                    <tr key={risk.id}>
                                                        <td>{risk.id}</td>
                                                        <td>{risk.date_detection}</td>
                                                        <td>{risk.designation_produit_non_conforme}</td>
                                                        <td>{risk.reclamation_client}</td>
                                                        <td>
                                                            <Link to={`/ConsulterProduit/${risk.id}`} className="produit-btn">
                                                                <FaEdit />
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="text-center">Aucune non-conformité disponible</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="produit-grid">
                                        {filteredRisks.length > 0 ? (
                                            filteredRisks.map(risk => (
                                                <div key={risk.id} className="produit-responsable-item">
                                                    <img src="https://via.placeholder.com/100" alt="Produit" className="produit-responsable-img" />
                                                    <div className="produit-responsable-info">
                                                        <h5 className="produit-responsable-title">Fiche N° {risk.id}</h5>
                                                        <p><strong>Date:</strong> {risk.date_detection}</p>
                                                        <p><strong>Désignation:</strong> {risk.designation_produit_non_conforme}</p>
                                                        <p><strong>Réclamation:</strong> {risk.reclamation_client}</p>
                                                        <Link to={`/ConsulterProduit/${risk.id}`} className="produit-btn">
                                                            <FaEdit />
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-center">Aucune non-conformité disponible</p>
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

export default DashboardProduit;
