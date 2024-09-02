import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './reunion/DashboardMeetings.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import ReactPaginate from 'react-paginate';
import { FaArrowLeft, FaBullseye, FaRegQuestionCircle } from 'react-icons/fa';

const localizer = momentLocalizer(moment);

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
    // September meetings
    {
        id: 3,
        created_by: 'Admin',
        type_reunion: 'Strategy Meeting',
        lieu: 'Salle de conférence C',
        ordre_du_jour: 'Planification stratégique pour le Q4',
        created_at: '2024-09-01',
        piece_jointe: true,
        date_previsionnelle: '2024-09-10',
    },
    {
        id: 4,
        created_by: 'Jane Smith',
        type_reunion: 'Team Meeting',
        lieu: 'Salle de réunion D',
        ordre_du_jour: 'État des lieux des projets en cours',
        created_at: '2024-09-03',
        piece_jointe: false,
        date_previsionnelle: '2024-09-12',
    },
    {
        id: 5,
        created_by: 'Michael Brown',
        type_reunion: 'Feedback Session',
        lieu: 'Salle de réunion E',
        ordre_du_jour: 'Retour sur les performances du trimestre',
        created_at: '2024-09-05',
        piece_jointe: true,
        date_previsionnelle: '2024-09-18',
    },
    {
        id: 6,
        created_by: 'Emily Davis',
        type_reunion: 'Training Session',
        lieu: 'Salle de formation F',
        ordre_du_jour: 'Formation sur les nouveaux outils',
        created_at: '2024-09-08',
        piece_jointe: false,
        date_previsionnelle: '2024-09-25',
    },
];


const DashboardMeetingsGuest = () => {
    const [meetings, setMeetings] = useState([]);
    const [viewMode, setViewMode] = useState('calendar');
    const [isBubbleVisible, setIsBubbleVisible] = useState(false);
    const [selectedMeeting, setSelectedMeeting] = useState(null);
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

    const filteredMeetings = useMemo(() => {
        if (!searchField) {
            return meetings;
        }
        return meetings.filter(meeting =>
            meeting[searchField]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [meetings, searchField, searchTerm]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchFieldChange = (e) => {
        setSearchField(e.target.value);
    };

    const handleDateClick = (event) => {
        const date = event.start;
        const selectedMeeting = meetings.find(meeting =>
            new Date(meeting.date_previsionnelle).toDateString() === date.toDateString()
        );
        if (selectedMeeting) {
            setSelectedMeeting(selectedMeeting);
            setIsBubbleVisible(true);
        }
    };

    const events = meetings.map(meeting => ({
        id: meeting.id,
        title: meeting.type_reunion,
        start: new Date(meeting.date_previsionnelle),
        end: new Date(meeting.date_previsionnelle),
    }));

    return (
        <main style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column', marginTop: '10px' }}>
            <div className="container dashboard">
                <div className="row">
                    {viewMode === 'calendar' ? (
                        <div className="calendar-container">
                            <Calendar
                                localizer={localizer}
                                events={events}
                                startAccessor="start"
                                endAccessor="end"
                                style={{ height: 600, width: '100%' }}
                                onSelectEvent={handleDateClick}
                            />
                            {isBubbleVisible && selectedMeeting && (
                                <div className="meeting-detail-bubble">
                                    <div
                                        className="card-header-1"
                                        style={{ backgroundColor: '#007bff' }} // Replace with your color logic
                                    >
                                        Réunion N° {selectedMeeting.id}
                                    </div>
                                    <div className='text'>
                                        <p><span>👤</span> {selectedMeeting.created_by}</p>
                                        <p><span>📅</span> {selectedMeeting.type_reunion}</p>
                                        <p><span>📍</span> {selectedMeeting.lieu}</p>
                                        <p><span>📄</span> {selectedMeeting.ordre_du_jour}</p>
                                        <p><span>🕒</span> {selectedMeeting.created_at}</p>
                                        <p><span>📎</span> {selectedMeeting.piece_jointe ? <a href="/" target="_blank" rel="noopener noreferrer">Consulter</a> : 'Aucune'}</p>
                                    </div>
                                    <div className='button-container'>
                                        <a href={`https://meet.google.com/ket-gnbg-wum`} className="btn btn-primary">Participer</a>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">Aucune réunion disponible</td>
                        </tr>
                    )}
                 <div className="dashboard-buttons" style={{ marginTop: '40px' }}>
                    <Link to={`/guest`} className="btn btn-secondary">
                        <FaArrowLeft style={{ marginRight: '10px' }} /> Retour
                    </Link>
                </div> </div>
              
            </div>
        </main>
    );
};

export default DashboardMeetingsGuest;
