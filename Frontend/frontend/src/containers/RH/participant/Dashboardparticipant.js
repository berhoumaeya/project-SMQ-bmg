/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../Dashboard.css"

const DashboardParticipant = () => {
    const [participants, setFormations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFormations = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_participant/`, {
                    headers: {
                        'Accept': '*//*', 
                    }
                });
                setFormations(response.data);
            } catch (error) {
                console.error('Error fetching formations:', error);
                setError(error.message || 'Une erreur s\'est produite lors de la récupération des données.');
            }
        };

        fetchFormations();
    }, []);

    if (error) {
        return <div>Erreur : {error}</div>;
    }

    return (
        <div>
             <div className="participants-header">
                <h3>Liste des participants</h3>
            </div>
            <table className="table table-bordered" id="dataTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom Participant</th>
                        <th>Prenom Participant</th>
                        <th>Nom de l'utilisateur Participant</th>
                        <th>Email Participant</th>
                        <th>Détails de Participant</th>
                    </tr>
                </thead>
                <tbody>
                    {participants.map(participant => (
                        <tr key={participant.id}>
                            <td>{participant.id}</td>
                            <td>{participant.nom}</td>
                            <td>{participant.prenom}</td>
                            <td>{participant.username}</td>
                            <td>{participant.email}</td>
                            <Link to={`/participant/${participant.id}`}>Détails</Link>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="button-group">
             <Link to={`/ajouter-participant/`} className="btn btn-primary">Ajouter participant</Link>
             <Link to={`/DashboardRH/`} className="btn btn-secondary">Retour</Link>
           </div>
        </div>
    );
};

export default DashboardParticipant;
*/
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaList, FaTh } from 'react-icons/fa';
import '../list.css'; 

const sampleParticipants = [
    {
        id: 1,
        nom: 'Dupont',
        prenom: 'Jean',
        username: 'jdupont',
        email: 'jean.dupont@example.com'
    },
    {
        id: 2,
        nom: 'Martin',
        prenom: 'Marie',
        username: 'mmartin',
        email: 'marie.martin@example.com'
    },
    {
        id: 3,
        nom: 'Durand',
        prenom: 'Paul',
        username: 'pdurand',
        email: 'paul.durand@example.com'
    }
];

const DashboardParticipant = () => {
    const [participants, setParticipants] = useState([]);
    const [error] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('list'); 

    useEffect(() => {
        setParticipants(sampleParticipants);
    }, []);

    if (error) {
        return <div>Erreur : {error}</div>;
    }

    const filteredParticipants = participants.filter(participant =>
        participant.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        participant.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        participant.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        participant.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
            <div className="container dashboard">
                <div className="row">
                    <div>
                        <br />
                        <br />
                        <div className="table-container">
                            <div className="view-toggle">
                                <button className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>
                                    <FaList /> 
                                </button>
                                <button className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>
                                    <FaTh /> 
                                </button>
                            </div>
                            <h3 className="formation-title">Liste des Participants</h3>
                            <div className="button-container">
                                <Link to="/DashboardRH/">
                                    <button className="retour">Retour</button>
                                </Link>
                                <Link to={`/ajouter-participant/`}>
                                    <button className="button-add">Ajouter Participant</button>
                                </Link>
                            </div>
                            <br />
                            <div className="search-container">
                                <input
                                    type="text"
                                    placeholder="Rechercher..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="search-input"
                                />
                            </div>
                            <br />
                            <div>
                                {viewMode === 'list' ? (
                                    <table>
                                        <thead className="table-header">
                                            <tr>
                                                <th scope="col">ID</th>
                                                <th scope="col">Nom</th>
                                                <th scope="col">Prénom</th>
                                                <th scope="col">Nom d'utilisateur</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Détails</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredParticipants.length > 0 ? (
                                                filteredParticipants.map(participant => (
                                                    <tr key={participant.id}>
                                                        <td>{participant.id}</td>
                                                        <td>{participant.nom}</td>
                                                        <td>{participant.prenom}</td>
                                                        <td>{participant.username}</td>
                                                        <td>{participant.email}</td>
                                                        <td>
                                                            <Link to={`/participant/${participant.id}`} className="btn btn-outline-info btn-sm">
                                                                <FaEdit />
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="6" className="text-center">Aucun participant disponible</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="grid">
                                        {filteredParticipants.length > 0 ? (
                                            filteredParticipants.map(participant => (
                                                <div key={participant.id} className="responsable-item">
                                                    <img src="https://via.placeholder.com/100" alt={participant.nom} className="responsable-img" />
                                                    <div className="responsable-info">
                                                        <h5 className="responsable-title">{participant.nom} {participant.prenom}</h5>
                                                        <p><strong className="responsable-text">Nom d'utilisateur :</strong> {participant.username}</p>
                                                        <p><strong className="responsable-text">Email :</strong> {participant.email}</p>
                                                        <Link to={`/participant/${participant.id}`} className="btn btn-outline-info btn-sm">
                                                            <FaEdit />
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-center">Aucun participant disponible</p>
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

export default DashboardParticipant;
