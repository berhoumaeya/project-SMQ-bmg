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
    <main style={{ backgroundColor: '#5585b5', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div class="container ajout-form">
        <div class="contact-image ">
          <img src="/images/add.png" alt="rocket_contact" />
          <div class="button-container">
            <Link to="/Dashboardposition">
              <button className="retour">Retour au tableau de bord</button>
            </Link>   <button className="button-add" type="submit">Ajouter position</button>

          </div>
        </div>

        <form onSubmit={handleSubmit} className="row">

          <div class="col-md-6">
            <div className="form-label">
              <label className="form-label">
                Titre :</label>
              <input type="text" className="form-control" placeholder='Titre*' name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="form-label">
              <label className="form-label">
                Position :</label>
              <input type="text" className="form-control" placeholder='Position*' name="position" value={position} onChange={(e) => setPosition(e.target.value)} />

            </div>
            <div className="form-label">
              <label className="form-label">
                Mission principale :</label>
              <input type="text" className="form-control" placeholder='Mission principale*' name="main_mission" value={main_mission} onChange={(e) => setMain_mission(e.target.value)} />
            </div>
          </div>
          <div class="col-md-6">
            <div className="form-label">
              <label className="form-label">
                Compétences requis :</label>
              <input type="text" className="form-control" placeholder='Compétences requis*' name="required_skills" value={required_skills} onChange={(e) => setRequired_skills(e.target.value)} />
            </div>
            <div className="form-label">
              <label className="form-label">
                Activité principale :</label>
              <input type="text" className="form-control" placeholder='Activité principale*' name="main_activity" value={main_activity} onChange={(e) => setMain_activity(e.target.value)} />
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
