import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../containers/DOcumentation/DashboardDocInt.css'

const DashboardMeetingsGuest = () => {
    const [meetings, setmeetings] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchmeetings = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/reunion/dashboard_Meet/`);
                setmeetings(response.data);
            } catch (error) {
                console.error('Error fetching meetings:', error);
                setError(error.message || 'Une erreur s\'est produite lors de la récupération des données.');
            }
        };

        fetchmeetings();
    }, []);
    if (error) {
        return <div className="error-message">Erreur : {error}</div>;
    }

    return (
        <div className="dashboard-doc-int">
            <div className="header">
                <h3>Liste des réunions</h3>
            </div>
            <div className="documents-container">
                {meetings.map(meeting => (
                    <div key={meeting.id} className="document-card">
                        <div className="document-card-body">
                        <h2>Réunion N° {meeting.id}</h2>
                        <p><strong>Créé par:</strong> {meeting.created_by}</p>
                        <p><strong>type_reunion:</strong> {meeting.type_reunion}</p>
                        <p><strong>lieu:</strong> {meeting.lieu}</p>
                        <p><strong>ordre_du_jour:</strong> {meeting.ordre_du_jour}</p>
                        <p><strong>crée à:</strong> {meeting.created_at}</p>
                        <p><strong>Pièces jointes :</strong> {meeting.piece_jointe ? <a href={`${process.env.REACT_APP_API_URL}/reunion/meeting_attachments/${meeting.id}/`} target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>
                        <div className="dashboard-buttons">
                              <a href={`https://meet.google.com/ket-gnbg-wum`} className="btn btn-primary">Participer</a>
                        </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="dashboard-buttons">
                <Link to={`/guest/`} className="btn btn-secondary">Retour</Link>
            </div>
        </div>
    );
};

export default DashboardMeetingsGuest;
