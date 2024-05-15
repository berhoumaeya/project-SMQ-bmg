import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom'; 
import axios from 'axios';
import Cookies from 'js-cookie';
import "../Detail.css"

const ResponsableDetail = () => {
  const { id } = useParams();
  const [formationsnames, setformationsnames] = useState([]);
  const [responsable, setFormation] = useState(null);
  const [deleteReussi, setdeleteReussi] = useState(false);

  useEffect(() => {
    const fetchFormation = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/RH/responsable/${id}/`);
        setFormation(response.data);

        const formationsDetails = await Promise.all(response.data.formations_concernees.map(async (formationId) => {
          const formationResponse = await axios.get(`${process.env.REACT_APP_API_URL}/RH/formation/${formationId}/`);
          return formationResponse.data.intitule_formation;
      }));
      setformationsnames(formationsDetails);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de responsable:', error);
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
        await axios.delete(`${process.env.REACT_APP_API_URL}/RH/delete_responsable/${id}/`,{headers:headers});
        setdeleteReussi(true)
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'employé:', error);
    }
};
if (deleteReussi){
  return <Navigate to="/Dashboardresponsable"/>
}
    return (
        <div>
            {responsable ? (
                <div className="card" >
                    <div className="card-body">
                        <p><strong>ID :</strong> {responsable.id}</p>
                        <p><strong>Nom responsable :</strong> {responsable.nom}</p>
                        <p><strong>Prenom responsable :</strong> {responsable.prenom}</p>
                        <p><strong>Nom d'utilisateur responsable  :</strong> {responsable.username}</p>
                        <p><strong>Formation concernée responsable  :</strong>{formationsnames.join(', ')}</p>
                        <p><strong>Email de responsable :</strong> {responsable.email}</p>
                        <p><strong>Est un utilisateur :</strong> {responsable.is_user ? 'Oui' : 'Non'}</p>
                        <p><strong>Date de création :</strong> {responsable.created_at}</p>
                        <p><strong>Créé par :</strong> {responsable.created_by}</p>
                        <p><strong>Pièces jointes :</strong> {responsable.pieces_jointes ? <a href={`${process.env.REACT_APP_API_URL}/RH/piece_jointe_responsable/${id}/`} target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>
                        <p><strong>Modifié par :</strong> {responsable.updated_by}</p>
                        <p><strong>Date de modification :</strong> {responsable.updated_at}</p>
                    </div>
                    <br />
                    <a href="/Dashboardresponsable"><button className="btn-gray">Retour</button></a>&nbsp;
                    <Link to={`/update-responsable/${responsable.id}`}><button className="btn-blue">Modifier</button></Link>&nbsp;
                    <button className="btn btn-danger" onClick={handleDelete}>Supprimer</button>
                </div>
            ):(
                <p>chargement ... </p>
            )}
        </div>
    );
};

export default ResponsableDetail;
