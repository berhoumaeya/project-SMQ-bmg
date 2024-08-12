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
import { useParams, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
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
    const [deleteReussi, setDeleteReussi] = useState(false);
    const [errors, setErrors] = useState({});

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

    const validateForm = () => {
        const newErrors = {};
        if (!clientData.nom) newErrors.nom = "Le nom est requis";
        if (!clientData.prenom) newErrors.prenom = "Le prénom est requis";
        if (!clientData.email) newErrors.email = "L'email est requis";
        if (!clientData.code_client) newErrors.code_client = "Le code client est requis";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        console.log('Client data updated:', clientData);
    };

    if (deleteReussi) {
        return <Navigate to="/Clients" />;
    }

    return (
        <div className="container-xl px-4 mt-4">
            <nav className="nav nav-borders">
                <a className="nav-link active ms-0" href="#">Profile</a>
                <a className="nav-link" href="#">Reclamations</a>
                <a className="nav-link" href="#">Suggestion</a>
                <a className="nav-link" href="#">Enquete</a>
            </nav>
            <hr className="mt-0 mb-4" />
            <div className="row">
                <div className="col-xl-4">
                    <div className="card mb-4 mb-xl-0">
                        <div className="card-header">Profile Picture</div>
                        <div className="card-body text-center">
                            <img className="img-account-profile rounded-circle mb-2" src={clientData.image_url} alt="Client" />
                            <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                            <input className="form-control mb-2" type="file" accept="image/*" />
                          
                        </div>
                    </div>
                </div>
                <div className="col-xl-8">
                    <div className="card mb-4">
                        <div className="card-header">Account Details</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputNom">Nom Client</label>
                                        <input
                                            className={`form-control ${errors.nom ? 'is-invalid' : ''}`}
                                            id="inputNom"
                                            name="nom"
                                            type="text"
                                            value={clientData.nom}
                                            onChange={handleChange}
                                        />
                                        {errors.nom && <div className="invalid-feedback">{errors.nom}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputPrenom">Prénom Client</label>
                                        <input
                                            className={`form-control ${errors.prenom ? 'is-invalid' : ''}`}
                                            id="inputPrenom"
                                            name="prenom"
                                            type="text"
                                            value={clientData.prenom}
                                            onChange={handleChange}
                                        />
                                        {errors.prenom && <div className="invalid-feedback">{errors.prenom}</div>}
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputEmail">Email</label>
                                        <input
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                            id="inputEmail"
                                            name="email"
                                            type="email"
                                            value={clientData.email}
                                            onChange={handleChange}
                                        />
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputCodeClient">Code Client</label>
                                        <input
                                            className={`form-control ${errors.code_client ? 'is-invalid' : ''}`}
                                            id="inputCodeClient"
                                            name="code_client"
                                            type="text"
                                            value={clientData.code_client}
                                            onChange={handleChange}
                                        />
                                        {errors.code_client && <div className="invalid-feedback">{errors.code_client}</div>}
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputRaisonSociale">Raison Sociale</label>
                                        <input
                                            className="form-control"
                                            id="inputRaisonSociale"
                                            name="raison_sociale"
                                            type="text"
                                            value={clientData.raison_sociale}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputActivite">Activité</label>
                                        <input
                                            className="form-control"
                                            id="inputActivite"
                                            name="activite"
                                            type="text"
                                            value={clientData.activite}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputTypeClient">Type Client</label>
                                        <input
                                            className="form-control"
                                            id="inputTypeClient"
                                            name="type_client"
                                            type="text"
                                            value={clientData.type_client}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputCategorie">Catégorie</label>
                                        <input
                                            className="form-control"
                                            id="inputCategorie"
                                            name="categorie"
                                            type="text"
                                            value={clientData.categorie}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputUpdatedBy">Modifié par</label>
                                        <input
                                            className="form-control"
                                            id="inputUpdatedBy"
                                            name="updated_by"
                                            type="text"
                                            value={clientData.updated_by}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputUpdatedAt">Modifié le</label>
                                        <input
                                            className="form-control"
                                            id="inputUpdatedAt"
                                            name="updated_at"
                                            type="date"
                                            value={clientData.updated_at}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputCreatedBy">Créé par</label>
                                        <input
                                            className="form-control"
                                            id="inputCreatedBy"
                                            name="created_by"
                                            type="text"
                                            value={clientData.created_by}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputCreatedAt">Créé le</label>
                                        <input
                                            className="form-control"
                                            id="inputCreatedAt"
                                            name="created_at"
                                            type="date"
                                            value={clientData.created_at}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <button className="btn btn-primary" type="submit">Save Changes</button>
                                <button className="btn btn-danger" type="button" onClick={handleDelete}>Delete Account</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Client;
