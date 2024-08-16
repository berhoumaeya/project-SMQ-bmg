import React, { useState } from 'react';
import './listDoc.css';  
import SidebarDoc from '../../components/SidebarDoc';
import SubNavbarDoc from '../../components/SubNavbarDOC';
import { Link } from 'react-router-dom';

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
        <> <SubNavbarDoc viewMode={viewMode} setViewMode={setViewMode} />
            <main style={{ display: 'flex', minHeight: '100vh' }}>
                <SidebarDoc />
                <div className="container dashboard">
                    <div className="row">
                        <div>
                            <div className="table-container">
                                <h3 className='doc-title'>Liste des Demandes Acceptées</h3>                
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
                                                    <th scope="col">ID</th>
                                                    <th scope="col">Type document</th>
                                                    <th scope="col">Objet</th>
                                                    <th scope="col">Statut</th>
                                                    <th scope="col">Actions</th>
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
                                                                <Link to={`/CréerDocInt/${demande.id}`} ><button className="button-add-" style={{marginTop:'10px'}}>Créer document</button></Link>
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
        </>
    );
};

export default DemandeAcc;
