import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../formation/Dashboard.css"

const DashboardFiche = () => {
    const [fiche_employes, setFormations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFormations = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_fiche_employe/`, {
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
             <div className="employes-header">
                <h3>Liste des fiches Employes</h3>
            </div>
            <table className="table table-bordered" id="dataTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom fiche</th>
                        <th>Post Employe</th>
                        <th>Fiche de l'employe</th>
                        <th>Détails</th>
                    </tr>
                </thead>
                <tbody>
                    {fiche_employes.map(fiche => (
                        <tr key={fiche.id}>
                            <td>{fiche.id}</td>
                            <td>{fiche.name}</td>
                            <td>{fiche.job_position}</td>
                            <td>{fiche.employe_concerne}</td>
                            <Link to={`/fiche/${fiche.id}`}>Détails</Link>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="button-group">
            <Link to={`/ajouter-fiche/`} className="btn btn-primary">Ajouter fiche Employe</Link>
            <Link to={`/DashboardRH/`} className="btn btn-secondary">Retour</Link>
           </div>
        </div>
    );
};

export default DashboardFiche;
