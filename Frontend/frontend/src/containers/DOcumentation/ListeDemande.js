import React, { useState, useEffect } from 'react';
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
            'Accept': '*/*',
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
