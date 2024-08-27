import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../RH/list.css';
import { GrEdit } from 'react-icons/gr';
import SubNavbarAudit from '../../components/SubNavbarAudit';

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
    const [searchQuery] = useState('');
    const [viewMode, setViewMode] = useState('list');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

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
    
    const filteredRisks = sortedActions.filter(risk =>
        risk.nom_action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        risk.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        risk.type_action.toLowerCase().includes(searchQuery.toLowerCase())
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
            <main style={{ display: 'flex', minHeight: '100vh' ,flex:' '}}>
                <div className="container dashboard">
                    <div className="row">
                        <div>
                            <div className="table-container">
                                <h3 className='formation-title'>Liste des Actions</h3>
                                <div>
                                    {viewMode === 'list' ? (
                                        <table className="table-header">
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
                                                {filteredRisks.length > 0 ? (
                                                    filteredRisks.map(risk => (
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
                                    ) : (
                                        <div className="grid">
                                            {filteredRisks.length > 0 ? (
                                                filteredRisks.map(risk => (
                                                    <div key={risk.id} className="responsable-item">
                                                        <div className="responsable-info">
                                                            <h5 className="responsable-title">{risk.nom_action}</h5>
                                                            <p><strong className="responsable-text">Designation:</strong> {risk.designation}</p>
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