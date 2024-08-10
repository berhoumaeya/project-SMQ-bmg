import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './listDoc.css';  // Use your own CSS file
import { FaList, FaTh } from 'react-icons/fa';

const staticDemandes = [
    { id: 1, type: 'Type A', document_object: 'Objet A', statut: 'Accepté' },
    { id: 2, type: 'Type B', document_object: 'Objet B', statut: 'Accepté' },
    { id: 3, type: 'Type C', document_object: 'Objet C', statut: 'Accepté' },
    // Add more static data as needed
];

const DemandeAcc = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('list');

    const filteredDemandes = staticDemandes.filter(demande =>
        demande.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        demande.document_object.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
            <div className="container dashboard">
                <div className="row">
                    <div>
                        <br />
                        <br />
                        <div className="table-container">
                            <div className="view-toggle">
                                <button className={`view-btn-doc ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>
                                    <FaList />
                                </button>
                                <button className={`view-btn-doc ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>
                                    <FaTh />
                                </button>
                            </div>
                            <h3 className='doc-title'>Liste des Demandes Acceptées</h3>
                            <div className="button-container">
                                <Link to="/DashboardDocInt/">
                                    <button className="retour">Retour</button>
                                </Link>
                                <Link to="/CréerDemande/">
                                    <button className="button-add-">Ajouter demande</button>
                                </Link>
                            </div>
                            <br />
                            <div className="search-container">
                                <input
                                    type="text"
                                    placeholder="Rechercher..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="search-input-doc"
                                />
                            </div>
                            <br />
                            <div>
                                {viewMode === 'list' ? (
                                    <table className="table-header">
                                        <thead>
                                            <tr>
                                                <th style={{ backgroundColor: '#76ab78' }} scope="col">ID</th>
                                                <th style={{ backgroundColor: '#76ab78' }} scope="col">Type document</th>
                                                <th style={{ backgroundColor: '#76ab78' }} scope="col">Objet</th>
                                                <th style={{ backgroundColor: '#76ab78' }} scope="col">Statut</th>
                                                <th style={{ backgroundColor: '#76ab78' }} scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredDemandes.length > 0 ? (
                                                filteredDemandes.map(demande => (
                                                    <tr key={demande.id}>
                                                        <td>{demande.id}</td>
                                                        <td>{demande.type}</td>
                                                        <td>{demande.document_object}</td>
                                                        <td>{demande.statut}</td>
                                                        <td>
                                                            <Link to={`/CréerDocInt/${demande.id}`} ><button className="button-add-">Créer document</button></Link>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="text-center">Aucune demande disponible</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="grid">
                                        {filteredDemandes.length > 0 ? (
                                            filteredDemandes.map(demande => (
                                                <div key={demande.id} className="responsable-item">
                                                    <img src="https://via.placeholder.com/100" alt={`${demande.tyoe}`} className="responsable-img" />

                                                    <div className="responsable-info">
                                                        <p className="responsable-text">Demande N°: {demande.id}</p>
                                                        <p className="responsable-text">Type document: {demande.type}</p>
                                                        <p className="responsable-text">Objet: {demande.document_object}</p>
                                                        <p className="responsable-text">Statut: {demande.statut}</p>

                                                        <td>
                                                            <Link to={`/CréerDocInt/${demande.id}`} ><button className="button-add-">Créer document</button></Link>
                                                        </td>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-center">Aucune demande disponible</p>
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

export default DemandeAcc;
