
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaList, FaTh, FaEdit } from 'react-icons/fa';
import SubNavbarfou from './SubNavbarfou';
import './fournisseur.css'; 
import SidbarFou from './SidbarFou'; 

const AllEvaluations = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [viewMode, setViewMode] = useState('list');
    const [filterBy, setFilterBy] = useState("id");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' }); // Add this line

    const evaluations = [
        {
            id: 1,
            type_produit: "Type A",
            critere_evaluation: "Critère 1",
            notes: "8/10",
            commentaires: "Bon produit",
            periodicite_evaluation: "Annuel",
            pieces_jointes: true,
        },
        {
            id: 2,
            type_produit: "Type B",
            critere_evaluation: "Critère 2",
            notes: "7/10",
            commentaires: "Satisfaisant",
            periodicite_evaluation: "Semestriel",
            pieces_jointes: false,
        },
    ];

    const uniqueTypes = ["Type A", "Type B"];

    const filteredEvaluations = evaluations
        .filter(evaluation =>
            evaluation.type_produit.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (!selectedType || evaluation.type_produit === selectedType) &&
            evaluation[filterBy]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });

    const handleFilterChange = (e) => {
        setFilterBy(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
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

    return (
        <>
        <SubNavbarfou viewMode={viewMode} setViewMode={setViewMode} />

        <main style={{ backgroundColor: '#ffff', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
            < SidbarFou />
            <div className="container fournisseur-dashboard">
                <div className="row">
                    <div>
                        <br />
                        <br />
                        <div className="fournisseur-table-container">
                            <h3 className='fournisseur-formation-title'>Liste des Evaluations</h3>
                            <br />
                            <div className="fournisseur-table-container">
                                <div className="risk-search-container">
                                    <select
                                        onChange={handleFilterChange}
                                        value={filterBy}
                                        className="risk-filter-select"
                                    >
                                        <option value="id">Numéro</option>
                                        <option value="type_produit">Type produit</option>
                                        <option value="critere_evaluation">Critère évaluation</option>
                                        <option value="periodicite_evaluation">Périodicité</option>
                                    </select>
                                    <input
                                        type="text"
                                        value={searchQuery} 
                                        onChange={handleSearchChange}
                                        placeholder="Rechercher..."
                                        className="risk-search-input"
                                    />
                                </div>
                            </div>
                            <br />
                            <div>
                                {viewMode === 'list' ? (
                                    <table className="fournisseur-styled-table">
                                        <thead className="fournisseur-table-header">
                                            <tr>
                                                <th scope="col" onClick={() => requestSort('id')}>
                                                    N° Evaluation {getSortArrow('id')}
                                                </th>
                                                <th scope="col" onClick={() => requestSort('type_produit')}>
                                                    Type produit {getSortArrow('type_produit')}
                                                </th>
                                                <th scope="col" onClick={() => requestSort('critere_evaluation')}>
                                                    Critère évaluation {getSortArrow('critere_evaluation')}
                                                </th>
                                                <th scope="col" onClick={() => requestSort('periodicite_evaluation')}>
                                                    Périodicité {getSortArrow('periodicite_evaluation')}
                                                </th>
                                                <th scope="col">Détails</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredEvaluations.length > 0 ? (
                                                filteredEvaluations.map(evaluation => (
                                                    <tr key={evaluation.id}>
                                                        <td>{evaluation.id}</td>
                                                        <td>{evaluation.type_produit}</td>
                                                        <td>{evaluation.critere_evaluation}</td>
                                                        <td>{evaluation.periodicite_evaluation}</td>
                                                        <td>
                                                            <Link to={`/EvaluationDetails/${evaluation.id}`} className="client-btn">
                                                                <FaEdit />
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="text-center">Aucune évaluation disponible</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="fournisseur-grid">
                                        {filteredEvaluations.length > 0 ? (
                                            filteredEvaluations.map(evaluation => (
                                                <div key={evaluation.id} className="fournisseur-responsable-item">
                                                    <img src="https://via.placeholder.com/100" alt={`${evaluation.type_produit}`} className="fournisseur-responsable-img" />
                                                    <div className="fournisseur-responsable-info">
                                                        <h5 className="fournisseur-responsable-title">{evaluation.type_produit} </h5>
                                                        <p><strong className="fournisseur-responsable-text">N° Evaluation :</strong> {evaluation.id}</p>
                                                        <p><strong className="fournisseur-responsable-text">Critère :</strong> {evaluation.critere_evaluation}</p>
                                                        <p><strong className="fournisseur-responsable-text">Périodicité :</strong> {evaluation.periodicite_evaluation}</p>
                                                        <Link to={`/EvaluationDetails/${evaluation.id}`} className="client-btn">
                                                            <FaEdit />
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-center">Aucune évaluation disponible</p>
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

export default AllEvaluations;
