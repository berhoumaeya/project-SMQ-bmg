import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom'; 
import axios from 'axios';
import Cookies from 'js-cookie';
import "../Detail.css"

const EmployeDetail = () => {
  const { id } = useParams();
  const [employe, setFormation] = useState(null);
  const [deleteReussi, setdeleteReussi] = useState(false);

  useEffect(() => {
    const fetchFormation = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/RH/employe/${id}/`);
        setFormation(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de employe:', error);
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
        await axios.delete(`${process.env.REACT_APP_API_URL}/RH/delete_employe/${id}/`,{headers:headers});
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
            {employe ? (
                <div className="card" >
                    <div className="card-body">
                        <p><strong>ID :</strong> {employe.id}</p>
                        <p><strong>Nom employe :</strong> {employe.nom}</p>
                        <p><strong>Prenom employe :</strong> {employe.prenom}</p>
                        <p><strong>Nom d'utilisateur Employe  :</strong> {employe.username}</p>
                        <p><strong>Email de employe :</strong> {employe.email}</p>
                        <p><strong>Est un utilisateur :</strong> {employe.is_user ? 'Oui' : 'Non'}</p>
                        <p><strong>Date de création :</strong> {employe.created_at}</p>
                        <p><strong>Créé par :</strong> {employe.created_by}</p>
                        <p><strong>Modifié par :</strong> {employe.updated_by}</p>
                        <p><strong>Date de modification :</strong> {employe.updated_at}</p>
                    </div>
                    <br />
                    <a href="/Dashboardemploye"><button className="btn-gray">Retour</button></a>&nbsp;
                    <Link to={`/update-employe/${employe.id}`}><button className="btn-blue">Modifier</button></Link>&nbsp;
                    <button className="btn btn-danger" onClick={handleDelete}>Supprimer</button>
                </div>
            ):(
                <p>chargement ... </p>
            )}
        </div>
    );
};

export default EmployeDetail;
