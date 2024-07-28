/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams ,Link , Navigate} from 'react-router-dom';
import './client.css';


const Client = () => {
    const { id } = useParams();

    const [clients, setclients] = useState([]);
    const [error, setError] = useState(null);
    const [deleteReussi, setDeleteReussi] = useState(false);

    useEffect(() => {
        const fetchclients = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/CRM/dashboard_client/${id}/`, {
                    headers: {
                        'Accept': '*///*',
                   /* }
                });
                setclients(response.data);
            } catch (error) {
                console.error('Error fetching clients:', error);
                setError(error.message || 'Une erreur s\'est produite lors de la récupération des données.');
            }
        };

        fetchclients();
    }, [id]);

    const handleDelete = async (id) => {
        const headers = {
            'Accept': '*///*',
            /*'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
        };
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/CRM/delete_client/${id}/`, { headers: headers });
            setDeleteReussi(true);
        } catch (error) {
            console.error('Error deleting document:', error);
            setError(error.message || 'Une erreur s\'est produite lors de la suppression du document.');
        }
    };


    if (error) {
        return <div className="error-message">Erreur : {error}</div>;
    }

    if (deleteReussi) {
        return  <Navigate to="/Clients" />
    }

    return (
        <div className="dashboard-doc-int">
            <div className="clients-container">
                {clients ? (
                    <div  className="document-card">
                        <div className="document-card-body">
                            <p className="document-card-text"><strong>nom client:</strong> {clients.nom}</p>
                            <p className="document-card-text"><strong>Code client:</strong> {clients.code_client}</p>
                            <p className="document-card-text"><strong>Raison sociale:</strong> {clients.raison_sociale}</p>
                            <p className="document-card-text"><strong>Activité:</strong> {clients.activite}</p>
                            <p className="document-card-text"><strong>Type client:</strong> {clients.type_client}</p>
                            <p className="document-card-text"><strong>Categorie client:</strong> {clients.categorie}</p>
                            <p className="document-card-text"><strong>Modifié par:</strong> {clients.updated_by ? clients.updated_by : 'Pas de modification'}</p>
                            <p className="document-card-text"><strong>Modifié le :</strong> {clients.updated_at ? clients.updated_at : 'Pas de modification'}</p>
                            <p className="document-card-text"><strong>Crée par:</strong> {clients.created_by}</p>
                            <p className="document-card-text"><strong>Crée à:</strong> {clients.created_at}</p>
                            <p><strong>Pièces jointes :</strong> {clients.pieces_jointes ? <a href={`${process.env.REACT_APP_API_URL}/CRM/clients/${clients.id}/`} target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>
                            <div className="document-card-buttons">
                                <Link to={`/modifierclient/${clients.id}`} className="btn btn-primary">Modifier</Link>
                                <button onClick={() => handleDelete(clients.id)} className="btn btn-danger">Supprimer</button>
                            </div>
                        </div>
                    </div>
                ):(
                    <p>Chargement...</p>
                )}
            </div>
            <div className="dashboard-buttons">
                <Link to={`/AllReclamations/${id}/`} className="btn btn-primary">Consulter réclamation</Link>
            </div>
            <div className="dashboard-buttons">
                <Link to={`/AllSuggestion/${id}/`} className="btn btn-primary">Consulter Suggestion</Link>
            </div>
            <div className="dashboard-buttons">
                <Link to={`/Clients/`} className="btn btn-secondary">Retour</Link>
            </div>
        </div>
    );
};

export default Client;*/

import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import './consulterclient.css';

const Client = () => {
    const { id } = useParams();
    const [clientData, setClientData] = useState({
        id: id,
        nom: 'aya',
        prenom: 'Sample',
        email: 'aya@example.com',
        code_client: '01',
        raison_sociale: 'de',
        activite: 'Commerce',
        type_client: 'Premium',
        categorie: 'A',
        updated_by: 'mariem',
        updated_at: '2023-07-20',
        created_by: 'ar',
        created_at: '2022-01-15',
        pieces_jointes: true,
        image_url: "https://bootdey.com/img/Content/avatar/avatar1.png",
    });
    const [error, setError] = useState(null);
    const [deleteReussi, setDeleteReussi] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClientData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDelete = () => {
        setDeleteReussi(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logique pour soumettre les modifications
        console.log('Client data updated:', clientData);
    };

    if (error) {
        return <div className="error-message">Erreur : {error}</div>;
    }

    if (deleteReussi) {
        return <Navigate to="/Clients" />;
    }

    return (
        <div className="container view-account">
            <section className="module">
                <div className="module-inner">
                    <div className="side-bar">
                        <div className="user-info">
                            <img className="img-profile img-circle img-responsive center-block" src={clientData.image_url} alt="Client" />
                            <ul className="meta list list-unstyled">
                                <li className="name">{clientData.nom} {clientData.prenom}</li>
                                <li className="email">{clientData.email}</li>
                                <li className="activity">Last updated: {clientData.updated_at}</li>
                            </ul>
                        </div>
                        <nav className="side-menu">
                            <ul className="nav">
                                <li className="active"><a href="#"><span className="fa fa-user"></span> Profile</a></li>
                                <li><Link to={`/AllReclamations/${clientData.code}`}><span className="fa fa-cog"></span> Reclamations</Link></li>
                                <li><Link to={`/AllSuggestion.js/${clientData.id}`}><span className="fa fa-cog"></span> Suggestion</Link></li>    
                                <li><Link to={`/AllEnquete.js/${clientData.id}`}><span className="fa fa-cog"></span> Enquete</Link></li>                         </ul>
                        </nav>
                    </div>
                    <div className="content-panel">
                        <h2 className="title">Modifier le Profil</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="table-responsive">
                                <table className="table table-user-information">
                                    <tbody>
                                        <tr>
                                            <td><strong>Nom Client</strong></td>
                                            <td><input type="text" className="form-control" name="nom" value={clientData.nom} onChange={handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Prénom Client</strong></td>
                                            <td><input type="text" className="form-control" name="prenom" value={clientData.prenom} onChange={handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Email</strong></td>
                                            <td><input type="email" className="form-control" name="email" value={clientData.email} onChange={handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Code Client</strong></td>
                                            <td><input type="text" className="form-control" name="code_client" value={clientData.code_client} onChange={handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Raison Sociale</strong></td>
                                            <td><input type="text" className="form-control" name="raison_sociale" value={clientData.raison_sociale} onChange={handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Activité</strong></td>
                                            <td><input type="text" className="form-control" name="activite" value={clientData.activite} onChange={handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Type Client</strong></td>
                                            <td><input type="text" className="form-control" name="type_client" value={clientData.type_client} onChange={handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Catégorie</strong></td>
                                            <td><input type="text" className="form-control" name="categorie" value={clientData.categorie} onChange={handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Modifié le</strong></td>
                                            <td><input type="date" className="form-control" name="updated_at" value={clientData.updated_at} onChange={handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Modifié par</strong></td>
                                            <td><input type="text" className="form-control" name="updated_by" value={clientData.updated_by} onChange={handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Créé le</strong></td>
                                            <td><input type="date" className="form-control" name="created_at" value={clientData.created_at} onChange={handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Créé par</strong></td>
                                            <td><input type="text" className="form-control" name="created_by" value={clientData.created_by} onChange={handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Pièces jointes</strong></td>
                                            <td>{clientData.pieces_jointes ? <a href="#" target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</td>
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

export default Client;
