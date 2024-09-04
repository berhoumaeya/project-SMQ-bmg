import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import './SidbarInd.css';
import { IoIosArrowBack, IoIosAddCircleOutline } from "react-icons/io";
import { FaFile, FaList, FaTh } from 'react-icons/fa';

const SidebarInd = ({ viewMode, setViewMode }) => {
    const location = useLocation();
    const { id } = useParams();

    const getDashboardLink = () => {
        if (location.pathname.startsWith('/ajouter-responsable') || location.pathname.startsWith('/update-responsable')) {
            return '/Dashboard';
        } else if (location.pathname.startsWith('/ajouter-position') || location.pathname.startsWith('/update-position')) {
            return '/dashboardposition';
        } else if (location.pathname.startsWith('/ajouter-participant') || location.pathname.startsWith('/update-participant')) {
            return '/dashboardparticipant';
        } else if (location.pathname.startsWith('/ajouter-employe') || location.pathname.startsWith('/update-employe')) {
            return '/dashboardemploye';
        } else if (location.pathname.startsWith('/ajouter-fiche') || location.pathname.startsWith('/update-fiche')) {
            return '/dashboardfiche';
        } else if (location.pathname.startsWith('/ajouter-formation') || location.pathname.startsWith('/update-formation')) {
            return '/dashboardformation';
        } else {
            return null;
        }
    };

    const getFormLink = () => {
        if (location.pathname.startsWith('/SuiviIndicateur/:id')) {
            return '/AjouterSuiviIndicateur/:id/';
      
        } else {
            return '/AjouterIndicateur'; 
        }
    };

    const showRetourButton = location.pathname.startsWith('/ajouter') || location.pathname.startsWith('/update');
    const dashboardLink = getDashboardLink();
    const formLink = getFormLink();

    const isDashboardEmployePage = location.pathname === '/dashboardemploye';
    const showConsulteButton = location.pathname.startsWith('/update-employe/') && id;

    return (
        <div className="sub-navbar-container">
            <div className="sub-navbar-links">
              

                {!showRetourButton && (
                    <>
                        <Link to='/Dashboard'>
                            <button className="sub-navbar-link">
                                <IoIosArrowBack />
                                <span className="tooltip">Retour</span>
                            </button>
                        </Link>
                       
                        <Link to={formLink}>
                            <button className="sub-navbar-link">
                                <IoIosAddCircleOutline />
                                <span className="tooltip">Ajouter</span>
                            </button>
                        </Link>
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

export default SidebarInd;
