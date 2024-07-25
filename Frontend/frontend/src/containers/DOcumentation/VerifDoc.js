/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './demande.css'
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

function VerifList() {
    const [documents, setdocuments] = useState([]);

    

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/doc/documents/verification/`)
            .then(response => {
                setdocuments(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des documents:', error);
            });
    }, []);

    const handleStatusChange = (demandId, newStatus) => {
        
        const headers = {
            'Accept': '*//*',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken') 
        };
    
        axios.put(
            `${process.env.REACT_APP_API_URL}/doc/documents/verification/${demandId}/`, 
            { 
                statut: newStatus
            },  
            { headers: headers }  
        )
        .then(response => {
            const updateddocuments = documents.map(demand => {
                if (demand.id === demandId) {
                    return { ...demand, statut: newStatus };
                }
                return demand;
            });
            setdocuments(updateddocuments);
            window.location.reload();
        })
        .catch(error => {
            console.error('Erreur lors de la mise à jour du statut de la demande:', error);
        });
    };
    

    return (
        <div className="demand-list">
        <h2>Liste des documents à vérifier</h2>
        <ul>
            {documents.map(demand => (
                <li key={demand.id} className="demand-item">
                    <div>
                        <strong>Libelle :</strong> {demand.libelle}
                    </div>
                    <div>
                        <strong>Type de document :</strong> {demand.type}
                    </div>
                    <div>
                        <strong>Site :</strong> {demand.selection_site}
                    </div>
                    <div>
                        <strong>Activité :</strong> {demand.selection_activite}
                    </div>
                    <div>
                        <strong>Créé par :</strong> {demand.selection_redacteur}
                    </div>
                    <div>
                        <strong>Vérificateur :</strong> {demand.selection_verificateur}
                    </div>
                    <div>
                        <strong>Approbateur :</strong> {demand.selection_approbateur}
                    </div>
                    <div>
                        <strong>liste informee :</strong> {demand.liste_informee}
                    </div>
                    <div>
                        <strong>Créé à :</strong> {new Date(demand.created_at).toLocaleString()}
                    </div>
                    <div>
                        <strong>Statut :</strong> {demand.statut}
                    </div>
                            <div>
                                <strong>Pièce jointe:</strong>
                                {demand.fichier ? <a href={`${process.env.REACT_APP_API_URL}/doc/documents/${demand.id}/`} target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}
                            </div>

                    <button className="accept-button" onClick={() => handleStatusChange(demand.id, 'Vérifié')}>Accepter</button>
                    <button className="reject-button" onClick={() => handleStatusChange(demand.id, 'En attente')}>Refuser</button>
                </li>
            ))}
        </ul>
        <div className="dashboard-buttons">
                <Link to={`/DashboardDoc/`} className="btn btn-secondary">Retour</Link>
        </div>
    </div>
);
};

export default VerifList;
*/
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FcApproval } from 'react-icons/fc';
import { RxCross2 } from 'react-icons/rx';
import './listDoc.css'; // Make sure this CSS file includes the styles you need

// Static data
const sampleDocuments = [
    {
        id: 1,
        libelle: 'Document A',
        type: 'Type 1',
        selection_site: 'Site 1',
        selection_activite: 'Activité 1',
        selection_redacteur: 'Rédacteur A',
        selection_verificateur: 'Vérificateur A',
        selection_approbateur: 'Approbateur A',
        liste_informee: 'Liste A',
        created_at: '2024-07-24T12:00:00Z',
        statut: 'En attente',
        fichier: 'fileA.pdf'
    },
    {
        id: 2,
        libelle: 'Document B',
        type: 'Type 2',
        selection_site: 'Site 2',
        selection_activite: 'Activité 2',
        selection_redacteur: 'Rédacteur B',
        selection_verificateur: 'Vérificateur B',
        selection_approbateur: 'Approbateur B',
        liste_informee: 'Liste B',
        created_at: '2024-07-25T09:30:00Z',
        statut: 'En attente',
        fichier: 'fileB.pdf'
    }
];

function VerifList() {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        // Simulating data fetch
        setDocuments(sampleDocuments);
    }, []);

    const handleStatusChange = (documentId, newStatus) => {
        const updatedDocuments = documents.map(document => {
            if (document.id === documentId) {
                return { ...document, statut: newStatus };
            }
            return document;
        });
        setDocuments(updatedDocuments);
    };

    return (
        <main style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
            <div className="container dashboard">
                <div className="row">
                    <div>
                        <br />
                        <br />
                        <div className="table-container">
                            <h3 className='formation-title'>Liste des documents à vérifier</h3>
                            <div className="button-container">
                                <Link to="/DashboardDoc/">
                                    <button className="retour">Retour</button>
                                </Link>
                            </div>
                            <br />
                            <div>
                                <table>
                                    <thead className="table-header">
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Libelle</th>
                                            <th scope="col">Type de document</th>
                                            <th scope="col">Site</th>
                                            <th scope="col">Activité</th>
                                            <th scope="col">Créé par</th>
                                            <th scope="col">Vérificateur</th>
                                            <th scope="col">Approbateur</th>
                                            <th scope="col">Liste informée</th>
                                            <th scope="col">Créé à</th>
                                            <th scope="col">Statut</th>
                                            <th scope="col">Pièce jointe</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {documents.length > 0 ? (
                                            documents.map(document => (
                                                <tr key={document.id}>
                                                    <td>{document.id}</td>
                                                    <td>{document.libelle}</td>
                                                    <td>{document.type}</td>
                                                    <td>{document.selection_site}</td>
                                                    <td>{document.selection_activite}</td>
                                                    <td>{document.selection_redacteur}</td>
                                                    <td>{document.selection_verificateur}</td>
                                                    <td>{document.selection_approbateur}</td>
                                                    <td>{document.liste_informee}</td>
                                                    <td>{new Date(document.created_at).toLocaleString()}</td>
                                                    <td>{document.statut}</td>
                                                    <td>
                                                        {document.fichier ? 
                                                            <a href={`#`} target="_blank" rel="noopener noreferrer">Consulter</a> : 
                                                            'Aucun'}
                                                    </td>
                                                    <td>
                                                        <button onClick={() => handleStatusChange(document.id, 'Vérifié')} className="btn btn-outline-info btn-sm">
                                                            <FcApproval /> 
                                                        </button>
                                                        <button onClick={() => handleStatusChange(document.id, 'En attente')} className="btn btn-outline-info btn-sm">
                                                            <RxCross2 /> 
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="13" className="text-center">Aucun document disponible</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default VerifList;
