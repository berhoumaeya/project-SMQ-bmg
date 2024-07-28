/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams ,Link , Navigate} from 'react-router-dom';
import '../Client/client.css';


const Fournisseur = () => {
    const { id } = useParams();

    const [fournisseurs, setfournisseurs] = useState([]);
    const [error, setError] = useState(null);
    const [deleteReussi, setDeleteReussi] = useState(false);

    useEffect(() => {
        const fetchfournisseurs = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/fournisseur/Fournisseur/${id}/`, {
                    headers: {
                        'Accept': '*//*',
                    }
                });
                setfournisseurs(response.data);
            } catch (error) {
                console.error('Error fetching fournisseurs:', error);
                setError(error.message || 'Une erreur s\'est produite lors de la récupération des données.');
            }
        };

        fetchfournisseurs();
    }, [id]);

    const handleDelete = async (id) => {
        const headers = {
            'Accept': '*//*',
            /*'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
        };
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/fournisseur/delete_Fournisseur/${id}/`, { headers: headers });
            setDeleteReussi(true);
        } catch (error) {
            console.error('Error deleting fournisseur:', error);
            setError(error.message || 'Une erreur s\'est produite lors de la suppression du fournisseur.');
        }
    };


    if (error) {
        return <div className="error-message">Erreur : {error}</div>;
    }

    if (deleteReussi) {
        return  <Navigate to="/fournisseurs" />
    }

    return (
        <div className="dashboard-doc-int">
            <div className="clients-container">
                {fournisseurs ? (
                    <div  className="document-card">
                        <div className="document-card-body">
                            <p className="document-card-text"><strong>nom Fournisseur:</strong> {fournisseurs.nom}</p>
                            <p className="document-card-text"><strong>Code Fournisseur:</strong> {fournisseurs.code_fournisseur}</p>
                            <p className="document-card-text"><strong>Raison sociale:</strong> {fournisseurs.raison_sociale}</p>
                            <p className="document-card-text"><strong>Adresse:</strong> {fournisseurs.adresse}</p>
                            <p className="document-card-text"><strong>Code Fournisseur:</strong> {fournisseurs.code_fournisseur}</p>
                            <p className="document-card-text"><strong>Numéro:</strong> {fournisseurs.numero_telephone}</p>
                            <p className="document-card-text"><strong>Email:</strong> {fournisseurs.email}</p>
                            <p className="document-card-text"><strong>Type Fournisseur:</strong> {fournisseurs.type_fournisseur}</p>
                            <p className="document-card-text"><strong>Categorie Fournisseur:</strong> {fournisseurs.categorie}</p>
                            <p className="document-card-text"><strong>Agréé:</strong> {fournisseurs.fournisseur_agree ? 'Oui' : 'Non'}</p>
                            <p className="document-card-text"><strong>Périodicité d'évaluation:</strong> {fournisseurs.periodicite_evaluation}</p>
                            <p className="document-card-text"><strong>Modifié par:</strong> {fournisseurs.updated_by}</p>
                            <p className="document-card-text"><strong>Modifié le :</strong> {fournisseurs.updated_at}</p>
                            <p className="document-card-text"><strong>Crée par:</strong> {fournisseurs.created_by}</p>
                            <p className="document-card-text"><strong>Crée à:</strong> {fournisseurs.created_at}</p>
                            <p><strong>Pièces jointes :</strong> {fournisseurs.pieces_jointes ? <a href={`${process.env.REACT_APP_API_URL}/fournisseur/pieces_jointes_fournisseur/${fournisseurs.id}/`} target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>
                            <div className="document-card-buttons">
                                <Link to={`/modifierFournisseur/${fournisseurs.id}`} className="btn btn-primary">Modifier</Link>
                                <button onClick={() => handleDelete(fournisseurs.id)} className="btn btn-danger">Supprimer</button>
                            </div>
                        </div>
                    </div>
                ):(
                    <p>Chargement...</p>
                )}
            </div>
            <div className="dashboard-buttons">
                <Link to={`/AllReclamationFournisseur/${id}/`} className="btn btn-primary">Consulter réclamation</Link>
            </div>
            <div className="dashboard-buttons">
                <Link to={`/AllEvaluationFournisseur/${id}/`} className="btn btn-primary">Consulter Evaluation</Link>
            </div>
            <div className="dashboard-buttons">
                <Link to={`/fournisseurs/`} className="btn btn-secondary">Retour</Link>
            </div>
        </div>
    );
};

