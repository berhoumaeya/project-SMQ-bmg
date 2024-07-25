import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Navigate, Link } from 'react-router-dom';



const UpdateEmploye = () => {
  const { id } = useParams();
  const [nom, setnom] = useState('');
  const [prenom, setprenom] = useState('');
  const [email, setemail] = useState('');
  const [username, setusername] = useState('');
  const [is_user, setis_user] = useState(false);
  const [pieces_jointes, setPiecesJointes] = useState(null);
  const [piecesJointesUrl, setPiecesJointesUrl] = useState('');
  const [updateReussi, setupdateReussi] = useState(false);

  useEffect(() => {
    const fetchemploye = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/RH/employe/${id}/`);
        const data = response.data
        setnom(data.nom);
        setprenom(data.prenom)
        setemail(data.email)
        setusername(data.username)
        setis_user(data.is_user)
        if (data.pieces_jointes) {
          setPiecesJointesUrl(`${data.pieces_jointes}`);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données de employe:', error);
      }
    };

    fetchemploye();
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
    if (pieces_jointes) {
      formData.append('pieces_jointes', pieces_jointes);
    }

    const headers = {
      'Accept': '*/*',
      'Content-Type': 'multipart/form-data',
      'X-CSRFToken': Cookies.get('csrftoken')
    };
    axios.put(`${process.env.REACT_APP_API_URL}/RH/update_employe/${id}/`, formData, { headers: headers })
      .then(response => {
        console.log('employe modifié avec succès :', response.data);
        setnom('');
        setprenom('');
        setemail('');
        setusername('');
        setis_user(false);
        setPiecesJointes(null);

        setupdateReussi(true)
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour de employe:', error);
      })
  };
  if (updateReussi) {
    return <Navigate to={`/employe/${id}`} />;
  }

  return (
    <main style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div class="container ajout-form">
        <div class="contact-image ">
          <img src="/images/change.png" alt="rocket_contact" />
          <div class="button-container">
            <Link to={`/employe/${id}`}>
              <button className="retour">Retour au tableau de bord</button>
            </Link>
            <button className="button-add" type="submit">Modifier employe</button>
          </div>
        </div>


        <form onSubmit={handleSubmit} className="row">
          <div class="col-md-6">
            <div className="form-label">
              <label className="form-label">Nom employe :</label>
              <input type="text" className="form-control" placeholder='Nom du employe*' name="nom" value={nom} onChange={(e) => setnom(e.target.value)} />
            </div>
            <div className="form-label">
              <label className="form-label">Prénom de employe :</label>
              <input type="text" className="form-control" placeholder='Prénom du employe*' name="prenom" value={prenom} onChange={(e) => setprenom(e.target.value)} />
            </div>
            <div className="form-label">
              <label className="form-label">Nom d'utilisateur employe :</label>
              <input type="text" className="form-control" placeholder='Nom de utilisateur du employe*' name="username" value={username} onChange={(e) => setusername(e.target.value)} />
            </div>
          </div>
          <div class="col-md-6">
            <div className="form-label">
              <label className="form-label">Email de employe :</label>
              <input type="email" className="form-control" placeholder='Email de employe' name="email" value={email} onChange={(e) => setemail(e.target.value)} />
            </div>
            <div className="form-label">
              <div className="checkbox-container">
                <label className="form-label">Est un utilisateur : </label>
                <input type="checkbox" name="is_user" checked={is_user} onChange={e => setis_user(e.target.checked)} />
              </div>
            </div>
            <div className="form-label">
              <label className="form-label">Pièces jointes :</label>
              {piecesJointesUrl ? (
                <div >
                  <input
                    type="text"
                    className="form-control"
                    value={piecesJointesUrl}
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

export default UpdateEmploye;
