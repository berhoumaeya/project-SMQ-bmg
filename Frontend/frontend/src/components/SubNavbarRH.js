import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import '../styles/SubNavbar.css';
import { IoIosArrowBack } from "react-icons/io";
import { PiThermometerHot, PiThermometerCold } from "react-icons/pi";
import { FaFile, FaList, FaTh } from 'react-icons/fa';
import { LuFileSearch } from "react-icons/lu";
import { IoIosAddCircleOutline } from "react-icons/io";

const SubNavbarRH = ({ viewMode, setViewMode }) => {
    const location = useLocation();
    const { id } = useParams();

    const getDashboardLink = () => {
        if (location.pathname.startsWith('/ajouter-responsable') || location.pathname.startsWith('/update-responsable')) {
            return '/dashboardresponsable';
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
        } else if (location.pathname.startsWith('/update-froid') || location.pathname.startsWith('/update-chaud')) {
            return '/Dashboard';
        } else if (location.pathname.startsWith('/ajouter-competence')) {
            return `/dashboardcompetence/${id}`;
        }
        else {
            return null;
        }
    };

    const getAjouterLink = () => {
        if (location.pathname.includes('/dashboardresponsable')) {
            return '/ajouter-responsable';
        } else if (location.pathname.includes('/dashboardposition')) {
            return '/ajouter-position';
        } else if (location.pathname.includes('/dashboardparticipant')) {
            return '/ajouter-participant';
        } else if (location.pathname.includes('/dashboardemploye')) {
            return '/ajouter-employe';
        } else if (location.pathname.includes('/dashboardfiche')) {
            return '/ajouter-fiche';
        } else if (location.pathname.includes('/dashboardformation')) {
            return '/ajouter-formation';
        } else {
            return null;
        }
    };

    const showRetourButton = location.pathname.startsWith('/ajouter') || location.pathname.startsWith('/update');
    const dashboardLink = getDashboardLink();
    const ajouterLink = getAjouterLink();

    const isChaudPage = location.pathname === '/DashboardEvaluationChaud';
    const isFroidPage = location.pathname === '/DashboardEvaluationFroid';
    const showListGridButtons = !showRetourButton && location.pathname !== '/dashboardcompetence';
    const isDashboardEmployePage = location.pathname === '/dashboardemploye';

    const showConsulteButton = location.pathname.startsWith('/update-employe/') && id;
    const showEvaluerButton = location.pathname.startsWith(`/dashboardcompetence/${id}`);

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
                    <Link to={`/dashboardcompetence/${id}`}>
                        <button className="sub-navbar-link ">
                            <LuFileSearch />
                            <span className="tooltip">Compétences</span>
                        </button>
                    </Link>
                )}
                {showListGridButtons && (
                    <>
                        <Link to='/Dashboard' >
                            <button className="sub-navbar-link" >
                                <IoIosArrowBack />
                                <span className="tooltip">Retour</span>
                            </button>
                        </Link>
                        {showEvaluerButton && (
                            <Link to={`/ajouter-competence/${id}`}>
                                <button className="sub-navbar-link">
                                    <LuFileSearch />
                                    <span className="tooltip">Evaluer</span>
                                </button>
                            </Link>
                        )}
                        {ajouterLink && (
                            <Link to={ajouterLink}>
                                <button className="sub-navbar-link">
                                    <IoIosAddCircleOutline />
                                    <span className="tooltip">Ajouter</span>
                                </button>
                            </Link>
                        )}
                        {isDashboardEmployePage && (
                            <Link to="/dashboardfiche">
                                <button className="sub-navbar-link" >
                                    <FaFile />
                                    <span className="tooltip">Fiche Employé</span>
                                </button>
                            </Link>
                        )}
                        {!location.pathname.startsWith('/dashboardcompetence') && (
                            <>
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
                            </>
                        )}
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
