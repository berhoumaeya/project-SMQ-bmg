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
import { FaList, FaTh, FaEdit } from 'react-icons/fa';
import './client.css';

const AllClients = () => {
    const [view, setView] = useState('list');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all'); 
    const [filterValue, setFilterValue] = useState(''); 

    const clients = [
        { firstName: 'Aya', nom: 'Majerdi', code: '01', image: "https://bootdey.com/img/Content/avatar/avatar1.png", email: 'majerdiaya@gmail.com' },
        { firstName: 'Ba', nom: 'By', code: '02', image: "https://bootdey.com/img/Content/avatar/avatar1.png", email: 'ba.by@example.com' },
    ];

    const filteredClients = clients.filter(client => {
        const matchesSearch = client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filterType === 'all' || (client[filterType] && client[filterType].toLowerCase().includes(filterValue.toLowerCase()));

        return matchesSearch && matchesFilter;
    });

    return (
        <main style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
            <div className="container client-dashboard">
                <div className="row">
                    <div>
                        <br />
                        <br />
                        <div className="client-table-container">
                            <div className="client-view-toggle">
                                <button className={`client-view-btn ${view === 'list' ? 'client-active' : ''}`} onClick={() => setView('list')}>
                                    <FaList /> 
                                </button>
                                <button className={`client-view-btn ${view === 'grid' ? 'client-active' : ''}`} onClick={() => setView('grid')}>
                                    <FaTh /> 
                                </button>
                            </div>
                            <h3 className='client-formation-title'>Liste des Clients</h3>
                            <div className="client-button-container">
                                <Link to="/DashboardClient/">
                                    <button className="client-retour">Retour</button>
                                </Link>
                                <Link to="/CréerClient/">
                                    <button className="client-button-add">Ajouter Client</button>
                                </Link>
                            </div>
                            <br />
                            <div className="client-search-container">
                                <input
                                    type="text"
                                    placeholder="Rechercher..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="client-search-input"
                                />
                            </div>
                            <br />
                            <div className="client-filter-container">
                                <select
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value)}
                                    className="client-filter-select"
                                >
                                    <option value="all">Tous les filtres</option>
                                    <option value="code">Code client</option>
                                    <option value="nom">Nom client</option>
                                    <option value="firstName">Prénom client</option>
                                    <option value="email">Email client</option>
                                    
                                </select>
                                <input
                                    type="text"
                                    placeholder="Filtrer..."
                                    value={filterValue}
                                    onChange={(e) => setFilterValue(e.target.value)}
                                    className="client-filter-input"
                                />
                            </div>
                            <br />
                            <div>
                                {view === 'list' ? (
                                    <table className="client-styled-table">
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
                                                            <Link to={`/consulterclient/${client.code}`} className="client-btn">
                                                                <FaEdit /> 
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
                                    <div className="client-grid">
                                        {filteredClients.length > 0 ? (
                                            filteredClients.map((client, index) => (
                                                <div key={index} className="client-responsable-item">
                                                    <img src={client.image} alt={`Image de ${client.nom}`} className="client-responsable-img" />
                                                    <div className="client-responsable-info">
                                                        <h5 className="client-responsable-title">{client.nom} {client.firstName}</h5>
                                                        <p><strong className="client-responsable-text">Code :</strong> {client.code}</p>
                                                        <p><strong className="client-responsable-text">Email :</strong> {client.email}</p>
                                                        <Link to={`/client/${client.code}`} className="btn btn-outline-info btn-sm">
                                                            <FaEdit /> 
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-center">Aucun client disponible</p>
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
