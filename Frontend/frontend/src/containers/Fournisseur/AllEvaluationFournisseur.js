import React, { useState, useEffect } from 'react';
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
                        'Accept': '*/*',
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
            'Accept': '*/*',
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

export default AllEvaluations;
