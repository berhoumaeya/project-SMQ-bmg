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
*/import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../list.css';
import SubNavbarRH from '../../../components/SubNavbarRH';
import SidebarRH from '../../../components/SidebarRH';
import { GrEdit } from 'react-icons/gr';

const sampleFroids = [
    { id: 1, name: 'Froid 1', created_by: 'User A', created_at: '2024-01-01' },
    { id: 2, name: 'Froid 2', created_by: 'User B', created_at: '2024-02-01' }
];

const DashboardFroid = () => {
    const [froids, setFroids] = useState([]);
    const [searchQuery] = useState('');
    const [viewMode, setViewMode] = useState('list');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

    useEffect(() => {
        setFroids(sampleFroids);
    }, []);

    const filteredFroids = useMemo(() => {
        return froids.filter(froid =>
            froid.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            froid.created_by.toLowerCase().includes(searchQuery.toLowerCase()) ||
            froid.created_at.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [froids, searchQuery]);

    const sortedFroids = useMemo(() => {
        const sortableFroids = [...filteredFroids];
        if (sortConfig !== null) {
            sortableFroids.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableFroids;
    }, [filteredFroids, sortConfig]);


    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortArrow = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? '🔼' : '🔽';
        }
        return '↕️';
    };

    return (
        <><SubNavbarRH viewMode={viewMode} setViewMode={setViewMode} />
        <main style={{ display: 'flex', minHeight: '100vh' }}>
        <SidebarRH />
                <div className="container dashboard">
                    <div className="row">
                        <div>
                            <div className="table-container">
                                <h3 className="formation-title">Liste des Évaluations Froid</h3>
                                <div>
                                    {viewMode === 'list' ? (
                                        <table className="table-header">
                                            <thead>
                                                <tr>
                                                    <th scope="col" onClick={() => requestSort('name')}>
                                                        Nom {getSortArrow('name')}
                                                    </th>
                                                    <th scope="col" onClick={() => requestSort('created_by')}>
                                                        Créé par {getSortArrow('created_by')}
                                                    </th>
                                                    <th scope="col" onClick={() => requestSort('created_at')}>
                                                        Créé à {getSortArrow('created_at')}
                                                    </th>
                                                    <th scope="col">Détails</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {sortedFroids.length > 0 ? (
                                                    sortedFroids.map(froid => (
                                                        <tr >
                                                            <td>{froid.name}</td>
                                                            <td>{froid.created_by}</td>
                                                            <td>{froid.created_at}</td>
                                                            <td>
                                                                <Link to={`/update-froid/${froid.id}`} className="btn btn-outline-info">
                                                                    <GrEdit />
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="4" className="text-center">Aucune évaluation disponible</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <div className="grid">
                                            {sortedFroids.length > 0 ? (
                                                sortedFroids.map(froid => (
                                                    <div key={froid.id} className="responsable-item">
                                                        <img src="https://via.placeholder.com/100" alt={froid.name} className="responsable-img" />
                                                        <div className="responsable-info">
                                                            <h5 className="responsable-title">{froid.name}</h5>
                                                            <p><strong >Créé par :</strong> {froid.created_by}</p>
                                                            <p><strong >Créé à :</strong> {froid.created_at}</p>
                                                            <Link to={`/update-froid/${froid.id}`} className="btn btn-outline-info btn-sm">
                                                                <GrEdit />
                                                            </Link>
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
        </>
    );
};

export default DashboardFroid;
