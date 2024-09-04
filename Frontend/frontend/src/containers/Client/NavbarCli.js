import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import './navbarcli.css';
import { IoIosArrowBack, IoIosAddCircleOutline } from "react-icons/io";
import { FaFile, FaList, FaTh } from 'react-icons/fa';

const NavbarCli = ({ viewMode, setViewMode }) => {
    const location = useLocation();
    const { id } = useParams();

    const getDashboardLink = () => {

    };
    const getFormLink = () => {
        if (location.pathname.startsWith('/AllReclamations')) {
            return '/CréerReclamationClient/undefined/';
        } else if (location.pathname.startsWith('/AllSuggestion')) {
            return '/CréerSuggestionClient';
        }else if (location.pathname.startsWith('/AllEnquete')) {
                return '/CréerEnquete/';
        } else {
            return '/CréerClient'; 
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
                {showRetourButton && dashboardLink && (
                    <Link to={dashboardLink}>
                        <button className="sub-navbar-link">
                            <IoIosArrowBack />
                            <span className="tooltip">Retour</span>
                        </button>
                    </Link>
                )}

                {!showRetourButton && (
                    <>
                        <Link to='/ConsulterClient/:undefined'>
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

export default NavbarCli;
