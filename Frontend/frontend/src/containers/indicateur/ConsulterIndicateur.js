/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams ,Link , Navigate} from 'react-router-dom';
import '../DOcumentation/DashboardDocInt.css'


const Indicateur = () => {
    const { id } = useParams();

    const [indicateurs, setindicateurs] = useState([]);
    const [error, setError] = useState(null);
    const [deleteReussi, setDeleteReussi] = useState(false);

    useEffect(() => {
        const fetchindicateurs = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/indicateur/Indicateur/${id}/`);
                setindicateurs(response.data);
            } catch (error) {
                console.error('Error fetching indicateurs:', error);
                setError(error.message || 'Une erreur s\'est produite lors de la récupération des données.');
            }
        };

        fetchindicateurs();
    }, [id]);

    const handleDelete = async () => {
        const headers = {
            'Accept': '*//*',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
        };
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/indicateur/delete_Indicateur/${id}/`, { headers: headers });
            setDeleteReussi(true);
        } catch (error) {
            console.error('Error deleting réunion:', error);
            setError(error.message || 'Une erreur s\'est produite lors de la suppression du réunion.');
        }
    };


    if (error) {
        return <div className="error-message">Erreur : {error}</div>;
    }

    if (deleteReussi) {
        return  <Navigate to="/indicateurs" />
    }

    return (
        <div className="dashboard-doc-int">
            <div className="documents-container">
                {indicateurs ? (
                    <div  className="document-card">
                        <div className="document-card-body">
                            <p className="document-card-text"><strong>Libelle:</strong> {indicateurs.Libelle}</p>
                            <p className="document-card-text"><strong>type indicateur:</strong> {indicateurs.type_indicateur}</p>
                            <p className="document-card-text"><strong>processus lie:</strong> {indicateurs.processus_lie}</p>
                            <p className="document-card-text"><strong>axe politique qualite:</strong> {indicateurs.axe_politique_qualite}</p>
                            <p className="document-card-text"><strong>type resultat attendu:</strong> {indicateurs.type_resultat_attendu}</p>
                            <p className="document-card-text"><strong>date debut:</strong> {indicateurs.date_debut}</p>
                            <p className="document-card-text"><strong>periodicite indicateur:</strong> {indicateurs.periodicite_indicateur}</p>
                            <p className="document-card-text"><strong>type_suivi:</strong> {indicateurs.type_suivi}</p>
                            <p className="document-card-text"><strong>valeur cible:</strong> {indicateurs.valeur_cible}</p>
                            <p className="document-card-text"><strong>limite critique:</strong> {indicateurs.limite_critique}</p>
                            <p className="document-card-text"><strong>Pièces jointes :</strong> {indicateurs.piece_jointe ? <a href={`${process.env.REACT_APP_API_URL}/indicateur/pieces_jointes_indicateur/${id}/`} target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>
                            <p className="document-card-text"><strong>Crée par:</strong> {indicateurs.created_by}</p>
                            <p className="document-card-text"><strong>Crée à:</strong> {indicateurs.created_at}</p>
                            <p className="document-card-text"><strong>Modifié à:</strong> {indicateurs.updated_at ? indicateurs.updated_at : 'pas de modification'}</p>
                            <p className="document-card-text"><strong>Modifié par:</strong> {indicateurs.updated_by ? indicateurs.updated_by : 'pas de modification'}</p>

                            <div className="document-card-buttons">
                            <Link to={`/SuiviIndicateur/${indicateurs.id}`} className="btn btn-primary">Consulter les suivi</Link>
                            <Link to={`/modifierIndicateur/${indicateurs.id}`} className="btn btn-primary">Modifier</Link>
                                <button onClick={() => handleDelete(indicateurs.id)} className="btn btn-danger">Supprimer</button>
                            </div>
                        </div>
                    </div>
                ):(
                    <p>Chargement...</p>
                )}
            </div>
            <div className="dashboard-buttons">
                <Link to={`/indicateurs/`} className="btn btn-secondary">Retour</Link>
            </div>
        </div>
    );
};

export default Indicateur;*/

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './consulterindicateur.css';  
import { GrTrash } from 'react-icons/gr';
import { IoMdArrowRoundBack} from 'react-icons/io';
import { CiSaveDown2 } from "react-icons/ci";

