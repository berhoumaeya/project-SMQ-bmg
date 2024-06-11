import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams ,Link , Navigate} from 'react-router-dom';
import '../DOcumentation/DashboardDocInt.css'


const Meet = () => {
    const { id } = useParams();

    const [meets, setmeets] = useState([]);
    const [error, setError] = useState(null);
    const [deleteReussi, setDeleteReussi] = useState(false);

    useEffect(() => {
        const fetchmeets = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/reunion/meeting-minutes/${id}/`);
                setmeets(response.data);
            } catch (error) {
                console.error('Error fetching meets:', error);
                setError(error.message || 'Une erreur s\'est produite lors de la récupération des données.');
            }
        };

        fetchmeets();
    }, [id]);

    const handleDelete = async () => {
        const headers = {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
        };
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/reunion/delete_Meet/${id}/`, { headers: headers });
            setDeleteReussi(true);
        } catch (error) {
            console.error('Error deleting réunion:', error);
            setError(error.message || 'Une erreur s\'est produite lors de la suppression du réunion.');
        }
    };


    if (error) {
        return <div className="error-message">Erreur : {error}</div>;
    }

    if (deleteReussi) {
        return  <Navigate to="/allreunion" />
    }

    return (
        <div className="dashboard-doc-int">
            <div className="documents-container">
                {meets ? (
                    <div  className="document-card">
                        <div className="document-card-body">
                            <p className="document-card-text"><strong>Entête:</strong> {meets.header}</p>
                            <p className="document-card-text"><strong>Date:</strong> {meets.date}</p>
                            <p className="document-card-text"><strong>lieu:</strong> {meets.lieu}</p>
                            <p className="document-card-text"><strong>demandeur:</strong> {meets.demandeur}</p>
                            <p className="document-card-text"><strong>participants:</strong> {meets.participants && meets.participants.join(', ')}</p>
                            <p className="document-card-text"><strong>ordre_du_jour:</strong> {meets.ordre_du_jour}</p>
                            <p className="document-card-text"><strong>decisions_prises:</strong> {meets.decisions_prises && meets.decisions_prises.join(', ') ? meets.decisions_prises : 'pas de decision '}</p>
                            <div className="document-card-buttons">
                                <button onClick={() => handleDelete(meets.id)} className="btn btn-danger">Supprimer</button>
                            </div>
                        </div>
                    </div>
                ):(
                    <p>Chargement...</p>
                )}
            </div>
            <div className="dashboard-buttons">
                <Link to={`/allreunion/`} className="btn btn-secondary">Retour</Link>
            </div>
        </div>
    );
};

export default Meet;
