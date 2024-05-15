import React, { useState } from 'react';
import axios from 'axios';
import '../formation/FormationForm.css';
import { Navigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

function AddPost() {
  const [title, setTitle] = useState('');
  const [position, setPosition] = useState('');
  const [main_mission, setMain_mission] = useState('');
  const [required_skills, setRequired_skills] = useState('');
  const [main_activity, setMain_activity] = useState('');
  const [ajoutReussi, setAjoutReussi] = useState(false);
  const [pieces_jointes, setPiecesJointes] = useState(null);


  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setPiecesJointes(selectedFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
        console.log('position ajouté avec succès :', response.data);
        setTitle('');
        setPosition('');
        setMain_mission('');
        setRequired_skills('');
        setMain_activity('');

        setAjoutReussi(true);
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout du position :', error);
      });
  };

  if (ajoutReussi) {
    return <Navigate to="/Dashboardposition" />;
  }

  return (
    <div className="form-container">
      <div className="form-card">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>
              title :
              <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
          </div>
          <div className="form-group">
            <label>
              Position :
              <input type="text" name="position" value={position} onChange={(e) => setPosition(e.target.value)} />
            </label>
          </div>
          <div className="form-group">
            <label>
              Mission principale :
              <input type="text" name="main_mission" value={main_mission} onChange={(e) => setMain_mission(e.target.value)} />
            </label>
          </div>
          <div className="form-group">
            <label>
              Competences requis :
              <input type="text" name="required_skills" value={required_skills} onChange={(e) => setRequired_skills(e.target.value)} />
            </label>
          </div>
          <div className="form-group">
            <label>
              Activité principale :
              <input type="text" name="main_activity" value={main_activity} onChange={(e) => setMain_activity(e.target.value)} />
            </label>
          </div>
          <div className="form-group">
            <label>Pièces jointes :</label>
            <input type="file" onChange={handleFileChange} />
          </div>
          <button className="btn btn-success mt-3" type="submit">Ajouter position</button>
          <Link to="/Dashboardposition">
            <button className="btn btn-gray mt-3">Retour au tableau de bord</button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default AddPost;
