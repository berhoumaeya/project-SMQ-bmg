import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../fiche/FicheForm.css'
import { Navigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

function ParticipantForm() {
  const [employes, setEmployes] = useState([]);
  const [nom, setNom] = useState('');
  const [username, setUsername] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [is_user, setIs_user] = useState(false);
  const [employeId, setEmployeId] = useState('');
  const [ajoutReussi, setAjoutReussi] = useState(false);
  const [pieces_jointes, setPiecesJointes] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_employe/`)
      .then(response => {
        setEmployes(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des employés :', error);
      });
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setPiecesJointes(selectedFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('prenom', prenom);
    formData.append('email', email);
    formData.append('username', username);
    formData.append('is_user', is_user ? 'True' : 'False');
    formData.append('employe', employeId);

    if (pieces_jointes) {
      formData.append('pieces_jointes', pieces_jointes);
    }

    const headers = {
      'Accept': '*/*',
      'Content-Type': 'multipart/form-data',
      'X-CSRFToken': Cookies.get('csrftoken')
    };

    axios.post(`${process.env.REACT_APP_API_URL}/RH/create_participant/`, formData, { headers: headers })
      .then(response => {
        console.log('Participant ajouté avec succès :', response.data);
        setNom('');
        setPrenom('');
        setEmail('');
        setUsername('');
        setEmployeId('');
        setIs_user(false);
        setAjoutReussi(true);
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout du participant :', error);
      });
  };

  if (ajoutReussi) {
    return <Navigate to="/Dashboardparticipant" />;
  }

  return (
    <main style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div class="container ajout-form">
        <div class="contact-image ">
          <img src="/images/add.png" alt="rocket_contact" />
          <div class="button-container">
            <Link to="/Dashboardparticipant">
              <button className="retour">Retour au tableau de bord</button>
            </Link>   
            <button className="button-add" type="submit">Ajouter un participant</button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="row">
          <div class="col-md-6">
            <div className="form-label">
              <label className="form-label">
                Nom :
              </label>
              <input type="text" className="form-control" placeholder='Nom*' name="nom" value={nom} onChange={(e) => setNom(e.target.value)} />
            </div>
            <div className="form-label">
              <label className="form-label">Prénom :</label>
              <input type="text" className="form-control" placeholder='Prénom*' name="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
            </div>
            <div className="form-label">
              <label className="form-label">Email :</label>
              <input type="email" className="form-control" placeholder='Email*' name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
           
          </div>
          <div class="col-md-6">
            <div className="form-label">
              <label className="form-label">Nom d'utilisateur :</label>
              <input type="text" className="form-control" placeholder='Nom utilisateur*' name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="form-label">
              <label className="form-label">
                Employé :
              </label>
              <select className="form-control" value={employeId} onChange={(e) => setEmployeId(e.target.value)}>
                <option value="">Sélectionner...</option>
                {employes.map(employe => (
                  <option key={employe.id} value={employe.id}>{employe.nom}</option>
                ))}
              </select>
            </div>
            <div className="form-label">
              <label className="form-label">Pièces jointes :</label>
              <input type="file" className="form-control" onChange={handleFileChange} />
            </div>
            <div className="form-label">
            <div className="checkbox-container">
              <label className="form-label">Est un utilisateur : </label>
              <input type="checkbox" name="is_user" checked={is_user} onChange={e => setIs_user(e.target.checked)} />
            </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

export default ParticipantForm;
