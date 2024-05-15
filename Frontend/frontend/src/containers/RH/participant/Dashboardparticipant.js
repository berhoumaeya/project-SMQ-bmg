import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../Dashboard.css"

const DashboardParticipant = () => {
    const [participants, setFormations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFormations = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_participant/`, {
                    headers: {
                        'Accept': '*/*', 
                    }
                });
                setFormations(response.data);
            } catch (error) {
                console.error('Error fetching formations:', error);
                setError(error.message || 'Une erreur s\'est produite lors de la récupération des données.');
            }
        };

        fetchFormations();
    }, []);

    if (error) {
        return <div>Erreur : {error}</div>;
    }

    return (
        <div>
             <div className="participants-header">
                <h3>Liste des participants</h3>
            </div>
            <table className="table table-bordered" id="dataTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom Participant</th>
                        <th>Prenom Participant</th>
                        <th>Nom de l'utilisateur Participant</th>
                        <th>Email Participant</th>
                        <th>Détails de Participant</th>
                    </tr>
                </thead>
                <tbody>
                    {participants.map(participant => (
                        <tr key={participant.id}>
                            <td>{participant.id}</td>
                            <td>{participant.nom}</td>
                            <td>{participant.prenom}</td>
                            <td>{participant.username}</td>
                            <td>{participant.email}</td>
                            <Link to={`/participant/${participant.id}`}>Détails</Link>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to={`/ajouter-participant/`}><button>Ajouter participant</button></Link>
            <Link to={`/DashboardRH/`}><button>Retour</button></Link>
        </div>
    );
};

export default DashboardParticipant;
