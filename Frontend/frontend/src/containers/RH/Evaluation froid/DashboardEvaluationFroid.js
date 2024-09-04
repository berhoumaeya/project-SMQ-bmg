import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../list.css';
import SubNavbarRH from '../../../components/SubNavbarRH';
import SidebarRH from '../../../components/SidebarRH';
import { GrEdit } from 'react-icons/gr';
import ReactPaginate from 'react-paginate';

const sampleFroids = [
    { id: 1, name: 'Froid 1', created_by: 'User A', created_at: '2024-01-01' },
    { id: 2, name: 'Froid 2', created_by: 'User B', created_at: '2024-02-01' }
];

const DashboardFroid = () => {
    const [froids, setFroids] = useState([]);
    const [viewMode, setViewMode] = useState('list');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const meetingsPerPage = 5;
    useEffect(() => {
        setFroids(sampleFroids);
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchFieldChange = (e) => {
        setSearchField(e.target.value);
    };

    const sortedFroids = froids
        .sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

    const filteredFroids = useMemo(() => {
        if (!searchField) {
            return sortedFroids;
        }
        return sortedFroids.filter(froid =>
            froid[searchField]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [sortedFroids, searchField, searchTerm]);


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
    const currentMeetings = filteredFroids.slice(indexOfFirstMeeting, indexOfLastMeeting);
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };
    const pageCount = Math.ceil(filteredFroids.length / meetingsPerPage);

    return (
        <><SubNavbarRH viewMode={viewMode} setViewMode={setViewMode} />
            <main style={{ display: 'flex', minHeight: '100vh' , backgroundColor :'white'}}>
            <SidebarRH />
                <div className="container dashboard">
                    <div className="row">
                        <div>
                            <div className="table-container">
                                <h3 className="formation-title">Liste des Évaluations Froid</h3>
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
                                        <option value="name">Nom</option>
                                        <option value="created_by">Créé par</option>
                                        <option value="created_at">Créé à</option>
                                        <option value="Email">email</option>
                                    </select>
                                </div>   <div>
                                    {viewMode === 'list' ? (
                                        < >  <table className="table-header">
                                            <thead>
                                                <tr>
                                                    <th scope="col" onClick={() => requestSort('name')}>
                                                        Nom {getSortArrow('name')}
                                                    </th>
                                                    <th scope="col" onClick={() => requestSort('created_by')}>
                                                        Créé par {getSortArrow('created_by')}
                                                    </th>
                                                    <th scope="col" onClick={() => requestSort('created_at')}>
                                                        Créé à {getSortArrow('created_at')}
                                                    </th>
                                                    <th scope="col">Détails</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentMeetings.length > 0 ? (
                                                    currentMeetings.map(froid => (
                                                        <tr >
                                                            <td>{froid.name}</td>
                                                            <td>{froid.created_by}</td>
                                                            <td>{froid.created_at}</td>
                                                            <td>
                                                                <Link to={`/update-froid/${froid.id}`} className="btn btn-outline-info">
                                                                    <GrEdit />
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="4" className="text-center">Aucune évaluation disponible</td>
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
                                                currentMeetings.map(froid => (
                                                    <div key={froid.id} className="responsable-item">
                                                        <img src="https://via.placeholder.com/100" alt={froid.name} className="responsable-img" />
                                                        <div className="responsable-info">
                                                            <h5 className="responsable-title">{froid.name}</h5>
                                                            <p><strong >Créé par :</strong> {froid.created_by}</p>
                                                            <p><strong >Créé à :</strong> {froid.created_at}</p>
                                                            <Link to={`/update-froid/${froid.id}`} className="btn btn-outline-info btn-sm">
                                                                <GrEdit />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-center">Aucune évaluation disponible</p>
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

export default DashboardFroid;
