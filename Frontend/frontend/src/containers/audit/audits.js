import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEdit, FaList, FaTh, FaTrash } from 'react-icons/fa';

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
    const [error, setError] = useState(null);
    const [deleteReussi, setDeleteReussi] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
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
        <main style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
            <div className="container dashboard">
                <div className="row">
                    <div>
                        <br />
                        <br />
                        <div className="table-container">
                            <div className="view-toggle">
                                <button className={`view-btn-audit ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>
                                    <FaList />
                                </button>
                                <button className={`view-btn-audit ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>
                                    <FaTh />
                                </button>
                            </div>
                            <h3 className='title'>Liste des Audits</h3>
                            <div className="button-container">
                                <Link to="/Dashboard/">
                                    <button className="retour">Retour</button>
                                </Link>
                                <Link to={`/ajouteraudit/`}>
                                    <button className="button-add-audit">Ajouter Audit</button>
                                </Link>
                                <Link to={`/valideraudit/`}>
                                    <button className="button-add-audit  me-2">Valider Audit</button>
                                </Link>
                            </div>
                            <br />
                            <div className="search-container">
                                <input
                                    type="text"
                                    placeholder="Rechercher..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="search-input"
                                />
                            </div>
                            <br />
                            <div>
                                {viewMode === 'list' ? (
                                    <table className="table-header">
                                    <thead>
                                        <tr>
                                                <th style={{ backgroundColor: '#58b3d3' }} scope="col" onClick={() => requestSort('reference')}>Référence {getSortArrow('reference')}</th>
                                                <th style={{ backgroundColor: '#58b3d3' }} scope="col" onClick={() => requestSort('designation')}>Désignation  {getSortArrow('designation')}</th>
                                                <th style={{ backgroundColor: '#58b3d3' }} scope="col" onClick={() => requestSort('type_audit')}>Type d'Audit {getSortArrow('type_audit')}</th>
                                                <th style={{ backgroundColor: '#58b3d3' }} scope="col" onClick={() => requestSort('statut')}>Statut {getSortArrow('statut')}</th>
                                                <th style={{ backgroundColor: '#58b3d3' }} scope="col">Détails</th>
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
                                                            <Link to={`/audit/${audit.id}`} className="btn btn-outline-info btn-sm">
                                                                <FaEdit />
                                                            </Link>
                                                            <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(audit.id)}>
                                                                <FaTrash />
                                                            </button>
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
                                                        <h5 className="responsable-title">{audit.designation}</h5>
                                                        <p><strong className="responsable-text">Type :</strong> {audit.type_audit}</p>
                                                        <p><strong className="responsable-text">Statut :</strong> {audit.statut}</p>
                                                        <Link to={`/audit/${audit.id}`} className="btn btn-outline-info btn-sm">
                                                            <FaEdit />
                                                        </Link>
                                                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(audit.id)}>
                                                            <FaTrash />
                                                        </button>
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
    );
};

export default Audits;
