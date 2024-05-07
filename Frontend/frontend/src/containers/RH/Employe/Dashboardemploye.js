import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../Dashboard.css"

const DashboardEmploye = () => {
    const [employes, setFormations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFormations = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_employe/`, {
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
                <h3>Liste des Employes</h3>
            </div>
            <table className="table table-bordered" id="dataTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom Employe</th>
                        <th>Prenom Employe</th>
                        <th>Nom de l'utilisateur Employe</th>
                        <th>Email Employe</th>
                        <th>Détails de Employe</th>
                    </tr>
                </thead>
                <tbody>
                    {employes.map(employe => (
                        <tr key={employe.id}>
                            <td>{employe.id}</td>
                            <td>{employe.nom}</td>
                            <td>{employe.prenom}</td>
                            <td>{employe.username}</td>
                            <td>{employe.email}</td>
                            <Link to={`/employe/${employe.id}`}>Détails</Link>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to={`/ajouter-employe/`}>
                    <button>Ajouter Employe</button>
            </Link>
        </div>
    );
};

export default DashboardEmploye;
