import React, { useState, useEffect } from 'react';
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
            'Accept': '*/*',
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
