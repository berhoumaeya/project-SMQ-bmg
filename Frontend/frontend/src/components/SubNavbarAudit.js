import React from 'react';
import { IoIosAddCircleOutline, IoIosArrowBack } from "react-icons/io";
import { FaList, FaTh } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { IoCalendarNumberOutline } from "react-icons/io5";

const SubNavbarAudit = ({ viewMode, setViewMode }) => {
    const location = useLocation();
    const isOnActionsPage = location.pathname.includes('/Actions');
    const isOnReunionsPage = location.pathname.includes('/allreunion');
    const isOnAjouterPage = location.pathname.includes('/ajouter') ||
        location.pathname.includes('/Ajouter') ||
        location.pathname.includes('/PrendreDecision') ||
        location.pathname.includes('/ConsulterReunion');

    const getRetourLink = () => {
        if (location.pathname.includes('/ajouteraction') || location.pathname.includes('/update-action')
        ) {
            return '/Actions';
        } else if (location.pathname.includes('/AjouterReunion')) {
            return '/allreunion';
        } else {
            return '/Dashboard'; // Default fallback
        }
    };

    const showRetourButton = location.pathname.includes('/valideraudit') ||
        location.pathname.includes('/Audits') ||
        location.pathname.includes('/ajouter') ||
        location.pathname.includes('/Ajouter') ||
        location.pathname.includes('/PrendreDecision') ||
        location.pathname.includes('/audit') ||
        location.pathname.includes('/ConsulterReunion') ||
        location.pathname.includes('/Actions') ||
        location.pathname.includes('/update-action') ||
        isOnActionsPage ||
        isOnReunionsPage;

    return (
        <div className="sub-navbar-container">
            <div className="sub-navbar-links">
                {showRetourButton && (
                    <Link to={getRetourLink()}>
                        <button className="sub-navbar-link">
                            <IoIosArrowBack />
                            <span className="tooltip">Retour</span>
                        </button>
                    </Link>
                )}

                {isOnActionsPage && (
                    <Link to='/ajouteraction'>
                        <button className="sub-navbar-link">
                            <IoIosAddCircleOutline />
                            <span className="tooltip">Ajouter Action</span>
                        </button>
                    </Link>
                )}

                {isOnReunionsPage && (
                    <Link to='/AjouterReunion'>
                        <button className="sub-navbar-link">
                            <IoIosAddCircleOutline />
                            <span className="tooltip">Ajouter Réunion</span>
                        </button>
                    </Link>
                )}

                {isOnReunionsPage && !isOnAjouterPage && (
                    <button
                        className={`sub-navbar-link ${viewMode === 'calendar' ? 'active' : ''}`}
                        onClick={() => setViewMode('calendar')}
                    >
                        <IoCalendarNumberOutline />
                        <span className="tooltip">Calendar</span>
                    </button>
                )}

                {!isOnAjouterPage && (
                    <>
                        <button
                            className={`sub-navbar-link ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => setViewMode('list')}
                        >
                            <FaList />
                            <span className="tooltip">List</span>
                        </button>
                        <button
                            className={`sub-navbar-link ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => setViewMode('grid')}
                        >
                            <FaTh />
                            <span className="tooltip">Kanban</span>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default SubNavbarAudit;