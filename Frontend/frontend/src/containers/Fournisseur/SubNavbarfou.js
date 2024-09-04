import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import './SubNavbarfou.css';
import { IoIosArrowBack, IoIosAddCircleOutline } from "react-icons/io";
import { FaFile, FaList, FaTh } from 'react-icons/fa';

const SubNavbarfou = ({ viewMode, setViewMode }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [lastPage, setLastPage] = useState('/'); 

    useEffect(() => {
        if (location.pathname !== lastPage) {
            setLastPage(location.pathname);
        }
    }, [location.pathname]);



    const getFormLink = () => {
        if (location.pathname.startsWith('/AllEvaluationFournisseur')) {
            return '/CréerEvaluationFournisseur/:static';
        } else if (location.pathname.startsWith('/AllReclamationFournisseur')) {
            return '/CréerRéclamationFournisseur';
        } else {
            return '/CréerFournisseur'; 
        }
    };

 

    const showRetourButton = location.pathname.startsWith('/ajouter') || location.pathname.startsWith('/update');
    const formLink = getFormLink();

    return (
        <div className="sub-navbar-container">
            <div className="sub-navbar-links">
               
                    <>
                        <Link to='/ConsulterFournisseur/:id'>
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
                
            </div>
        </div>
    );
};

export default SubNavbarfou;
