import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams, Link, Navigate } from 'react-router-dom';
import { GrEdit, GrTrash } from 'react-icons/gr';
import { IoMdArrowRoundBack } from 'react-icons/io';
import '../Detail.css';

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
  const [piecesJointes, setPiecesJointes] = useState(null);
  const [ajoutReussi, setAjoutReussi] = useState(false);

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
    setDeleteReussi(true);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setPiecesJointes(selectedFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('intitule_formation', formation.intitule_formation);
    formData.append('type_formation', formation.type_formation);
    formData.append('organisme_formation', formation.organisme_formation);
    formData.append('theme_formation', formation.theme_formation);
    formData.append('date_debut_formation', formation.date_debut_formation);
    formData.append('date_fin_formation', formation.date_fin_formation);
    formData.append('responsable_validation', formation.responsable_validation);
    formation.participants.forEach(id => {
      formData.append('participants', id);
    });
    formation.responsable_formation.forEach(id => {
      formData.append('responsable_formation', id);
    });
    formData.append('parametre_validation', formation.parametre_validation);

    if (piecesJointes) {
      formData.append('pieces_jointes', piecesJointes);
    }

    const headers = {
      'Accept': '*/*',
      'Content-Type': 'multipart/form-data',
      'X-CSRFToken': Cookies.get('csrftoken')
    };

    axios.put(`${process.env.REACT_APP_API_URL}/RH/update_fiche_formation/${id}/`, formData, { headers: headers })
      .then(response => {
        console.log('Formation updated successfully:', response.data);
        setAjoutReussi(true);
      })
      .catch(error => {
        console.error('Error updating formation:', error);
      });
  };

  if (deleteReussi) {
    return <Navigate to="/Dashboardformation" />;
  }

  if (ajoutReussi) {
    return <Navigate to={`/formation/${id}`} />;
  }

  return (
    <main style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="container-xl px-4 mt-4">
        <div className="row">
          <div className="col-xl-4">
            <div className="card mb-4 mb-xl-0">
              <div className="card-header-">Profile Picture</div>
              <div className="card-body text-center">
                <div className="img-container mb-2">
                  <img
                    className="img-account-profile rounded-circle"
                    src={piecesJointes ? URL.createObjectURL(piecesJointes) : "http://bootdey.com/img/Content/avatar/avatar1.png"}
                    alt="Profile"
                    style={{ width: '150px', height: '150px' }}
                  />
                </div>
                <div className="small font-italic text-muted mb-4">
                  JPG or PNG no larger than 5 MB
                </div>
                <input
                  type="file"
                  className="form-control mb-2"
                  onChange={handleFileChange}
                  accept=".jpg, .png"
                />
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="card mb-4">
              <div className="card-header-">Formation Details</div>
              <div className="card-body">
                {formation ? (
                  <form className="row" onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="small mb-1">Intitulé de la formation</label>
                      <input className="form-control" type="text" value={formation.intitule_formation} readOnly />
                    </div>
                    <div className="mb-3">
                      <label className="small mb-1">Type de formation</label>
                      <input className="form-control" type="text" value={formation.type_formation} readOnly />
                    </div>
                    <div className="mb-3">
                      <label className="small mb-1">Organisme de formation</label>
                      <input className="form-control" type="text" value={formation.organisme_formation} readOnly />
                    </div>
                    <div className="mb-3">
                      <label className="small mb-1">Thème de formation</label>
                      <input className="form-control" type="text" value={formation.theme_formation} readOnly />
                    </div>
                    <div className="row gx-3 mb-3">
                      <div className="col-md-6">
                        <label className="small mb-1">Date de début de la formation</label>
                        <input className="form-control" type="text" value={formation.date_debut_formation} readOnly />
                      </div>
                      <div className="col-md-6">
                        <label className="small mb-1">Date de fin de la formation</label>
                        <input className="form-control" type="text" value={formation.date_fin_formation} readOnly />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="small mb-1">Responsable de la validation</label>
                      <input className="form-control" type="text" value={responsableValidationName} readOnly />
                    </div>
                    <div className="mb-3">
                      <label className="small mb-1">Responsable de la Formation</label>
                      <input className="form-control" type="text" value={responsableFormationName.join(', ')} readOnly />
                    </div>
                    <div className="row gx-3 mb-3">
                      <div className="col-md-6">
                        <label className="small mb-1">Date de création</label>
                        <input className="form-control" type="text" value={formation.created_at} readOnly />
                      </div>
                      <div className="col-md-6">
                        <label className="small mb-1">Créé par</label>
                        <input className="form-control" type="text" value={formation.created_by} readOnly />
                      </div>
                    </div>
                    <div className="row gx-3 mb-3">
                      <div className="col-md-6">
                        <label className="small mb-1">Modifié par</label>
                        <input className="form-control" type="text" value={formation.updated_by} readOnly />
                      </div>
                      <div className="col-md-6">
                        <label className="small mb-1">Date de modification</label>
                        <input className="form-control" type="text" value={formation.updated_at} readOnly />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="small mb-1">Participants</label>
                      <input className="form-control" type="text" value={participantsNames.join(', ')} readOnly />
                    </div>
                    <div className="mb-3">
                      <label className="small mb-1">Paramètre de validation</label>
                      <input className="form-control" type="text" value={formation.parametre_validation} readOnly />
                    </div>
                    <div className="mb-3">
                      <label className="small mb-1">Date de clôture de la formation</label>
                      <input className="form-control" type="text" value={formation.date_cloture_formation} readOnly />
                    </div>
                    <div className="d-flex justify-content-end mt-3">
                      <Link to={`/Dashboardformation`} className="btn btn-secondary me-2">
                        <IoMdArrowRoundBack /> Retour
                      </Link>
                      <button type="submit" className="btn btn-primary me-2">
                        <GrEdit /> Modifier
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleDelete}
                      >
                        <GrTrash /> Supprimer
                      </button>
                    </div>
                  </form>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FormationDetail;