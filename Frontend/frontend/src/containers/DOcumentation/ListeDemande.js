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
*/
import React, { useState, useEffect } from 'react';
import './listDoc.css';
import { FcApproval } from 'react-icons/fc';
import { RxCross2 } from 'react-icons/rx';
import SidebarDoc from '../../components/SidebarDoc';
import SubNavbarDoc from '../../components/SubNavbarDOC';
const sampleDemands = [
    {
        id: 1,
        type: 'Demande A',
        document_object: 'Document 1',
        created_by: 'Jean Dupont',
        created_at: '2024-07-25T08:00:00Z',
        attached_file: true,
        statut: 'En attente'
    },
    {
        id: 2,
        type: 'Demande B',
        document_object: 'Document 2',
        created_by: 'Marie Martin',
        created_at: '2024-07-25T09:00:00Z',
        attached_file: false,
        statut: 'En attente'
    },
    {
        id: 3,
        type: 'Demande C',
        document_object: 'Document 3',
        created_by: 'Paul Durand',
        created_at: '2024-07-25T10:00:00Z',
        attached_file: true,
        statut: 'En attente'
    }
];

const DemandList = () => {
    const [demands, setDemands] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('list');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

    useEffect(() => {
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

    const filteredDemands = demands.filter(demand =>
        demand.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        demand.document_object.toLowerCase().includes(searchQuery.toLowerCase()) ||
        demand.created_by.toLowerCase().includes(searchQuery.toLowerCase())
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
    return (
        <> <SubNavbarDoc viewMode={viewMode} setViewMode={setViewMode} />
            <main style={{ display: 'flex', minHeight: '100vh' }}>
                <SidebarDoc />
                <div className="container dashboard">
                    <div className="row">
                        <div>
                            <div className="table-container">
                                <h3 className='doc-title'>Liste des Demandes</h3>
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
                                <br />

                                {viewMode === 'list' ? (

                                    <table className="table-header">
                                        <thead>
                                            <tr>
                                                <th scope="col" onClick={() => requestSort('type')}>Type de demande {getSortArrow('type')}</th>
                                                <th scope="col" onClick={() => requestSort('document_object')}>Objet de demande {getSortArrow('document_object')}</th>
                                                <th scope="col" onClick={() => requestSort('created_by')}>Créé par {getSortArrow('created_by')}</th>
                                                <th scope="col" onClick={() => requestSort('created_at')}>Créé à {getSortArrow('created_at')}</th>
                                                <th scope="col" >Pièces jointes</th>
                                                <th scope="col" onClick={() => requestSort('statut')}>Statut {getSortArrow('statut')}</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredDemands.length > 0 ? (
                                                filteredDemands.map(demand => (
                                                    <tr >
                                                        <td>{demand.type}</td>
                                                        <td>{demand.document_object}</td>
                                                        <td>{demand.created_by}</td>
                                                        <td>{new Date(demand.created_at).toLocaleString()}</td>
                                                        <td>
                                                            {demand.attached_file ?
                                                                <a href={`/`} target="_blank" rel="noopener noreferrer">Consulter</a> :
                                                                'Aucun'}
                                                        </td>
                                                        <td>{demand.statut}</td>
                                                        <td>
                                                            <button onClick={() => handleStatusChange(demand.id, 'Validé')} className="btn btn-outline-success me-2"> <FcApproval /> </button>
                                                            <button onClick={() => handleStatusChange(demand.id, 'Refusé')} className="btn btn-outline-danger me-2"> <RxCross2 /></button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="8" className="text-center">Aucune demande disponible</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="grid">
                                        {filteredDemands.length > 0 ? (
                                            filteredDemands.map(demand => (
                                                <div key={demand.id} className="responsable-item">
                                                    <img src="https://via.placeholder.com/100" alt={`${demand.type}`} className="responsable-img" />
                                                    <div className="responsable-info">
                                                        <h5 className="responsable-title"> {demand.type}</h5>
                                                        <p><strong className="responsable-text">Document object :</strong> {demand.document_object}</p>
                                                        <p><strong className="responsable-text">Statut :</strong> {demand.statut}</p>
                                                        <td>
                                                            <button onClick={() => handleStatusChange(demand.id, 'Validé')} className="btn btn-outline-success btn-sm me-2"> <FcApproval /> </button>
                                                            <button onClick={() => handleStatusChange(demand.id, 'Refusé')} className="btn btn-outline-danger btn-sm me-2"> <RxCross2 /></button>
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
            </main>
        </>
    );
};

export default DemandList;
