import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

function AddPost() {
  const [title, setTitle] = useState('');
  const [position, setPosition] = useState('');
  const [main_mission, setMain_mission] = useState('');
  const [required_skills, setRequired_skills] = useState('');
  const [main_activity, setMain_activity] = useState('');
  const [pieces_jointes, setPiecesJointes] = useState(null);
  const [ajoutReussi, setAjoutReussi] = useState(false);

  // State for validation errors
  const [errors, setErrors] = useState({});

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setPiecesJointes(selectedFile);
  };

  const validateForm = () => {
    const formErrors = {};
    if (!title) formErrors.title = 'Titre est requis.';
    if (!position) formErrors.position = 'Position est requise.';
    if (!main_mission) formErrors.main_mission = 'Mission principale est requise.';
    if (!required_skills) formErrors.required_skills = 'Compétences requis sont requises.';
    if (!main_activity) formErrors.main_activity = 'Activité principale est requise.';
    return formErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('position', position);
    formData.append('main_mission', main_mission);
    formData.append('required_skills', required_skills);
    formData.append('main_activity', main_activity);

    if (pieces_jointes) {
      formData.append('pieces_jointes', pieces_jointes);
    }

    const headers = {
      'Accept': '*/*',
      'Content-Type': 'multipart/form-data',
      'X-CSRFToken': Cookies.get('csrftoken')
    };

    axios.post(`${process.env.REACT_APP_API_URL}/RH/create_job_post/`, formData, { headers: headers })
      .then(response => {
        console.log('Position ajoutée avec succès :', response.data);
        setTitle('');
        setPosition('');
        setMain_mission('');
        setRequired_skills('');
        setMain_activity('');
        setPiecesJointes(null);
        setErrors({});
        setAjoutReussi(true);
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout de la position :', error);
      });
  };

  if (ajoutReussi) {
    return <Navigate to="/Dashboardposition" />;
  }

  return (
    <main style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="container ajout-form">
        <div className="contact-image">
          <img src="/images/add.png" alt="rocket_contact" />
          <div className="button-container">
            <Link to="/Dashboardposition">
              <button className="retour">Retour au tableau de bord</button>
            </Link>
            <button className="button-add" type="submit" onClick={handleSubmit}>Ajouter position</button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="row">
          <div className="col-md-6">
            <div className="form-label">
              <label className="form-label">Titre :</label>
              <input type="text" className="form-control" placeholder='Titre*' value={title} onChange={(e) => setTitle(e.target.value)} />
              {errors.title && <div className="error">{errors.title}</div>}
            </div>
            <div className="form-label">
              <label className="form-label">Position :</label>
              <input type="text" className="form-control" placeholder='Position*' value={position} onChange={(e) => setPosition(e.target.value)} />
              {errors.position && <div className="error">{errors.position}</div>}
            </div>
            <div className="form-label">
              <label className="form-label">Mission principale :</label>
              <input type="text" className="form-control" placeholder='Mission principale*' value={main_mission} onChange={(e) => setMain_mission(e.target.value)} />
              {errors.main_mission && <div className="error">{errors.main_mission}</div>}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-label">
              <label className="form-label">Compétences requis :</label>
              <input type="text" className="form-control" placeholder='Compétences requis*' value={required_skills} onChange={(e) => setRequired_skills(e.target.value)} />
              {errors.required_skills && <div className="error">{errors.required_skills}</div>}
            </div>
            <div className="form-label">
              <label className="form-label">Activité principale :</label>
              <input type="text" className="form-control" placeholder='Activité principale*' value={main_activity} onChange={(e) => setMain_activity(e.target.value)} />
              {errors.main_activity && <div className="error">{errors.main_activity}</div>}
            </div>
            <div className="form-label">
              <label className="form-label">Pièces jointes :</label>
              <input type="file" className="form-control" onChange={handleFileChange} />
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

export default AddPost;
