/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../formation/Dashboard.css"

const DashboardFiche = () => {
    const [fiche_employes, setFormations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFormations = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_fiche_employe/`, {
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
<h3>Liste des fiches Employes</h3>
</div>
<table className="table table-bordered" id="dataTable">
<thead>
<tr>
<th>ID</th>
<th>Nom fiche</th>
<th>Post Employe</th>
<th>Fiche de l'employe</th>
<th>Détails</th>
</tr>
</thead>
<tbody>
{fiche_employes.map(fiche => (
<tr key={fiche.id}>
<td>{fiche.id}</td>
<td>{fiche.name}</td>
<td>{fiche.job_position}</td>
<td>{fiche.employe_concerne}</td>
<Link to={`/fiche/${fiche.id}`}>Détails</Link>
</tr>
))}
</tbody>
</table>
<div className="button-group">
<Link to={`/ajouter-fiche/`} className="btn btn-primary">Ajouter fiche Employe</Link>
<Link to={`/DashboardRH/`} className="btn btn-secondary">Retour</Link>
</div>
</div>
);
};

export default DashboardFiche;
*/
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GrView } from 'react-icons/gr';
import { FaList, FaTh } from 'react-icons/fa';
import '../list.css';

const sampleFiches = [
    {
        id: 1,
        name: 'Fiche 1',
        job_position: 'Position A',
        employe_concerne: 'Employe 1',
    },
    {
        id: 2,
        name: 'Fiche 2',
        job_position: 'Position B',
        employe_concerne: 'Employe 2',
    },
    {
        id: 3,
        name: 'Fiche 3',
        job_position: 'Position C',
        employe_concerne: 'Employe 3',
    }
];

const DashboardFiche = () => {
    const [fiches, setFiches] = useState([]);
    const [error] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('list');

    useEffect(() => {
        // Simulating data fetch
        setFiches(sampleFiches);
    }, []);

    if (error) {
        return <div>Erreur : {error}</div>;
    }

    const filteredFiches = fiches.filter(fiche =>
        fiche.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fiche.job_position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fiche.employe_concerne.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
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
                            <h3 className="fiche-title">Liste des Fiches Employés</h3>
                            <div className="button-container">
                                <Link to="/DashboardRH/">
                                    <button className="retour">Retour</button>
                                </Link>
                                <Link to={`/ajouter-fiche/`}>
                                    <button className="button-add">Ajouter Fiche</button>
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
                                                <th scope="col">Nom Fiche</th>
                                                <th scope="col">Poste Employé</th>
                                                <th scope="col">Fiche de l'Employé</th>
                                                <th scope="col">Détails</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredFiches.length > 0 ? (
                                                filteredFiches.map(fiche => (
                                                    <tr key={fiche.id}>
                                                        <td>{fiche.id}</td>
                                                        <td>{fiche.name}</td>
                                                        <td>{fiche.job_position}</td>
                                                        <td>{fiche.employe_concerne}</td>
                                                        <td>
                                                            <Link to={`/fiche/${fiche.id}`} className="btn btn-outline-info btn-sm">
                                                                <GrView />
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="text-center">Aucune fiche disponible</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="grid">
                                        {filteredFiches.length > 0 ? (
                                            filteredFiches.map(fiche => (
                                                <div key={fiche.id} className="responsable-item">
                                                    <img src="https://via.placeholder.com/100" alt={fiche.name} className="responsable-img" />
                                                    <div className="responsable-info">
                                                        <h5 className="responsable-title">{fiche.name}</h5>
                                                        <p><strong className="responsable-text">Poste :</strong> {fiche.job_position}</p>
                                                        <p><strong className="responsable-text">Employé Concerné :</strong> {fiche.employe_concerne}</p>
                                                        <Link to={`/fiche/${fiche.id}`} className="btn btn-outline-info btn-sm">
                                                            <GrView />
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-center">Aucune fiche disponible</p>
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

export default DashboardFiche;
