/*import React, { useState, useEffect } from 'react';
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
                        'Accept': '*//*', 
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
                    </tr>
                </thead>
                <tbody>
                    {chauds.map(chaud => (
                        <tr key={chaud.id}>
                            <td>{chaud.id}</td>
                            <td>{chaud.name}</td>
                            <td>{chaud.created_by}</td>
                            <td>{chaud.created_at}</td>
                            <Link to={`/chaud/${chaud.id}`}>Détails</Link>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="button-group">
             <Link to={`/ajouter-chaud/`} className="btn btn-primary">Evaluer en chaud</Link>
             <Link to={`/DashboardRH/`} className="btn btn-secondary">Retour</Link>
           </div>
        </div>
    );
};

export default DashboardChaud;
*/
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../Dashboard.css";
import { GrView } from 'react-icons/gr';

// Static data for chaud evaluations
const sampleChaudEvaluations = [
    { id: 1, name: 'Evaluation A', created_by: 'Admin', created_at: '2024-01-01' },
    { id: 2, name: 'Evaluation B', created_by: 'Admin', created_at: '2024-02-15' }
];

const DashboardChaud = () => {
    const [chauds, setChaudEvaluations] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Simulating data fetch
        setChaudEvaluations(sampleChaudEvaluations);
    }, []);

    if (error) {
        return <div>Erreur : {error}</div>;
    }

    const filteredChauds = chauds.filter(chaud =>
        chaud.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
            <div className="container dashboard">
                <div className="row">
                    <div>
                        <br />
                        <br />
                        <div className="table-container">
                            <h3 className='formation-title'>Liste des Évaluations Chaud</h3>
                            <div className="button-container">
                                <Link to="/DashboardRH/">
                                    <button className="retour">Retour</button>
                                </Link>
                                <Link to={`/ajouter-chaud/`}>
                                    <button className="button-add">Évaluer en chaud</button>
                                </Link>
                            </div>
                            <br />
                            <div className="search-container">
                                <input
                                    type="text"
                                    placeholder="Rechercher..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="search-input"
                                />
                            </div>
                            <br />
                            <div>
                                <table>
                                    <thead className="table-header">
                                        <tr>
                                            <th>ID</th>
                                            <th>Nom évaluation</th>
                                            <th>Créé par</th>
                                            <th>Créé à</th>
                                            <th>Détails</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredChauds.length > 0 ? (
                                            filteredChauds.map(chaud => (
                                                <tr key={chaud.id}>
                                                    <td>{chaud.id}</td>
                                                    <td>{chaud.name}</td>
                                                    <td>{chaud.created_by}</td>
                                                    <td>{chaud.created_at}</td>
                                                    <td>
                                                        <Link to={`/chaud/${chaud.id}`} className="btn btn-outline-info btn-sm">
                                                            <GrView />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center">Aucune évaluation disponible</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DashboardChaud;
