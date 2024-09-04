
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaList, FaTh, FaEdit } from 'react-icons/fa';
import './indicateur.css';
import SidebarInd from './SidebarInd';

const DashboardIndicateurs = () => {
    const indicateurs = [
        {
            id: 1,
            Libelle: "Indicateur 1",
            type_indicateur: "Type 1",
            processus_lie: "Processus 1",
            axe_politique_qualite: "Axe 1",
            type_resultat_attendu: "Resultat 1"
        },
        {
            id: 2,
            Libelle: "Indicateur 2",
            type_indicateur: "Type 2",
            processus_lie: "Processus 2",
            axe_politique_qualite: "Axe 2",
            type_resultat_attendu: "Resultat 2"
        },
    ];

    const [viewMode, setViewMode] = useState('list');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterBy, setFilterBy] = useState('id');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

    const filteredIndicateurs = indicateurs.filter(indicateur =>
        indicateur.Libelle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        indicateur.type_indicateur.toLowerCase().includes(searchTerm.toLowerCase()) ||
        indicateur.processus_lie.toLowerCase().includes(searchTerm.toLowerCase()) ||
        indicateur.axe_politique_qualite.toLowerCase().includes(searchTerm.toLowerCase()) ||
        indicateur.type_resultat_attendu.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

    const handleFilterChange = (e) => {
        setFilterBy(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            <SidebarInd viewMode={viewMode} setViewMode={setViewMode} />
            <main style={{ backgroundColor: '#ffff', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
                <div className="container fournisseur-dashboard">
                    <div className="row">
                        <div>
                            <br />
                            <br />
                            <div className="indicateur-table-container">
                                <h3 className='indicateur-formation-title'>Liste des Indicateurs</h3>
                                <br />
                                <div className="indicateur-search-container">
                                    <select
                                        onChange={handleFilterChange}
                                        value={filterBy}
                                        className="risk-filter-select"
                                    >
                                        <option value="id">Numéro</option>
                                        <option value="Libellé">Libellé</option>
                                        <option value="Type Indicateur">Type Indicateur</option>
                                       
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
                                <div>
                                    {viewMode === 'list' ? (
                                        <table className="indicateur-styled-table">
                                           <thead className="indicateur-table-header">
                                                <tr>
                                                    <th scope="col" onClick={() => requestSort('id')}>
                                                        Indicateur N° {getSortArrow('id')}
                                                    </th>
                                                    <th scope="col" onClick={() => requestSort('Libelle')}>
                                                        Libellé {getSortArrow('Libelle')}
                                                    </th>
                                                    <th scope="col" onClick={() => requestSort('type_indicateur')}>
                                                        Type Indicateur {getSortArrow('type_indicateur')}
                                                    </th>
                                                    <th scope="col">Consulter</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredIndicateurs.length > 0 ? (
                                                    filteredIndicateurs.map(indicateur => (
                                                        <tr key={indicateur.id}>
                                                            <td>{indicateur.id}</td>
                                                            <td>{indicateur.Libelle}</td>
                                                            <td>{indicateur.type_indicateur}</td>
                                                            <td>
                                                                <Link to={`/ConsulterIndicateur/${indicateur.id}`} className="btn-view-details">
                                                                    <FaEdit /> 
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="4" className="text-center">Aucun indicateur disponible</td>
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
                                                            <h5 className="indicateur-responsable-title">{indicateur.Libelle}</h5>
                                                            <p><strong className="indicateur-responsable-text">Indicateur N° : </strong>{indicateur.id}</p>
                                                            <p><strong className="indicateur-responsable-text">Type Indicateur :</strong> {indicateur.type_indicateur}</p>
                                                            <div>
                                                                <Link to={`/ConsulterIndicateur/${indicateur.id}`} className="btn-view-details">
                                                                    <FaEdit /> 
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-center">Aucun indicateur disponible</div>
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

export default DashboardIndicateurs;
