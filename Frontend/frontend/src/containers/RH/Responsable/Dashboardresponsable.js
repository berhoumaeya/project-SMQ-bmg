import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../list.css';
import SubNavbarRH from '../../../components/SubNavbarRH';
import SidebarRH from '../../../components/SidebarRH';
import { GrEdit } from 'react-icons/gr';
import ReactPaginate from 'react-paginate';

const sampleResponsables = [
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

const DashboardResponsable = () => {
    const [responsables, setResponsables] = useState([]);
    const [viewMode, setViewMode] = useState('list');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const meetingsPerPage = 5;
    useEffect(() => {
        setResponsables(sampleResponsables);
    }, []);
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchFieldChange = (e) => {
        setSearchField(e.target.value);
    };

    const sortedResponsables = responsables
        .sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

    const filteredResponsables = useMemo(() => {
        if (!searchField) {
            return sortedResponsables;
        }
        return sortedResponsables.filter(responsable =>
            responsable[searchField]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [sortedResponsables, searchField, searchTerm]);

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
    const currentMeetings = filteredResponsables.slice(indexOfFirstMeeting, indexOfLastMeeting);
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };
    const pageCount = Math.ceil(filteredResponsables.length / meetingsPerPage);

    return (
        <>
            <SubNavbarRH viewMode={viewMode} setViewMode={setViewMode} />
            <main style={{ display: 'flex', minHeight: '100vh' , backgroundColor :'white'}}>
                <SidebarRH />
                <div className="container dashboard">
                    <div className="row">
                        <div>
                            <div className="table-container">
                                <h3 className="formation-title">Liste des Responsables</h3>
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
                                        <option value="nom">  Nom Responsable</option>
                                        <option value="prenom">Prénom Responsable</option>
                                        <option value="username"> Nom d'utilisateur</option>
                                        <option value="Email">email</option>
                                    </select>
                                </div>
                                <div>
                                    {viewMode === 'list' ? (
                                        <><table className="table-header">
                                            <thead>
                                                <tr>
                                                    <th scope="col" onClick={() => requestSort('nom')}>
                                                        Nom Responsable {getSortArrow('nom ')}
                                                    </th>
                                                    <th scope="col" onClick={() => requestSort('prenom')}>
                                                        Prénom Responsable {getSortArrow('prenom')}
                                                    </th>
                                                    <th scope="col" onClick={() => requestSort('username')}>
                                                        Nom d'Utilisateur {getSortArrow('username')}
                                                    </th>
                                                    <th scope="col" onClick={() => requestSort('email')}>
                                                        Email Responsable {getSortArrow('email')}
                                                    </th>
                                                    <th scope="col">Détails</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentMeetings.length > 0 ? (
                                                    currentMeetings.map(responsable => (
                                                        <tr key={responsable.id}>
                                                            <td>{responsable.nom}</td>
                                                            <td>{responsable.prenom}</td>
                                                            <td>{responsable.username}</td>
                                                            <td>{responsable.email}</td>
                                                            <td>
                                                                <Link to={`/update-responsable/${responsable.id}`} className="btn btn-outline-info">
                                                                    <GrEdit />
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="5" className="text-center">Aucun responsable disponible</td>
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
                                        <>  <div className="grid">
                                            {currentMeetings.length > 0 ? (
                                                currentMeetings.map(responsable => (
                                                    <div key={responsable.id} className="responsable-item">
                                                        <img src="https://via.placeholder.com/100" alt={`${responsable.nom} ${responsable.prenom}`} className="responsable-img" />
                                                        <div className="responsable-info">
                                                            <h5 className="responsable-title">{responsable.nom} {responsable.prenom}</h5>
                                                            <p><strong>Nom d'utilisateur :</strong> {responsable.username}</p>
                                                            <p><strong>Email :</strong> {responsable.email}</p>
                                                            <Link to={`/update-responsable/${responsable.id}`} className="btn btn-outline-info btn-sm">
                                                                <GrEdit />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-center">Aucun responsable disponible</p>
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

export default DashboardResponsable;
