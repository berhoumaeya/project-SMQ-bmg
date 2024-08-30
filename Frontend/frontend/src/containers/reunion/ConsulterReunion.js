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
    created_by: 'Michael Brown',
    created_at: '2024-08-01T12:00:00Z',
    header: 'Project Kickoff',
    date: '2024-09-01',
    lieu: 'Conference Room A',
    demandeur: 'John Doe',
    participants: ['John Doe', 'Jane Smith'],
    ordre_du_jour: 'Discuter des jalons et des livrables du projet.',
    decisions_prises: ['Fixer des délais pour chaque jalon', 'Assigner des chefs d\'équipe'],
    commentaire: 'Cette réunion a été très productive. Nous avons pu examiner les progrès et planifier les prochaines étapes.'
  },
  {
    id: 2,
    created_by: 'Michael Christopher',
    created_at: '2024-08-05T12:00:00Z',
    header: 'Sprint Review',
    date: '2024-09-10',
    lieu: 'Conference Room B',
    demandeur: 'Paul Brown',
    participants: ['Paul Brown', 'Emily Davis'],
    ordre_du_jour: 'Évaluer les progrès et planifier le prochain sprint',
    decisions_prises: ['Approuver les tâches terminées', 'Planifier les objectifs du prochain sprint'],
    commentaire: 'Cette réunion a été très productive. Nous avons pu examiner les progrès et planifier les prochaines étapes..'
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
                <div className="card-header-">Commentaire</div>
                <div className="card-body text-center">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <strong>Commentaire : </strong>
                  </li>
                  <br />
                  <div className="small font-italic text-muted mb-4">
                    {meet?.commentaire || "Aucun commentaire disponible"}
                  </div>
                </div>
              </div>

              <br /><br />
              <div className="card mb-4">
                <div className="card-header-">Historique</div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    {meet ? (
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                          <strong>Date de création</strong><br />
                          <small>{meet.created_at} - {meet.created_by}</small>
                        </div>
                      </li>
                    ) : (
                      <div>Chargement...</div>
                    )}
                  </ul>
                </div>
              </div>
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
                      <p className="document-card-text"><strong>Participants:</strong> {meet.participants.join(', ')}</p>
                      <p className="document-card-text"><strong>Ordre du jour:</strong> {meet.ordre_du_jour}</p>
                      <p className="document-card-text"><strong>Décisions prises:</strong> {meet.decisions_prises.length > 0 ? meet.decisions_prises.join(', ') : 'Pas de décision'}</p>

                      <div className="d-flex justify-content-end mt-3">
                        <Link to="/allreunion" className="btn btn-secondary me-2">
                          <IoMdArrowRoundBack /> Retour
                        </Link>
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
