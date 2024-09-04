import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './client.css';
import NavbarCli from './NavbarCli';
import SidbarCli from './SidbarCli'; 
import { FaEdit } from 'react-icons/fa';

const AllSuggestions = () => {
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
    const [view, setView] = useState('list'); 
    const [filterType, setFilterType] = useState('all'); 
    const [filterValue, setFilterValue] = useState(''); 
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

    const filteredSuggestions = suggestions
        .filter(suggestion => {
            if (filterType === 'all') {
                return suggestion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    suggestion.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    suggestion.type_suggestion.toLowerCase().includes(searchTerm.toLowerCase());
            }
            if (filterType === 'code') {
                return suggestion.id.toString().includes(filterValue);
            }
            if (filterType === 'nom') {
                return suggestion.description.toLowerCase().includes(filterValue.toLowerCase());
            }
            if (filterType === 'firstName') {
                return suggestion.type_suggestion.toLowerCase().includes(filterValue.toLowerCase());
            }
            return false;
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
            <NavbarCli viewMode={view} setViewMode={setView} />
            <main style={{ backgroundColor: '#ffff', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
            <SidbarCli />
            <div className="container fournisseur-dashboard">
                <div className="row">
                    <div>
                        <br />
                        <div className="client-table-container">
                            <h3 className='client-formation-title'>Liste des Suggestions</h3>
                            <div className="client-filter-container">
                                <select
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value)}
                                    className="client-filter-select"
                                >
                                    <option value="all">Tous les filtres</option>
                                    <option value="code">Nom Suggestion</option>
                                    <option value="nom">Date</option>
                                    <option value="firstName">Type Suggestion</option>
                                </select>
                                <input
                                    type="text"
                                    placeholder="Filtrer..."
                                    value={filterValue}
                                    onChange={(e) => setFilterValue(e.target.value)}
                                    className="client-filter-input"
                                />
                            </div>
                       
                            <br />
                            {view === 'list' ? (
                                <table className="client-styled-table">
                                    <thead className="table-header">
                                        <tr>
                                            <th onClick={() => requestSort('name')}>Nom Suggestion {getSortArrow('name')}</th>
                                            <th onClick={() => requestSort('date')}>Date {getSortArrow('date')}</th>
                                            <th onClick={() => requestSort('type_suggestion')}>Type Suggestion {getSortArrow('type_suggestion')}</th>
                                            <th onClick={() => requestSort('receptionnaire')}>Réceptionnaire {getSortArrow('receptionnaire')}</th>
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
        </>
    );
};

export default AllSuggestions;
