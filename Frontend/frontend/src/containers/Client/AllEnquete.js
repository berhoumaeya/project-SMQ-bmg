
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import './client.css';
import SidbarCli from './SidbarCli'; 
import NavbarCli from './NavbarCli';

const AllEnquetes = () => {
    const { id } = useParams();

    const [reclamations, setReclamations] = useState([
        {
            id: 1,
            name_enquete: 'Enquête 1',
            date_debut: '2023-01-01',
            date_fin: '2023-01-10',
            type_questionnaire: 'Type 1',
            clients: ['Client A', 'Client B'],
        },
        {
            id: 2,
            name_enquete: 'Enquête 2',
            date_debut: '2023-02-01',
            date_fin: '2023-02-10',
            type_questionnaire: 'Type 2',
            clients: ['Client C', 'Client D'],
        },
    ]);

    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [view, setView] = useState('list');
    const [filterBy, setFilterBy] = useState('name_enquete');
    const [sortConfig, setSortConfig] = useState({ key: 'name_enquete', direction: 'ascending' });

    const handleDelete = (reclamationId) => {
        setReclamations(prevReclamations => prevReclamations.filter(client => client.id !== reclamationId));
    };

    const filteredReclamations = reclamations.filter(reclamation => {
        const field = filterBy;
        if (field === 'clients') {
            return reclamation[field].join(', ').toLowerCase().includes(searchTerm.toLowerCase());
        }
        return reclamation[field].toLowerCase().includes(searchTerm.toLowerCase());
    });

    if (loading) {
        return <div>Chargement...</div>;
    }

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
                            <br />
                            <div className="client-table-container">
                                <h3 className='client-formation-title'>Liste des Enquêtes</h3>
                                <div className="client-search-container">
                                    <select 
                                        className="client-filter-select"
                                        value={filterBy}
                                        onChange={(e) => setFilterBy(e.target.value)}
                                    >
                                        <option value="name_enquete">Nom Enquête</option>
                                        <option value="date_debut">Date Début</option>
                                        <option value="date_fin">Date Fin</option>
                                        <option value="type_questionnaire">Type Questionnaire</option>
                                        <option value="clients">Clients</option>
                                    </select>
                                    <input
                                        type="text"
                                        className="client-filter-input"
                                        placeholder={`Rechercher par ${filterBy.replace('_', ' ')}...`}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <br />
                                <div>
                                    {view === 'list' ? (
                                        <table className="client-styled-table">
                                            <thead className="table-header">
                                                <tr>
                                                    <th scope="col" onClick={() => requestSort('name_enquete')}>
                                                        Nom Enquête {getSortArrow('name_enquete')}
                                                    </th>
                                                    <th scope="col" onClick={() => requestSort('date_debut')}>
                                                        Date Début {getSortArrow('date_debut')}
                                                    </th>
                                                    <th scope="col" onClick={() => requestSort('date_fin')}>
                                                        Date Fin {getSortArrow('date_fin')}
                                                    </th>
                                                    <th scope="col" onClick={() => requestSort('type_questionnaire')}>
                                                        Type Questionnaire {getSortArrow('type_questionnaire')}
                                                    </th>
                                                    <th scope="col">Clients</th>
                                                    <th scope="col">Détails</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredReclamations.length > 0 ? (
                                                    filteredReclamations.map((reclamation, index) => (
                                                        <tr key={index}>
                                                            <td>{reclamation.name_enquete}</td>
                                                            <td>{reclamation.date_debut}</td>
                                                            <td>{reclamation.date_fin}</td>
                                                            <td>{reclamation.type_questionnaire}</td>
                                                            <td>{reclamation.clients.join(', ')}</td>
                                                            <td>
                                                                <Link to={`/DetailEnquete/${reclamation.id}`} className="btn-view-details">
                                                                    <FaEdit />
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="6" className="text-center">Aucune enquête disponible</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <div className="client-grid">
                                            {filteredReclamations.length > 0 ? (
                                                filteredReclamations.map((reclamation, index) => (
                                                    <div key={index} className="client-responsable-item">
                                                        <div className="client-responsable-info">
                                                            <h5 className="client-responsable-title">{reclamation.name_enquete}</h5>
                                                            <p><strong className="client-responsable-text">Date Début :</strong> {reclamation.date_debut}</p>
                                                            <p><strong className="client-responsable-text">Date Fin :</strong> {reclamation.date_fin}</p>
                                                            <p><strong className="client-responsable-text">Type Questionnaire :</strong> {reclamation.type_questionnaire}</p>
                                                            <p><strong className="client-responsable-text">Clients :</strong> {reclamation.clients.join(', ')}</p>
                                                            <Link to={`/DetailsEnquete/${reclamation.id}`} className="btn btn-outline-info btn-sm">
                                                                <FaEdit />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-center">Aucune enquête disponible</p>
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

export default AllEnquetes;
