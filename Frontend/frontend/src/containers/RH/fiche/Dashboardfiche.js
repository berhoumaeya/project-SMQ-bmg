import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../list.css';
import SubNavbarRH from '../../../components/SubNavbarRH';
import SidebarRH from '../../../components/SidebarRH';
import { GrEdit } from 'react-icons/gr';
import ReactPaginate from 'react-paginate';

const sampleFiches = [
    { id: 1, name: 'Fiche 1', job_position: 'Position A', employe_concerne: 'Employe 1' },
    { id: 2, name: 'Fiche 2', job_position: 'Position B', employe_concerne: 'Employe 2' }
];

const DashboardFiche = () => {
    const [fiches, setFiches] = useState([]);
    const [viewMode, setViewMode] = useState('list');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState(''); 
    const [currentPage, setCurrentPage] = useState(0);
    const meetingsPerPage = 5;
    useEffect(() => {
        setFiches(sampleFiches);
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchFieldChange = (e) => {
        setSearchField(e.target.value);
    };



    const sortedFiches = fiches
        .sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    const filteredFiches = useMemo(() => {
        if (!searchField) {
            return sortedFiches;
        }
        return sortedFiches.filter(fiche =>
            fiche[searchField]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [sortedFiches, searchField, searchTerm]);


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
    const currentMeetings = filteredFiches.slice(indexOfFirstMeeting, indexOfLastMeeting);
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };
    const pageCount = Math.ceil(filteredFiches.length / meetingsPerPage);

    return (
        <><SubNavbarRH viewMode={viewMode} setViewMode={setViewMode} />
            <main style={{ display: 'flex', minHeight: '100vh' }}>
                <SidebarRH />
                <div className="container dashboard">
                    <div className="row">
                        <div>
                            <div className="table-container" >
                                <h3 className="formation-title" >Liste des Fiches Employés</h3>
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
                                        <option value="name">  Nom Fiche</option>
                                        <option value="job_position"> Poste Employé</option>
                                        <option value="employe_concerne"> Fiche de l'Employé</option>
                                    </select>
                                </div>  <div>
                                    {viewMode === 'list' ? (
                                       <> <table className="table-header">
                                            <thead>
                                                <tr>
                                                    <th scope="col" onClick={() => requestSort('name')}>
                                                        Nom Fiche {getSortArrow('name')}
                                                    </th>
                                                    <th scope="col" onClick={() => requestSort('job_position')}>
                                                        Poste Employé {getSortArrow('job_position')}
                                                    </th>
                                                    <th scope="col" onClick={() => requestSort('employe_concerne')}>
                                                        Fiche de l'Employé {getSortArrow('employe_concerne')}
                                                    </th>
                                                    <th scope="col">Détails</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentMeetings.length > 0 ? (
                                                    currentMeetings.map(fiche => (
                                                        <tr>
                                                            <td>{fiche.name}</td>
                                                            <td>{fiche.job_position}</td>
                                                            <td>{fiche.employe_concerne}</td>
                                                            <td>
                                                                <Link to={`/update-fiche/${fiche.id}`} className="btn btn-outline-info">
                                                                    <GrEdit />
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="5" className="text-center">Aucune fiche disponible</td>
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
                                                currentMeetings.map(fiche => (
                                                    <div key={fiche.id} className="responsable-item">
                                                        <img src="https://via.placeholder.com/100" alt={fiche.name} className="responsable-img" />
                                                        <div className="responsable-info">
                                                            <h5 className="responsable-title">{fiche.name}</h5>
                                                            <p><strong >Poste :</strong> {fiche.job_position}</p>
                                                            <p><strong >Employé Concerné :</strong> {fiche.employe_concerne}</p>
                                                            <Link to={`/update-fiche/${fiche.id}`} className="btn btn-outline-info btn-sm">
                                                                <GrEdit />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-center">Aucune fiche disponible</p>
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

export default DashboardFiche;
