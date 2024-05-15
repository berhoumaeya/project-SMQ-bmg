import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom'; 
import axios from 'axios';
import Cookies from 'js-cookie';
import "../Detail.css"

const PostDetail = () => {
  const { id } = useParams();
  const [position, setFormation] = useState(null);
  const [deleteReussi, setdeleteReussi] = useState(false);

  useEffect(() => {
    const fetchFormation = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/RH/job_post/${id}/`);
        setFormation(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de position:', error);
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
        await axios.delete(`${process.env.REACT_APP_API_URL}/RH/delete_job_post/${id}/`,{headers:headers});
        setdeleteReussi(true)
    } catch (error) {
        console.error('Erreur lors de la suppression de position:', error);
    }
};
if (deleteReussi){
  return <Navigate to="/Dashboardposition"/>
}
    return (
        <div>
            {position ? (
                <div className="card" >
                    <div className="card-body">
                        <p><strong>ID :</strong> {position.id}</p>
                        <p><strong>Titre position :</strong> {position.title}</p>
                        <p><strong>Position position :</strong> {position.position}</p>
                        <p><strong>Mission principale  :</strong> {position.main_mission}</p>
                        <p><strong>Compétences requis :</strong> {position.required_skills}</p>
                        <p><strong>Activité principale :</strong> {position.main_activity}</p>
                        <p><strong>Date de création :</strong> {position.created_at}</p>
                        <p><strong>Créé par :</strong> {position.created_by}</p>
                        <p><strong>Pièces jointes :</strong> {position.pieces_jointes ? <a href={`${process.env.REACT_APP_API_URL}/RH/piece_jointe_position/${id}/`} target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>
                        <p><strong>Modifié par :</strong> {position.updated_by}</p>
                        <p><strong>Date de modification :</strong> {position.updated_at}</p>
                    </div>
                    <br />
                    <a href="/Dashboardposition"><button className="btn-gray">Retour</button></a>&nbsp;
                    <Link to={`/update-position/${position.id}`}><button className="btn-blue">Modifier</button></Link>&nbsp;
                    <button className="btn btn-danger" onClick={handleDelete}>Supprimer</button>
                </div>
            ):(
                <p>chargement ... </p>
            )}
        </div>
    );
};

export default PostDetail;
