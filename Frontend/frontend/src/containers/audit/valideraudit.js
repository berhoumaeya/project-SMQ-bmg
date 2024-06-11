import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './audit.css'
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

function ValidAudit() {
    const [demands, setDemands] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/audit/dashboard_audit/`)
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
            `${process.env.REACT_APP_API_URL}/audit/dashboard_audit/${demandId}/`, 
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
        <h2>Liste des audits</h2>
        <ul>
            {demands.map(demand => (
                <li key={demand.id} className="demand-item">
                    <div>
                        <strong>Reference audit :</strong> {demand.reference}
                    </div>
                    <div>
                        <strong>Designation :</strong> {demand.designation}
                    </div>
                    <div>
                        <strong>Type :</strong> {demand.type_audit}
                    </div>
                    <div>
                        <strong>Créé à :</strong> {new Date(demand.created_at).toLocaleString()}
                    </div>
                    <div>
                        <strong>Statut :</strong> {demand.statut}
                    </div>
                    <button className="accept-button" onClick={() => handleStatusChange(demand.id, 'Réalisé')}>Accepter</button>
                    <button className="reject-button" onClick={() => handleStatusChange(demand.id, 'Non Réalisé')}>Refuser</button>
                </li>
            ))}
        </ul>
        <div className="dashboard-buttons">
                <Link to={`/audits/`} className="btn btn-secondary">Retour</Link>
        </div>
    </div>
    
);
};

export default ValidAudit;
