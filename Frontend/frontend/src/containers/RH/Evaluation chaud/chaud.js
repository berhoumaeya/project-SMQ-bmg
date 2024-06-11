import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom'; 
import axios from 'axios';
import Cookies from 'js-cookie';
import "../Detail.css"

const ChaudDetail = () => {
  const { id } = useParams();
  const [chaud, setFormation] = useState(null);
  const [formation, setForm] = useState('');
  const [deleteReussi, setdeleteReussi] = useState(false);

  useEffect(() => {
    const fetchFormation = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/RH/evaluation_chaud/${id}/`);
        setFormation(response.data);

        const responseForm = await axios.get(`${process.env.REACT_APP_API_URL}/RH/formation/${response.data.formation}/`);
        setForm(responseForm.data.intitule_formation);
      } catch (error) {
        console.error('Erreur lors de la récupération des données des evaluation:', error);
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
        await axios.delete(`${process.env.REACT_APP_API_URL}/RH/delete_evaluation_chaud/${id}/`,{headers:headers});
        setdeleteReussi(true)
    } catch (error) {
        console.error('Erreur lors de la suppression de la evaluation:', error);
    }
};
if (deleteReussi){
  return <Navigate to="/Dashboardfiche"/>
}
    return (    
        <div>
            {chaud ? (
                <div className="card" >
                    <div className="card-body">
                        <p><strong>ID :</strong> {chaud.id}</p>
                        <p><strong>name evaluation :</strong> {chaud.name}</p>
                        <p><strong>Formation :</strong> {formation}</p>
                        <p><strong>Date de réalisation :</strong> {chaud.date_realisation}</p>
                        <p><strong>criteres   :</strong> {chaud.criteres}</p>
                        <p><strong>coefficients  :</strong> {chaud.coefficients}</p>
                        <p><strong>Pièces jointes :</strong> {chaud.pieces_jointes ? <a href={`${process.env.REACT_APP_API_URL}/RH/piece_jointe_chaud/${id}/`} target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>
                        <p><strong>crée par  :</strong> {chaud.created_by}</p>
                        <p><strong>crée à :</strong> {chaud.created_at}</p>

                    </div>
                    <br />
                    <a href="/DashboardEvaluationChaud"><button className="btn-gray">Retour</button></a>&nbsp;
                    <button className="btn btn-danger" onClick={handleDelete}>Supprimer</button>
                </div>
            ):(
                <p>chargement ... </p>
            )}
        </div>
    );
};

export default ChaudDetail;
