import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import '../styles/SubNavbar.css';
import { IoIosArrowBack } from "react-icons/io";
import { PiThermometerHot, PiThermometerCold } from "react-icons/pi";
import { FaList, FaTh } from 'react-icons/fa';
import { LuFileSearch } from "react-icons/lu";

const SubNavbarRH = ({ viewMode, setViewMode }) => {
    const location = useLocation();
    const { id } = useParams();

    const getDashboardLink = () => {
        if (location.pathname.startsWith('/ajouter-responsable')) {
            return '/Dashboardresponsable';
        } else if (location.pathname.startsWith('/ajouter-position')) {
            return '/Dashboardposition';
        } else if (location.pathname.startsWith('/ajouter-participant')) {
            return '/Dashboardparticipant';
        } else if (location.pathname.startsWith('/ajouter-employe')) {
            return '/Dashboardemploye';
        } else if (location.pathname.startsWith('/ajouter-fiche')) {
            return '/Dashboardfiche';
        } else if (location.pathname.startsWith('/ajouter-formation')) {
            return '/Dashboardformation';
        } else if (location.pathname.startsWith('/update-responsable')) {
            return '/Dashboardresponsable';
        } else if (location.pathname.startsWith('/update-position')) {
            return '/Dashboardposition';
        } else if (location.pathname.startsWith('/update-participant')) {
            return '/Dashboardparticipant';
        } else if (location.pathname.startsWith('/update-employe')) {
            return '/Dashboardemploye';
        } else if (location.pathname.startsWith('/update-fiche')) {
            return '/Dashboardfiche';
        } else if (location.pathname.startsWith('/update-formation')) {
            return '/Dashboardformation';
        } else {
            return null;
        }
    };

    const showRetourButton = location.pathname.startsWith('/ajouter') || location.pathname.startsWith('/update');
    const dashboardLink = getDashboardLink();

    const isChaudPage = location.pathname === '/DashboardEvaluationChaud';
    const isFroidPage = location.pathname === '/DashboardEvaluationFroid';
    const showListGridButtons = !showRetourButton;


    const showConsulteButton = location.pathname.startsWith('/update-employe/') && id;

    return (
        <div className="sub-navbar-container">
            <div className="sub-navbar-links">
                {showRetourButton && dashboardLink && (
                    <Link to={dashboardLink} >
                        <button className="sub-navbar-link ">
                            <IoIosArrowBack />
                            <span className="tooltip">Retour</span>
                        </button>
                    </Link>
                )}
                {showConsulteButton && (
                    <Link to={`/Dashboardcompetence/${id}`}>
                        <button className="sub-navbar-link ">
                            <LuFileSearch />
                            <span className="tooltip">Compétences</span>
                        </button>
                    </Link>
                )}
                {showListGridButtons && (
                    <>
                    
                        <Link to='/Dashboard' >
                            <button className="sub-navbar-link ">
                                <IoIosArrowBack />
                                <span className="tooltip">Retour</span>
                            </button>
                        </Link>
                        <button
                            className={`sub-navbar-link  ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => setViewMode('list')}
                        >
                            <FaList />
                            <span className="tooltip">List</span>
                        </button>
                        <button
                            className={`sub-navbar-link  ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => setViewMode('grid')}
                        >
                            <FaTh />
                            <span className="tooltip">Kanban</span>
                        </button>
                        {!isChaudPage && (
                            <Link to="/DashboardEvaluationChaud" >
                                <button className="sub-navbar-link ">
                                    <PiThermometerHot />
                                    <span className="tooltip">Chaud</span>
                                </button>
                            </Link>
                        )}
                        {!isFroidPage && (
                            <Link to="/DashboardEvaluationFroid">
                                <button className="sub-navbar-link ">
                                    <PiThermometerCold />
                                    <span className="tooltip">Froid</span>
                                </button>
                            </Link>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default SubNavbarRH;
