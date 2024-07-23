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

const AllClients = () => {
    const [view, setView] = useState('list');
    const [searchTerm, setSearchTerm] = useState('');

    const clients = [
        { nom: 'ay', code: '01', image: 'image_1' },
        { nom: 'by', code: '02', image: 'path_to_image_2' },
        
    ];

    const filteredClients = clients.filter(client =>
        client.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
        client.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="dashboard-client-int">
            <div className="header">
                <div className="dashboard-buttons">
                    <Link to="/CréerClient/" className="btn btn-primary">Ajouter</Link>
                </div>
                <div className="header-right">
                    <button onClick={() => setView('list')} className={`btn ${view === 'list' ? 'active' : ''}`}>
                        <img src="path_to_list_icon" alt="List View" />
                    </button>
                    <button onClick={() => setView('grid')} className={`btn ${view === 'grid' ? 'active' : ''}`}>
                        <img src="path_to_grid_icon" alt="Grid View" />
                    </button>
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-bar"
                    />
                </div>
            </div>

            <div className="table-container">
                {view === 'list' ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Code client</th>
                                <th scope="col">Nom client</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClients.map((client, index) => (
                                <tr key={index}>
                                    <td>
                                        <Link to={`/ConsulterClient/${client.code}`}>{client.code}</Link>
                                    </td>
                                    <td>
                                        <Link to={`/client/${client.code}`}>{client.nom}</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="grid-container">
                        {filteredClients.map((client, index) => (
                            <Link key={index} to={`/client/${client.code}`} className="grid-item">
                                <div className="card">
                                    <img src={client.image} alt={`Image de ${client.nom}`} className="card-image" />
                                    <div className="card-body">
                                    <Link to={`/ConsulterClient/${client.code}`}>{client.code}</Link>
                                        <p className="card-text">{client.nom}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <div className="dashboard-buttons return-button">
                <Link to="/DashboardClient/" className="btn btn-secondary">Retour</Link>
            </div>
        </div>
    );
};

export default AllClients;
