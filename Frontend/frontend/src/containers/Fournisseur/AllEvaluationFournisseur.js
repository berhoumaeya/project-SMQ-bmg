/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams, Link } from 'react-router-dom';
import '../Client/client.css';

const AllEvaluations = () => {

    const { id } = useParams();

    const [evaluations, setevaluations] = useState([]);
    const [filteredEvaluations, setFilteredEvaluations] = useState([]);
    const [error, setError] = useState(null);
    const [deleteReussi, setDeleteReussi] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [uniqueTypes, setUniqueTypes] = useState([]);

    useEffect(() => {
        const fetchevaluations = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/fournisseur/dashboard_EvaluationFournisseur/${id}/`, {
                    headers: {
                        'Accept': '*//*',
                    }
                });
                setevaluations(response.data);
                setFilteredEvaluations(response.data);
                
                // Extract unique types from evaluations
                const types = new Set(response.data.map(evaluation => evaluation.type_produit));
                setUniqueTypes(Array.from(types));
            } catch (error) {
                console.error('Error fetching evaluations:', error);
                setError(error.message || 'Une erreur s\'est produite lors de la récupération des données.');
            }
        };

        fetchevaluations();
    }, [id]);

    const handleDelete = async (id) => {
        const headers = {
            'Accept': '*//*',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
        };
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/fournisseur/delete_EvaluationFournisseur/${id}/`, { headers: headers });
            setDeleteReussi(true);
        } catch (error) {
            console.error('Error deleting evaluation:', error);
            setError(error.message || 'Une erreur s\'est produite lors de la suppression du evaluation.');
        }
    };

    useEffect(() => {
        const results = evaluations.filter(evaluation =>
            evaluation.type_produit.toLowerCase().includes(searchTerm.toLowerCase())
            && (!selectedType || evaluation.type_produit === selectedType)
        );
        setFilteredEvaluations(results);
    }, [searchTerm, evaluations, selectedType]);

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
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
            <h3>Liste des évaluations</h3>
            <input
                type="text"
                placeholder="Rechercher par Type"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <select className="type-select" value={selectedType} onChange={handleTypeChange}>
                <option value="">Tous les types</option>
                {uniqueTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>
        </div>

            <div className="clients-container">
                {filteredEvaluations.map(evaluation => (
                    <div key={evaluation.id} className="client-card">
                        <div className="client-card-body">
                            <p><strong>Evaluation N°:</strong> {evaluation.id}</p>
                            <p><strong>Type produit:</strong> {evaluation.type_produit}</p>
                            <p><strong>critere evaluation:</strong> {evaluation.critere_evaluation}</p>
                            <p><strong>notes:</strong> {evaluation.notes}</p>
                            <p><strong>commentaires:</strong> {evaluation.commentaires}</p>
                            <p><strong>periodicite_evaluation:</strong> {evaluation.periodicite_evaluation}</p>
                            <p><strong>Pièces jointes :</strong> {evaluation.pieces_jointes ? <a href={`${process.env.REACT_APP_API_URL}/fournisseur/pieces_jointes_evaluation_fournisseur/${evaluation.id}/`} target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>
                            <div className="document-card-buttons">
                                <Link to={`/modifierDocInt/${evaluation.id}`} className="btn btn-primary">Modifier</Link>
                                <button onClick={() => handleDelete(evaluation.id)} className="btn btn-danger">Supprimer</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="dashboard-buttons">
                <Link to={`/CréerEvaluationFournisseur/${id}/`} className="btn btn-primary">Ajouter Evaluation</Link>
            </div>
            <div className="dashboard-buttons">
                <Link to={`/ConsulterFournisseur/${id}`} className="btn btn-secondary">Retour</Link>
            </div>
        </div>
    );
};

export default AllEvaluations;*/
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaList, FaTh, FaEdit } from 'react-icons/fa';
import './fournisseur.css'; 

const AllEvaluations = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [viewMode, setViewMode] = useState('list');

    // Static evaluations data
    const evaluations = [
        {
            id: 1,
            type_produit: "Type A",
            critere_evaluation: "Critère 1",
            notes: "8/10",
            commentaires: "Bon produit",
            periodicite_evaluation: "Annuel",
            pieces_jointes: true,
        },
        {
            id: 2,
            type_produit: "Type B",
            critere_evaluation: "Critère 2",
            notes: "7/10",
            commentaires: "Satisfaisant",
            periodicite_evaluation: "Semestriel",
            pieces_jointes: false,
        },
        // Add more static evaluations as needed
    ];

    const uniqueTypes = ["Type A", "Type B"];

    const filteredEvaluations = evaluations.filter(evaluation =>
        evaluation.type_produit.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!selectedType || evaluation.type_produit === selectedType)
    );

    return (
        <main style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
            <div className="container fournisseur-dashboard">
                <div className="row">
                    <div>
                        <br />
                        <br />
                        <div className="fournisseur-table-container">
                            <div className="fournisseur-view-toggle">
                                <button className={`fournisseur-view-btn ${viewMode === 'list' ? 'fournisseur-active' : ''}`} onClick={() => setViewMode('list')}>
                                    <FaList />
                                </button>
                                <button className={`fournisseur-view-btn ${viewMode === 'grid' ? 'fournisseur-active' : ''}`} onClick={() => setViewMode('grid')}>
                                    <FaTh />
                                </button>
                            </div>
                            <h3 className='fournisseur-formation-title'>Liste des Evaluations</h3>
                            <div className="fournisseur-button-container">
                                <Link to="/ConsulterFournisseur/static">
                                    <button className="fournisseur-retour">Retour</button>
                                </Link>
                                <Link to="/CréerEvaluationFournisseur/static">
                                    <button className="fournisseur-button-add">Ajouter Evaluation</button>
                                </Link>
                            </div>
                            <br />
                            <div className="fournisseur-search-container">
                                <input
                                    type="text"
                                    placeholder="Rechercher par Type"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="fournisseur-search-input"
                                />
                                <select className="fournisseur-type-select" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                                    <option value="">Tous les types</option>
                                    {uniqueTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                            <br />
                            <div>
                                {viewMode === 'list' ? (
                                    <table className="fournisseur-styled-table">
                                        <thead className="fournisseur-table-header">
                                            <tr>
                                                <th scope="col">N° Evaluation</th>
                                                <th scope="col">Type produit</th>
                                                <th scope="col">Critère évaluation</th>
                                                
                                                <th scope="col">Périodicité</th>
                                               
                                                <th scope="col">Détails</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredEvaluations.length > 0 ? (
                                                filteredEvaluations.map(evaluation => (
                                                    <tr key={evaluation.id}>
                                                        <td>{evaluation.id}</td>
                                                        <td>{evaluation.type_produit}</td>
                                                        <td>{evaluation.critere_evaluation}</td>
                                                       
                                                        <td>{evaluation.periodicite_evaluation}</td>

                                                        <td>
                                                            <Link to={`/EvaluationDetails/${evaluation.id}`} className="client-btn">
                                                                <FaEdit />
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="8" className="text-center">Aucune évaluation disponible</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="fournisseur-grid">
                                        {filteredEvaluations.length > 0 ? (
                                            filteredEvaluations.map(evaluation => (
                                                <div key={evaluation.id} className="fournisseur-responsable-item">
                                                    <img src="https://via.placeholder.com/100" alt={`${evaluation.type_produit}`} className="fournisseur-responsable-img" />
                                                    <div className="fournisseur-responsable-info">
                                                        <h5 className="fournisseur-responsable-title">{evaluation.type_produit} </h5>
                                                        <p><strong className="fournisseur-responsable-text">N° Evaluation :</strong> {evaluation.id}</p>

                                                        <p><strong className="fournisseur-responsable-text">Critère :</strong> {evaluation.critere_evaluation}</p>
                                                        <p><strong className="fournisseur-responsable-text">Périodicité :</strong> {evaluation.periodicite_evaluation}</p>
                                                        <Link to={`/EvaluationDetails/${evaluation.id}`} className="client-btn">
                                                            <FaEdit />
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
    );
};

export default AllEvaluations;
