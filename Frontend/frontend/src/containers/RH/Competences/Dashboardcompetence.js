import React, { useState, useEffect } from 'react';
import { GrTrash } from 'react-icons/gr';
import '../Dashboard.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import SubNavbarRH from '../../../components/SubNavbarRH';
import SidebarRH from '../../../components/SidebarRH';
import { GoDotFill } from "react-icons/go";
import ReactPaginate from 'react-paginate';

const sampleCompetences = [
    {
        id: 1,
        name: 'Evaluation A',
        commentaires: 'Commentaire A',
        criteres: [
            { skills_acquis: 'Skill A', note_acquis: 4, note_requis: 5 },
            { skills_acquis: 'Skill B', note_acquis: 3, note_requis: 5 },
        ],
        total_acquis: 7,
        total_requis: 10,
        created_by: 'Admin',
        created_at: '2024-01-01',
    },
    {
        id: 2,
        name: 'Evaluation B',
        commentaires: 'Commentaire B',
        criteres: [
            { skills_acquis: 'Skill C', note_acquis: 5, note_requis: 5 },
            { skills_acquis: 'Skill D', note_acquis: 2, note_requis: 5 },
        ],
        total_acquis: 7,
        total_requis: 10,
        created_by: 'Admin',
        created_at: '2024-02-15',
    },
];

const DashboardCompetence = () => {
    const [competences, setCompetences] = useState([]);
    const [deleteReussi, setDeleteReussi] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const meetingsPerPage = 5;

    useEffect(() => {
        setCompetences(sampleCompetences);
    }, []);

    const handleDelete = async (id) => {
        const headers = {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
        };
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/RH/delete_evaluation_competence/${id}/`, { headers: headers });
            setDeleteReussi(true);
        } catch (error) {
            console.error('Error deleting document:', error);
            setError(error.message || 'Une erreur s\'est produite lors de la suppression du document.');
        }
    };
    const filteredCompetences = sampleCompetences.filter(competence =>
        competence.name.toLowerCase().includes('') ||
        competence.commentaires.toLowerCase().includes('') ||
        competence.criteres.some(critere => critere.skills_acquis.toLowerCase().includes(''))
    );
    if (error) {
        return <div>Erreur : {error}</div>;
    }
    if (deleteReussi) {
        window.location.reload();
    }
    const indexOfLastMeeting = (currentPage + 1) * meetingsPerPage;
    const indexOfFirstMeeting = indexOfLastMeeting - meetingsPerPage;
    const currentMeetings = filteredCompetences.slice(indexOfFirstMeeting, indexOfLastMeeting);
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };
    const pageCount = Math.ceil(filteredCompetences.length / meetingsPerPage);

    return (
        <>
            <SubNavbarRH />
            <main style={{ display: 'flex', minHeight: '100vh' }}>
                <SidebarRH />
                <div className="container dashboard">
                    <h3 className='formation-title'>Liste des Évaluations de Compétence</h3>
                    <div className="cards-container">
                        {currentMeetings.length > 0 ? (
                            currentMeetings.map((competence) => (
                                <div key={competence.id} className="competence-card">
                                    <span className="side-stick"></span>
                                    <h4 >
                                        {competence.name}
                                        <GoDotFill style={{ marginRight: '200px', color: '#97d8ec', fontSize: '35px' }} />
                                    </h4>
                                    <p>{competence.created_at} - {competence.created_by}</p>
                                    <p><strong>Commentaires:</strong> {competence.commentaires}</p>
                                    <div className="card-content">
                                        <p><strong>Critères:</strong></p>
                                        <ul>
                                            {competence.criteres.map((critere, index) => (
                                                <li key={index}>
                                                    {critere.skills_acquis} - Acquis: {critere.note_acquis} / Requis: {critere.note_requis}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <p><strong>Total Acquis:</strong> {competence.total_acquis}</p>
                                    <p><strong>Total Requis:</strong> {competence.total_requis}</p>
                                    <div className="card-actions">
                                        <button onClick={() => handleDelete(competence.id)} className="btn">
                                            <GrTrash />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>Aucune évaluation disponible</div>
                        )}
                        <ReactPaginate
                            previousLabel={'Précédent'}
                            nextLabel={'Suivant'}
                            breakLabel={'...'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination'}
                            pageClassName={'page-item'}
                            pageLinkClassName={'page-link'}
                            previousClassName={'page-item'}
                            previousLinkClassName={'page-link'}
                            nextClassName={'page-item'}
                            nextLinkClassName={'page-link'}
                            breakClassName={'page-item'}
                            breakLinkClassName={'page-link'}
                            activeClassName={'active'}
                        />

                    </div>
                </div>
            </main>
        </>
    );
};

export default DashboardCompetence;
