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


import React from 'react';
import { Link } from 'react-router-dom';
import '../Client/consulterclient.css';  

const Indicateur = () => {
    const indicateurs = {
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
    };

    return (
        <div className="view-account">
            <section className="module">
                <div className="module-inner">
                    <div className="content-panel">
                        <h2 className="title">Détails de l'Indicateur</h2>
                        <div className="table-responsive">
                            <table className="table table-user-information">
                                <tbody>
                                    <tr>
                                        <td><strong>Libelle</strong></td>
                                        <td>{indicateurs.Libelle}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Type Indicateur</strong></td>
                                        <td>{indicateurs.type_indicateur}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Processus Lié</strong></td>
                                        <td>{indicateurs.processus_lie}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Axe Politique Qualité</strong></td>
                                        <td>{indicateurs.axe_politique_qualite}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Type Résultat Attendu</strong></td>
                                        <td>{indicateurs.type_resultat_attendu}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Date Début</strong></td>
                                        <td>{indicateurs.date_debut}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Périodicité Indicateur</strong></td>
                                        <td>{indicateurs.periodicite_indicateur}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Type Suivi</strong></td>
                                        <td>{indicateurs.type_suivi}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Valeur Cible</strong></td>
                                        <td>{indicateurs.valeur_cible}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Limite Critique</strong></td>
                                        <td>{indicateurs.limite_critique}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Pièces Jointes</strong></td>
                                        <td>{indicateurs.piece_jointe ? <a href={`/path/to/${indicateurs.piece_jointe}`} target="_blank" rel="noopener noreferrer">Consulter</a> : 'Aucune'}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Créé Par</strong></td>
                                        <td>{indicateurs.created_by}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Créé Le</strong></td>
                                        <td>{indicateurs.created_at}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Modifié Le</strong></td>
                                        <td>{indicateurs.updated_at ? indicateurs.updated_at : 'Jamais modifié'}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Modifié Par</strong></td>
                                        <td>{indicateurs.updated_by ? indicateurs.updated_by : 'Aucun'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="document-card-buttons">
                            <Link to={`/SuiviIndicateur/1`} className="btn btn-primary">Consulter le Suivi</Link>
                            <Link to={`/modifierIndicateur/1`} className="btn btn-primary">Modifier</Link>
                            <button className="btn btn-danger">Supprimer</button>
                        </div>
                    </div>
                </div>
            </section>
            <div className="document-card-buttons">
                <Link to={`/indicateurs/`} className="btn btn-secondary">Retour</Link>
            </div>
        </div>
    );
};

export default Indicateur;
