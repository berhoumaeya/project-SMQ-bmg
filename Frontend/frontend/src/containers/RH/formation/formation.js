import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FormationDetail = () => {
  const { id } = useParams();
  const [formation, setFormation] = useState(null);

  useEffect(() => {
    const fetchFormation = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/RH/formation/${id}/`);
        setFormation(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de formation:', error);
      }
    };

    fetchFormation();
  }, [id]);
    return (
        <div>
            {formation ? (
                <div className="card" >
                    <div className="card-body">
                        <p><strong>ID :</strong> {formation.id}</p>
                        <p><strong>Intitulé de la formation :</strong> {formation.intitule_formation}</p>
                        <p><strong>Type de formation :</strong> {formation.type_formation}</p>
                        <p><strong>Organisme de formation :</strong> {formation.organisme_formation}</p>
                        <p><strong>Thème de formation :</strong> {formation.theme_formation}</p>
                        <p><strong>Date de début de la formation :</strong> {formation.date_debut_formation}</p>
                        <p><strong>Date de fin de la formation :</strong> {formation.date_fin_formation}</p>
                        <p><strong>Responsable de la validation :</strong> {formation.responsable_validation}</p>
                        <p><strong>Responsable de la Formation :</strong> {formation.responsable_formation}</p>
                        <p><strong>Date de création :</strong> {formation.created_at}</p>
                        <p><strong>Créé par :</strong> {formation.created_by}</p>
                        <p><strong>Modifié par :</strong> {formation.updated_by}</p>
                        <p><strong>Date de modification :</strong> {formation.updated_at}</p>
                        <p><strong>Participants :</strong> {formation.participants.username}</p>
                        <p><strong>Paramètre de validation :</strong> {formation.parametre_validation.username}</p>
                        <p><strong>Date de clôture de la formation :</strong> {formation.date_cloture}</p>
                        <p><strong>Pièces jointes :</strong> {formation.pieces_jointes}</p>
                    </div>
                    <br />
                    <a href="/Dashboardformation" className="btn btn-secondary">Retour</a>&nbsp;
                    <a href={"/update_formation/" + formation.id} className="btn btn-info">Modifier</a>&nbsp;
                    <a href={"/delete_formation/" + formation.id} className="btn btn-danger">Supprimer</a>
                </div>
            ):(
                <p>chargement ... </p>
            )}
        </div>
    );
};

export default FormationDetail;
