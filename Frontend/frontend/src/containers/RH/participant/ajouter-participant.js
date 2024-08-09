import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../fiche/FicheForm.css';
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

  // State for validation errors
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const formErrors = {};
    if (!nom) formErrors.nom = 'Nom est requis.';
    if (!prenom) formErrors.prenom = 'Prénom est requis.';
    if (!email) formErrors.email = 'Email est requis.';
    if (!username) formErrors.username = 'Nom d\'utilisateur est requis.';
    if (!employeId) formErrors.employeId = 'Employé est requis.';
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
        setPiecesJointes(null);
        setErrors({});
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
      <div className="container ajout-form">
        <div className="contact-image">
          <img src="/images/add.png" alt="rocket_contact" />
          <div className="button-container">
            <Link to="/Dashboardparticipant">
              <button className="retour">Retour au tableau de bord</button>
            </Link>
            <button className="button-add" type="submit" onClick={handleSubmit}>Ajouter un participant</button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="row">
          <div className="col-md-6">
            <div className="form-label">
              <label className="form-label">Nom :</label>
              <input type="text" className="form-control" placeholder='Nom*' value={nom} onChange={(e) => setNom(e.target.value)} />
              {errors.nom && <div className="error">{errors.nom}</div>}
            </div>
            <div className="form-label">
              <label className="form-label">Prénom :</label>
              <input type="text" className="form-control" placeholder='Prénom*' value={prenom} onChange={(e) => setPrenom(e.target.value)} />
              {errors.prenom && <div className="error">{errors.prenom}</div>}
            </div>
            <div className="form-label">
              <label className="form-label">Email :</label>
              <input type="email" className="form-control" placeholder='Email*' value={email} onChange={(e) => setEmail(e.target.value)} />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-label">
              <label className="form-label">Nom d'utilisateur :</label>
              <input type="text" className="form-control" placeholder='Nom utilisateur*' value={username} onChange={(e) => setUsername(e.target.value)} />
              {errors.username && <div className="error">{errors.username}</div>}
            </div>
            <div className="form-label">
              <label className="form-label">Employé :</label>
              <select className="form-control" value={employeId} onChange={(e) => setEmployeId(e.target.value)}>
                <option value="">Sélectionner...</option>
                {employes.map(employe => (
                  <option key={employe.id} value={employe.id}>{employe.nom}</option>
                ))}
              </select>
              {errors.employeId && <div className="error">{errors.employeId}</div>}
            </div>
            <div className="form-label">
              <label className="form-label">Pièces jointes :</label>
              <input type="file" className="form-control" onChange={handleFileChange} />
            </div>
            <div className="form-label">
              <div className="checkbox-container">
                <label className="form-label">Est un utilisateur : </label>
                <input type="checkbox" checked={is_user} onChange={e => setIs_user(e.target.checked)} />
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

export default ParticipantForm;
