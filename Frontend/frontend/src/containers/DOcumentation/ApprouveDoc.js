/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './demande.css'
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';


function ApprouveList() {
    const [documents, setdocuments] = useState([]);

    

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/doc/documents/Approuve/`)
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
`${process.env.REACT_APP_API_URL}/doc/documents/Approuve/${demandId}/`, 
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
<h2>Liste des documents à approuver</h2>
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
<button className="accept-button" onClick={() => handleStatusChange(demand.id, 'Approuvé')}>Accepter</button>
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

export default ApprouveList;
*/
import React, { useState, useEffect } from 'react';
import { FcApproval } from 'react-icons/fc';
import { RxCross2 } from 'react-icons/rx';
import SidebarDoc from '../../components/SidebarDoc';
import SubNavbarDoc from '../../components/SubNavbarDOC';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import History from '../../components/History';

const sampleDocuments = [
    {
        id: 1,
        libelle: 'Document A',
        type: 'Numerique',
        selection_site: 'Site 1',
        selection_activite: 'Activité 1',
        selection_redacteur: 'Rédacteur A',
        selection_verificateur: 'Vérificateur A',
        selection_approbateur: 'John',
        liste_informee: 'Liste A',
        created_at: '2024-07-24T12:00:00Z',
        statut: 'En attente',
        fichier: 'fileA.pdf'
    },
    {
        id: 2,
        libelle: 'Document B',
        type: 'Papier',
        selection_site: 'Site 2',
        selection_activite: 'Activité 2',
        selection_redacteur: 'Rédacteur B',
        selection_verificateur: 'Vérificateur B',
        selection_approbateur: 'Mike',
        liste_informee: 'Liste B',
        created_at: '2024-07-25T09:30:00Z',
        statut: 'En attente',
        fichier: 'fileB.pdf'
    }
];
const documentHistory = sampleDocuments.map(document => ({
    id: document.id,
    date: document.created_at,
    reference: document.libelle,
    created_by: document.selection_redacteur,
    created_at: document.created_at,
    selection_verificateur: document.selection_verificateur,
    selection_approbateur: document.selection_approbateur
}));
function ApprouveList() {
    const [documents, setDocuments] = useState([]);
    const [viewMode, setViewMode] = useState('list');
    const [isHistoryVisible, setIsHistoryVisible] = useState(false);
    const [isVerifDoc, setIsVerifDoc] = useState(false);

    useEffect(() => {
        setDocuments(sampleDocuments);
    }, []);

    const toggleHistorySidebar = () => {
        setIsHistoryVisible(prevState => !prevState);
    };
    useEffect(() => {
        if (window.location.pathname.includes('/ApprouveDoc')) {
            setIsVerifDoc(true);
        } else {
            setIsVerifDoc(false);
        }
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
        <> <SubNavbarDoc viewMode={viewMode} setViewMode={setViewMode} />
            <main style={{ display: 'flex', minHeight: '100vh' }}>
                <SidebarDoc />
                <div className="container dashboard">
                    <div className="row">
                        <div>
                            <div className="table-container">
                                <h3 className='formation-title'>Liste des documents à approuver</h3>
                                <div>
                                    {viewMode === 'list' ? (

                                        <table className="table-header">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Libelle</th>
                                                    <th scope="col">Type de document</th>
                                                    <th scope="col">Site</th>
                                                    <th scope="col">Activité</th>
                                                    <th scope="col">Liste informée</th>
                                                    <th scope="col">Statut</th>
                                                    <th scope="col">Pièce jointe</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {documents.length > 0 ? (
                                                    documents.map(document => (
                                                        <tr>
                                                            <td>{document.libelle}</td>
                                                            <td>{document.type}</td>
                                                            <td>{document.selection_site}</td>
                                                            <td>{document.selection_activite}</td>
                                                            <td>{document.liste_informee}</td>
                                                            <td>{document.statut}</td>
                                                            <td>
                                                                {document.fichier ?
                                                                    <a href={`/`} target="_blank" rel="noopener noreferrer">Consulter</a> :
                                                                    'Aucun'}
                                                            </td>
                                                            <td>
                                                                <button onClick={() => handleStatusChange(document.id, 'Approuvé')} className="btn btn-outline-success me-2">
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
                                                documents.map(demand => (
                                                    <div key={demand.id} className="responsable-item">
                                                        <img src="https://via.placeholder.com/100" alt={`${demand.tyoe}`} className="responsable-img" />
                                                        <div className="responsable-info">
                                                            <h5 className='responsable-title'> {demand.type}</h5>
                                                            <p><strong>Document object :</strong> {demand.document_object}</p>
                                                            <p><strong>Statut :</strong> {demand.statut}</p>
                                                            <td>
                                                                <button onClick={() => handleStatusChange(demand.id, 'Validé')} className="btn btn-outline-success  btn-sm me-2"> <FcApproval /> </button>
                                                                <button onClick={() => handleStatusChange(demand.id, 'Refusé')} className="btn btn-outline-danger  btn-sm me-2"> <RxCross2 /></button>
                                                            </td>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-center">Aucun demand disponible</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {isHistoryVisible && <History historyData={documentHistory} title="Historique des Documents" isVerifDoc={isVerifDoc} />}
                <button className="toggle-button" onClick={toggleHistorySidebar}>
                    {isHistoryVisible ? <FaArrowLeft /> : <FaArrowRight />}
                </button>
            </main>
        </>
    );
}

export default ApprouveList;
