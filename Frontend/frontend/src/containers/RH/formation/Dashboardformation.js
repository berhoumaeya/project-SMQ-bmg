/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const DashboardFormation = () => {
    const [formations, setFormations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFormations = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_formation/`, {
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
<div className="formations-header">
<h3>Liste des Formations</h3>
</div>
<table className="table table-bordered" id="dataTable">
<thead>
<tr>
<th>ID</th>
<th>Intitulé Formation</th>
<th>Type Formation</th>
<th>Thème de formation</th>
<th>Responsable Validation</th>
<th>Détails de la formation</th>
</tr>
</thead>
<tbody>
{formations.map(formation => (
<tr key={formation.id}>
<td>{formation.id}</td>
<td>{formation.intitule_formation}</td>
<td>{formation.type_formation}</td>
<td>{formation.theme_formation}</td>
<td>{formation.responsable_validation}</td>
<td><Link to={`/formation/${formation.id}`} className="details-link">Détails</Link></td>
</tr>
))}
</tbody>
</table>
<div className="button-group">
<Link to={`/ajouter-formation/`} className="btn btn-primary">Ajouter Formation</Link>
<Link to={`/DashboardRH/`} className="btn btn-secondary">Retour</Link>
</div>
</div>

);
};

export default DashboardFormation;
*/
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GrView } from 'react-icons/gr';
import '../list.css';

const sampleFormations = [
    {
        id: 1,
        intitule_formation: 'Formation React',
        type_formation: 'Technique',
        organisme_formation: 'Organisme A',
        theme_formation: 'Développement Web',
        date_debut_formation: '2024-01-01',
        date_fin_formation: '2024-01-10',
        responsable_validation: 2,
        responsable_formation: [3, 4],
        created_at: '2024-01-01',
        created_by: 'Admin',
        updated_by: 'Admin',
        updated_at: '2024-01-10',
        participants: [5, 6],
        parametre_validation: 'Examen final',
        date_cloture: '2024-01-11',
        pieces_jointes: true
    },
    {
        id: 2,
        intitule_formation: 'Formation Node.js',
        type_formation: 'Technique',
        organisme_formation: 'Organisme B',
        theme_formation: 'Backend',
        date_debut_formation: '2024-02-01',
        date_fin_formation: '2024-02-10',
        responsable_validation: 3,
        responsable_formation: [4, 5],
        created_at: '2024-02-01',
        created_by: 'Admin',
        updated_by: 'Admin',
        updated_at: '2024-02-10',
        participants: [6, 7],
        parametre_validation: 'Projet final',
        date_cloture: '2024-02-11',
        pieces_jointes: false
    },
    {
        id: 3,
        intitule_formation: 'Formation UX/UI',
        type_formation: 'Design',
        organisme_formation: 'Organisme C',
        theme_formation: 'Frontend',
        date_debut_formation: '2024-03-01',
        date_fin_formation: '2024-03-10',
        responsable_validation: 4,
        responsable_formation: [5, 6],
        created_at: '2024-03-01',
        created_by: 'Admin',
        updated_by: 'Admin',
        updated_at: '2024-03-10',
        participants: [7, 8],
        parametre_validation: 'Portfolio final',
        date_cloture: '2024-03-11',
        pieces_jointes: true
    }
];

const DashboardFormation = () => {
    const [formations, setFormations] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Simulating data fetch
        setFormations(sampleFormations);
    }, []);

    if (error) {
        return <div>Erreur : {error}</div>;
    }

    const filteredFormations = formations.filter(formation =>
        formation.intitule_formation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        formation.theme_formation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        formation.type_formation.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
            <div className="container dashboard">
                <div className="row">
                    <div>
                        <br />
                        <br />
                        <div className="table-container">
                            <h3 className='formation-title'>Liste des Formations</h3>
                            <div className="button-container">
                                <Link to="/DashboardRH/">
                                    <button className="retour">Retour</button>
                                </Link>
                                <Link to={`/ajouter-formation/`}>
                                    <button className="button-add">Ajouter Formation</button>
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
                                            <th scope="col">ID</th>
                                            <th scope="col">Intitulé Formation</th>
                                            <th scope="col">Type Formation</th>
                                            <th scope="col">Thème de formation</th>
                                            <th scope="col">Responsable Validation</th>
                                            <th scope="col">Détails</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredFormations.length > 0 ? (
                                            filteredFormations.map(formation => (
                                                <tr key={formation.id}>
                                                    <td>{formation.id}</td>
                                                    <td>
                                                        <h6 className="font-weight-bold mb-0">{formation.intitule_formation}</h6>
                                                        <span className="text-muted">{formation.theme_formation}</span>
                                                    </td>
                                                    <td>
                                                        <span className="text-muted">{formation.type_formation}</span>
                                                    </td>
                                                    <td>
                                                        <span className="text-muted">{formation.theme_formation}</span>
                                                    </td>
                                                    <td>
                                                        <span className="text-muted">{formation.responsable_validation}</span>
                                                    </td>
                                                    <td>
                                                        <Link to={`/formation/${formation.id}`} className="btn btn-outline-info btn-sm">
                                                            <GrView />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center">Aucune formation disponible</td>
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

export default DashboardFormation;
