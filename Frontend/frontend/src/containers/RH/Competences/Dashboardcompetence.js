/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams, Link } from 'react-router-dom';
import Cookies from 'js-cookie';


const DashboardCompetence = () => {
    const { id } = useParams();

    const [competences, setFormations] = useState([]);
    const [deleteReussi, setDeleteReussi] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFormations = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_evaluation_competence/${id}/`, {
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
}, [id]);
const handleDelete = async (id) => {
const headers = {
'Accept': '*//*',
'Content-Type': 'application/json',
'X-CSRFToken': Cookies.get('csrftoken'),
};
try {
await axios.delete(`${process.env.REACT_APP_API_URL}/RH/delete_evaluation_competence/${id}/`, { headers: headers });
setDeleteReussi(true);
} catch (error) {
console.error('Error deleting document:', error);
setError(error.message || 'Une erreur s\'est produite lors de la suppression du document.');
}
};

if (error) {
return <div>Erreur : {error}</div>;
}
if (deleteReussi) {
window.location.reload();
}

return (
<div className="dashboard-doc-int">
<div className="header">
<h3>Evaluations :</h3>
</div>
<div className="documents-container">
{competences.map(risk => (
    <div key={risk.id} className="document-card">
        <div className="document-card-body">
            <p className="document-card-text"><strong>nom evaluation:</strong> {risk.name}</p>
            <p className="document-card-text"><strong>commentaires:</strong> {risk.commentaires}</p>
            <p className="document-card-text"><strong>Competences:</strong></p>
            <ul>
                {risk.criteres.map((critere, index) => (
                    <li key={`${risk.id}-critere-${index}`}>
                        <strong>Nom:</strong> {critere.skills_acquis}, <strong>Note acquis:</strong> {critere.note_acquis} , <strong>Note requis:</strong> {critere.note_requis}
                    </li>
                ))}
            </ul>
            <p className="document-card-text"><strong>total_acquis:</strong> {risk.total_acquis}</p>
            <p className="document-card-text"><strong>total_requis:</strong> {risk.total_requis}</p>
            <p className="document-card-text"><strong>Crée par:</strong> {risk.created_by}</p>
            <p className="document-card-text"><strong>Crée à:</strong> {risk.created_at}</p>
            <div className="document-card-buttons">
                <button onClick={() => handleDelete(risk.id)} className="btn btn-danger">Supprimer</button>
            </div>
        </div>
    </div>
))}
</div>
<div className="dashboard-buttons">
<Link to={`/ajouter-competence/${id}`} className="btn btn-primary">Evaluer</Link>
</div>
<div className="dashboard-buttons">
<Link to={`/employe/${id}/`} className="btn btn-secondary">Retour</Link>
</div>
</div>
);
};

export default DashboardCompetence;
*/
import React, { useState, useEffect } from 'react';
import { GrTrash } from 'react-icons/gr';
import '../Dashboard.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import SubNavbarRH from '../../../components/SubNavbarRH';
import SidebarRH from '../../../components/SidebarRH';

const sampleCompetences = [
    {
        id: 1,
        name: 'Evaluation A',
        commentaires: 'Commentaire A',
        criteres: [
            { skills_acquis: 'Skill A', note_acquis: 4, note_requis: 5 },
            { skills_acquis: 'Skill B', note_acquis: 3, note_requis: 5 },
        ],
        total_acquis: 7,
        total_requis: 10,
        created_by: 'Admin',
        created_at: '2024-01-01',
    },
    {
        id: 2,
        name: 'Evaluation B',
        commentaires: 'Commentaire B',
        criteres: [
            { skills_acquis: 'Skill C', note_acquis: 5, note_requis: 5 },
            { skills_acquis: 'Skill D', note_acquis: 2, note_requis: 5 },
        ],
        total_acquis: 7,
        total_requis: 10,
        created_by: 'Admin',
        created_at: '2024-02-15',
    },
];

const DashboardCompetence = () => {
    const [competences, setCompetences] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('list');
    const [deleteReussi, setDeleteReussi] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setCompetences(sampleCompetences);
    }, []);

    const filteredCompetences = competences.filter(competence =>
        competence.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        competence.created_by.toLowerCase().includes(searchQuery.toLowerCase()) ||
        competence.created_at.includes(searchQuery)
    );
    const handleDelete = async (id) => {
        const headers = {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
        };
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/RH/delete_evaluation_competence/${id}/`, { headers: headers });
            setDeleteReussi(true);
        } catch (error) {
            console.error('Error deleting document:', error);
            setError(error.message || 'Une erreur s\'est produite lors de la suppression du document.');
        }
    };
    if (error) {
        return <div>Erreur : {error}</div>;
    }
    if (deleteReussi) {
        window.location.reload();
    }
    return (
        <><SubNavbarRH viewMode={viewMode} setViewMode={setViewMode} />
        <main style={{ display: 'flex', minHeight: '100vh' }}>
        <SidebarRH />
                <div className="container dashboard">
                    <div className="row">
                        <div>
                            <div className="table-container">
                                <h3 className='formation-title'>Liste des Évaluations de Compétence</h3>
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
                                        <table className="table-header">
                                            <thead>
                                                <tr>
                                                    <th>Nom évaluation</th>
                                                    <th>Commentaires</th>
                                                    <th>Créé par</th>
                                                    <th>Créé à</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredCompetences.length > 0 ? (
                                                    filteredCompetences.map(competence => (
                                                        <tr>
                                                            <td>{competence.name}</td>
                                                            <td>{competence.commentaires}</td>
                                                            <td>{competence.created_by}</td>
                                                            <td>{competence.created_at}</td>
                                                            <td>
                                                                <div>
                                                                    <button onClick={() => handleDelete(competence.id)} className="btn btn-danger"> <GrTrash /> </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="6" className="text-center">Aucune évaluation disponible</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <div className="grid">
                                            {filteredCompetences.length > 0 ? (
                                                filteredCompetences.map(competence => (
                                                    <div key={competence.id} className="responsable-item">
                                                        <img src="https://via.placeholder.com/100" alt={competence.name} className="responsable-img" />
                                                        <div className="responsable-info">
                                                            <h5 className="responsable-title">{competence.name}</h5>
                                                            <p><strong className="responsable-text">Commentaires :</strong> {competence.commentaires}</p>
                                                            <p><strong className="responsable-text">Créé par :</strong> {competence.created_by}</p>
                                                            <p><strong className="responsable-text">Créé à :</strong> {competence.created_at}</p>
                                                            <div>
                                                                <button onClick={() => handleDelete(competence.id)} className="btn btn-danger"> <GrTrash /> </button>
                                                            </div>
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

export default DashboardCompetence;
