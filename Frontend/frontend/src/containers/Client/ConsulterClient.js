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
import { FaAsterisk } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";

const Client = () => {
    const { id } = useParams();

    const [clients] = useState({
        id: id,
        nom: 'aya',
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
        image_url: "", 
    });
    const [error, setError] = useState(null);
    const [deleteReussi, setDeleteReussi] = useState(false);

    const handleDelete = () => {
        setDeleteReussi(true);
    };

    if (error) {
        return <div className="error-message">Erreur : {error}</div>;
    }

    if (deleteReussi) {
        return <Navigate to="/Clients" />;
    }

    return (
        <div className="container bootstrap snippets bootdey">
            <div className="panel-body inf-content">
                <div className="row">
                    <div className="col-md-4">
                        <img alt="" style={{ width: '100%' }} title="" className="img-circle img-thumbnail isTooltip" src={clients.image_url} data-original-title="Client" /> 
                        <ul title="Ratings" className="list-inline ratings text-center">
                            <li><span className="glyphicon glyphicon-star"></span></li>
                            <li><a href="#"><span className="glyphicon glyphicon-star"></span></a></li>
                            <li><a href="#"><span className="glyphicon glyphicon-star"></span></a></li>
                            <li><a href="#"><span className="glyphicon glyphicon-star"></span></a></li>
                            <li><a href="#"><span className="glyphicon glyphicon-star"></span></a></li>
                        </ul>
                    </div>
                    <div className="col-md-8">
                        <strong>Information</strong><br />
                        <div className="table-responsive">
                            <table className="table table-user-information">
                                <tbody>
                                    <tr>
                                        <td><strong> Identificacion</strong></td>
                                        <td className="text-primary">{clients.code_client}</td>
                                    </tr>
                                    <tr>
                                        <td><strong> Nom</strong></td>
                                        <td className="text-primary">{clients.nom}</td>
                                    </tr>
                                    <tr>
                                        <td><strong><span className="glyphicon glyphicon-cloud text-primary"></span> Raison Sociale</strong></td>
                                        <td className="text-primary">{clients.raison_sociale}</td>
                                    </tr>
                                    <tr>
                                        <td><strong><span className="glyphicon glyphicon-bookmark text-primary"></span> Activité</strong></td>
                                        <td className="text-primary">{clients.activite}</td>
                                    </tr>
                                    <tr>
                                        <td><strong><span className="glyphicon glyphicon-eye-open text-primary"></span> Type Client</strong></td>
                                        <td className="text-primary">{clients.type_client}</td>
                                    </tr>
                                    <tr>
                                        <td><strong><span className="glyphicon glyphicon-calendar text-primary"></span> Modifié le</strong></td>
                                        <td className="text-primary">{clients.updated_at}</td>
                                    </tr>
                                    <tr>
                                        <td><strong><span className="glyphicon glyphicon-calendar text-primary"></span> Créé à</strong></td>
                                        <td className="text-primary">{clients.created_at}</td>
                                    </tr>
                                    <tr>
                                        <td><strong><span className="glyphicon glyphicon-envelope text-primary"></span> Email</strong></td>
                                        <td className="text-primary">{clients.created_by}</td>
                                    </tr>
                                    <tr>
                                        <td><strong><span className="glyphicon glyphicon-paperclip text-primary"></span> Pièces jointes</strong></td>
                                        <td className="text-primary">{clients.pieces_jointes ? <a href="#" target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="document-card-buttons">
                            <Link to={`/modifierclient/${clients.id}`} className="btn btn-primary">Modifier</Link>
                            <button onClick={handleDelete} className="btn btn-danger">Supprimer</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Client;
