import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom'; 
import axios from 'axios';
import Cookies from 'js-cookie';
import "../Detail.css"

const ParticipantDetail = () => {
  const { id } = useParams();
  const [participant, setFormation] = useState(null);
  const [deleteReussi, setdeleteReussi] = useState(false);

  useEffect(() => {
    const fetchFormation = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/RH/participant/${id}/`);
        setFormation(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de participant:', error);
      }
    };

    fetchFormation();
  }, [id]);
  const handleDelete = async () => {
    const headers = {
      'Accept': '*/*',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    };
    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/RH/delete_participant/${id}/`,{headers:headers});
        setdeleteReussi(true)
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'employé:', error);
    }
};
if (deleteReussi){
  return <Navigate to="/Dashboardemploye"/>
}
    return (
        <div>
            {participant ? (
                <div className="card" >
                    <div className="card-body">
                        <p><strong>ID :</strong> {participant.id}</p>
                        <p><strong>Nom participant :</strong> {participant.nom}</p>
                        <p><strong>Prenom participant :</strong> {participant.prenom}</p>
                        <p><strong>Nom d'utilisateur participant  :</strong> {participant.username}</p>
                        <p><strong>Formation concernée participant  :</strong> {participant.formation_concerne}</p>
                        <p><strong>Email de participant :</strong> {participant.email}</p>
                        <p><strong>Est un utilisateur :</strong> {participant.is_user ? 'Oui' : 'Non'}</p>
                        <p><strong>Date de création :</strong> {participant.created_at}</p>
                        <p><strong>Créé par :</strong> {participant.created_by}</p>
                        <p><strong>Modifié par :</strong> {participant.updated_by}</p>
                        <p><strong>Date de modification :</strong> {participant.updated_at}</p>
                    </div>
                    <br />
                    <a href="/Dashboardparticipant"><button className="btn-gray">Retour</button></a>&nbsp;
                    <Link to={`/update-participant/${participant.id}`}><button className="btn-blue">Modifier</button></Link>&nbsp;
                    <button className="btn btn-danger" onClick={handleDelete}>Supprimer</button>
                </div>
            ):(
                <p>chargement ... </p>
            )}
        </div>
    );
};

export default ParticipantDetail;
