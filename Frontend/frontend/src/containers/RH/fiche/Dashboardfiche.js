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
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import '../list.css';
import SubNavbarRH from '../../../components/SubNavbarRH';
import SidebarRH from '../../../components/SidebarRH';

const sampleFiches = [
    { id: 1, name: 'Fiche 1', job_position: 'Position A', employe_concerne: 'Employe 1' },
    { id: 2, name: 'Fiche 2', job_position: 'Position B', employe_concerne: 'Employe 2' }
];

const DashboardFiche = () => {
    const [fiches, setFiches] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('list');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

    useEffect(() => {
        // Simulate data fetch
        setFiches(sampleFiches);
    }, []);

    const filteredFiches = useMemo(() => {
        return fiches.filter(fiche =>
            fiche.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            fiche.job_position.toLowerCase().includes(searchQuery.toLowerCase()) ||
            fiche.employe_concerne.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [fiches, searchQuery]);

    const sortedFiches = useMemo(() => {
        const sortableFiches = [...filteredFiches];
        if (sortConfig !== null) {
            sortableFiches.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableFiches;
    }, [filteredFiches, sortConfig]);


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
                            <div className="table-container" >
                                <h3 className="formation-title" >Liste des Fiches Employés</h3>
                                <br />
                                <div className="search-container" >
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
                                        <table className="table-header">
                                            <thead>
                                                <tr>
                                                    <th scope="col" onClick={() => requestSort('name')}>
                                                        Nom Fiche {getSortArrow('name')}
                                                    </th>
                                                    <th scope="col" onClick={() => requestSort('job_position')}>
                                                        Poste Employé {getSortArrow('job_position')}
                                                    </th>
                                                    <th scope="col" onClick={() => requestSort('employe_concerne')}>
                                                        Fiche de l'Employé {getSortArrow('employe_concerne')}
                                                    </th>
                                                    <th scope="col">Détails</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {sortedFiches.length > 0 ? (
                                                    sortedFiches.map(fiche => (
                                                        <tr>
                                                            <td>{fiche.name}</td>
                                                            <td>{fiche.job_position}</td>
                                                            <td>{fiche.employe_concerne}</td>
                                                            <td>
                                                                <Link to={`/update-fiche/${fiche.id}`} className="btn btn-outline-info btn-sm">
                                                                    <FaEdit />
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
                                            {sortedFiches.length > 0 ? (
                                                sortedFiches.map(fiche => (
                                                    <div key={fiche.id} className="responsable-item">
                                                        <img src="https://via.placeholder.com/100" alt={fiche.name} className="responsable-img" />
                                                        <div className="responsable-info">
                                                            <h5 className="responsable-title">{fiche.name}</h5>
                                                            <p><strong className="responsable-text">Poste :</strong> {fiche.job_position}</p>
                                                            <p><strong className="responsable-text">Employé Concerné :</strong> {fiche.employe_concerne}</p>
                                                            <Link to={`/update-fiche/${fiche.id}`} className="btn btn-outline-info btn-sm">
                                                                <FaEdit />
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
        </>
    );
};

export default DashboardFiche;
