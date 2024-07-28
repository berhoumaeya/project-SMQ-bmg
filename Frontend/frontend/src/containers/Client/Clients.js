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
import { FaList, FaTh } from 'react-icons/fa';
import { GrView } from 'react-icons/gr';
import './client.css';

const AllClients = () => {
    const [view, setView] = useState('list');
    const [searchTerm, setSearchTerm] = useState('');

    const clients = [
        { firstName: 'Majerdi', nom: 'Aya', code: '01', image: "https://bootdey.com/img/Content/avatar/avatar1.png", email: 'majerdiaya@gmail.com' },
        { firstName: 'By', nom: 'Ba', code: '02', image: "https://bootdey.com/img/Content/avatar/avatar1.png", email: 'ba.by@example.com' },
    ];

    const filteredClients = clients.filter(client =>
        client.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
        client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="client-main">
            <div className="client-dashboard">
                <div className="client-dashboard-content">
                    <div>
                        <br />
                        <br />
                        <div className="client-container">
                            <div className="view-toggle">
                                <button className={`view-btn ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')}>
                                    <FaList /> 
                                </button>
                                <button className={`view-btn ${view === 'grid' ? 'active' : ''}`} onClick={() => setView('grid')}>
                                    <FaTh /> 
                                </button>
                            </div>
                            <h3 className='client-list-title'>Liste des Clients</h3>
                            <div className="client-actions">
                                <Link to="/DashboardClient/">
                                    <button className="btn-back">Retour</button>
                                </Link>
                                <Link to="/CréerClient/">
                                    <button className="btn-add-client">Ajouter Client</button>
                                </Link>
                            </div>
                            <br />
                            <div className="client-search">
                                <input
                                    type="text"
                                    placeholder="Rechercher..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="input-search"
                                />
                            </div>
                            <br />
                            <div>
                                {view === 'list' ? (
                                    <table className="client-table">
                                        <thead className="client-table-header">
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
                                                            <Link to={`/consulterclient/${client.code}`} className="btn-view-details">
                                                            <GrView />
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="client-no-data">Aucun client disponible</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="client-grid">
                                        {filteredClients.length > 0 ? (
                                            filteredClients.map((client, index) => (
                                                <div key={index} className="client-card">
                                                    <img src={client.image} alt={`Image de ${client.nom}`} className="client-card-img" />
                                                    <div className="client-card-info">
                                                        <h5 className="client-card-name">{client.nom} {client.firstName}</h5>
                                                        <p><strong className="client-card-label">Code :</strong> {client.code}</p>
                                                        <p><strong className="client-card-label">Email :</strong> {client.email}</p>
                                                        <Link to={`/client/${client.code}`} className="btn-view-details">
                                                        <GrView />
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="client-no-data">Aucun client disponible</p>
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

export default AllClients;