const Indicateur = () => {
    const [indicateurs, setIndicateurs] = useState({
        Libelle: 'Exemple Libelle',
        type_indicateur: 'Exemple Type',
        processus_lie: 'Exemple Processus',
        axe_politique_qualite: 'Exemple Axe',
        type_resultat_attendu: 'Exemple Type Résultat',
        date_debut: '2024-01-01',
        periodicite_indicateur: 'Exemple Périodicité',
        type_suivi: 'Exemple Type Suivi',
        valeur_cible: 'Exemple Valeur',
        limite_critique: 'Exemple Limite',
        piece_jointe: 'example.pdf',
        created_by: 'User1',
        created_at: '2024-08-01',
        updated_at: null,
        updated_by: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIndicateurs((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = () => {
        console.log('Indicateur data updated:', indicateurs);
    };

    return (
        <div className="container-indicateur px-4 mt-4">
            <nav className="nav-indicateur">
            <div className="nav-items-container">
                <Link className="nav-item"to="#">Détails</Link>
                <Link className="nav-item" to="/SuiviIndicateur/:id">suivie</Link>            
            
                </div>
                <Link className="btn btn-return" to={`/indicateurs`}><IoMdArrowRoundBack /> Retour</Link>
            </nav>
            <hr className="divider" />
            <div className="row">
                <div className="col-lg-12">
                    <div className="card-indicateur mb-4">
                        <div className="card-header-indicateur">Détails de l'Indicateur</div>
                        <div className="card-body-indicateur">
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-indicateur mb-1" htmlFor="inputLibelle">Libelle</label>
                                        <input
                                            className="form-control-indicateur"
                                            id="inputLibelle"
                                            name="Libelle"
                                            type="text"
                                            value={indicateurs.Libelle}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-indicateur mb-1" htmlFor="inputTypeIndicateur">Type Indicateur</label>
                                        <input
                                            className="form-control-indicateur"
                                            id="inputTypeIndicateur"
                                            name="type_indicateur"
                                            type="text"
                                            value={indicateurs.type_indicateur}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-indicateur mb-1" htmlFor="inputProcessusLie">Processus Lié</label>
                                        <input
                                            className="form-control-indicateur"
                                            id="inputProcessusLie"
                                            name="processus_lie"
                                            type="text"
                                            value={indicateurs.processus_lie}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-indicateur mb-1" htmlFor="inputAxePolitiqueQualite">Axe Politique Qualité</label>
                                        <input
                                            className="form-control-indicateur"
                                            id="inputAxePolitiqueQualite"
                                            name="axe_politique_qualite"
                                            type="text"
                                            value={indicateurs.axe_politique_qualite}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-indicateur mb-1" htmlFor="inputTypeResultatAttendu">Type Résultat Attendu</label>
                                        <input
                                            className="form-control-indicateur"
                                            id="inputTypeResultatAttendu"
                                            name="type_resultat_attendu"
                                            type="text"
                                            value={indicateurs.type_resultat_attendu}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-indicateur mb-1" htmlFor="inputDateDebut">Date Début</label>
                                        <input
                                            className="form-control-indicateur"
                                            id="inputDateDebut"
                                            name="date_debut"
                                            type="date"
                                            value={indicateurs.date_debut}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-indicateur mb-1" htmlFor="inputPeriodiciteIndicateur">Périodicité Indicateur</label>
                                        <input
                                            className="form-control-indicateur"
                                            id="inputPeriodiciteIndicateur"
                                            name="periodicite_indicateur"
                                            type="text"
                                            value={indicateurs.periodicite_indicateur}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-indicateur mb-1" htmlFor="inputTypeSuivi">Type Suivi</label>
                                        <input
                                            className="form-control-indicateur"
                                            id="inputTypeSuivi"
                                            name="type_suivi"
                                            type="text"
                                            value={indicateurs.type_suivi}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-indicateur mb-1" htmlFor="inputValeurCible">Valeur Cible</label>
                                        <input
                                            className="form-control-indicateur"
                                            id="inputValeurCible"
                                            name="valeur_cible"
                                            type="text"
                                            value={indicateurs.valeur_cible}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-indicateur mb-1" htmlFor="inputLimiteCritique">Limite Critique</label>
                                        <input
                                            className="form-control-indicateur"
                                            id="inputLimiteCritique"
                                            name="limite_critique"
                                            type="text"
                                            value={indicateurs.limite_critique}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-indicateur mb-1" htmlFor="inputPieceJointe">Pièces Jointes</label>
                                        <input
                                            className="form-control-indicateur"
                                            id="inputPieceJointe"
                                            name="piece_jointe"
                                            type="text"
                                            value={indicateurs.piece_jointe}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-indicateur mb-1" htmlFor="inputCreatedBy">Créé Par</label>
                                        <input
                                            className="form-control-indicateur"
                                            id="inputCreatedBy"
                                            name="created_by"
                                            type="text"
                                            value={indicateurs.created_by}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-indicateur mb-1" htmlFor="inputCreatedAt">Créé Le</label>
                                        <input
                                            className="form-control-indicateur"
                                            id="inputCreatedAt"
                                            name="created_at"
                                            type="text"
                                            value={indicateurs.created_at}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-indicateur mb-1" htmlFor="inputUpdatedBy">Mis à Jour Par</label>
                                        <input
                                            className="form-control-indicateur"
                                            id="inputUpdatedBy"
                                            name="updated_by"
                                            type="text"
                                            value={indicateurs.updated_by || ''}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end mt-4">
                                    
                                    <button type="button" className="btn btn-primary me-2" onClick={handleSave}>
                                        <CiSaveDown2 /> Sauvegarder
                                    </button>
                                    <button type="button" className="btn btn-danger">
                                        <GrTrash /> Supprimer
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Indicateur;
