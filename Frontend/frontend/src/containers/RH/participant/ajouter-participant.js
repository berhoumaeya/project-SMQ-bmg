import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../formation/FormationForm.css';
import { Navigate ,Link} from 'react-router-dom';
import Cookies from 'js-cookie';

function ParticipantForm() {
  const [employes, setEmployes] = useState([]);
  const [formations, setFormations] = useState([]);
  const [nom, setNom] = useState('');
  const [username, setUsername] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [is_user, setIs_user] = useState(false); 
  const [employeId, setEmployeId] = useState('');
  const [formationId, setFormationId] = useState('');
  const [ajoutReussi, setAjoutReussi] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_employe/`)
      .then(response => {
        setEmployes(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des employés :', error);
      });

    axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_formation/`)
      .then(response => {
        setFormations(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des formations :', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const participantData = {
      nom: nom,
      prenom: prenom,
      email: email,
      username : username,
      is_user: is_user,
      employe: employeId,
      formation_concerne: formationId
    };

    const headers = {
      'Accept':'*/*',
      "Content-Type":'application/json',
      'X-CSRFToken': Cookies.get('csrftoken')
    };

    axios.post(`${process.env.REACT_APP_API_URL}/RH/create_participant/`, participantData, { headers: headers })
      .then(response => {
        console.log('Participant ajouté avec succès :', response.data);
        setNom('');
        setPrenom('');
        setEmail('');
        setUsername('');
        setEmployeId('');
        setFormationId('');
        setIs_user(false);
        setAjoutReussi(true);
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout du participant :', error);
      });
  };
  if(ajoutReussi){
    return <Navigate to="/Dashboardparticipant" />;
}

  return (
    <div className="form-container">
      <div className="form-card">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>
              Nom :
              <input type="text" name="nom" value={nom} onChange={(e) => setNom(e.target.value)} />
            </label>
          </div>
          <div className="form-group">
            <label>
              Prénom :
              <input type="text" name="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
            </label>
          </div>
          <div className="form-group">
            <label>
              Email :
              <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
          </div>
          <div className="form-group">
            <label>
              Nom d'utilisateur :
              <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
          </div>
          <label>
            Employé :
            <select value={employeId} onChange={(e) => setEmployeId(e.target.value)}>
              <option value="">Sélectionner...</option>
              {employes.map(employe => (
                <option key={employe.id} value={employe.id}>{employe.nom}</option>
              ))}
            </select>
          </label>
          <label>
            Formation concernée :
            <select value={formationId} onChange={(e) => setFormationId(e.target.value)}>
              <option value="">Sélectionner...</option>
              {formations.map(formation => (
                <option key={formation.id} value={formation.id}>{formation.intitule_formation}</option>
              ))}
            </select>
          </label>
          <div className="form-group">
            <label>Est un utilisateur :</label>
            <input type="checkbox" name="uti" checked={is_user} onChange={e => setIs_user(e.target.checked)} />
          </div>
          <button className="btn btn-success mt-3" type="submit">Ajouter Participant</button>
                    <Link to="/Dashboardparticipant">
                        <button className="btn btn-gray mt-3">Retour au tableau de bord</button>
                    </Link>
        </form>
      </div>
    </div>
  );
}

export default ParticipantForm;
