import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../list.css';
import SubNavbarRH from '../../../components/SubNavbarRH';
import SidebarRH from '../../../components/SidebarRH';
import { GrEdit } from 'react-icons/gr';
import ReactPaginate from 'react-paginate';


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
    const [viewMode, setViewMode] = useState('list');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const meetingsPerPage = 5;
    useEffect(() => {
        setParticipants(sampleParticipants);
    }, []);
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchFieldChange = (e) => {
        setSearchField(e.target.value);
    };

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

    const filteredParticipants = useMemo(() => {
        if (!searchField) {
            return sortedParticipants;
        }
        return sortedParticipants.filter(formation =>
            formation[searchField]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [sortedParticipants, searchField, searchTerm]);

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
    const indexOfLastMeeting = (currentPage + 1) * meetingsPerPage;
    const indexOfFirstMeeting = indexOfLastMeeting - meetingsPerPage;
    const currentMeetings = filteredParticipants.slice(indexOfFirstMeeting, indexOfLastMeeting);
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };
    const pageCount = Math.ceil(filteredParticipants.length / meetingsPerPage);

    return (
        <><SubNavbarRH viewMode={viewMode} setViewMode={setViewMode} />
            <main style={{ display: 'flex', minHeight: '100vh' }}>
                <SidebarRH />
                <div className="container dashboard">
                    <div className="row">
                        <div>
                            <div className="table-container">
                                <h3 className="formation-title">Liste des Participants</h3>
                                <div className="search-container">
                                    <input
                                        type="text"
                                        placeholder="Rechercher..."
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        disabled={!searchField}
                                    />
                                    <select onChange={handleSearchFieldChange} value={searchField}>
                                        <option value="">Sélectionner un champ</option>
                                        <option value="nom">Nom</option>
                                        <option value="prenom">Prénom</option>
                                        <option value="username"> Nom d'utilisateur</option>
                                        <option value="Email">email</option>
                                    </select>
                                </div>
                                <div>
                                    {viewMode === 'list' ? (
                                        <>   <table className="table-header">
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
                                                {currentMeetings.length > 0 ? (
                                                    currentMeetings.map(participant => (
                                                        <tr >
                                                            <td>{participant.nom}</td>
                                                            <td>{participant.prenom}</td>
                                                            <td>{participant.username}</td>
                                                            <td>{participant.email}</td>
                                                            <td>
                                                                <Link to={`/update-participant/${participant.id}`} className="btn btn-outline-info">
                                                                    <GrEdit />
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
                                            <ReactPaginate
                                                previousLabel={'Précédent'}
                                                nextLabel={'Suivant'}
                                                breakLabel={'...'}
                                                pageCount={pageCount}
                                                marginPagesDisplayed={2}
                                                pageRangeDisplayed={5}
                                                onPageChange={handlePageClick}
                                                containerClassName={'pagination'}
                                                pageClassName={'page-item'}
                                                pageLinkClassName={'page-link'}
                                                previousClassName={'page-item'}
                                                previousLinkClassName={'page-link'}
                                                nextClassName={'page-item'}
                                                nextLinkClassName={'page-link'}
                                                breakClassName={'page-item'}
                                                breakLinkClassName={'page-link'}
                                                activeClassName={'active'}
                                            />
                                        </>
                                    ) : (
                                        <> <div className="grid">
                                            {currentMeetings.length > 0 ? (
                                                currentMeetings.map(participant => (
                                                    <div key={participant.id} className="responsable-item">
                                                        <img src="https://via.placeholder.com/100" alt={participant.nom} className="responsable-img" />
                                                        <div className="responsable-info">
                                                            <h5 className="responsable-title">{participant.nom} {participant.prenom}</h5>
                                                            <p><strong>Nom d'utilisateur :</strong> {participant.username}</p>
                                                            <p><strong>Email :</strong> {participant.email}</p>
                                                            <Link to={`/update-participant/${participant.id}`} className="btn btn-outline-info btn-sm">
                                                                <GrEdit />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-center">Aucun participant disponible</p>
                                            )}
                                        </div>
                                            <ReactPaginate
                                                previousLabel={'Précédent'}
                                                nextLabel={'Suivant'}
                                                breakLabel={'...'}
                                                pageCount={pageCount}
                                                marginPagesDisplayed={2}
                                                pageRangeDisplayed={5}
                                                onPageChange={handlePageClick}
                                                containerClassName={'pagination'}
                                                pageClassName={'page-item'}
                                                pageLinkClassName={'page-link'}
                                                previousClassName={'page-item'}
                                                previousLinkClassName={'page-link'}
                                                nextClassName={'page-item'}
                                                nextLinkClassName={'page-link'}
                                                breakClassName={'page-item'}
                                                breakLinkClassName={'page-link'}
                                                activeClassName={'active'}
                                            />
                                        </>
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
