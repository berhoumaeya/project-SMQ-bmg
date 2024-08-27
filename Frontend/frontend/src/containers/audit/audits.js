import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaTrashAlt } from 'react-icons/fa';
import SubNavbarAudit from '../../components/SubNavbarAudit';
import SidebarAudit from '../../components/SidebarAudit';
import { GrEdit } from 'react-icons/gr';

const sampleAudits = [
    {
        id: 1,
        reference: 'A001',
        designation: 'Audit 1',
        type_audit: 'Interne',
        statut: 'Complété'
    },
    {
        id: 2,
        reference: 'A002',
        designation: 'Audit 2',
        type_audit: 'Externe',
        statut: 'En cours'
    },
    {
        id: 3,
        reference: 'A003',
        designation: 'Audit 3',
        type_audit: 'Interne',
        statut: 'Planifié'
    }
];

const Audits = () => {
    const [audits, setAudits] = useState([]);
    const [setError] = useState(null);
    const [deleteReussi, setDeleteReussi] = useState(false);
    const [searchQuery] = useState('');
    const [viewMode, setViewMode] = useState('list');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

    useEffect(() => {
        setAudits(sampleAudits);
        const successMessage = localStorage.getItem('successMessage');
        if (successMessage) {
            toast.success(successMessage);
            localStorage.removeItem('successMessage');
        }
    }, []);

    const handleDelete = async (id) => {
        try {
            setAudits(audits.filter(audit => audit.id !== id));
            setDeleteReussi(true);
        } catch (error) {
            console.error('Error deleting audit:', error);
            setError(error.message || 'Une erreur s\'est produite lors de la suppression de l\'audit.');
        }
    };

    if (deleteReussi) {
        window.location.reload();
    }

    const filteredAudits = audits.filter(audit =>
        audit.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        audit.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        audit.type_audit.toLowerCase().includes(searchQuery.toLowerCase()) ||
        audit.statut.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedAudits = useMemo(() => {
        const sortableAudits = [...filteredAudits];
        if (sortConfig !== null) {
            sortableAudits.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableAudits;
    }, [filteredAudits, sortConfig]);


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
    }; return (
      <> <SubNavbarAudit viewMode={viewMode} setViewMode={setViewMode} /> 
        <main style={{ display: 'flex', minHeight: '100vh' }}>
            <SidebarAudit />
        <div className="container dashboard">
                <div className="row">
                    <div>
                        <div className="table-container">
                            <h3 className='formation-title'>Liste des Audits</h3>
                            <div>
                                {viewMode === 'list' ? (
                                    <table className="table-header">
                                    <thead>
                                        <tr>
                                                <th scope="col" onClick={() => requestSort('reference')}>Référence {getSortArrow('reference')}</th>
                                                <th scope="col" onClick={() => requestSort('designation')}>Désignation  {getSortArrow('designation')}</th>
                                                <th scope="col" onClick={() => requestSort('type_audit')}>Type d'Audit {getSortArrow('type_audit')}</th>
                                                <th scope="col" onClick={() => requestSort('statut')}>Statut {getSortArrow('statut')}</th>
                                                <th scope="col">Détails</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredAudits.length > 0 ? (
                                                filteredAudits.map(audit => (
                                                    <tr >
                                                        <td>{audit.reference}</td>
                                                        <td>{audit.designation}</td>
                                                        <td>{audit.type_audit}</td>
                                                        <td>{audit.statut}</td>
                                                        <td>
                                                            <Link to={`/audit/${audit.id}`} className="btn btn-outline-info  me-2">
                                                            <GrEdit />
                                                            </Link>
                                                           
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="6" className="text-center">Aucun audit disponible</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="grid">
                                        {sortedAudits.length > 0 ? (
                                            sortedAudits.map(audit => (
                                                <div key={audit.id} className="responsable-item">
                                                    <img src="https://via.placeholder.com/100" alt={audit.reference} className="responsable-img" />
                                                    <div className="responsable-info">
                                                        <h5>{audit.designation}</h5>
                                                        <p><strong >Type :</strong> {audit.type_audit}</p>
                                                        <p><strong >Statut :</strong> {audit.statut}</p>
                                                        <Link to={`/audit/${audit.id}`} className="btn btn-outline-info btn-sm me-2">
                                                            <GrEdit />
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-center">Aucun audit disponible</p>
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

export default Audits;
