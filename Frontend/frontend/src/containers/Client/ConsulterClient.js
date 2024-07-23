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
        image_url: "C:\Users\aya\Desktop\project-SMQ\Frontend\frontend\src\containers\Client\IMG_20230514_164706_267.jpg" 
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
        <div className="dashboard-doc-int">
            <div className="dashboard-top-buttons">
                <Link to={`/AllReclamations/${id}/`} className="btn btn">Consulter réclamation</Link>
                <Link to={`/AllSuggestion/${id}/`} className="btn btn">Consulter Suggestion</Link>
            </div>
            <div className="clients-container">
                <div className="document-card">
                    <div className="document-card-body">
                        <img src={clients.image_url} alt="Client" className="client-image" />
                        <p className="document-card-text"><strong>Nom client:</strong> {clients.nom}</p>
                        <p className="document-card-text"><strong>Code client:</strong> {clients.code_client}</p>
                        <p className="document-card-text"><strong>Raison sociale:</strong> {clients.raison_sociale}</p>
                        <p className="document-card-text"><strong>Activité:</strong> {clients.activite}</p>
                        <p className="document-card-text"><strong>Type client:</strong> {clients.type_client}</p>
                        <p className="document-card-text"><strong>Categorie client:</strong> {clients.categorie}</p>
                        <p className="document-card-text"><strong>Modifié par:</strong> {clients.updated_by ? clients.updated_by : 'Pas de modification'}</p>
                        <p className="document-card-text"><strong>Modifié le :</strong> {clients.updated_at ? clients.updated_at : 'Pas de modification'}</p>
                        <p className="document-card-text"><strong>Créé par:</strong> {clients.created_by}</p>
                        <p className="document-card-text"><strong>Créé à:</strong> {clients.created_at}</p>
                        <p><strong>Pièces jointes :</strong> {clients.pieces_jointes ? <a href="#" target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>
                        <div className="document-card-buttons">
                            <Link to={`/modifierclient/${clients.id}`} className="btn btn">Modifier</Link>
                            <button onClick={handleDelete} className="btn btn">Supprimer</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dashboard-bottom-button">
                <Link to="/Clients/" className="btn btn-secondary">Retour</Link>
            </div>
        </div>
    );
};

export default Client;
