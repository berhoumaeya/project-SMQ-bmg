import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
import Cookies from 'js-cookie';
import { Navigate , Link } from 'react-router-dom';


const UpdateResponsable = () => {
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
    const fetchparticipant = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/RH/responsable_formation/${id}/`);
        const data = response.data
        setnom(data.nom);
        setprenom(data.prenom)
        setemail(data.email)
        setusername(data.username)
        setis_user(data.is_user)
        if (data.pieces_jointes){
          setPiecesJointesUrl(`${data.pieces_jointes}`);
         }
      } catch (error) {
        console.error('Erreur lors de la récupération des données de responsable:', error);
      }
    };

    fetchparticipant();

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
       axios.put(`${process.env.REACT_APP_API_URL}/RH/update_responsable_formation/${id}/`, formData, {headers: headers })
      .then(response => {
        console.log('participant modifié avec succès :', response.data);
        setnom('');
        setprenom('');
        setemail('');
        setusername('');
        setis_user(false);
        setPiecesJointes(null);

        setupdateReussi(true)
      })
    .catch (error =>  {
      console.error('Erreur lors de la mise à jour de participant:', error);
    })
  };
  if(updateReussi){
    return <Navigate to={`/responsable/${id}`} />;
  }

  return (
    <div className="form-container">
      <div className="form-card">
        <h3>Modifier un Participant</h3>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Nom Participant :</label>
            <input type="text" name="nom" value={nom} onChange={(e) => setnom(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Prénom de Participant :</label>
            <input type="text" name="prenom" value={prenom} onChange={(e) => setprenom(e.target.value)}/>
          </div>
          <div className="form-group">
            <label>Nom d'utilisateur Participant :</label>
            <input type="text" name="username" value={username} onChange={(e) => setusername(e.target.value)}/>
          </div>
          <div className="form-group">
            <label>Email de Participant :</label>
            <input type="email" name="email" value={email} onChange={(e) => setemail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Est un utilisateur :</label>
            <input type="checkbox" name="is_user" checked={is_user} onChange={e => setis_user(e.target.checked)}  />
          </div>
          <div className="form-group">
    <label>Pièces jointes :</label>
    {piecesJointesUrl ? (
        <div>
            <input 
                type="text" 
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
          <button className="btn btn-primary" type="submit">Modifier responsable</button>
          <Link to={`/responsable/${id}`}>
      <button>Retour</button>
    </Link>
        </form>
      </div>
    </div>
  );
};

export default UpdateResponsable;
