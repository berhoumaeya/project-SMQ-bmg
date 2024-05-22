import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DashboardDocInt = () => {
    const [fiche_employes, setFormations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFormations = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/doc/documents/`, {
                    headers: {
                        'Accept': '*/*', 
                    }
                });
                setFormations(response.data);
            } catch (error) {
                console.error('Error fetching documents:', error);
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
                <h3>Liste des documents</h3>
            </div>
            <table className="table table-bordered" id="dataTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Libelle</th>
                        <th>Type</th>
                        <th>Site</th>
                        <th>Activite</th>
                        <th>statut</th>
                    </tr>
                </thead>
                <tbody>
                    {fiche_employes.map(fiche => (
                        <tr key={fiche.id}>
                            <td>{fiche.id}</td>
                            <td>{fiche.libelle}</td>
                            <td>{fiche.type}</td>
                            <td>{fiche.selection_site}</td>
                            <td>{fiche.selection_activite}</td>
                            <td>{fiche.statut}</td>
                            {/* <Link to={`/fiche/${fiche.id}`}>Détails</Link> */}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="button-group">
            <Link to={`/CréerDocInt/`} className="btn btn-primary">Rédiger document</Link>
            <Link to={`/DashboardDoc/`} className="btn btn-secondary">Retour</Link>
           </div>
        </div>
    );
};

export default DashboardDocInt;
