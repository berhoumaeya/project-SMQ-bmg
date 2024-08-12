import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FcApproval } from 'react-icons/fc';
import { RxCross2 } from 'react-icons/rx';
import './audit.css'; // Ensure this CSS file has the styles you need
import { FaList, FaTh } from 'react-icons/fa';

// Static data
const sampleDemands = [
    {
        id: 1,
        reference: 'AUD001',
        designation: 'Audit de sécurité',
        type_audit: 'Sécurité',
        created_at: '2024-01-01T12:00:00Z',
        statut: 'En attente'
    },
    {
        id: 2,
        reference: 'AUD002',
        designation: 'Audit de conformité',
        type_audit: 'Conformité',
        created_at: '2024-02-01T12:00:00Z',
        statut: 'En attente'
    },
    {
        id: 3,
        reference: 'AUD003',
        designation: 'Audit financier',
        type_audit: 'Financier',
        created_at: '2024-03-01T12:00:00Z',
        statut: 'En attente'
    }
];

function ValidAudit() {
    const [demands, setDemands] = useState([]);
    const [viewMode, setViewMode] = useState('list');

    useEffect(() => {
        // Simulating data fetch
        setDemands(sampleDemands);
    }, []);

    const handleStatusChange = (demandId, newStatus) => {
        const updatedDemands = demands.map(demand => {
            if (demand.id === demandId) {
                return { ...demand, statut: newStatus };
            }
            return demand;
        });
        setDemands(updatedDemands);
    };

    return (
        <main style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
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
                            <h3 className='title'>Liste des audits</h3>
                            <div className="button-container">
                                <Link to="/Audits/">
                                    <button className="retour">Retour</button>
                                </Link>
                            </div>
                            <br />
                            <div>
                                {viewMode === 'list' ? (
                                    <table className="table-header">
                                        <thead>
                                            <tr>
                                                <th style={{ backgroundColor: '#58b3d3' }} scope="col">ID</th>
                                                <th style={{ backgroundColor: '#58b3d3' }} scope="col">Référence</th>
                                                <th style={{ backgroundColor: '#58b3d3' }} scope="col">Désignation</th>
                                                <th style={{ backgroundColor: '#58b3d3' }} scope="col">Type</th>
                                                <th style={{ backgroundColor: '#58b3d3' }} scope="col">Créé à</th>
                                                <th style={{ backgroundColor: '#58b3d3' }} scope="col">Statut</th>
                                                <th style={{ backgroundColor: '#58b3d3' }} scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {demands.length > 0 ? (
                                                demands.map(demand => (
                                                    <tr key={demand.id}>
                                                        <td>{demand.id}</td>
                                                        <td>{demand.reference}</td>
                                                        <td>{demand.designation}</td>
                                                        <td>{demand.type_audit}</td>
                                                        <td>{new Date(demand.created_at).toLocaleString()}</td>
                                                        <td>{demand.statut}</td>
                                                        <td>
                                                            <button onClick={() => handleStatusChange(demand.id, 'Réalisé')} className="btn btn-outline-success btn-sm">
                                                                <FcApproval />
                                                            </button>
                                                            <button onClick={() => handleStatusChange(demand.id, 'Non Réalisé')} className="btn btn-outline-danger btn-sm">
                                                                <RxCross2 />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="7" className="text-center">Aucun audit disponible</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="grid">
                                        {demands.length > 0 ? (
                                            demands.map(demand => (
                                                <div key={demand.id} className="responsable-item">
                                                    <img src="https://via.placeholder.com/100" alt={`${demand.type_audit}`} className="responsable-img" />
                                                    <div className="responsable-info">
                                                        <h5 className="responsable-title">{demand.type_audit}</h5>
                                                        <p><strong className="responsable-text">Référence :</strong> {demand.reference}</p>
                                                        <p><strong className="responsable-text">Désignation :</strong> {demand.designation}</p>
                                                        <p><strong className="responsable-text">Créé à :</strong> {new Date(demand.created_at).toLocaleString()}</p>
                                                        <p><strong className="responsable-text">Statut :</strong> {demand.statut}</p>
                                                        <div className="button-container">
                                                            <button onClick={() => handleStatusChange(demand.id, 'Réalisé')} className="btn btn-outline-success btn-sm">
                                                                <FcApproval />
                                                            </button>
                                                            <button onClick={() => handleStatusChange(demand.id, 'Non Réalisé')} className="btn btn-outline-danger btn-sm">
                                                                <RxCross2 />
                                                            </button>
                                                        </div>
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
}

export default ValidAudit;
