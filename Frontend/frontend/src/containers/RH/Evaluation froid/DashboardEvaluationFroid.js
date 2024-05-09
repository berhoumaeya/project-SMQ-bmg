import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../Dashboard.css"

const DashboardFroid = () => {
    const [froids, setFormations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFormations = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_evaluation_froid/`, {
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
                <h3>Liste des Evaluation Froid</h3>
            </div>
            <table className="table table-bordered" id="dataTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom evaluation</th>
                        <th>crée par</th>
                        <th>crée à</th>
                        <th>Modifié par</th>
                        <th>Modifié à</th>
                    </tr>
                </thead>
                <tbody>
                    {froids.map(froid => (
                        <tr key={froid.id}>
                            <td>{froid.name}</td>
                            <td>{froid.created_by}</td>
                            <td>{froid.created_at}</td>
                            <td>{froid.updated_by}</td>
                            <td>{froid.updated_at}</td>
                            <Link to={`/froid/${froid.id}`}>Détails</Link>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to={`/ajouter-froid/`}>
                    <button>Ajouter Evaluation froid</button>
            </Link>
        </div>
    );
};

export default DashboardFroid;
