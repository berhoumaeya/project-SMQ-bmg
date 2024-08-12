/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../DOcumentation/DashboardDocInt.css'

const DashboardIndicateurs = () => {
    const [indicateurs, setindicateurs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIndicateur = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/indicateur/dashboard_Indicateur/`);
                setindicateurs(response.data);
            } catch (error) {
                console.error('Error fetching indicateurs:', error);
                setError(error.message || 'Une erreur s\'est produite lors de la récupération des données.');
            }
        };

        fetchIndicateur();
    }, []);




    if (error) {
        return <div className="error-message">Erreur : {error}</div>;
    }

    return (
        <div className="dashboard-doc-int">
            <div className="header">
                <h3>Liste des Indicateurs</h3>
            </div>
            <div className="documents-container">
                {indicateurs.map(indicateur => (
                    <div key={indicateur.id} className="document-card">
                        <div className="document-card-body">
                        <h2>Indicateur N° {indicateur.id}</h2>
                        <p><strong>Libelle:</strong> {indicateur.Libelle}</p>
                        <p><strong>type indicateur:</strong> {indicateur.type_indicateur}</p>
                        <p><strong>processus lie:</strong> {indicateur.processus_lie}</p>
                        <p><strong>axe politique qualite:</strong> {indicateur.axe_politique_qualite}</p>
                        <p><strong>type resultat attendu:</strong> {indicateur.type_resultat_attendu}</p>
                        <div className="button-group">
                             <Link to={`/ConsulterIndicateur/${indicateur.id}/`} className="btn btn-success mt-3">Consulter</Link>
                             <Link to={`/AjouterSuiviIndicateur/${indicateur.id}/`} className="btn btn-primary">Suivre Indicateur</Link>
                       </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="dashboard-buttons">
                <Link to={`/AjouterIndicateur/`} className="btn btn-primary">Ajouter Indicateur</Link>
            </div>
            <div className="dashboard-buttons">
                <Link to={`/Dashboard/`} className="btn btn-secondary">Retour</Link>
            </div>
        </div>
    );
};

export default DashboardIndicateurs;*/

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaList, FaTh, FaEdit } from 'react-icons/fa';
import { RiUserFollowLine } from "react-icons/ri";
import './indicateur.css';

const DashboardIndicateurs = () => {
    const indicateurs = [
        {
            id: 1,
            Libelle: "Indicateur 1",
            type_indicateur: "Type 1",
            processus_lie: "Processus 1",
            axe_politique_qualite: "Axe 1",
            type_resultat_attendu: "Resultat 1"
        },
        {
            id: 2,
            Libelle: "Indicateur 2",
            type_indicateur: "Type 2",
            processus_lie: "Processus 2",
            axe_politique_qualite: "Axe 2",
            type_resultat_attendu: "Resultat 2"
        },
        // Add more static data as needed
    ];

    const [viewMode, setViewMode] = useState('list');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredIndicateurs = indicateurs.filter(indicateur =>
        indicateur.Libelle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        indicateur.type_indicateur.toLowerCase().includes(searchTerm.toLowerCase()) ||
        indicateur.processus_lie.toLowerCase().includes(searchTerm.toLowerCase()) ||
        indicateur.axe_politique_qualite.toLowerCase().includes(searchTerm.toLowerCase()) ||
        indicateur.type_resultat_attendu.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
            <div className="container indicateur-dashboard">
                <div className="row">
                    <div>
                        <br />
                        <br />
                        <div className="indicateur-table-container">
                            <div className="indicateur-view-toggle">
                                <button className={`indicateur-view-btn ${viewMode === 'list' ? 'indicateur-active' : ''}`} onClick={() => setViewMode('list')}>
                                    <FaList /> 
                                </button>
                                <button className={`indicateur-view-btn ${viewMode === 'grid' ? 'indicateur-active' : ''}`} onClick={() => setViewMode('grid')}>
                                    <FaTh /> 
                                </button>
                            </div>
                            <h3 className='indicateur-formation-title'>Liste des Indicateurs</h3>
                            <div className="indicateur-button-container">
                                <Link to="/Dashboard/">
                                    <button className="indicateur-retour">Retour</button>
                                </Link>
                                <Link to="/AjouterIndicateur/">
                                    <button className="indicateur-button-add">Ajouter Indicateur</button>
                                </Link>
                            </div>
                            <br />
                            <div className="indicateur-search-container">
                                <input
                                    type="text"
                                    placeholder="Rechercher..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="indicateur-search-input"
                                />
                            </div>
                            <br />
                            <div>
                                {viewMode === 'list' ? (
                                    <table className="indicateur-styled-table">
                                        <thead className="indicateur-table-header">
                                            <tr>
                                                <th scope="col">ID</th>
                                                <th scope="col">Libellé</th>
                                                <th scope="col">Type Indicateur</th>
                                                <th scope="col">Processus Lié</th>
                                                <th scope="col">Axe Politique Qualité</th>
                                                <th scope="col">Type Résultat Attendu</th>
                                                <th scope="col">Consulter</th>
                                                <th scope="col">Suivre Indicateur</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredIndicateurs.length > 0 ? (
                                                filteredIndicateurs.map(indicateur => (
                                                    <tr key={indicateur.id}>
                                                        <td>{indicateur.id}</td>
                                                        <td>{indicateur.Libelle}</td>
                                                        <td>{indicateur.type_indicateur}</td>
                                                        <td>{indicateur.processus_lie}</td>
                                                        <td>{indicateur.axe_politique_qualite}</td>
                                                        <td>{indicateur.type_resultat_attendu}</td>
                                                        <td>
                                                            <Link to={`/ConsulterIndicateur/${indicateur.id}`} className="btn-view-details">
                                                                <FaEdit /> 
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            <Link to={`/AjouterSuiviIndicateur/${indicateur.id}`} className="btn btn btn-sm ml-2">
                                                            <RiUserFollowLine />
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="8" className="text-center">Aucun indicateur disponible</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="indicateur-grid">
                                        {filteredIndicateurs.length > 0 ? (
                                            filteredIndicateurs.map(indicateur => (
                                                <div key={indicateur.id} className="indicateur-responsable-item">
                                                    <div className="indicateur-responsable-info">
                                                        <h5 className="indicateur-responsable-title">{indicateur.Libelle}</h5>
                                                        <p><strong className="indicateur-responsable-text">Type Indicateur:</strong> {indicateur.type_indicateur}</p>
                                                        <p><strong className="indicateur-responsable-text">Processus Lié:</strong> {indicateur.processus_lie}</p>
                                                        <p><strong className="indicateur-responsable-text">Axe Politique Qualité:</strong> {indicateur.axe_politique_qualite}</p>
                                                        <p><strong className="indicateur-responsable-text">Type Résultat Attendu:</strong> {indicateur.type_resultat_attendu}</p>
                                                        <div>
                                                            <Link to={`/ConsulterIndicateur/${indicateur.id}`} className="btn-view-details">
                                                                <FaEdit /> Consulter
                                                            </Link>
                                                        </div>
                                                        <div>
                                                            <Link to={`/AjouterSuiviIndicateur/${indicateur.id}`} className="btn btn-primary btn-sm ml-2">
                                                               
                                                                <RiUserFollowLine />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center">Aucun indicateur disponible</div>
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

export default DashboardIndicateurs;
