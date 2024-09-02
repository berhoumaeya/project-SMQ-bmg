import React, { useState, useEffect, useMemo } from 'react';
import { FcApproval } from 'react-icons/fc';
import { RxCross2 } from 'react-icons/rx';
import SubNavbarAudit from '../../components/SubNavbarAudit';
import SidebarAudit from '../../components/SidebarAudit';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import HistorySidebar from '../../components/HistorySidebar';
import ReactPaginate from 'react-paginate';

const sampleAudits = [
    {
        id: 1,
        reference: 'AUD001',
        designation: 'Audit de sécurité',
        type_audit: 'Sécurité',
        created_at: '2024-01-01T12:00:00Z',
        statut: 'En attente'
    },
    {
        id: 2,
        reference: 'AUD002',
        designation: 'Audit de conformité',
        type_audit: 'Conformité',
        created_at: '2024-02-01T12:00:00Z',
        statut: 'En attente'
    },
    {
        id: 3,
        reference: 'AUD003',
        designation: 'Audit financier',
        type_audit: 'Financier',
        created_at: '2024-03-01T12:00:00Z',
        statut: 'En attente'
    }
];

function ValidAudit() {
    const [audits, setAudits] = useState([]);
    const [viewMode, setViewMode] = useState('list');
    const [isHistoryVisible, setIsHistoryVisible] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const meetingsPerPage = 5;

    useEffect(() => {
        setAudits(sampleAudits);
    }, []);
    const toggleHistorySidebar = () => {
        setIsHistoryVisible(prevState => !prevState);
    };
    const handleStatusChange = (auditId, newStatus) => {
        const updatedAudits = audits.map(audit => {
            if (audit.id === auditId) {
                return { ...audit, statut: newStatus };
            }
            return audit;
        });
        setAudits(updatedAudits);
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

    const getTypeActionLabelClass = (statut) => {
        switch (statut.trim().toLowerCase()) {
            case 'en attente':
                return 'label label-warning';
            case 'réalisé':
                return 'label label-success';
            case 'non réalisé':
                return 'label label-danger';
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
                <div className={`container dashboard ${isHistoryVisible ? 'history-visible' : ''}`}>

                    <div className="container dashboard">
                        <div className="row">
                            <div>
                                <div className="table-container">
                                    <h3 className='formation-title'>Liste des audits à valider</h3>

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
                                         <>   <table className="table-header">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" onClick={() => requestSort('reference')}>Référence {getSortArrow('reference')}</th>
                                                        <th scope="col" onClick={() => requestSort('designation')}>Désignation  {getSortArrow('designation')}</th>
                                                        <th scope="col" onClick={() => requestSort('type_audit')}>Type d'Audit {getSortArrow('type_audit')}</th>
                                                        <th scope="col" onClick={() => requestSort('statut')}>Statut {getSortArrow('statut')}</th>
                                                        <th scope="col">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentMeetings.length > 0 ? (
                                                        currentMeetings.map(audit => (
                                                            <tr>
                                                                <td>{audit.reference}</td>
                                                                <td>{audit.designation}</td>
                                                                <td>{audit.type_audit}</td>
                                                                <td>
                                                                    <span className={getTypeActionLabelClass(audit.statut)}>
                                                                        {audit.statut}
                                                                    </span>
                                                                </td>                                                                      <td>
                                                                    <button onClick={() => handleStatusChange(audit.id, 'Réalisé')} className="btn btn-outline-success me-2">
                                                                        <FcApproval />
                                                                    </button>
                                                                    <button onClick={() => handleStatusChange(audit.id, 'Non Réalisé')} className="btn btn-outline-danger me-2">
                                                                        <RxCross2 />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="7" className="text-center">Aucun audit disponible</td>
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
                                                {currentMeetings.length > 0 ? (
                                                    currentMeetings.map(audit => (
                                                        <div key={audit.id} className="responsable-item">
                                                            <img src="https://via.placeholder.com/100" alt={`${audit.type_audit}`} className="responsable-img" />
                                                            <div className="responsable-info">
                                                                <h5 className="responsable-title">{audit.type_audit}</h5>
                                                                <p><strong className="responsable-text">Référence :</strong> {audit.reference}</p>
                                                                <p><strong className="responsable-text">Désignation :</strong> {audit.designation}</p>
                                                                <p><strong className="responsable-text">Créé à :</strong> {new Date(audit.created_at).toLocaleString()}</p>
                                                                <p><strong className="responsable-text">Statut :</strong> {audit.statut}</p>
                                                                <div className="button-container">
                                                                    <button onClick={() => handleStatusChange(audit.id, 'Réalisé')} className="btn btn-outline-success btn-sm me-2">
                                                                        <FcApproval />
                                                                    </button>
                                                                    <button onClick={() => handleStatusChange(audit.id, 'Non Réalisé')} className="btn btn-outline-danger btn-sm me-2">
                                                                        <RxCross2 />
                                                                    </button>
                                                                </div>
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
                </div>
                {isHistoryVisible && <HistorySidebar />}
                <button className="toggle-button" onClick={toggleHistorySidebar}>
                    {isHistoryVisible ? <FaArrowLeft /> : <FaArrowRight />}
                </button>
            </main>
        </>
    );
}

export default ValidAudit;
