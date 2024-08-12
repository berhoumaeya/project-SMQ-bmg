import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Navigate, Link } from 'react-router-dom';


const UpdateParticipant = () => {
  const { id } = useParams();
  const [nom, setnom] = useState('');
  const [prenom, setprenom] = useState('');
  const [email, setemail] = useState('');
  const [username, setusername] = useState('');
  const [is_user, setis_user] = useState(false);
  const [pieces_jointes, setPiecesJointes] = useState(null);
  const [employes, setEmployes] = useState([]);
  const [piecesJointesUrl, setPiecesJointesUrl] = useState('');
  const [employe_concerneID, setEmploye] = useState('');
  const [updateReussi, setupdateReussi] = useState(false);

  useEffect(() => {
    const fetchparticipant = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/RH/participant/${id}/`);
        const data = response.data
        setnom(data.nom);
        setprenom(data.prenom)
        setemail(data.email)
        setusername(data.username)
        setis_user(data.is_user)
        setEmploye(data.employe)
        if (data.pieces_jointes) {
          setPiecesJointesUrl(`${data.pieces_jointes}`);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données de participant:', error);
      }
    };

    fetchparticipant();

    axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_employe/`)
      .then(response => {
        setEmployes(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des employés :', error);
      });
  }, [id]);

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
    formData.append('employe_concerne', employe_concerneID);
    if (pieces_jointes) {
      formData.append('pieces_jointes', pieces_jointes);
    }

    const headers = {
      'Accept': '*/*',
      'Content-Type': 'multipart/form-data',
      'X-CSRFToken': Cookies.get('csrftoken')
    };
    axios.put(`${process.env.REACT_APP_API_URL}/RH/update_participant/${id}/`, formData, { headers: headers })
      .then(response => {
        console.log('participant modifié avec succès :', response.data);
        setnom('');
        setprenom('');
        setemail('');
        setusername('');
        setis_user(false);
        setEmploye('');
        setPiecesJointes(null);

        setupdateReussi(true)
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour de participant:', error);
      })
  };
  if (updateReussi) {
    return <Navigate to={`/participant/${id}`} />;
  }

  return (
    <main style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div class="container ajout-form">
        <div class="contact-image ">
          <img src="/images/change.png" alt="rocket_contact" />
          <div class="button-container">
          <Link to={`/participant/${id}`}>
              <button className="retour">Retour au tableau de bord</button>
            </Link>   <button className="button-add" type="submit">Modifier un participant</button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="row">
        <div class="col-md-6">
          <div className="form-label">
            <label className="form-label">Nom Participant :</label>
            <input type="text" name="nom" className="form-control" placeholder='Nom*' value={nom} onChange={(e) => setnom(e.target.value)} />
          </div>
          <div className="form-label">
            <label className="form-label">Prénom de Participant :</label>
            <input type="text" name="prenom" className="form-control" placeholder='Prénom*' value={prenom} onChange={(e) => setprenom(e.target.value)} />
          </div>
          <div className="form-label">
            <label className="form-label">Nom d'utilisateur Participant :</label>
            <input type="text" className="form-control" placeholder='Nom utilisateur*'name="username" value={username} onChange={(e) => setusername(e.target.value)} />
          </div>
          </div>
          
          <div class="col-md-6">
          <label className="form-label">Employé concerné :</label>
          <select className="form-control"  value={employe_concerneID} onChange={(e) => setEmploye(e.target.value)}>
            <option value="">Sélectionner...</option>
            {employes.map(employe => (
              <option key={employe.id} value={employe.id}>{employe.username}</option>
            ))}
          </select>
         
          <div className="form-label">
            <label className="form-label">Email de Participant :</label>
            <input type="email" className="form-control" placeholder='Email*' name="email" value={email} onChange={(e) => setemail(e.target.value)} />
          </div>
          <div className="form-label">
            <label className="form-label">Est un utilisateur :</label>
            <input type="checkbox" name="is_user" checked={is_user} onChange={e => setis_user(e.target.checked)} />
          </div>
          <div className="form-label">
            <label className="form-label">Pièces jointes :</label>
            {piecesJointesUrl ? (
              <div>
                <input
                  type="text"
                  value={piecesJointesUrl}
                  className="form-control" 
                  onChange={(e) => setPiecesJointesUrl(e.target.value)}
                />
                <a href={piecesJointesUrl} target="_blank" rel="noopener noreferrer">Consulter</a>
              </div>
            ) : (
              <input
                type="file"
                onChange={handleFileChange}
              />
            )}
          </div>
         </div>
        </form>
      </div>
    </main>
  );
};

export default UpdateParticipant;
