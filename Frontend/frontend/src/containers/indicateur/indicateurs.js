import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../DOcumentation/DashboardDocInt.css'

const DashboardIndicateurs = () => {
    const [indicateurs, setindicateurs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIndicateur = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/indicateur/dashboard_Indicateur/`);
                setindicateurs(response.data);
            } catch (error) {
                console.error('Error fetching indicateurs:', error);
                setError(error.message || 'Une erreur s\'est produite lors de la récupération des données.');
            }
        };

        fetchIndicateur();
    }, []);




    if (error) {
        return <div className="error-message">Erreur : {error}</div>;
    }

    return (
        <div className="dashboard-doc-int">
            <div className="header">
                <h3>Liste des Indicateurs</h3>
            </div>
            <div className="documents-container">
                {indicateurs.map(indicateur => (
                    <div key={indicateur.id} className="document-card">
                        <div className="document-card-body">
                        <h2>Indicateur N° {indicateur.id}</h2>
                        <p><strong>Libelle:</strong> {indicateur.Libelle}</p>
                        <p><strong>type indicateur:</strong> {indicateur.type_indicateur}</p>
                        <p><strong>processus lie:</strong> {indicateur.processus_lie}</p>
                        <p><strong>axe politique qualite:</strong> {indicateur.axe_politique_qualite}</p>
                        <p><strong>type resultat attendu:</strong> {indicateur.type_resultat_attendu}</p>
                        <div className="button-group">
                             <Link to={`/ConsulterIndicateur/${indicateur.id}/`} className="btn btn-success mt-3">Consulter</Link>
                             <Link to={`/AjouterSuiviIndicateur/${indicateur.id}/`} className="btn btn-primary">Suivre Indicateur</Link>
                       </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="dashboard-buttons">
                <Link to={`/AjouterIndicateur/`} className="btn btn-primary">Ajouter Indicateur</Link>
            </div>
            <div className="dashboard-buttons">
                <Link to={`/Dashboard/`} className="btn btn-secondary">Retour</Link>
            </div>
        </div>
    );
};

export default DashboardIndicateurs;
