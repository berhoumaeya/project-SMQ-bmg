import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../Dashboard.css"

const DashboardCompetence = () => {
    const [competences, setFormations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFormations = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_evaluation_competence/`, {
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
             <div className="competences-header">
                <h3>Liste des Employes</h3>
            </div>
            <table className="table table-bordered" id="dataTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom Competence</th>
                        <th>Employe</th>
                        <th>crée à</th>
                        <th>Détails</th>
                    </tr>
                </thead>
                <tbody>
                    {competences.map(competence => (
                        <tr key={competence.id}>
                            <td>{competence.id}</td>
                            <td>{competence.name}</td>
                            <td>{competence.employe_concerne}</td>
                            <td>{competence.created_at}</td>
                            <Link to={`/competence/${competence.id}`}>Détails</Link>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to={`/ajouter-competence/`}><button>Evaluer competences</button></Link>
            <Link to={`/DashboardRH/`}><button>Retour</button></Link>
        </div>
    );
};

export default DashboardCompetence;
