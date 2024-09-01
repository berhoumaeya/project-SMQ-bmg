import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import SubNavbarAudit from '../../components/SubNavbarAudit';
import SidebarAudit from '../../components/SidebarAudit';
import { GrEdit } from 'react-icons/gr';
import ReactPaginate from 'react-paginate';

const sampleAudits = [
    {
        id: 1,
        reference: 'A001',
        designation: 'Audit 1',
        type_audit: 'Interne',
        statut: 'En attente',
        created_at: '2024-01-01T12:00:00Z'
        , created_by: 'Michael Brown'
    },
    {
        id: 2,
        reference: 'A002',
        designation: 'Audit 2',
        type_audit: 'Externe',
        statut: 'En attente',
        created_at: '2024-02-01T12:00:00Z',
        created_by: 'Michael Christopher'
    },
    {
        id: 3,
        reference: 'A003',
        designation: 'Audit 3',
        type_audit: 'Interne',
        statut: 'En attente',
        created_at: '2024-03-01T12:00:00Z',
        created_by: 'Michael Chris'
    }
];

const Audits = () => {
    const [audits, setAudits] = useState([]);
    const [viewMode, setViewMode] = useState('list');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const meetingsPerPage = 5;
    useEffect(() => {
        setAudits(sampleAudits);
        const successMessage = localStorage.getItem('successMessage');
        if (successMessage) {
            toast.success(successMessage);
            localStorage.removeItem('successMessage');
        }
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchFieldChange = (e) => {
        setSearchField(e.target.value);
    };



    const sortedAudits = audits
        .sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

    const filteredAudits = useMemo(() => {
        if (!searchField) {
            return sortedAudits;
        }
        return sortedAudits.filter(audit =>
            audit[searchField]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [sortedAudits, searchField, searchTerm]);


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
    const getTypeActionLabelClass = (statut) => {
        switch (statut.trim().toLowerCase()) {
            case 'en attente':
                return 'label label-warning';
            default:
                return 'label';
        }
    };


    const indexOfLastMeeting = (currentPage + 1) * meetingsPerPage;
    const indexOfFirstMeeting = indexOfLastMeeting - meetingsPerPage;
    const currentMeetings = filteredAudits.slice(indexOfFirstMeeting, indexOfLastMeeting);
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };
    const pageCount = Math.ceil(filteredAudits.length / meetingsPerPage);

    return (
        <> <SubNavbarAudit viewMode={viewMode} setViewMode={setViewMode} />
            <main style={{ display: 'flex', minHeight: '100vh' }}>
                <SidebarAudit />
                <div className="container dashboard">
                    <div className="row">
                        <div>
                            <div className="table-container">
                                <h3 className='formation-title'>Liste des Audits</h3>
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
                                        <option value="reference">Référence</option>
                                        <option value="designation">Désignation</option>
                                        <option value="type_audit">Type d'Audit</option>
                                        <option value="statut">Statut</option>
                                    </select>
                                </div>
                                <div>
                                    {viewMode === 'list' ? (
                                        <>      <table className="table-header">
                                            <thead>
                                                <tr>
                                                    <th scope="col" onClick={() => requestSort('reference')}>Référence {getSortArrow('reference')}</th>
                                                    <th scope="col" onClick={() => requestSort('designation')}>Désignation  {getSortArrow('designation')}</th>
                                                    <th scope="col" onClick={() => requestSort('type_audit')}>Type d'Audit {getSortArrow('type_audit')}</th>
                                                    <th scope="col" onClick={() => requestSort('statut')}>Statut {getSortArrow('statut')}</th>
                                                    <th scope="col">Détails</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentMeetings.length > 0 ? (
                                                    currentMeetings.map(audit => (
                                                        <tr >
                                                            <td>{audit.reference}</td>
                                                            <td>{audit.designation}</td>
                                                            <td>{audit.type_audit}</td>
                                                            <td>
                                                                <span className={getTypeActionLabelClass(audit.statut)}>
                                                                    {audit.statut}
                                                                </span>
                                                            </td>                                                                  <td>
                                                                <Link to={`/audit/${audit.id}`} className="btn btn-outline-info  me-2">
                                                                    <GrEdit />
                                                                </Link>

                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="6" className="text-center">Aucun audit disponible</td>
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
                                        <div className="grid">
                                            {sortedAudits.length > 0 ? (
                                                sortedAudits.map(audit => (
                                                    <div key={audit.id} className="responsable-item">
                                                        <img src="https://via.placeholder.com/100" alt={audit.reference} className="responsable-img" />
                                                        <div className="responsable-info">
                                                            <h5 className='responsable-title'>{audit.designation}</h5>
                                                            <p><strong >Type :</strong> {audit.type_audit}</p>
                                                            <p><strong >Statut :</strong> {audit.statut}</p>
                                                            <Link to={`/audit/${audit.id}`} className="btn btn-outline-info btn-sm me-2">
                                                                <GrEdit />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-center">Aucun audit disponible</p>
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

export default Audits;
