import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../Dashboard.css"

const DashboardPost = () => {
    const [posts, setFormations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFormations = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_job_post/`, {
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
             <div className="posts-header">
                <h3>Liste des posts</h3>
            </div>
            <table className="table table-bordered" id="dataTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Titre Position</th>
                        <th>Position</th>
                        <th>Mission principale</th>
                        <th>Détails de Position</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(Position => (
                        <tr key={Position.id}>
                            <td>{Position.id}</td>
                            <td>{Position.title}</td>
                            <td>{Position.position}</td>
                            <td>{Position.main_mission}</td>
                            <Link to={`/Position/${Position.id}`}>Détails</Link>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="button-group">
             <Link to={`/ajouter-Position/`} className="btn btn-primary">Ajouter Position</Link>
             <Link to={`/DashboardRH/`} className="btn btn-secondary">Retour</Link>
           </div>
        </div>
    );
};

export default DashboardPost;
