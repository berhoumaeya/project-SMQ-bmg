import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../list.css';
import SubNavbarRH from '../../../components/SubNavbarRH';
import SidebarRH from '../../../components/SidebarRH';
import { GrEdit } from 'react-icons/gr';
import ReactPaginate from 'react-paginate';

const sampleFormations = [
    {
        id: 1,
        intitule_formation: 'Formation React',
        type_formation: 'Technique',
        organisme_formation: 'Organisme A',
        theme_formation: 'Développement Web',
        date_debut_formation: '2024-01-01',
        date_fin_formation: '2024-01-10',
        responsable_validation: 'Jean Dupont',
        created_at: '2024-01-01',
        created_by: 'Admin',
        updated_by: 'Admin',
        updated_at: '2024-01-10',
        parametre_validation: 'Examen final',
        date_cloture: '2024-01-11',
        pieces_jointes: true
    },
    {
        id: 2,
        intitule_formation: 'Formation Node.js',
        type_formation: 'Technique',
        organisme_formation: 'Organisme B',
        theme_formation: 'Backend',
        date_debut_formation: '2024-02-01',
        date_fin_formation: '2024-02-10',
        responsable_validation: 'Marie Martin',
        created_at: '2024-02-01',
        created_by: 'Admin',
        updated_by: 'Admin',
        updated_at: '2024-02-10',
        parametre_validation: 'Projet final',
        date_cloture: '2024-02-11',
        pieces_jointes: false
    },
    {
        id: 3,
        intitule_formation: 'Formation UX/UI',
        type_formation: 'Design',
        organisme_formation: 'Organisme C',
        theme_formation: 'Frontend',
        date_debut_formation: '2024-03-01',
        date_fin_formation: '2024-03-10',
        responsable_validation: 'Paul Durand',
        created_at: '2024-03-01',
        created_by: 'Admin',
        updated_by: 'Admin',
        updated_at: '2024-03-10',
        parametre_validation: 'Portfolio final',
        date_cloture: '2024-03-11',
        pieces_jointes: true
    }
];
const DashboardFormation = () => {
    const [formations, setFormations] = useState([]);
    const [viewMode, setViewMode] = useState('list');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const meetingsPerPage = 5;
    useEffect(() => {
        // Simulating data fetch
        setFormations(sampleFormations);
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchFieldChange = (e) => {
        setSearchField(e.target.value);
    };

    const sortedFormations = useMemo(() => {
        let sortableFormations = [...formations];
        if (sortConfig !== null) {
            sortableFormations.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableFormations;
    }, [formations, sortConfig]);

    const filteredFormations = useMemo(() => {
        if (!searchField) {
            return sortedFormations;
        }
        return sortedFormations.filter(formation =>
            formation[searchField]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [sortedFormations, searchField, searchTerm]);

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
    const currentMeetings = filteredFormations.slice(indexOfFirstMeeting, indexOfLastMeeting);
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };
    const pageCount = Math.ceil(filteredFormations.length / meetingsPerPage);

    return (
        <>
            <SubNavbarRH viewMode={viewMode} setViewMode={setViewMode} />
            <main style={{ display: 'flex', minHeight: '100vh' , backgroundColor :'white'}}>
                <SidebarRH />
                <div className="container dashboard">
                    <div className="row">
                        <div>
                            <div className="table-container">
                                <h3 className="formation-title">Liste des Formations</h3>
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
                                        <option value="intitule_formation">Intitulé Formation</option>
                                        <option value="type_formation">Type Formation</option>
                                        <option value="theme_formation">Thème de formation</option>
                                        <option value="responsable_validation">Responsable Validation</option>
                                    </select>
                                </div>
                                {viewMode === 'list' ? (
                                    <><table className="table-header">
                                        <thead>
                                            <tr>
                                                <th scope="col" onClick={() => requestSort('intitule_formation')}>
                                                    Intitulé Formation {getSortArrow('intitule_formation')}
                                                </th>
                                                <th scope="col" onClick={() => requestSort('type_formation')}>
                                                    Type Formation {getSortArrow('type_formation')}
                                                </th>
                                                <th scope="col" onClick={() => requestSort('theme_formation')}>
                                                    Thème de formation {getSortArrow('theme_formation')}
                                                </th>
                                                <th scope="col" onClick={() => requestSort('responsable_validation')}>
                                                    Responsable Validation {getSortArrow('responsable_validation')}
                                                </th>
                                                <th scope="col">Détails</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentMeetings.length > 0 ? (
                                                currentMeetings.map(formation => (
                                                    <tr key={formation.id}>
                                                        <td data-label="Intitulé Formation">
                                                            <h6 className="font-weight-bold mb-0">{formation.intitule_formation}</h6>
                                                            <span className="text-muted">{formation.theme_formation}</span>
                                                        </td>
                                                        <td data-label="Type Formation">
                                                            <span className="text-muted">{formation.type_formation}</span>
                                                        </td>
                                                        <td data-label="Thème de formation">
                                                            <span className="text-muted">{formation.theme_formation}</span>
                                                        </td>
                                                        <td data-label="Responsable Validation">
                                                            <span className="text-muted">{formation.responsable_validation}</span>
                                                        </td>
                                                        <td data-label="Détails">
                                                            <Link to={`/update-formation/${formation.id}`} className="btn btn-outline-info">
                                                                <GrEdit />
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="text-center">Aucune formation disponible</td>
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
                                <>    <div className="grid">
                                        {currentMeetings.length > 0 ? (
                                            currentMeetings.map(formation => (
                                                <div key={formation.id} className="responsable-item">
                                                    <img src="https://via.placeholder.com/100" alt={formation.intitule_formation} className="responsable-img" />
                                                    <div className="responsable-info">
                                                        <h5 className="responsable-title">{formation.intitule_formation}</h5>
                                                        <p><strong>Type :</strong> {formation.type_formation}</p>
                                                        <p><strong>Thème :</strong> {formation.theme_formation}</p>
                                                        <p><strong>Responsable :</strong> {formation.responsable_validation}</p>
                                                        <Link to={`/update-formation/${formation.id}`} className="btn btn-outline-info btn-sm">
                                                            <GrEdit />
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>Aucune formation disponible</p>
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
            </main>
        </>
    );
};

export default DashboardFormation;