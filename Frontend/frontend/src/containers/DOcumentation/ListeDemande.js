import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './demande.css'
import Cookies from 'js-cookie';


function DemandList() {
    const [demands, setDemands] = useState([]);

    useEffect(() => {
        // Appel API pour récupérer la liste des demandes
        axios.get(`${process.env.REACT_APP_API_URL}/doc/document-pending/`)
            .then(response => {
                setDemands(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des demandes:', error);
            });
    }, []);

    const handleStatusChange = (demandId, newStatus) => {
        // Définir vos en-têtes
        const headers = {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken') // Spécifiez le type de contenu JSON
        };
    
        // Appel API pour mettre à jour le statut de la demande
        axios.put(
            `${process.env.REACT_APP_API_URL}/doc/document-pending/${demandId}/`, 
            { 
                is_validated: newStatus
            },  // Assurez-vous d'envoyer les bons paramètres à votre API
            { headers: headers }  // Utilisez le troisième argument pour spécifier les en-têtes
        )
        .then(response => {
            const updatedDemands = demands.map(demand => {
                if (demand.id === demandId) {
                    return { ...demand, is_validated: newStatus };
                }
                return demand;
            });
            setDemands(updatedDemands);
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
                        <strong>Créé par :</strong> {demand.created_by}
                    </div>
                    <div>
                        <strong>Créé à :</strong> {new Date(demand.created_at).toLocaleString()}
                    </div>
                    <div>
                        <strong>Statut :</strong> {demand.is_validated ? 'Validé' : 'Non validé'}
                    </div>
                    <button className="accept-button" onClick={() => handleStatusChange(demand.id, true)}>Accepter</button>
                    <button className="reject-button" onClick={() => handleStatusChange(demand.id, false)}>Refuser</button>
                </li>
            ))}
        </ul>
    </div>
);
};

export default DemandList;
