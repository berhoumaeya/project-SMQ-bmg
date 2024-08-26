import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './DashboardMeetings.css';
import SubNavbarAudit from '../../components/SubNavbarAudit';
import { FaBullseye, FaRegQuestionCircle } from 'react-icons/fa';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { FaUser, FaMapMarkerAlt, FaCalendarAlt, FaFileAlt, FaClipboardList } from 'react-icons/fa';

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
];


const localizer = momentLocalizer(moment);

const DashboardMeetings = () => {
    const [meetings, setMeetings] = useState([]);
    const [searchQuery] = useState('');
    const [viewMode, setViewMode] = useState('list');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
    const [selectedMeeting, setSelectedMeeting] = useState(null);
    const [isBubbleVisible, setIsBubbleVisible] = useState(false);
    const [markerColor, setMarkerColor] = useState('');

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

    const sortedMeetings = useMemo(() => {
        let sortableMeetings = [...meetings];
        if (sortConfig !== null) {
            sortableMeetings.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableMeetings;
    }, [meetings, sortConfig]);

    const filteredMeetings = sortedMeetings.filter(meeting =>
        meeting.created_by.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meeting.type_reunion.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meeting.lieu.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meeting.ordre_du_jour.toLowerCase().includes(searchQuery.toLowerCase())
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

    return (
        <><main style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>

            <SubNavbarAudit viewMode={viewMode} setViewMode={setViewMode} />
                <div className="container dashboard">
                    <div className="row">
                        <div>
                            <div className="table-container">
                                <div>
                                    {viewMode === 'list' ? (
                                        <div>
                                            <h3 className="formation-title">Liste des Réunions</h3>
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
                                                    {filteredMeetings.length > 0 ? (
                                                        filteredMeetings.map(meeting => (
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
                                    ) : (
                                        <div>
                                        <h3 className="formation-title">Liste des Réunions</h3>
                                        <div className="grid">
                                    
                                            {filteredMeetings.length > 0 ? (
                                                filteredMeetings.map(meeting => (
                                                    <div key={meeting.id} className="responsable-item">
                                                        <div className="responsable-info">
                                                        <h5 className="responsable-name">Réunion N° {meeting.id}</h5>
                                                            <p><strong>Créé par:</strong> {meeting.created_by}</p>
                                                            <p><strong>Type:</strong> {meeting.type_reunion}</p>
                                                            <p><strong>Lieu:</strong> {meeting.lieu}</p>
                                                            <p><strong>Ordre du jour:</strong> {meeting.ordre_du_jour}</p>
                                                            <p><strong>Créé à:</strong> {meeting.created_at}</p>
                                                            <p><strong>Pièces jointes:</strong> {meeting.piece_jointe ? <a href="#" target="_blank" rel="noopener noreferrer">Consulter</a> : 'Aucune'}</p>
                                                            <div className="meeting-card-buttons">
                                                                <Link to={`/ConsulterReunion/${meeting.id}/`} className="btn btn-primary">Consulter</Link>
                                                                <Link to={`/PrendreDecision/${meeting.id}/`} className="btn btn-secondary">Prendre décision</Link>
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
                    </div>
                </div>
            </main>
        </>
    );
};

// Dummy function to get color for meeting
const getColorForMeeting = (id) => {
    const colors = ['#A0C4FF', '#BDB2FF', '#ffc6ff', '#FFD6A5', '#FFADAD', '#E7BFBF', '#B2CAEF'];
    return colors[id % colors.length];
};

export default DashboardMeetings;
