import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../RH/list.css';
import { GrEdit } from 'react-icons/gr';
import SubNavbarAudit from '../../components/SubNavbarAudit';
import ReactPaginate from 'react-paginate';

// Sample actions data
const actions = [
    {
        id: 1,
        nom_action: 'Amélioration du processus',
        designation: 'Optimiser le processus de fabrication pour réduire les coûts.',
        description: 'Analyse approfondie du processus existant et mise en œuvre des améliorations pour augmenter l\'efficacité.',
        site: 'New York',
        priorite_action: 'High',
        gravite_action: 'Medium',
        cause_action: 'Process Gap',
        source_action: 'Internal Review',
        type_action: 'Improvement',
        responsable_validation: 'jdoe',
        plan: 'Plan d\'action 2024',
        piece_jointe: 'plan_action.pdf'
    },
    {
        id: 2,
        nom_action: 'Action corrective client',
        designation: 'Résoudre les problèmes signalés par les clients concernant le produit X.',
        description: 'Collecter les retours clients et effectuer les modifications nécessaires pour améliorer le produit.',
        site: 'Los Angeles',
        priorite_action: 'Medium',
        gravite_action: 'High',
        cause_action: 'Human Error',
        source_action: 'Customer Feedback',
        type_action: 'Corrective',
        responsable_validation: 'mmartin',
        plan: 'Plan de correction client Q3',
        piece_jointe: 'feedback_clients.pdf'
    },
    {
        id: 3,
        nom_action: 'Maintenance préventive',
        designation: 'Planifier et exécuter une maintenance préventive sur l\'équipement Y.',
        description: 'Évaluer l\'état de l\'équipement et effectuer les réparations nécessaires avant toute défaillance.',
        site: 'Chicago',
        priorite_action: 'Low',
        gravite_action: 'Low',
        cause_action: 'Equipment Failure',
        source_action: 'Audit',
        type_action: 'Preventive',
        responsable_validation: 'pdurand',
        plan: 'Plan de maintenance 2024',
        piece_jointe: 'maintenance_plan.pdf'
    },
];
const Actions = () => {
    const [risks, setRisks] = useState([]);
    const [viewMode, setViewMode] = useState('list');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const meetingsPerPage = 5;

    useEffect(() => {
        setRisks(actions);
    }, []);

    const sortedActions = React.useMemo(() => {
        let sortableActions = [...risks];
        if (sortConfig !== null) {
            sortableActions.sort((a, b) => {
                const aValue = a[sortConfig.key].toString().toLowerCase();
                const bValue = b[sortConfig.key].toString().toLowerCase();
                if (aValue < bValue) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableActions;
    }, [risks, sortConfig]);


    const filteredRisks = useMemo(() => {
        if (!searchField) {
            return sortedActions;
        }
        return sortedActions.filter(audit =>
            audit[searchField]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [sortedActions, searchField, searchTerm]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchFieldChange = (e) => {
        setSearchField(e.target.value);
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
    const indexOfLastMeeting = (currentPage + 1) * meetingsPerPage;
    const indexOfFirstMeeting = indexOfLastMeeting - meetingsPerPage;
    const currentMeetings = filteredRisks.slice(indexOfFirstMeeting, indexOfLastMeeting);
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };
    const pageCount = Math.ceil(filteredRisks.length / meetingsPerPage);

    const getTypeActionLabelClass = (type_action) => {
        switch (type_action.toLowerCase()) {
            case 'improvement':
                return 'label label-danger';
            case 'corrective':
                return 'label label-warning';
            case 'preventive':
                return 'label label-success';
            default:
                return 'label';
        }
    };

    return (
        <>
            <SubNavbarAudit viewMode={viewMode} setViewMode={setViewMode} />
            <main style={{ display: 'flex', minHeight: '100vh', flex: ' ' }}>
                <div className="container dashboard">
                    <div className="row">
                        <div>
                            <div className="table-container">
                                <h3 className='formation-title'>Liste des Actions</h3>
                                <div className="search-container">
                                    <input
                                        type="text"
                                        placeholder="Rechercher..."
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        disabled={!searchField}
                                    />
                                    <select onChange={handleSearchFieldChange} value={searchField}>
                                        <option value="">Sélectionner un champ</option>
                                        <option value="nom_action">Nom Action</option>
                                        <option value="designation">Designation</option>
                                        <option value="type_action">Type Action</option>
                                    </select>
                                </div>
                                <div>
                                    {viewMode === 'list' ? (
                                        <> <table className="table-header">
                                            <thead>
                                                <tr>
                                                    <th scope="col" onClick={() => requestSort('nom_action')}>
                                                        Nom Action {getSortArrow('nom_action')}
                                                    </th>
                                                    <th scope="col" onClick={() => requestSort('designation')}>
                                                        Designation {getSortArrow('designation')}
                                                    </th>
                                                    <th scope="col" onClick={() => requestSort('type_action')}>
                                                        Type action {getSortArrow('type_action')}
                                                    </th>
                                                    <th scope="col">
                                                        Détails
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentMeetings.length > 0 ? (
                                                    currentMeetings.map(risk => (
                                                        <tr key={risk.id}>
                                                            <td>{risk.nom_action}</td>
                                                            <td>{risk.designation}</td>
                                                            <td>
                                                                <span className={getTypeActionLabelClass(risk.type_action)}>
                                                                    {risk.type_action}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <Link to={`/update-action/${risk.id}`} className="btn btn-outline-info">
                                                                    <GrEdit />
                                                                </Link>
                                                            </td>

                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="5" className="text-center">Aucune action disponible</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                            <ReactPaginate
                                                previousLabel={'Précédent'}
                                                nextLabel={'Suivant'}
                                                breakLabel={'...'}
                                                pageCount={pageCount}
                                                marginPagesDisplayed={2}
                                                pageRangeDisplayed={5}
                                                onPageChange={handlePageClick}
                                                containerClassName={'pagination'}
                                                pageClassName={'page-item'}
                                                pageLinkClassName={'page-link'}
                                                previousClassName={'page-item'}
                                                previousLinkClassName={'page-link'}
                                                nextClassName={'page-item'}
                                                nextLinkClassName={'page-link'}
                                                breakClassName={'page-item'}
                                                breakLinkClassName={'page-link'}
                                                activeClassName={'active'}
                                            />
                                        </>
                                    ) : (
                                        <div className="grid">
                                            {currentMeetings.length > 0 ? (
                                                currentMeetings.map(risk => (
                                                    <div key={risk.id} className="responsable-item">
                                                        <div className="responsable-info">
                                                            <h5 className='responsable-title'>{risk.nom_action}</h5>
                                                            <p><strong>Designation:</strong> {risk.designation}</p>
                                                            <p>
                                                                <span className={getTypeActionLabelClass(risk.type_action)}>
                                                                    {risk.type_action}
                                                                </span>
                                                            </p>
                                                            <Link to={`/update-action/${risk.id}`} className="btn btn-outline-info btn-sm me-2">
                                                                <GrEdit />
                                                            </Link>

                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-center">Aucune action disponible</p>
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

export default Actions;