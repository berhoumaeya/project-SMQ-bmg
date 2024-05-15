import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DashboardFormation = () => {
    const [formations, setFormations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFormations = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_formation/`, {
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
             <div className="formations-header">
                <h3>Liste des Formations</h3>
            </div>
            <table className="table table-bordered" id="dataTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Intitule Formation</th>
                        <th>Type Formation</th>
                        <th>Théme de formation</th>
                        <th>Responsable Formation</th>
                        <th>Responsable Validation</th>
                        <th>Détails de la formation</th>
                    </tr>
                </thead>
                <tbody>
                    {formations.map(formation => (
                        <tr key={formation.id}>
                            <td>{formation.id}</td>
                            <td>{formation.intitule_formation}</td>
                            <td>{formation.type_formation}</td>
                            <td>{formation.theme_formation}</td>
                            <td>{formation.responsable_formation}</td>
                            <td>{formation.responsable_validation}</td>
                            <Link to={`/formation/${formation.id}`}>Détails</Link>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to={`/ajouter-formation/`}><button>Ajouter Formation</button></Link>
            <Link to={`/DashboardRH/`}><button>Retour</button></Link>
        </div>
    );
};

export default DashboardFormation;
