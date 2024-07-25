import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import './details.css';

// Sample static data
const sampleFormations = [
  {
    id: 1,
    intitule_formation: 'Formation React',
    type_formation: 'Technique',
    organisme_formation: 'Organisme A',
    theme_formation: 'Développement Web',
    date_debut_formation: '2024-01-01',
    date_fin_formation: '2024-01-10',
    responsable_validation: 2,
    responsable_formation: [3, 4],
    created_at: '2024-01-01',
    created_by: 'Admin',
    updated_by: 'Admin',
    updated_at: '2024-01-10',
    participants: [5, 6],
    parametre_validation: 'Examen final',
    date_cloture: '2024-01-11',
    pieces_jointes: true
  },
  {
    id: 2,
    intitule_formation: 'Formation Node.js',
    type_formation: 'Technique',
    organisme_formation: 'Organisme B',
    theme_formation: 'Backend',
    date_debut_formation: '2024-02-01',
    date_fin_formation: '2024-02-10',
    responsable_validation: 3,
    responsable_formation: [4, 5],
    created_at: '2024-02-01',
    created_by: 'Admin',
    updated_by: 'Admin',
    updated_at: '2024-02-10',
    participants: [6, 7],
    parametre_validation: 'Projet final',
    date_cloture: '2024-02-11',
    pieces_jointes: false
  },
  {
    id: 3,
    intitule_formation: 'Formation UX/UI',
    type_formation: 'Design',
    organisme_formation: 'Organisme C',
    theme_formation: 'Frontend',
    date_debut_formation: '2024-03-01',
    date_fin_formation: '2024-03-10',
    responsable_validation: 4,
    responsable_formation: [5, 6],
    created_at: '2024-03-01',
    created_by: 'Admin',
    updated_by: 'Admin',
    updated_at: '2024-03-10',
    participants: [7, 8],
    parametre_validation: 'Portfolio final',
    date_cloture: '2024-03-11',
    pieces_jointes: true
  }
];

const sampleUsers = {
  2: 'Responsable Validation 1',
  3: 'Responsable Validation 2',
  4: 'Responsable Validation 3',
  5: 'Responsable Formation 1',
  6: 'Responsable Formation 2',
  7: 'Participant 1',
  8: 'Participant 2'
};

const FormationDetail = () => {
  const { id } = useParams();
  const [formation, setFormation] = useState(null);
  const [responsableValidationName, setResponsableValidationName] = useState('');
  const [responsableFormationName, setResponsableFormationName] = useState([]);
  const [participantsNames, setParticipantsNames] = useState([]);
  const [deleteReussi, setDeleteReussi] = useState(false);

  useEffect(() => {
    const formationDetail = sampleFormations.find(f => f.id === parseInt(id));
    if (formationDetail) {
      setFormation(formationDetail);

      const responsableValidationName = sampleUsers[formationDetail.responsable_validation];
      setResponsableValidationName(responsableValidationName);

      const responsableFormationNames = formationDetail.responsable_formation.map(responsableID => sampleUsers[responsableID]);
      setResponsableFormationName(responsableFormationNames);

      const participantsNames = formationDetail.participants.map(participantId => sampleUsers[participantId]);
      setParticipantsNames(participantsNames);
    }
  }, [id]);

  const handleDelete = () => {
    // Static delete simulation
    setDeleteReussi(true);
  };

  if (deleteReussi) {
    return <Navigate to="/Dashboardformation" />;
  }

  return (
    <div>
      {formation ? (
        <div className="card">
          <div className="card-body">
            <h3>Détails de la Formation</h3>
            <div className="detail">
              <strong>ID :</strong> {formation.id}
            </div>
            <div className="detail">
              <strong>Intitulé de la formation :</strong> {formation.intitule_formation}
            </div>
            <div className="detail">
              <strong>Type de formation :</strong> {formation.type_formation}
            </div>
            <div className="detail">
              <strong>Organisme de formation :</strong> {formation.organisme_formation}
            </div>
            <div className="detail">
              <strong>Thème de formation :</strong> {formation.theme_formation}
            </div>
            <div className="detail">
              <strong>Date de début de la formation :</strong> {formation.date_debut_formation}
            </div>
            <div className="detail">
              <strong>Date de fin de la formation :</strong> {formation.date_fin_formation}
            </div>
            <div className="detail">
              <strong>Responsable de la validation :</strong> {responsableValidationName}
            </div>
            <div className="detail">
              <strong>Responsable de la Formation :</strong> {responsableFormationName.join(', ')}
            </div>
            <div className="detail">
              <strong>Date de création :</strong> {formation.created_at}
            </div>
            <div className="detail">
              <strong>Créé par :</strong> {formation.created_by}
            </div>
            <div className="detail">
              <strong>Modifié par :</strong> {formation.updated_by}
            </div>
            <div className="detail">
              <strong>Date de modification :</strong> {formation.updated_at}
            </div>
            <div className="detail">
              <strong>Participants :</strong> {participantsNames.join(', ')}
            </div>
            <div className="detail">
              <strong>Paramètre de validation :</strong> {formation.parametre_validation}
            </div>
            <div className="detail">
              <strong>Date de clôture de la formation :</strong> {formation.date_cloture}
            </div>
            <div className="detail">
              <strong>Pièces jointes :</strong> {formation.pieces_jointes ? <a href={`/pieces_jointes/${id}/`} target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}
            </div>
          </div>
          <div className="button-group">
            <a href="/Dashboardformation" className="btn btn-secondary">Retour</a>
            <Link to={`/update-formation/${formation.id}`} className="btn btn-primary">Modifier</Link>
            <button className="btn btn-danger" onClick={handleDelete}>Supprimer</button>
          </div>
        </div>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default FormationDetail;
