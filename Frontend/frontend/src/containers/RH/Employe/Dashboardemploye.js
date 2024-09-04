import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../list.css';
import SubNavbarRH from '../../../components/SubNavbarRH';
import SidebarRH from '../../../components/SidebarRH';
import { GrEdit } from 'react-icons/gr';
import ReactPaginate from 'react-paginate';

const sampleEmployes = [
    {
        id: 1,
        nom: 'Doe',
        prenom: 'John',
        username: 'jdoe',
        email: 'john.doe@example.com'
    },
    {
        id: 2,
        nom: 'Smith',
        prenom: 'Jane',
        username: 'jsmith',
        email: 'jane.smith@example.com'
    },
    {
        id: 3,
        nom: 'Johnson',
        prenom: 'Emily',
        username: 'ejohnson',
        email: 'emily.johnson@example.com'
    }
];

const DashboardEmploye = () => {
    const [employes, setEmployes] = useState([]);
    const [error] = useState(null);
    const [viewMode, setViewMode] = useState('list');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const meetingsPerPage = 5;
    useEffect(() => {
        setEmployes(sampleEmployes);
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchFieldChange = (e) => {
        setSearchField(e.target.value);
    };

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

    const sortedEmployes = useMemo(() => {
        return employes.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    }, [employes, sortConfig]);

    const filteredEmployes = useMemo(() => {
        if (!searchField) {
            return sortedEmployes;
        }
        return sortedEmployes.filter(employe =>
            employe[searchField]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [sortedEmployes, searchField, searchTerm]);

    if (error) {
        return <div>Erreur : {error}</div>;
    }
    const indexOfLastMeeting = (currentPage + 1) * meetingsPerPage;
    const indexOfFirstMeeting = indexOfLastMeeting - meetingsPerPage;
    const currentMeetings = filteredEmployes.slice(indexOfFirstMeeting, indexOfLastMeeting);
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };
    const pageCount = Math.ceil(filteredEmployes.length / meetingsPerPage);

    return (
        <>
            <SubNavbarRH viewMode={viewMode} setViewMode={setViewMode} />
            <main style={{ display: 'flex', minHeight: '100vh' , backgroundColor :'white'}}>
                <SidebarRH />
                <div className="container dashboard">
                    <div className="row">
                        <div>
                            <div className="table-container">
                                <h3 className='formation-title'>Liste des Employés</h3>
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
                                        <option value="username">Nom d'utilisateur</option>
                                        <option value="email">Email</option>
                                    </select>
                                </div>
                                <div>
                                    {viewMode === 'list' ? (
                                        <><table className="table-header">
                                            <thead>
                                                <tr>
                                                    <th scope="col" onClick={() => requestSort('nom')}>
                                                        Nom Employé {getSortArrow('nom')}
                                                    </th>
                                                    <th scope="col" onClick={() => requestSort('prenom')}>
                                                        Prénom Employé {getSortArrow('prenom')}
                                                    </th>
                                                    <th scope="col" onClick={() => requestSort('username')}>
                                                        Nom d'utilisateur Employé {getSortArrow('username')}
                                                    </th>
                                                    <th scope="col" onClick={() => requestSort('email')}>
                                                        Email Employé {getSortArrow('email')}
                                                    </th>
                                                    <th>Détails</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentMeetings.length > 0 ? (
                                                    currentMeetings.map(employe => (
                                                        <tr key={employe.id}>
                                                            <td>{employe.nom}</td>
                                                            <td>{employe.prenom}</td>
                                                            <td>{employe.username}</td>
                                                            <td>{employe.email}</td>
                                                            <td>
                                                                <Link to={`/update-employe/${employe.id}`} className="btn btn-outline-info ">
                                                                    <GrEdit />
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="6" className="text-center">Aucun employé disponible</td>
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
                                        <>   <div className="grid">
                                            {currentMeetings.length > 0 ? (
                                                currentMeetings.map(employe => (
                                                    <div key={employe.id} className="responsable-item">
                                                        <img src="https://via.placeholder.com/100" alt={employe.nom} className="responsable-img" />
                                                        <div className="responsable-info">
                                                            <h5 className="responsable-title">{employe.nom} {employe.prenom}</h5>
                                                            <p><strong>Username :</strong> {employe.username}</p>
                                                            <p><strong>Email :</strong> {employe.email}</p>
                                                            <Link to={`/update-employe/${employe.id}`} className="btn btn-outline-info btn-sm">
                                                                <GrEdit />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-center">Aucun employé disponible</p>
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

export default DashboardEmploye;
