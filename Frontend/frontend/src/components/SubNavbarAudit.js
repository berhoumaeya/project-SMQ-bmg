import { IoIosArrowBack } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { FaList, FaTh } from "react-icons/fa";

const SubNavbarAudit  = ({ viewMode, setViewMode }) => {
    const location = useLocation();
    const showRetourButton = location.pathname.includes('/ajouter');

    const showListGridButtons = !showRetourButton; 

    return (
        <div className="sub-navbar-container">
            <div className="sub-navbar-links">

                <Link to='/Dashboard'>
                    <button className="sub-navbar-link">
                        <IoIosArrowBack />
                        <span className="tooltip">Retour</span>
                    </button>
                </Link>             
                {showListGridButtons && (
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