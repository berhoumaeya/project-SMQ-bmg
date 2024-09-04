import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaList, FaTh, FaEdit } from 'react-icons/fa';
import './allProduit.css';
import Navbarco from '../conformite/Navbarco';

const DashboardProduit = () => {
    const [risks, setRisks] = useState([
        { id: 1, date_detection: '2024-01-01', designation_produit_non_conforme: 'Produit 1', reclamation_client: 'Client 1' },
        { id: 2, date_detection: '2024-02-01', designation_produit_non_conforme: 'Produit 2', reclamation_client: 'Client 2' },
        // Add more static data as needed
    ]);
    const [viewMode, setViewMode] = useState('list');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterBy, setFilterBy] = useState('id');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

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

    const sortedRisks = [...filteredRisks].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    return (
        <>
        <Navbarco viewMode={viewMode} setViewMode={setViewMode} />
        <main style={{ backgroundColor: '#ffff', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
            <div className="container produit-dashboard">
                <div className="row">
                    <div>
                        <br />
                        <br />
                        <div className="produit-table-container">
                            <h3 className='produit-formation-title'>Liste des Non Conformités</h3>
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
                                                <th onClick={() => requestSort('id')}>
                                                    Fiche N°
                                                    {getSortArrow('id')}
                                                </th>
                                                <th onClick={() => requestSort('date_detection')}>
                                                    Date de Détection
                                                    {getSortArrow('date_detection')}
                                                </th>
                                                <th onClick={() => requestSort('designation_produit_non_conforme')}>
                                                    Désignation Produit
                                                    {getSortArrow('designation_produit_non_conforme')}
                                                </th>
                                                <th onClick={() => requestSort('reclamation_client')}>
                                                    Réclamation Client
                                                    {getSortArrow('reclamation_client')}
                                                </th>
                                                <th>Détails</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sortedRisks.length > 0 ? (
                                                sortedRisks.map(risk => (
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
                                        {sortedRisks.length > 0 ? (
                                            sortedRisks.map(risk => (
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
        </>
    );
};

export default DashboardProduit;
