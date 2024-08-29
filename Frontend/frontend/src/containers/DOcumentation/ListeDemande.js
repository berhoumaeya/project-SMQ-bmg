/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './demande.css'
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

function DemandList() {
    const [demands, setDemands] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/doc/document-pending/`)
            .then(response => {
                setDemands(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des demandes:', error);
            });
    }, []);

    const handleStatusChange = (demandId, newStatus) => {
        
        const headers = {
            'Accept': '*//*',
'Content-Type': 'application/json',
'X-CSRFToken': Cookies.get('csrftoken') 
};
 
axios.put(
`${process.env.REACT_APP_API_URL}/doc/document-pending/${demandId}/`, 
{ 
statut: newStatus
},  
{ headers: headers }  
)
.then(response => {
const updatedDemands = demands.map(demand => {
if (demand.id === demandId) {
return { ...demand, statut: newStatus };
}
return demand;
});
setDemands(updatedDemands);
window.location.reload();
})
.catch(error => {
console.error('Erreur lors de la mise à jour du statut de la demande:', error);
});
};
 

return (
<div className="demand-list">
<h2>Liste des demandes</h2>
<ul>
{demands.map(demand => (
<li key={demand.id} className="demand-item">
<div>
<strong>Type de demande :</strong> {demand.type}
</div>
<div>
<strong>Objet de demande :</strong> {demand.document_object}
</div>
<div>
<strong>Créé par :</strong> {demand.created_by}
</div>
<div>
<strong>Créé à :</strong> {new Date(demand.created_at).toLocaleString()}
</div>
<div>
<strong>Pièces jointes :</strong> {demand.attached_file ? <a href={`${process.env.REACT_APP_API_URL}/doc/demand_attachments/${demand.id}/`} target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}
</div>
<div>
<strong>Statut :</strong> {demand.statut}
</div>
<button className="accept-button" onClick={() => handleStatusChange(demand.id, 'Validé')}>Accepter</button>
<button className="reject-button" onClick={() => handleStatusChange(demand.id, 'Refusé')}>Refuser</button>
</li>
))}
</ul>
<div className="dashboard-buttons">
<Link to={`/DashboardDoc/`} className="btn btn-secondary">Retour</Link>
</div>
</div>
 
);
};

export default DemandList;
*/import React, { useState, useEffect } from 'react';
import { FcApproval } from 'react-icons/fc';
import { RxCross2 } from 'react-icons/rx';
import SidebarDoc from '../../components/SidebarDoc';
import SubNavbarDoc from '../../components/SubNavbarDOC';
import History from '../../components/History'; // Import the History component
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

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

// Sample history data
const documentHistory = sampleDocuments.map(document => ({
    id: document.id,
    date: document.created_at,
    reference: document.libelle,
    created_by: document.selection_redacteur,
    created_at: document.created_at,
    additional_field_1: 'Value 1', // Replace with real data
    additional_field_2: 'Value 2'  // Replace with real data
}));

function VerifList() {
    const [documents, setDocuments] = useState([]);
    const [viewMode, setViewMode] = useState('list');
    const [isHistoryVisible, setIsHistoryVisible] = useState(false);

    useEffect(() => {
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

    const toggleHistorySidebar = () => {
        setIsHistoryVisible(prevState => !prevState);
    };

    return (
        <>
            <SubNavbarDoc viewMode={viewMode} setViewMode={setViewMode} />
            <main style={{ display: 'flex', minHeight: '100vh' }}>
                <SidebarDoc />
                <div className={`container dashboard ${isHistoryVisible ? 'history-visible' : ''}`}>
                    <div className="row">
                        <div>
                            <div className="table-container">
                                <h3 className='formation-title'>Liste des documents à vérifier</h3>
                                <div>
                                    {viewMode === 'list' ? (
                                        <table className="table-header">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Libelle</th>
                                                    <th scope="col">Type de document</th>
                                                    <th scope="col">Site</th>
                                                    <th scope="col">Activité</th>
                                                    <th scope="col">Vérificateur</th>
                                                    <th scope="col">Approbateur</th>
                                                    <th scope="col">Liste informée</th>
                                                    <th scope="col">Statut</th>
                                                    <th scope="col">Pièce jointe</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {documents.length > 0 ? (
                                                    documents.map(document => (
                                                        <tr key={document.id}>
                                                            <td>{document.libelle}</td>
                                                            <td>{document.type}</td>
                                                            <td>{document.selection_site}</td>
                                                            <td>{document.selection_activite}</td>
                                                            <td>{document.selection_verificateur}</td>
                                                            <td>{document.selection_approbateur}</td>
                                                            <td>{document.liste_informee}</td>
                                                            <td>{document.statut}</td>
                                                            <td>
                                                                {document.fichier ?
                                                                    <a href={`/`} target="_blank" rel="noopener noreferrer">Consulter</a> :
                                                                    'Aucun'}
                                                            </td>
                                                            <td>
                                                                <button onClick={() => handleStatusChange(document.id, 'Vérifié')} className="btn btn-outline-success me-2">
                                                                    <FcApproval />
                                                                </button>
                                                                <button onClick={() => handleStatusChange(document.id, 'En attente')} className="btn btn-outline-danger me-2">
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
                                    ) : (
                                        <div className="grid">
                                            {documents.length > 0 ? (
                                                documents.map(document => (
                                                    <div key={document.id} className="responsable-item">
                                                        <img src="https://via.placeholder.com/100" alt={`${document.libelle}`} className="responsable-img" />
                                                        <div className="responsable-info">
                                                            <h5>{document.libelle}</h5>
                                                            <p><strong>Type :</strong> {document.type}</p>
                                                            <p><strong>Statut :</strong> {document.statut}</p>
                                                            <td>
                                                                <button onClick={() => handleStatusChange(document.id, 'Vérifié')} className="btn btn-outline-success btn-sm me-2"> <FcApproval /> </button>
                                                                <button onClick={() => handleStatusChange(document.id, 'En attente')} className="btn btn-outline-danger btn-sm me-2"> <RxCross2 /></button>
                                                            </td>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-center">Aucun document disponible</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {isHistoryVisible && <History historyData={documentHistory} title="Historique des Documents" viewMode={viewMode} />}
                <button className="toggle-button" onClick={toggleHistorySidebar}>
                    {isHistoryVisible ? <FaArrowLeft /> : <FaArrowRight />}
                </button>
            </main>
        </>
    );
}

export default VerifList;
