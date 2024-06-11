import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../Dashboard.css"

const DashboardResponsable = () => {
    const [responsables, setFormations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFormations = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_responsable_formation/`, {
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
             <div className="responsables-header">
                <h3>Liste des responsables</h3>
            </div>
            <table className="table table-bordered" id="dataTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom responsable</th>
                        <th>Prenom responsable</th>
                        <th>Nom de l'utilisateur responsable</th>
                        <th>Email responsable</th>
                        <th>Détails de responsable</th>
                    </tr>
                </thead>
                <tbody>
                    {responsables.map(responsable => (
                        <tr key={responsable.id}>
                            <td>{responsable.id}</td>
                            <td>{responsable.nom}</td>
                            <td>{responsable.prenom}</td>
                            <td>{responsable.username}</td>
                            <td>{responsable.email}</td>
                            <Link to={`/responsable/${responsable.id}`}>Détails</Link>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="button-group">
             <Link to={`/ajouter-responsable/`} className="btn btn-primary">Ajouter responsable</Link>
             <Link to={`/DashboardRH/`} className="btn btn-secondary">Retour</Link>
           </div>
        </div>
    );
};

export default DashboardResponsable;
