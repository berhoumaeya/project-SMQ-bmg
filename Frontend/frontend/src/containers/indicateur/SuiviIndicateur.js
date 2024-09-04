import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import SidebarInd from './SidebarInd';
import './indicateur.css'; // Ensure this path is correct

const SuiviIndicateur = () => {
    const [viewMode, setViewMode] = useState('list'); // State to toggle between list and grid views
    const [filterBy, setFilterBy] = useState('id'); // State for filter selection
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' }); // State for sorting
    const [all, setIndicateurs] = useState([
        {
            id: 1,
            frequence: 'Mensuel',
            objectif: 'Améliorer la qualité',
            limite_critique: '90%',
            resultat: '85%',
            commentaire: 'Bonnes pratiques recommandées',
            piece_jointe: true,
            created_by: 'Admin',
            created_at: '2024-08-21T10:00:00Z'
        },
        {
            id: 2,
            frequence: 'Trimestriel',
            objectif: 'Réduire les coûts',
            limite_critique: '5%',
            resultat: '3%',
            commentaire: 'Objectif atteint avec succès',
            piece_jointe: false,
            created_by: 'User',
            created_at: '2024-08-20T14:00:00Z'
        },
        // Add more static data as needed
    ]);

    const handleDelete = (id) => {
        setIndicateurs(prevIndicateurs => prevIndicateurs.filter(indicateur => indicateur.id !== id));
    };

    const handleFilterChange = (e) => {
        setFilterBy(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
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

    const sortedIndicateurs = React.useMemo(() => {
        let sortableItems = [...all];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [all, sortConfig]);

    const filteredIndicateurs = sortedIndicateurs.filter(indicateur => {
        if (filterBy === 'id') {
            return indicateur.id.toString().includes(searchTerm);
        }
        if (filterBy === 'frequence') {
            return indicateur.frequence.toLowerCase().includes(searchTerm.toLowerCase());
        }
        if (filterBy === 'objectif') {
            return indicateur.objectif.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return true;
    });

    return (
        <>
            <SidebarInd viewMode={viewMode} setViewMode={setViewMode} />
            <main style={{ backgroundColor: '#ffff', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
                <div className="container indicateur-dashboard">
                    <div className="row">
                        <div>
                            <div className="indicateur-table-container">
                                <h3 className='indicateur-formation-title'>Liste des Suivis</h3>
                                <div className="indicateur-search-container">
                                    <select
                                        onChange={handleFilterChange}
                                        value={filterBy}
                                        className="risk-filter-select"
                                    >
                                        <option value="id">Numéro</option>
                                        <option value="frequence">Fréquence</option>
                                        <option value="objectif">Objectif</option>
                                        {/* Add more filter options if needed */}
                                    </select>
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        placeholder="Rechercher..."
                                        className="risk-search-input"
                                    />
                                    <br />
                                </div>
                                <br />
                                {viewMode === 'list' ? (
                                    <table className="indicateur-styled-table">
                                        <thead className="indicateur-table-header">
                                            <tr>
                                                <th scope="col" onClick={() => requestSort('id')}>
                                                    ID {getSortArrow('id')}
                                                </th>
                                                <th scope="col" onClick={() => requestSort('frequence')}>
                                                    Fréquence {getSortArrow('frequence')}
                                                </th>
                                                <th scope="col" onClick={() => requestSort('objectif')}>
                                                    Objectif {getSortArrow('objectif')}
                                                </th>
                                                <th scope="col">
                                                    Limite Critique
                                                </th>
                                                <th scope="col">
                                                    Details
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredIndicateurs.length > 0 ? (
                                                filteredIndicateurs.map(indicateur => (
                                                    <tr key={indicateur.id}>
                                                        <td>{indicateur.id}</td>
                                                        <td>{indicateur.frequence}</td>
                                                        <td>{indicateur.objectif}</td>
                                                        <td>{indicateur.limite_critique}</td>
                                                        <td>
                                                            <Link to={`/ConsulterSuivi/${indicateur.id}`} className="btn-view-details">
                                                                <FaEdit /> 
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="10" className="text-center">Aucun suivi disponible</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="indicateur-grid">
                                        {filteredIndicateurs.length > 0 ? (
                                            filteredIndicateurs.map(indicateur => (
                                                <div key={indicateur.id} className="indicateur-responsable-item">
                                                    <div className="indicateur-responsable-info">
                                                        <p><strong className="indicateur-responsable-text">Fréquence:</strong> {indicateur.frequence}</p>
                                                        <p><strong className="indicateur-responsable-text">Objectif:</strong> {indicateur.objectif}</p>
                                                        <p><strong className="indicateur-responsable-text">Limite critique:</strong> {indicateur.limite_critique}</p>
                                                        <div className="document-card-buttons">
                                                            <Link to={`/ConsulterSuivi/${indicateur.id}`} className="btn-view-details">
                                                                <FaEdit /> 
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center">Aucun suivi disponible</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default SuiviIndicateur;
