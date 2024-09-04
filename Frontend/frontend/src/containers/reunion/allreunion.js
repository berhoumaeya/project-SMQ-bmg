import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './DashboardMeetings.css';
import SubNavbarAudit from '../../components/SubNavbarAudit';
import { FaBullseye, FaRegQuestionCircle } from 'react-icons/fa';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { FaUser, FaMapMarkerAlt, FaCalendarAlt, FaFileAlt, FaClipboardList } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
const sampleMeetings = [
    {
        id: 1,
        created_by: 'Admin',
        type_reunion: 'Client Meeting',
        lieu: 'Salle de conférence A',
        ordre_du_jour: 'Discussion des objectifs du mois prochain',
        created_at: '2024-08-01',
        piece_jointe: true,
        date_previsionnelle: '2024-08-15',
    },
    {
        id: 2,
        created_by: 'John Doe',
        type_reunion: 'Project Meeting',
        lieu: 'Salle de réunion B',
        ordre_du_jour: 'Revue du statut du projet Alpha',
        created_at: '2024-08-05',
        piece_jointe: false,
        date_previsionnelle: '2024-08-20',
    },
    {
        id: 3,
        created_by: 'Jane Smith',
        type_reunion: 'Team Meeting',
        lieu: 'Salle de conférence C',
        ordre_du_jour: 'Planification de la semaine',
        created_at: '2024-08-08',
        piece_jointe: true,
        date_previsionnelle: '2024-08-25',
    },
    {
        id: 4,
        created_by: 'Emily Johnson',
        type_reunion: 'One-on-One',
        lieu: 'Bureau privé 1',
        ordre_du_jour: 'Évaluation de performance individuelle',
        created_at: '2024-08-10',
        piece_jointe: false,
        date_previsionnelle: '2024-08-28',
    },
    {
        id: 5,
        created_by: 'Michael Brown',
        type_reunion: 'Brainstorming',
        lieu: 'Salle de créativité',
        ordre_du_jour: 'Idées pour la campagne marketing',
        created_at: '2024-08-12',
        piece_jointe: true,
        date_previsionnelle: '2024-08-30',
    },
    // Data for September
    {
        id: 6,
        created_by: 'Sarah White',
        type_reunion: 'Client Meeting',
        lieu: 'Salle de conférence D',
        ordre_du_jour: 'Présentation des nouvelles fonctionnalités',
        created_at: '2024-09-02',
        piece_jointe: true,
        date_previsionnelle: '2024-09-10',
    },
    {
        id: 7,
        created_by: 'David Lee',
        type_reunion: 'Project Meeting',
        lieu: 'Salle de réunion E',
        ordre_du_jour: 'Mise à jour sur le projet Beta',
        created_at: '2024-09-06',
        piece_jointe: false,
        date_previsionnelle: '2024-09-15',
    },
    {
        id: 8,
        created_by: 'Anna Brown',
        type_reunion: 'Team Meeting',
        lieu: 'Salle de conférence F',
        ordre_du_jour: 'Révision du plan trimestriel',
        created_at: '2024-09-09',
        piece_jointe: true,
        date_previsionnelle: '2024-09-20',
    },
    {
        id: 9,
        created_by: 'Emma Davis',
        type_reunion: 'One-on-One',
        lieu: 'Bureau privé 2',
        ordre_du_jour: 'Feedback sur les performances Q3',
        created_at: '2024-09-12',
        piece_jointe: false,
        date_previsionnelle: '2024-09-25',
    },
    {
        id: 10,
        created_by: 'Chris Green',
        type_reunion: 'Brainstorming',
        lieu: 'Salle de créativité',
        ordre_du_jour: 'Idées pour le lancement du produit',
        created_at: '2024-09-14',
        piece_jointe: true,
        date_previsionnelle: '2024-09-28',
    },
    // Data for October
    {
        id: 11,
        created_by: 'Alice Johnson',
        type_reunion: 'Client Meeting',
        lieu: 'Salle de conférence G',
        ordre_du_jour: 'Discussion des termes du contrat',
        created_at: '2024-10-01',
        piece_jointe: true,
        date_previsionnelle: '2024-10-08',
    },
    {
        id: 12,
        created_by: 'Robert Brown',
        type_reunion: 'Project Meeting',
        lieu: 'Salle de réunion H',
        ordre_du_jour: 'Évaluation de la phase de conception',
        created_at: '2024-10-05',
        piece_jointe: false,
        date_previsionnelle: '2024-10-12',
    },
    {
        id: 13,
        created_by: 'Sophia Martinez',
        type_reunion: 'Team Meeting',
        lieu: 'Salle de conférence I',
        ordre_du_jour: 'Préparation pour Q4',
        created_at: '2024-10-09',
        piece_jointe: true,
        date_previsionnelle: '2024-10-15',
    },
    {
        id: 14,
        created_by: 'James Wilson',
        type_reunion: 'One-on-One',
        lieu: 'Bureau privé 3',
        ordre_du_jour: 'Discussions de carrière',
        created_at: '2024-10-11',
        piece_jointe: false,
        date_previsionnelle: '2024-10-20',
    },
    {
        id: 15,
        created_by: 'Olivia Moore',
        type_reunion: 'Brainstorming',
        lieu: 'Salle de créativité',
        ordre_du_jour: 'Stratégie pour le prochain trimestre',
        created_at: '2024-10-14',
        piece_jointe: true,
        date_previsionnelle: '2024-10-25',
    },
];

