import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/SubNavbar.css';
import { IoIosArrowBack } from "react-icons/io";
import { FaList, FaTh } from 'react-icons/fa';
import { IoIosAddCircleOutline } from "react-icons/io";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
 
const SubNavbarDoc = ({ viewMode, setViewMode }) => {
    const location = useLocation();
 
    const getDashboardLink = () => {
        if (location.pathname.includes('/CréerDocExt') || location.pathname.includes('/modifierDocExt')) {
            return '/DashboardDocExt';
        } else if (location.pathname.includes('/CréerDemande')) {
            return '/demandeAccepte';
        } else if (location.pathname.includes('/demandeAccepte')) {
            return '/DashboardDocInt';
        } else if (location.pathname.includes('/CréerDocInt') || location.pathname.includes('/modifierDocInt')) {
            return '/DashboardDocInt';
        } else {
            return '/Dashboard';  
        }
    };
 
    const getAjouterLink = () => {
        if (location.pathname.includes('/DashboardDocExt')) {
            return '/CréerDocExt';
        } else if (location.pathname.includes('/demandeAccepte')) {
            return '/CréerDemande';
        } else {
            return null;
        }
    };
 
    const showRetourButton = location.pathname.includes('/Créer') || location.pathname.includes('/modifier');
    const dashboardLink = getDashboardLink();
 
    const showListGridButtons = !showRetourButton;
    const ajouterLink = getAjouterLink();
 
    const isDashboardDocIntPage = location.pathname === '/DashboardDocInt';
 
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
                {showListGridButtons && (
                    <>
                        <Link to='/Dashboard'>
                            <button className="sub-navbar-link" style={{ marginRight: "1250px", display: 'flex' }}>
                                <IoIosArrowBack />
                                <span className="tooltip">Retour</span>
                            </button>
                        </Link>
                        {isDashboardDocIntPage && (
                            <Link to="/demandeAccepte">
                                <button className="sub-navbar-link">
                                    <VscGitPullRequestNewChanges />
                                    <span className="tooltip">Rédiger document</span>
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
 
export default SubNavbarDoc;
 