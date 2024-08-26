import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { GrEdit, GrTrash } from 'react-icons/gr';
import { IoMdArrowRoundBack } from 'react-icons/io';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../RH/Detail.css';
import SubNavbarAudit from '../../components/SubNavbarAudit';


const sampleMeets = [
    {
      id: 1,
      header: 'Project Kickoff',
      date: '2024-09-01',
      lieu: 'Conference Room A',
      demandeur: 'John Doe',
      participants: ['John Doe', 'Jane Smith'],
      ordre_du_jour: 'Discuss project milestones and deliverables.',
      decisions_prises: ['Set deadlines for each milestone', 'Assign team leads']
    },
    {
      id: 2,
      header: 'Sprint Review',
      date: '2024-09-10',
      lieu: 'Conference Room B',
      demandeur: 'Paul Brown',
      participants: ['Paul Brown', 'Emily Davis'],
      ordre_du_jour: 'Review progress and plan next sprint.',
      decisions_prises: ['Approve completed tasks', 'Plan next sprint goals']
    }
  ];


const Meet = () => {
  const { id } = useParams();
  const [meet, setMeet] = useState(null);
  const [deleteReussi, setDeleteReussi] = useState(false);
  const [updateReussi, setUpdateReussi] = useState(false);

  useEffect(() => {
    const fetchedMeet = sampleMeets.find(m => m.id === parseInt(id));
    setMeet(fetchedMeet);
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/RH/delete_meet/${id}/`, {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken'),
        }
      });
      setDeleteReussi(true);
    } catch (error) {
      console.error('Erreur lors de la suppression de la réunion:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle update logic here
    setUpdateReussi(true);
  };

  if (deleteReussi) {
    return <Navigate to="/DashboardMeet" />;
  }

  if (updateReussi) {
    return <Navigate to={`/meet/${id}`} />;
  }

  return (
    <>
      <SubNavbarAudit />
      <main style={{ display: 'flex', minHeight: '100vh' }}>
        <div className="container-xl px-4 mt-4">
          <div className="row">
            <div className="col-xl-4">
              <div className="card mb-4 mb-xl-0">
                <div className="card-header-">Meeting Details</div>
                <div className="card-body text-center">
                  <div className="small font-italic text-muted mb-4">
                    Meeting information
                  </div>
                </div>
              </div>
              <br />
        
            </div>
            <div className="col-xl-8">
              <div className="card mb-4">
                <div className="card-header-">Meeting Details</div>
                <div className="card-body">
                  {meet ? (
                    <div>
                      <p className="document-card-text"><strong>Entête:</strong> {meet.header}</p>
                      <p className="document-card-text"><strong>Date:</strong> {meet.date}</p>
                      <p className="document-card-text"><strong>Lieu:</strong> {meet.lieu}</p>
                      <p className="document-card-text"><strong>Demandeur:</strong> {meet.demandeur}</p>
                      <p className="document-card-text"><strong>Participants:</strong> {meet.participants && meet.participants.join(', ')}</p>
                      <p className="document-card-text"><strong>Ordre du jour:</strong> {meet.ordre_du_jour}</p>
                      <p className="document-card-text"><strong>Décisions prises:</strong> {meet.decisions_prises && meet.decisions_prises.join(', ') ? meet.decisions_prises : 'Pas de décision'}</p>

                      <div className="d-flex justify-content-end mt-3">
                        <Link to="/allreunion" className="btn btn-secondary me-2">
                          <IoMdArrowRoundBack /> Retour
                        </Link>
                        <button type="button" className="btn btn-primary me-2" onClick={handleSubmit}>
                          <GrEdit /> Modifier
                        </button>
                        <button type="button" className="btn btn-danger" onClick={handleDelete}>
                          <GrTrash /> Supprimer
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Meet;
