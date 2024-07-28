/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './client.css';

const AllClients = () => {
    const [clients, setclients] = useState([]);
    const [error, setError] = useState(null);
   

    useEffect(() => {
        const fetchclients = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/CRM/client/`, {
                    headers: {
                        /*'Accept': '*/
          /*   }
                });
                setclients(response.data);
            } catch (error) {
                console.error('Error fetching clients:', error);
                setError(error.message || 'Une erreur s\'est produite lors de la récupération des données.');
            }
        };

        fetchclients();
    }, []);

    if (error) {
        return <div className="error-message">Erreur : {error}</div>;
    }

    return (
        <div className="dashboard-client-int">
            <div className="header">
                <h3>Liste des clients</h3>
               
            </div>
            <div className="clients-container">
                {clients.map(client => (
                    <div key={client.id} className="client-card">
                        <div className="client-card-body">
                            <p className="client-card-text"><strong>nom client:</strong> {client.nom}</p>
                            <p className="client-card-text"><strong>Code client:</strong> {client.code_client}</p>
                            <div className="client-card-buttons">
                                <Link to={`/ConsulterClient/${client.id}/`} className="btn btn-primary">Consulter</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="dashboard-buttons">
                <Link to={`/CréerClient/`} className="btn btn-primary">Ajouter Client</Link>
            </div>
            <div className="dashboard-buttons">
                <Link to={`/DashboardClient/`} className="btn btn-secondary">Retour</Link>
            </div>
        </div>
    );
};

export default AllClients;*/


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './client.css';
import { TbWorld } from "react-icons/tb";

const AllClients = () => {
    const [view, setView] = useState('list');
    const [searchTerm, setSearchTerm] = useState('');

    const clients = [
        { firstName: 'aya', nom: 'majerdi', code: '01', image: 'image_1.jpg', email: 'majerdiaya@gmail.com' },
        { firstName: 'ba', nom: 'By', code: '02', image: 'image_2.jpg', email: 'ba.by@example.com' },
    ];

    const filteredClients = clients.filter(client =>
        client.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
        client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
            <div className="container dashboard">
                <div className="row">
                    <div>
                        <br />
                        <br />
                        <div className="table-container">
                            <h3 className='formation-title'>Liste des Clients</h3>
                            <div className="button-container">
                                <Link to="/DashboardClient/">
                                    <button className="retour">Retour</button>
                                </Link>
                                <Link to="/CréerClient/">
                                    <button className="button-add">Ajouter Client</button>
                                </Link>
                            </div>
                            <br />
                            <div className="search-container">
                                <input
                                    type="text"
                                    placeholder="Rechercher..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="search-input"
                                />
                            </div>
                            <br />
                            <div>
                                {view === 'list' ? (
                                    <table>
                                        <thead className="table-header">
                                            <tr>
                                                <th scope="col">Code client</th>
                                                <th scope="col">Nom client</th>
                                                <th scope="col">Prénom client</th>
                                                <th scope="col">Email client</th>
                                                <th scope="col">Détails</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredClients.length > 0 ? (
                                                filteredClients.map((client, index) => (
                                                    <tr key={index}>
                                                        <td>{client.code}</td>
                                                        <td>{client.nom}</td>
                                                        <td>{client.firstName}</td>
                                                        <td>{client.email}</td>
                                                        <td>
                                                            <Link to={`/consulterclient/${client.code}`} className="btn btn-outline-info btn-sm">
                                                            <TbWorld />

                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="text-center">Aucun client disponible</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="grid-container">
                                        {filteredClients.map((client, index) => (
                                            <div key={index} className="grid-item">
                                                <Link to={`/client/${client.code}`} className="card">
                                                    <img src={client.image} alt={`Image de ${client.nom}`} className="card-image" />
                                                    <div className="card-content">
                                                        <p>{client.code}</p>
                                                        <p>{client.nom}</p>
                                                        <p>{client.firstName}</p>
                                                        <p>{client.email}</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))}
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

export default AllClients;
