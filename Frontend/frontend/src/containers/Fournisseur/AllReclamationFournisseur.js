/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams, Link } from 'react-router-dom';
import '../Client/client.css';

const AllReclamation = () => {

    const { id } = useParams();

    const [reclamations, setreclamations] = useState([]);
    const [error, setError] = useState(null);
    const [deleteReussi, setDeleteReussi] = useState(false);

    useEffect(() => {
        const fetchReclamations = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/fournisseur/ReclamationFournisseur/${id}/`);
                setreclamations(response.data);
            } catch (error) {
                console.error('Error fetching reclamations:', error);
                setError(error.message || 'Une erreur s\'est produite lors de la récupération des données.');
            }
        };

        fetchReclamations();
    }, [id]);

    const handleDelete = async (id) => {
        const headers = {
            'Accept': '*//*',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
        };
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/fournisseur/delete_ReclamationFournisseur/${id}/`, { headers: headers });
            setDeleteReussi(true);
        } catch (error) {
            console.error('Error deleting evaluation:', error);
            setError(error.message || 'Une erreur s\'est produite lors de la suppression du evaluation.');
        }
    };



    if (error) {
        return <div className="error-message">Erreur : {error}</div>;
    }

    if (deleteReussi) {
        window.location.reload();
    }

    return (
        <div className="dashboard-client-int">
           <div className="evaluations-header">
            <h3>Liste des Réclamations</h3>
        </div>

            <div className="clients-container">
                {reclamations.map(evaluation => (
                    <div key={evaluation.id} className="client-card">
                        <div className="client-card-body">
                            <p><strong>Réclamation N°:</strong> {evaluation.numero_sequentiel}</p>
                            <p><strong>date reclamation:</strong> {evaluation.date_reclamation}</p>
                            <p><strong>description:</strong> {evaluation.description}</p>
                            <p><strong>designation:</strong> {evaluation.designation}</p>
                            <p><strong>type reclamation:</strong> {evaluation.type_reclamation}</p>
                            <p><strong>gravite:</strong> {evaluation.gravite}</p>
                            <p><strong>actions:</strong> {evaluation.actions}</p>
                            <p><strong>Réclamation Client:</strong> {evaluation.reclamation_client}</p>
                            <p><strong>Créé par:</strong> {evaluation.created_by}</p>
                            <p><strong>crée à:</strong> {evaluation.created_at}</p>
                            <p><strong>modifié par:</strong> {evaluation.updated_by}</p>
                            <p><strong>modifié à:</strong> {evaluation.updated_at}</p>
                            <p><strong>Pièces jointes :</strong> {evaluation.pieces_jointes ? <a href={`${process.env.REACT_APP_API_URL}/fournisseur/pieces_jointes_reclamation_fournisseur/${evaluation.id}/`} target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>
                            <div className="document-card-buttons">
                                <Link to={`/modifierDocInt/${evaluation.id}`} className="btn btn-primary">Modifier</Link>
                                <button onClick={() => handleDelete(evaluation.id)} className="btn btn-danger">Supprimer</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="dashboard-buttons">
                <Link to={`/CréerRéclamationFournisseur/${id}/`} className="btn btn-primary">Ajouter réclamation</Link>
            </div>
            <div className="dashboard-buttons">
                <Link to={`/ConsulterFournisseur/${id}`} className="btn btn-secondary">Retour</Link>
            </div>
        </div>
    );
};

export default AllReclamation;*/
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaList, FaTh, FaEdit } from 'react-icons/fa';
import SubNavbarfou from './SubNavbarfou';
import './fournisseur.css'; 

const sampleReclamations = [
    {
        id: 1,
        numero_sequentiel: '12345',
        date_reclamation: '2024-08-13',
        designation: 'Désignation',
        type_reclamation: 'Type A',
    },
    // Add more reclamations as needed
];

const AllReclamations = () => {
    const [reclamations, setReclamations] = useState(sampleReclamations);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('list');
    const [filterBy, setFilterBy] = useState('id');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

    const handleFilterChange = (e) => {
        setFilterBy(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

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

    const sortedReclamations = [...reclamations].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const filteredReclamations = sortedReclamations.filter(reclamation =>
        (filterBy === 'id' && reclamation.numero_sequentiel.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (filterBy === 'type_reclamation' && reclamation.type_reclamation.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (filterBy === 'designation' && reclamation.designation.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (filterBy === 'date_reclamation' && reclamation.date_reclamation.includes(searchQuery))
    );

    return (
        <>
            <SubNavbarfou viewMode={viewMode} setViewMode={setViewMode} />
            <main style={{ backgroundColor: '#ffff', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
                <div className="container fournisseur-dashboard">
                    <div className="row">
                        <div>
                            <br />
                            <br />
                            <div className="fournisseur-table-container">
                                <h3 className='fournisseur-formation-title'>Liste des Réclamations</h3>
                                <br />
                                <div className="risk-search-container">
                                    <select
                                        onChange={handleFilterChange}
                                        value={filterBy}
                                        className="risk-filter-select"
                                    >
                                        <option value="id">Numéro</option>
                                        <option value="type_reclamation">Type</option>
                                        <option value="designation">Désignation</option>
                                        <option value="date_reclamation">Date</option>
                                    </select>
                                    <input
                                        type="text"
                                        value={searchQuery} 
                                        onChange={handleSearchChange}
                                        placeholder="Rechercher..."
                                        className="risk-search-input"
                                    />
                                </div>
                                <br />
                                <div>
                                    {viewMode === 'list' ? (
                                        <table className="fournisseur-styled-table">
                                            <thead className="fournisseur-table-header">
                                                <tr>
                                                    <th scope="col" onClick={() => requestSort('numero_sequentiel')}>
                                                        N° Réclamation {getSortArrow('numero_sequentiel')}
                                                    </th>
                                                    <th scope="col" onClick={() => requestSort('date_reclamation')}>
                                                        Date {getSortArrow('date_reclamation')}
                                                    </th>
                                                    <th scope="col" onClick={() => requestSort('designation')}>
                                                        Désignation {getSortArrow('designation')}
                                                    </th>
                                                    <th scope="col" onClick={() => requestSort('type_reclamation')}>
                                                        Type {getSortArrow('type_reclamation')}
                                                    </th>
                                                    <th scope="col">Détails</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredReclamations.length > 0 ? (
                                                    filteredReclamations.map(reclamation => (
                                                        <tr key={reclamation.id}>
                                                            <td>{reclamation.numero_sequentiel}</td>
                                                            <td>{reclamation.date_reclamation}</td>
                                                            <td>{reclamation.designation}</td>
                                                            <td>{reclamation.type_reclamation}</td>
                                                            <td>
                                                                <Link to={`/ReclamationfouDetails/${reclamation.id}`} className="client-btn">
                                                                    <FaEdit />
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="5" className="text-center">Aucune réclamation disponible</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <div className="fournisseur-grid">
                                            {filteredReclamations.length > 0 ? (
                                                filteredReclamations.map(reclamation => (
                                                    <div key={reclamation.id} className="fournisseur-responsable-item">
                                                        <img src="https://via.placeholder.com/100" alt={`${reclamation.numero_sequentiel}`} className="fournisseur-responsable-img" />
                                                        <div className="fournisseur-responsable-info">
                                                            <h5 className="fournisseur-responsable-title">{reclamation.numero_sequentiel}</h5>
                                                            <p><strong className="fournisseur-responsable-text">Date :</strong> {reclamation.date_reclamation}</p>
                                                            <p><strong className="fournisseur-responsable-text">Désignation :</strong> {reclamation.designation}</p>
                                                            <p><strong className="fournisseur-responsable-text">Type :</strong> {reclamation.type_reclamation}</p>
                                                            <Link to={`/modifierReclamation/${reclamation.id}`} className="client-btn">
                                                                <FaEdit />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-center">Aucune réclamation disponible</p>
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

export default AllReclamations;
