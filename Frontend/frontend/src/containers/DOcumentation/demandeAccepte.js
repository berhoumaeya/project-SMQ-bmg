import React, { useState } from 'react';
import SidebarDoc from '../../components/SidebarDoc';
import SubNavbarDoc from '../../components/SubNavbarDOC';
import { Link } from 'react-router-dom';
import { HiOutlineDocumentAdd } from "react-icons/hi";

const staticDemandes = [
    { id: 1, type: 'Manuel', document_object: 'Objet A', statut: 'Accepté' },
    { id: 2, type: 'Procédure', document_object: 'Objet B', statut: 'Accepté' },
    { id: 3, type: 'Politique', document_object: 'Objet C', statut: 'Accepté' },
];

const DemandeAcc = () => {
    const [searchQuery] = useState('');
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
                                <h3 className='formation-title'>Liste des Demandes Acceptées</h3>
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
                                                                <Link to={`/CréerDocInt/${demande.id}`} ><button className="btn btn-outline-info" style={{ marginTop: '10px' }}><HiOutlineDocumentAdd />
                                                                </button> </Link>
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
                                                       <img src="https://via.placeholder.com/100" alt={`${demande.type}`} className="responsable-img" />
                                                        <div className="responsable-info">
                                                            <h5 className='responsable-title'> Demande N°: {demande.id}</h5>
                                                              <p><strong>Type document: </strong>{demande.type}</p>
                                                              <p><strong>Objet: </strong>{demande.document_object}</p>
                                                              <p><strong>Statut: </strong>{demande.statut}</p>

                                                            <td>
                                                                <Link to={`/CréerDocInt/${demande.id}`} ><button className="btn  btn-outline-info"><HiOutlineDocumentAdd /></button></Link>
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
