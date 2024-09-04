import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaList, FaTh, FaEdit } from 'react-icons/fa';
import './allConformite.css'; // Updated to match the new component
import Navbarco from './Navbarco';

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
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

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

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const filteredConformites = conformites.filter((conformite) => {
        const value = conformite[filterBy]?.toString().toLowerCase();
        return value.includes(searchTerm.toLowerCase());
    });

    const sortedConformites = [...filteredConformites].sort((a, b) => {
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
            <main className="conformite-dashboard">
                <div className="container conformite-dashboard-container">
                    <h3 className="conformite-formation-title">Liste des Conformités</h3>
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
                                    <th onClick={() => handleSort('id')}>Numéro {sortConfig.key === 'id' ? (sortConfig.direction === 'ascending' ? '🔼' : '🔽') : '↕️'}</th>
                                    <th onClick={() => handleSort('nom')}>Nom {sortConfig.key === 'nom' ? (sortConfig.direction === 'ascending' ? '🔼' : '🔽') : '↕️'}</th>
                                    <th onClick={() => handleSort('type_fiche')}>Type de Fiche {sortConfig.key === 'type_fiche' ? (sortConfig.direction === 'ascending' ? '🔼' : '🔽') : '↕️'}</th>
                                    <th onClick={() => handleSort('type_decideur')}>Type de Decideur {sortConfig.key === 'type_decideur' ? (sortConfig.direction === 'ascending' ? '🔼' : '🔽') : '↕️'}</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedConformites.map((conformite) => (
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
                            {sortedConformites.map((conformite) => (
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
        </>
    );
};

export default DashboardConformite;
