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
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../list.css';
import SubNavbarRH from '../../../components/SubNavbarRH';
import SidebarRH from '../../../components/SidebarRH';
import { GrEdit } from 'react-icons/gr';

const sampleChauds = [
    { id: 1, name: 'Chaud 1', created_by: 'User A', created_at: '2024-01-01' },
    { id: 2, name: 'Chaud 2', created_by: 'User B', created_at: '2024-02-01' }
];

const DashboardChaud = () => {
    const [chauds, setChauds] = useState([]);
    const [searchQuery] = useState('');
    const [viewMode, setViewMode] = useState('list');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

    useEffect(() => {
        setChauds(sampleChauds);
    }, []);

    const filteredChauds = useMemo(() => {
        return chauds.filter(chaud =>
            chaud.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            chaud.created_by.toLowerCase().includes(searchQuery.toLowerCase()) ||
            chaud.created_at.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [chauds, searchQuery]);

    const sortedChauds = useMemo(() => {
        const sortableChauds = [...filteredChauds];
        if (sortConfig !== null) {
            sortableChauds.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableChauds;
    }, [filteredChauds, sortConfig]);


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
                                <h3 className="formation-title">Liste des Évaluations Chaud</h3>
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
                                                {sortedChauds.length > 0 ? (
                                                    sortedChauds.map(chaud => (
                                                        <tr key={chaud.id}>
                                                            <td>{chaud.name}</td>
                                                            <td>{chaud.created_by}</td>
                                                            <td>{chaud.created_at}</td>
                                                            <td>
                                                                <Link to={`/update-chaud/${chaud.id}`} className="btn btn-outline-info ">
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
                                            {sortedChauds.length > 0 ? (
                                                sortedChauds.map(chaud => (
                                                    <div key={chaud.id} className="responsable-item">
                                                        <img src="https://via.placeholder.com/100" alt={chaud.name} className="responsable-img" />
                                                        <div className="responsable-info">
                                                            <h5 className="responsable-title">{chaud.name}</h5>
                                                            <p><strong className="responsable-text">Créé par :</strong> {chaud.created_by}</p>
                                                            <p><strong className="responsable-text">Créé à :</strong> {chaud.created_at}</p>
                                                            <Link to={`/update-chaud/${chaud.id}`} className="btn btn-outline-info btn-sm">
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

export default DashboardChaud;
