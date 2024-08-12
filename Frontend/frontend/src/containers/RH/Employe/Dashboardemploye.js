/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../Dashboard.css"

const DashboardEmploye = () => {
    const [employes, setFormations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFormations = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_employe/`, {
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
<h3>Liste des Employes</h3>
</div>
<table className="table table-bordered" id="dataTable">
<thead>
<tr>
<th>ID</th>
<th>Nom Employe</th>
<th>Prenom Employe</th>
<th>Nom de l'utilisateur Employe</th>
<th>Email Employe</th>
<th>Détails de Employe</th>
</tr>
</thead>
<tbody>
{employes.map(employe => (
<tr key={employe.id}>
<td>{employe.id}</td>
<td>{employe.nom}</td>
<td>{employe.prenom}</td>
<td>{employe.username}</td>
<td>{employe.email}</td>
<Link to={`/employe/${employe.id}`}>Détails</Link>
</tr>
))}
</tbody>
</table>
<div className="button-group">
<Link to={`/ajouter-employe/`} className="btn btn-primary">Ajouter Employe</Link>
<Link to={`/DashboardRH/`} className="btn btn-secondary">Retour</Link>
</div>
</div>
);
};

export default DashboardEmploye;
*/
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../list.css';
import { FaEdit } from 'react-icons/fa';
import SubNavbarRH from '../../../components/SubNavbarRH';
import SidebarRH from '../../../components/SidebarRH';

const sampleEmployes = [
    {
        id: 1,
        nom: 'Doe',
        prenom: 'John',
        username: 'jdoe',
        email: 'john.doe@example.com'
    },
    {
        id: 2,
        nom: 'Smith',
        prenom: 'Jane',
        username: 'jsmith',
        email: 'jane.smith@example.com'
    },
    {
        id: 3,
        nom: 'Johnson',
        prenom: 'Emily',
        username: 'ejohnson',
        email: 'emily.johnson@example.com'
    }
];

const DashboardEmploye = () => {
    const [employes, setEmployes] = useState([]);
    const [error] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('list');

    useEffect(() => {
        setEmployes(sampleEmployes);
    }, []);

    if (error) {
        return <div>Erreur : {error}</div>;
    }

    const filteredEmployes = employes.filter(employe =>
        employe.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employe.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employe.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employe.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <><SubNavbarRH viewMode={viewMode} setViewMode={setViewMode} />
        <main style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#eeeeee' }}>
            <SidebarRH /> 
                <div className="container dashboard">
                <div className="row">
                    <div>
                        <br />
                        <br />
                        <div className="table-container">
                     
                                <h3 className='formation-title'>Liste des Employés</h3>
                                <div className="button-container">
                                    <Link to={`/ajouter-employe/`}>
                                        <button className="button-add">Ajouter Employé</button>
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
                                        <table className="table-header">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Nom Employé</th>
                                                    <th>Prénom Employé</th>
                                                    <th>Nom d'utilisateur Employé</th>
                                                    <th>Email Employé</th>
                                                    <th>Détails</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredEmployes.length > 0 ? (
                                                    filteredEmployes.map(employe => (
                                                        <tr key={employe.id}>
                                                            <td>{employe.id}</td>
                                                            <td>{employe.nom}</td>
                                                            <td>{employe.prenom}</td>
                                                            <td>{employe.username}</td>
                                                            <td>{employe.email}</td>
                                                            <td>
                                                                <Link to={`/update-employe/${employe.id}`} className="btn btn-outline-info btn-sm">
                                                                    <FaEdit />

                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="6" className="text-center">Aucun employé disponible</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <div className="grid">
                                            {filteredEmployes.length > 0 ? (
                                                filteredEmployes.map(employe => (
                                                    <div key={employe.id} className="responsable-item">
                                                        <img src="https://via.placeholder.com/100" alt={employe.nom} className="responsable-img" />

                                                        <div className="responsable-info">
                                                            <h5 className="responsable-name">{employe.nom} {employe.prenom}</h5>
                                                            <p><strong className="responsable-text">Username :</strong> {employe.username}</p>
                                                            <p><strong className="responsable-text">Email :</strong> {employe.email}</p>
                                                            <Link to={`/update-employe/${employe.id}`} className="btn btn-outline-info btn-sm">
                                                                <FaEdit />

                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-center">Aucun employé disponible</p>
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

export default DashboardEmploye;
