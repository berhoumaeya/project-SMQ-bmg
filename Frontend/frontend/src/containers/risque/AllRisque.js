import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaList, FaTh, FaEdit } from 'react-icons/fa';
import './allRisk.css';
import Navbarco from '../conformite/Navbarco';

const DashboardRisk = () => {
    const [risks, setRisks] = useState([
        { id: 1, nom: 'Risque A', date_declaration: '2024-01-10', declencheur: 'Déclencheur A' },
        { id: 2, nom: 'Risque B', date_declaration: '2024-02-15', declencheur: 'Déclencheur B' },
        { id: 3, nom: 'Risque C', date_declaration: '2024-03-20', declencheur: 'Déclencheur C' },
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

    const filteredRisks = risks.filter((risk) => {
        const value = risk[filterBy]?.toString().toLowerCase();
        return value.includes(searchTerm.toLowerCase());
    });

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
            <main className="risk-dashboard">
                <div className="container risk-dashboard-container">
                    <h3 className="risk-formation-title">Liste des Risques</h3>
                    
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
                                    <th onClick={() => requestSort('id')}>
                                        Numéro {getSortArrow('id')}
                                    </th>
                                    <th onClick={() => requestSort('nom')}>
                                        Nom {getSortArrow('nom')}
                                    </th>
                                    <th onClick={() => requestSort('date_declaration')}>
                                        Date {getSortArrow('date_declaration')}
                                    </th>
                                    <th onClick={() => requestSort('declencheur')}>
                                        Déclencheur {getSortArrow('declencheur')}
                                    </th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedRisks.map((risk) => (
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
                            {sortedRisks.map((risk) => (
                                <div key={risk.id} className="risk-responsable-item">
                                    <h4>{risk.nom}</h4>
                                    <p>Date: {risk.date_declaration}</p>
                                    <p>Déclencheur: {risk.declencheur}</p>
                                    <Link to={`/ModifierRisk/${risk.id}`} className="produit-btn">
                                        <FaEdit />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};

export default DashboardRisk;
