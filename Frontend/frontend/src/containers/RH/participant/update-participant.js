import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';


const UpdateParticipant = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    username: '',
    is_user: false
  });
  const [updateReussi, setupdateReussi] = useState(false);

  useEffect(() => {
    const fetchEmploye = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/RH/participant/${id}/`);
        setFormData(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de employe:', error);
      }
    };

    fetchEmploye();
  }, [id]);

  const onChange = e => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/RH/update_participant/${id}/`, formData, {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken'),
        }
      });
      setupdateReussi(true)
    } catch (error) {
      console.error('Erreur lors de la mise à jour de participant:', error);
    }
  };
  if(updateReussi){
    return <Navigate to={`/employe/${id}`} />;
  }

  return (
    <div className="form-container">
      <div className="form-card">
        <h3>Modifier un Participant</h3>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Nom Participant :</label>
            <input type="text" name="nom" value={formData.nom} onChange={onChange} />
          </div>
          <div className="form-group">
            <label>Prénom de Participant :</label>
            <input type="text" name="prenom" value={formData.prenom} onChange={onChange} />
          </div>
          <div className="form-group">
            <label>Nom d'utilisateur Participant :</label>
            <input type="text" name="username" value={formData.username} onChange={onChange} />
          </div>
          <div className="form-group">
            <label>Email de Participant :</label>
            <input type="email" name="email" value={formData.email} onChange={onChange} />
          </div>
          <div className="form-group">
            <label>Est un utilisateur :</label>
            <input type="checkbox" name="is_user" checked={formData.is_user} onChange={onChange} />
          </div>
          <button className="btn btn-primary" type="submit">Modifier Participant</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateParticipant;
