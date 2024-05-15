import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../Dashboard.css"

const DashboardChaud = () => {
    const [chauds, setFormations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFormations = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_evaluation_chaud/`, {
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
                <h3>Liste des Evaluation Chaud</h3>
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
                    {chauds.map(chaud => (
                        <tr key={chaud.id}>
                            <td>{chaud.id}</td>
                            <td>{chaud.name}</td>
                            <td>{chaud.created_by}</td>
                            <td>{chaud.created_at}</td>
                            <td>{chaud.updated_by}</td>
                            <td>{chaud.updated_at}</td>
                            <Link to={`/chaud/${chaud.id}`}>Détails</Link>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to={`/ajouter-chaud/`}>
                    <button>Ajouter Evaluation Chaud</button>
            </Link>
        </div>
    );
};

export default DashboardChaud;
