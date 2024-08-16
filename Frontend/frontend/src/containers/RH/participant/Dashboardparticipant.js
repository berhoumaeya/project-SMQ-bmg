import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit} from 'react-icons/fa';
import '../list.css';
import SubNavbarRH from '../../../components/SubNavbarRH';
import SidebarRH from '../../../components/SidebarRH';


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
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('list');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

    useEffect(() => {
        setParticipants(sampleParticipants);
    }, []);

    const sortedParticipants = useMemo(() => {
        let sortableParticipants = [...participants];
        if (sortConfig !== null) {
            sortableParticipants.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableParticipants;
    }, [participants, sortConfig]);

    const filteredParticipants = sortedParticipants.filter(participant =>
        participant.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        participant.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        participant.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        participant.email.toLowerCase().includes(searchQuery.toLowerCase())
    );


    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortArrow = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? '🔼' : '🔽';
        }
        return '↕️';
    };

    return (
        <><SubNavbarRH viewMode={viewMode} setViewMode={setViewMode} />
        <main style={{ display: 'flex', minHeight: '100vh' }}>
        <SidebarRH /> 
                <div className="container dashboard">
                <div className="row">
                    <div>
                        <div className="table-container">
                                <h3 className="formation-title">Liste des Participants</h3>
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
                                        <table className="table-header">
                                            <thead >
                                                <tr>
                                                    <th scope="col" onClick={() => requestSort('nom')}>
                                                        Nom {getSortArrow('nom')}
                                                    </th>
                                                    <th scope="col" onClick={() => requestSort('prenom')}>
                                                        Prénom {getSortArrow('prenom')}
                                                    </th>
                                                    <th scope="col" onClick={() => requestSort('username')}>
                                                        Nom d'utilisateur {getSortArrow('username')}
                                                    </th>
                                                    <th scope="col" onClick={() => requestSort('email')}>
                                                        Email {getSortArrow('email')}
                                                    </th>
                                                    <th scope="col">Détails</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredParticipants.length > 0 ? (
                                                    filteredParticipants.map(participant => (
                                                        <tr >
                                                            <td>{participant.nom}</td>
                                                            <td>{participant.prenom}</td>
                                                            <td>{participant.username}</td>
                                                            <td>{participant.email}</td>
                                                            <td>
                                                                <Link to={`/update-participant/${participant.id}`} className="btn btn-outline-info btn-sm">
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
                                                            <Link to={`/update-participant/${participant.id}`} className="btn btn-outline-info btn-sm">
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
        </>
    );
};

export default DashboardParticipant;
