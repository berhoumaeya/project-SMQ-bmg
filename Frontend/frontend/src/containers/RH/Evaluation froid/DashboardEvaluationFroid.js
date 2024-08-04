/*import React, { useState, useEffect } from 'react';
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
<h3>Liste des Evaluation Froid</h3>
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
{froids.map(froid => (
<tr key={froid.id}>
<td>{froid.id}</td>
<td>{froid.name}</td>
<td>{froid.created_by}</td>
<td>{froid.created_at}</td>
<Link to={`/froid/${froid.id}`}>Détails</Link>
</tr>
))}
</tbody>
</table>
<div className="button-group">
<Link to={`/ajouter-froid/`} className="btn btn-primary">Evaluer en froid</Link>
<Link to={`/DashboardRH/`} className="btn btn-secondary">Retour</Link>
</div>
</div>
);
};

export default DashboardFroid;
*/
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaList, FaTh } from 'react-icons/fa';
import '../list.css';

const sampleFroids = [
    {
        id: 1,
        name: 'Évaluation Froid 1',
        created_by: 'Admin',
        created_at: '2024-01-01'
    },
    {
        id: 2,
        name: 'Évaluation Froid 2',
        created_by: 'Admin',
        created_at: '2024-02-01'
    },
    {
        id: 3,
        name: 'Évaluation Froid 3',
        created_by: 'Admin',
        created_at: '2024-03-01'
    }
];

const DashboardFroid = () => {
    const [froids, setFroids] = useState([]);
    const [error] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('list');

    useEffect(() => {
        setFroids(sampleFroids);
    }, []);

    if (error) {
        return <div>Erreur : {error}</div>;
    }

    const filteredFroids = froids.filter(froid =>
        froid.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        froid.created_by.toLowerCase().includes(searchQuery.toLowerCase()) ||
        froid.created_at.includes(searchQuery)
    );

    return (
        <main style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
            <div className="container dashboard">
                <div className="row">
                    <div>
                        <br />
                        <br />
                        <div className="table-container">
                            <div className="view-toggle">
                                <button className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>
                                    <FaList />
                                </button>
                                <button className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>
                                    <FaTh />
                                </button>
                            </div>
                            <h3 className='formation-title'>Liste des Évaluations Froid</h3>
                            <div className="button-container">
                                <Link to="/DashboardRH/">
                                    <button className="retour">Retour</button>
                                </Link>
                                <Link to={`/ajouter-froid/`}>
                                    <button className="button-add">Évaluer en Froid</button>
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
                                {viewMode === 'list' ? (
                                    <table>
                                        <thead className="table-header">
                                            <tr>
                                                <th scope="col">ID</th>
                                                <th scope="col">Nom Évaluation</th>
                                                <th scope="col">Créé par</th>
                                                <th scope="col">Créé à</th>
                                                <th scope="col">Détails</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredFroids.length > 0 ? (
                                                filteredFroids.map(froid => (
                                                    <tr key={froid.id}>
                                                        <td>{froid.id}</td>
                                                        <td>{froid.name}</td>
                                                        <td>{froid.created_by}</td>
                                                        <td>{froid.created_at}</td>
                                                        <td>
                                                            <Link to={`/froid/${froid.id}`} className="btn btn-outline-info btn-sm">
                                                                <FaEdit />                                                            </Link>
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
                                ) : (
                                    <div className="grid">
                                        {filteredFroids.length > 0 ? (
                                            filteredFroids.map(froid => (
                                                <div key={froid.id} className="responsable-item">
                                                    <img src="https://via.placeholder.com/100" alt={froid.name} className="responsable-img" />

                                                    <div className="responsable-info">
                                                        <h5 className="responsable-title">{froid.name}</h5>
                                                        <p><strong className="responsable-text">Créé par :</strong> {froid.created_by}</p>
                                                        <p><strong className="responsable-text">Créé à :</strong> {froid.created_at}</p>
                                                        <Link to={`/froid/${froid.id}`} className="btn btn-outline-info btn-sm">
                                                            <FaEdit />                                                        </Link>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-center">Aucune évaluation disponible</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DashboardFroid;
