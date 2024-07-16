import React, { useState } from 'react';
import axios from 'axios';
import '../formation/FormationForm.css';
import { Navigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

function AddEmploye() {
  const [nom, setNom] = useState('');
  const [username, setUsername] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [is_user, setIs_user] = useState(false);
  const [ajoutReussi, setAjoutReussi] = useState(false);
  const [pieces_jointes, setPiecesJointes] = useState(null);


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
    if (pieces_jointes) {
      formData.append('pieces_jointes', pieces_jointes);
    }

    const headers = {
      'Accept': '*/*',
      'Content-Type': 'multipart/form-data',
      'X-CSRFToken': Cookies.get('csrftoken')
    };

    axios.post(`${process.env.REACT_APP_API_URL}/RH/create-employe/`, formData, { headers: headers })
      .then(response => {
        console.log('Employe ajouté avec succès :', response.data);
        setNom('');
        setPrenom('');
        setEmail('');
        setUsername('');
        setIs_user(false);

        setAjoutReussi(true);
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout du Employe :', error);
      });
  };

  if (ajoutReussi) {
    return <Navigate to="/Dashboardemploye" />;
  }

  return (
    <main style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
            <div className="form-group">
              <label>Est un utilisateur :</label>
              <input type="checkbox" name="is_user" checked={is_user} onChange={e => setIs_user(e.target.checked)} />
            </div>
            <div className="form-group">
              <label>Pièces jointes :</label>
              <input type="file" onChange={handleFileChange} />
            </div>
            <div className="dashboard-buttons">
              <button className="btn btn-success mt-3" type="submit">Ajouter Employe</button>
              <Link to="/Dashboardemploye">
                <button className="btn btn-gray mt-3">Retour au tableau de bord</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default AddEmploye;
