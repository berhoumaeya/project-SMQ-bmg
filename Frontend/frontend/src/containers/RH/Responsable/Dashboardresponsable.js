/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../Dashboard.css"

const DashboardResponsable = () => {
    const [responsables, setFormations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFormations = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_responsable_formation/`, {
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
             <div className="responsables-header">
                <h3>Liste des responsables</h3>
            </div>
            <table className="table table-bordered" id="dataTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom responsable</th>
                        <th>Prenom responsable</th>
                        <th>Nom de l'utilisateur responsable</th>
                        <th>Email responsable</th>
                        <th>Détails de responsable</th>
                    </tr>
                </thead>
                <tbody>
                    {responsables.map(responsable => (
                        <tr key={responsable.id}>
                            <td>{responsable.id}</td>
                            <td>{responsable.nom}</td>
                            <td>{responsable.prenom}</td>
                            <td>{responsable.username}</td>
                            <td>{responsable.email}</td>
                            <Link to={`/responsable/${responsable.id}`}>Détails</Link>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="button-group">
             <Link to={`/ajouter-responsable/`} className="btn btn-primary">Ajouter responsable</Link>
             <Link to={`/DashboardRH/`} className="btn btn-secondary">Retour</Link>
           </div>
        </div>
    );
};

export default DashboardResponsable;
*/


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GrView } from 'react-icons/gr';
import { FaList, FaTh } from 'react-icons/fa';
import '../list.css'; 

const sampleResponsables = [
    {
        id: 1,
        nom: 'Dupont',
        prenom: 'Jean',
        username: 'jdupont',
        email: 'jean.dupont@example.com'
    },
    {
        id: 2,
        nom: 'Martin',
        prenom: 'Marie',
        username: 'mmartin',
        email: 'marie.martin@example.com'
    },
    {
        id: 3,
        nom: 'Durand',
        prenom: 'Paul',
        username: 'pdurand',
        email: 'paul.durand@example.com'
    }
];

const DashboardResponsable = () => {
    const [responsables, setResponsables] = useState([]);
    const [error] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('list'); 

    useEffect(() => {
        setResponsables(sampleResponsables);
    }, []);

    if (error) {
        return <div>Erreur : {error}</div>;
    }

    const filteredResponsables = responsables.filter(responsable =>
        responsable.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        responsable.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        responsable.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        responsable.email.toLowerCase().includes(searchQuery.toLowerCase())
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
                            <h3 className="formation-title">Liste des Responsables</h3>
                            <div className="button-container">
                                <Link to="/DashboardRH/">
                                    <button className="retour">Retour</button>
                                </Link>
                                <Link to={`/ajouter-responsable/`}>
                                    <button className="button-add" >Ajouter Responsable</button>
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
                                                <th scope="col">Nom Responsable</th>
                                                <th scope="col">Prénom Responsable</th>
                                                <th scope="col">Nom d'utilisateur</th>
                                                <th scope="col">Email Responsable</th>
                                                <th scope="col">Détails</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredResponsables.length > 0 ? (
                                                filteredResponsables.map(responsable => (
                                                    <tr key={responsable.id}>
                                                        <td>{responsable.id}</td>
                                                        <td>{responsable.nom}</td>
                                                        <td>{responsable.prenom}</td>
                                                        <td>{responsable.username}</td>
                                                        <td>{responsable.email}</td>
                                                        <td>
                                                            <Link to={`/responsable/${responsable.id}`} className="btn btn-outline-info btn-sm">
                                                                <GrView />
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="6" className="text-center">Aucun responsable disponible</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="grid">
                                    {filteredResponsables.length > 0 ? (
                                        filteredResponsables.map(responsable => (
                                            <div key={responsable.id} className="responsable-item">
                                                <img src="https://via.placeholder.com/100" alt={`${responsable.nom} ${responsable.prenom}`} className="responsable-img" />
                                                <div className="responsable-info">
                                                    <h5 className="responsable-title">{responsable.nom} {responsable.prenom}</h5>
                                                    <p><strong className="responsable-text">Nom d'utilisateur :</strong> {responsable.username}</p>
                                                    <p><strong className="responsable-text">Email :</strong> {responsable.email}</p>
                                                    <Link to={`/responsable/${responsable.id}`} className="btn btn-outline-info btn-sm" >
                                                        <GrView />
                                                    </Link>
                                                </div>
                                            </div>
                                        ))
                                    )  : (
                                            <p className="text-center">Aucun responsable disponible</p>
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

export default DashboardResponsable;
