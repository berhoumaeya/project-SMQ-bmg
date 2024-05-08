import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom'; 
import axios from 'axios';
import Cookies from 'js-cookie';
import "../Detail.css"

const ChaudDetail = () => {
  const { id } = useParams();
  const [fiche_employe, setFormation] = useState(null);
  const [deleteReussi, setdeleteReussi] = useState(false);

  useEffect(() => {
    const fetchFormation = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/RH/evaluation_chaud/${id}/`);
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
        await axios.delete(`${process.env.REACT_APP_API_URL}/RH/delete_fiche_employe/${id}/`,{headers:headers});
        setdeleteReussi(true)
    } catch (error) {
        console.error('Erreur lors de la suppression de la fiche:', error);
    }
};
if (deleteReussi){
  return <Navigate to="/Dashboardfiche"/>
}
    return (    
        <div>
            {fiche_employe ? (
                <div className="card" >
                    <div className="card-body">
                        <p><strong>ID :</strong> {fiche_employe.id}</p>
                        <p><strong>name evaluation :</strong> {fiche_employe.name}</p>
                        <p><strong>Formation :</strong> {fiche_employe.formation}</p>
                        <p><strong>Date de réalisation :</strong> {fiche_employe.date_realisation}</p>
                        <p><strong>criteres   :</strong> {fiche_employe.criteres}</p>
                        <p><strong>coefficients  :</strong> {fiche_employe.coefficients}</p>
                        <p><strong>pieces_jointes  :</strong> {fiche_employe.pieces_jointes}</p>
                        <p><strong>participant :</strong> {fiche_employe.participant}</p>
                        <p><strong>Modifié par :</strong> {fiche_employe.updated_by}</p>
                        <p><strong>Modifié à :</strong> {fiche_employe.updated_at}</p>
                        <p><strong>crée par  :</strong> {fiche_employe.created_by}</p>
                        <p><strong>crée à :</strong> {fiche_employe.created_at}</p>

                    </div>
                    <br />
                    <a href="/Dashboardfiche"><button className="btn-gray">Retour</button></a>&nbsp;
                    <Link to={`/update-fiche/${fiche_employe.id}`}><button className="btn-blue">Modifier</button></Link>&nbsp;
                    <button className="btn btn-danger" onClick={handleDelete}>Supprimer</button>
                </div>
            ):(
                <p>chargement ... </p>
            )}
        </div>
    );
};

export default ChaudDetail;
