
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './client.css';
import SidbarCli from './SidbarCli'; 
import NavbarCli from './NavbarCli';
import { FaEdit } from 'react-icons/fa';

const Allreclamations = () => {
    const { id } = useParams();

    const [reclamations, setReclamations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [view, setView] = useState('list'); 
    const [filterType, setFilterType] = useState('all');
    const [filterValue, setFilterValue] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' }); // Define sortConfig and setSortConfig

    useEffect(() => {
        const mockReclamations = [
            {
                id: 1,
                code: 'REC001',
                description: 'Description for reclamation 1',
                type_reclamation: 'Type 1',
            },
        ];

        setReclamations(mockReclamations);
        setLoading(false);
    }, [id]);

    const handleDelete = (reclamationId) => {
        setReclamations(prevReclamations => prevReclamations.filter(reclamation => reclamation.id !== reclamationId));
    };

    const filteredReclamations = reclamations.filter(reclamation =>
        reclamation.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reclamation.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reclamation.type_reclamation.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort function
    const sortedReclamations = filteredReclamations.sort((a, b) => {
        if (sortConfig.key) {
            const modifier = sortConfig.direction === 'ascending' ? 1 : -1;
            if (a[sortConfig.key] < b[sortConfig.key]) return -1 * modifier;
            if (a[sortConfig.key] > b[sortConfig.key]) return 1 * modifier;
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

    if (loading) {
        return <div>Chargement...</div>;
    }

    return (
        <>
            <NavbarCli viewMode={view} setViewMode={setView} />
            <main style={{ backgroundColor: '#ffff', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
                <SidbarCli />
                <div className="container fournisseur-dashboard">
                    <div className="row">
                        <div>
                            <br />
                            <br />
                            <div className="client-table-container">
                                <h3 className="client-formation-title">Liste des Réclamations</h3>
                                <div className="client-filter-container">
                                    <select
                                        value={filterType}
                                        onChange={(e) => setFilterType(e.target.value)}
                                        className="client-filter-select"
                                    >
                                        <option value="all">Tous les filtres</option>
                                        <option value="code">Code Réclamation</option>
                                        <option value="nom">Description</option>
                                        <option value="firstName">Type Réclamation</option>
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
                                                <th scope="col" onClick={() => requestSort('code')}>
                                                    Code Réclamation {getSortArrow('code')}
                                                </th>
                                                <th scope="col" onClick={() => requestSort('description')}>
                                                    Description {getSortArrow('description')}
                                                </th>
                                                <th scope="col" onClick={() => requestSort('type_reclamation')}>
                                                    Type Réclamation {getSortArrow('type_reclamation')}
                                                </th>
                                                <th scope="col">Détails</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sortedReclamations.length > 0 ? (
                                                sortedReclamations.map((reclamation, index) => (
                                                    <tr key={index}>
                                                        <td>{reclamation.code}</td>
                                                        <td>{reclamation.description}</td>
                                                        <td>{reclamation.type_reclamation}</td>
                                                        <td>
                                                            <Link to={`/ModifierReclamation/${reclamation.code}`} className="btn-view-details">
                                                                <FaEdit />
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="text-center">Aucune réclamation disponible</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="client-grid">
                                        {sortedReclamations.length > 0 ? (
                                            sortedReclamations.map((reclamation, index) => (
                                                <div key={index} className="client-responsable-item">
                                                    <div className="client-responsable-info">
                                                        <h5 className="client-responsable-title">{reclamation.code}</h5>
                                                        <p><strong className="client-responsable-text">Description :</strong> {reclamation.description}</p>
                                                        <p><strong className="client-responsable-text">Type :</strong> {reclamation.type_reclamation}</p>
                                                        <Link to={`/ModifierReclamation/${reclamation.code}`} className="btn btn-outline-info btn-sm">
                                                            <FaEdit />
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-center">Aucune réclamation disponible</p>
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

export default Allreclamations;