export default Fournisseur;*/

import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import '../Client/consulterclient.css'; 

const sampleFournisseur = {
    id: 1,
    nom: 'Fournisseur A',
    code_fournisseur: 'FA123',
    raison_sociale: 'Raison Sociale A',
    adresse: 'Adresse A',
    numero_telephone: '0123456789',
    email: 'fourniss@example.com',
    type_fournisseur: 'Type A',
    categorie: 'Catégorie A',
    fournisseur_agree: true,
    periodicite_evaluation: 'Annuel',
    updated_by: 'Admin',
    updated_at: '2024-07-28',
    created_by: 'Admin',
    created_at: '2024-01-15',
    pieces_jointes: true,
};

const Fournisseur = () => {
    const { id } = useParams();
    const [fournisseurData, setFournisseurData] = useState(sampleFournisseur);
    const [deleteReussi, setDeleteReussi] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFournisseurData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDelete = () => {
        setDeleteReussi(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic for submitting the changes
        console.log('Fournisseur data updated:', fournisseurData);
    };

    if (deleteReussi) {
        return <Navigate to="/fournisseurs" />;
    }

    return (
        <div className="container view-account">
            <section className="module">
                <div className="module-inner">
                    <div className="side-bar">
                        <div className="user-info">
                            <img className="img-profile img-circle img-responsive center-block" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Fournisseur" />
                            <ul className="meta list list-unstyled">
                                <li className="name">{fournisseurData.nom}</li>
                                <li className="email">{fournisseurData.email}</li>
                                <li className="activity">Last updated: {fournisseurData.updated_at}</li>
                            </ul>
                        </div>
                        <nav className="side-menu">
                            <ul className="nav">
                                <li className="active"><a href="#"><span className="fa fa-user"></span> Profile</a></li>
                                <li><Link to={`/AllReclamationFournisseur/${fournisseurData.id}`}><span className="fa fa-cog"></span> Reclamations</Link></li>
                                <li><Link to={`/AllEvaluationFournisseur/${fournisseurData.id}`}><span className="fa fa-cog"></span> Evaluations</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="content-panel">
                        <h2 className="title">Modifier le Profil</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="table-responsive">
                                <table className="table table-user-information">
                                    <tbody>
                                        <tr>
                                            <td><strong>Nom Fournisseur</strong></td>
                                            <td><input type="text" className="form-control" name="nom" value={fournisseurData.nom} onChange={handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Code Fournisseur</strong></td>
                                            <td><input type="text" className="form-control" name="code_fournisseur" value={fournisseurData.code_fournisseur} onChange={handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Raison sociale</strong></td>
                                            <td><input type="text" className="form-control" name="raison_sociale" value={fournisseurData.raison_sociale} onChange={handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Adresse</strong></td>
                                            <td><input type="text" className="form-control" name="adresse" value={fournisseurData.adresse} onChange={handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Numéro</strong></td>
                                            <td><input type="text" className="form-control" name="numero_telephone" value={fournisseurData.numero_telephone} onChange={handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Email</strong></td>
                                            <td><input type="email" className="form-control" name="email" value={fournisseurData.email} onChange={handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Type Fournisseur</strong></td>
                                            <td><input type="text" className="form-control" name="type_fournisseur" value={fournisseurData.type_fournisseur} onChange={handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Catégorie</strong></td>
                                            <td><input type="text" className="form-control" name="categorie" value={fournisseurData.categorie} onChange={handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Modifié le</strong></td>
                                            <td><input type="date" className="form-control" name="updated_at" value={fournisseurData.updated_at} onChange={handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Modifié par</strong></td>
                                            <td><input type="text" className="form-control" name="updated_by" value={fournisseurData.updated_by} onChange={handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Créé le</strong></td>
                                            <td><input type="date" className="form-control" name="created_at" value={fournisseurData.created_at} onChange={handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Créé par</strong></td>
                                            <td><input type="text" className="form-control" name="created_by" value={fournisseurData.created_by} onChange={handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Pièces jointes</strong></td>
                                            <td>{fournisseurData.pieces_jointes ? <a href="#" target="_blank" rel="noopener noreferrer">Consulter</a> : 'Aucune'}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="document-card-buttons">
                                <button type="submit" className="btn btn-primary">Enregistrer</button>
                                <button type="button" onClick={handleDelete} className="btn btn-danger">Supprimer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Fournisseur;