const localizer = momentLocalizer(moment);

const DashboardMeetings = () => {
    const [meetings, setMeetings] = useState([]);
    const [viewMode, setViewMode] = useState('calendar');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
    const [selectedMeeting, setSelectedMeeting] = useState(null);
    const [isBubbleVisible, setIsBubbleVisible] = useState(false);
    const [markerColor, setMarkerColor] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const meetingsPerPage = 5;

    useEffect(() => {
        setMeetings(sampleMeetings);
        const handleClickOutside = (event) => {
            if (isBubbleVisible && !event.target.closest('.meeting-detail-bubble')) {
                setIsBubbleVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isBubbleVisible]);

    const sortedMeetings = meetings
        .sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });

    const filteredMeetings = useMemo(() => {
        if (!searchField) {
            return sortedMeetings;
        }
        return sortedMeetings.filter(meeting =>
            meeting[searchField]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [sortedMeetings, searchField, searchTerm]);

    const indexOfLastMeeting = (currentPage + 1) * meetingsPerPage;
    const indexOfFirstMeeting = indexOfLastMeeting - meetingsPerPage;
    const currentMeetings = filteredMeetings.slice(indexOfFirstMeeting, indexOfLastMeeting);

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

    const handleDateClick = (event) => {
        const date = event.start;
        const selectedMeeting = meetings.find(meeting =>
            new Date(meeting.date_previsionnelle).toDateString() === date.toDateString()
        );
        if (selectedMeeting) {
            const color = getColorForMeeting(selectedMeeting.id);
            setMarkerColor(color);
            setSelectedMeeting(selectedMeeting);
            setIsBubbleVisible(true);
        }
    };

    const events = meetings.map(meeting => ({
        id: meeting.id,
        title: meeting.type_reunion,
        start: new Date(meeting.date_previsionnelle),
        end: new Date(meeting.date_previsionnelle),
        backgroundColor: getColorForMeeting(meeting.id),
        borderColor: getColorForMeeting(meeting.id)
    }));

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const pageCount = Math.ceil(filteredMeetings.length / meetingsPerPage);

    return (
      <>  <main style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
            <SubNavbarAudit viewMode={viewMode} setViewMode={setViewMode} />
            <div className="container dashboard">
                <div className="row">
                    <div>
                        {viewMode === 'list' ? (
                            <div>
                                <h3 className="formation-title">Liste des Réunions</h3>
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
                                        <option value="created_by">Créé par</option>
                                        <option value="type_reunion">Type</option>
                                        <option value="lieu">Lieu</option>
                                        <option value="ordre_du_jour">Ordre du jour</option>
                                    </select>
                                </div>
                                <table className="table-header">
                                    <thead>
                                        <tr>
                                            <th scope="col" onClick={() => requestSort('created_by')}>
                                                Créé par {getSortArrow('created_by')}
                                            </th>
                                            <th scope="col" onClick={() => requestSort('type_reunion')}>
                                                Type {getSortArrow('type_reunion')}
                                            </th>
                                            <th scope="col" onClick={() => requestSort('lieu')}>
                                                Lieu {getSortArrow('lieu')}
                                            </th>
                                            <th scope="col" onClick={() => requestSort('ordre_du_jour')}>
                                                Ordre du jour {getSortArrow('ordre_du_jour')}
                                            </th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentMeetings.length > 0 ? (
                                            currentMeetings.map(meeting => (
                                                <tr key={meeting.id}>
                                                    <td>{meeting.created_by}</td>
                                                    <td>{meeting.type_reunion}</td>
                                                    <td>{meeting.lieu}</td>
                                                    <td>{meeting.ordre_du_jour}</td>
                                                    <td>
                                                        <Link to={`/ConsulterReunion/${meeting.id}/`} className="btn btn-outline-info me-2 sub-navbar-link">
                                                            <FaBullseye />
                                                            <span className="tooltip">Consulter réunion</span>
                                                        </Link>
                                                        <Link to={`/PrendreDecision/${meeting.id}/`} className="btn btn-outline-secondary me-2 sub-navbar-link">
                                                            <FaRegQuestionCircle />
                                                            <span className="tooltip">Prendre décision</span>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center">Aucune réunion disponible</td>
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
                            </div>
                        ) : viewMode === 'calendar' ? (
                            <div className="calendar-container">
                                <Calendar
                                    localizer={localizer}
                                    events={events}
                                    startAccessor="start"
                                    endAccessor="end"
                                    style={{ height: 600, width: '100%' }}
                                    onSelectEvent={handleDateClick}
                                    eventPropGetter={(event) => ({
                                        style: {
                                            backgroundColor: event.backgroundColor,
                                            borderColor: event.borderColor
                                        }
                                    })}
                                />

                                {isBubbleVisible && selectedMeeting && (
                                    <div className="meeting-detail-bubble">
                                        <div
                                            className="card-header-1"
                                            style={{ backgroundColor: getColorForMeeting(selectedMeeting.id) }}

                                        >
                                            Réunion N° {selectedMeeting.id}
                                        </div>
                                        <div className='text'>
                                            <p><span><FaUser /></span> {selectedMeeting.created_by}</p>
                                            <p><span><FaClipboardList /></span> {selectedMeeting.type_reunion}</p>
                                            <p><span><FaMapMarkerAlt /></span> {selectedMeeting.lieu}</p>
                                            <p><span><FaClipboardList /></span> {selectedMeeting.ordre_du_jour}</p>
                                            <p><span><FaCalendarAlt /></span> {selectedMeeting.created_at}</p>
                                            <p><span><FaFileAlt /></span> {selectedMeeting.piece_jointe ? <a href="/" target="_blank" rel="noopener noreferrer">Consulter</a> : 'Aucune'}</p>
                                        </div>

                                        <div className='ligne'></div>
                                        <div className="meeting-detail-buttons">
                                            <Link to={`/ConsulterReunion/${selectedMeeting.id}/`} className="btn btn-outline-info me-2 sub-navbar-link">
                                                <FaBullseye />
                                                <span className="tooltip">Consulter réunion</span>
                                            </Link>
                                            <Link to={`/PrendreDecision/${selectedMeeting.id}/`} className="btn btn-outline-secondary me-2 sub-navbar-link">
                                                <FaRegQuestionCircle />
                                                <span className="tooltip">Prendre décision</span>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) :
                            (
                                <div>
                                    <h3 className="formation-title">Liste des Réunions</h3>

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
                                            <option value="created_by">Créé par</option>
                                            <option value="type_reunion">Type</option>
                                            <option value="lieu">Lieu</option>
                                            <option value="ordre_du_jour">Ordre du jour</option>
                                        </select>
                                    </div> <div className="grid">

                                        {filteredMeetings.length > 0 ? (
                                            filteredMeetings.map(meeting => (

                                                <div key={meeting.id} className="responsable-item">
                                                    <img src="https://via.placeholder.com/100" alt={`${meeting.id}`} className="responsable-img" />

                                                    <div className="responsable-info">
                                                        <h5 className="responsable-title">Réunion N° {meeting.id}</h5>
                                                        <p><strong>Créé par:</strong> {meeting.created_by}</p>
                                                        <p><strong>Type:</strong> {meeting.type_reunion}</p>
                                                        <p><strong>Lieu:</strong> {meeting.lieu}</p>
                                                        <p><strong>Ordre du jour:</strong> {meeting.ordre_du_jour}</p>
                                                        <p><strong>Pièces jointes:</strong> {meeting.piece_jointe ? <a href="#" target="_blank" rel="noopener noreferrer">Consulter</a> : 'Aucune'}</p>
                                                        <div className="meeting-card-buttons">
                                                            <Link to={`/ConsulterReunion/${meeting.id}/`} className="btn btn-outline-info me-2 sub-navbar-link">
                                                                <FaBullseye />
                                                                <span className="tooltip">Consulter réunion</span>
                                                            </Link>
                                                            <Link to={`/PrendreDecision/${meeting.id}/`} className="btn btn-outline-secondary me-2 sub-navbar-link">
                                                                <FaRegQuestionCircle />
                                                                <span className="tooltip">Prendre décision</span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>Aucune réunion disponible</p>
                                        )}

                                    </div>
                                </div>


                            )}
                    </div>
                </div>
            </div>

        </main >
</>
);
};

// Dummy function to get color for meeting
const getColorForMeeting = (id) => {
    const colors = ['#A0C4FF', '#BDB2FF', '#ffc6ff', '#FFD6A5', '#FFADAD', '#E7BFBF', '#B2CAEF'];
    return colors[id % colors.length];
};

export default DashboardMeetings;

