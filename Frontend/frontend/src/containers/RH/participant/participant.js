/*import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom'; 
import axios from 'axios';
import Cookies from 'js-cookie';
import "../Detail.css"

const ParticipantDetail = () => {
  const { id } = useParams();
  const [formationsnames, setformationsnames] = useState([]);
  const [employe, setEmploye] = useState('');
  const [participant, setFormation] = useState(null);
  const [deleteReussi, setdeleteReussi] = useState(false);

  useEffect(() => {
    const fetchFormation = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/RH/participant/${id}/`);
        setFormation(response.data);

        const employeResponse = await axios.get(`${process.env.REACT_APP_API_URL}/RH/employe/${response.data.employe_concerne}/`);
        setEmploye(employeResponse.data.username);

        const formationsDetails = await Promise.all(response.data.formations_concernees.map(async (formationId) => {
          const formationResponse = await axios.get(`${process.env.REACT_APP_API_URL}/RH/formation/${formationId}/`);
          return formationResponse.data.intitule_formation;
      }));
      setformationsnames(formationsDetails);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de participant:', error);
      }
    };

    fetchFormation();
  }, [id]);
  const handleDelete = async () => {
    const headers = {
      'Accept': '*//*',
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
  return <Navigate to="/Dashboardparticipant"/>
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
                        <p><strong>Formation concernée participant  :</strong>{formationsnames.join(', ')}</p>
                        <p><strong>Email de participant :</strong> {participant.email}</p>
                        <p><strong>Est un utilisateur :</strong> {participant.is_user ? 'Oui' : 'Non'}</p>
                        <p><strong>employe_concerne :</strong> {employe}</p>
                        <p><strong>Date de création :</strong> {participant.created_at}</p>
                        <p><strong>Créé par :</strong> {participant.created_by}</p>
                        <p><strong>Pièces jointes :</strong> {participant.pieces_jointes ? <a href={`${process.env.REACT_APP_API_URL}/RH/piece_jointe_participant/${id}/`} target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>
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
*/
import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom'; 
import '../Detail.css';

// Static data for participants
const sampleParticipants = [
    {
        id: 1,
        nom: 'Dupont',
        prenom: 'Jean',
        username: 'jdupont',
        email: 'jean.dupont@example.com',
        formations_concernees: [1, 2],
        is_user: true,
        created_at: '2024-01-01',
        created_by: 'Admin',
        updated_by: 'Admin',
        updated_at: '2024-01-10',
        pieces_jointes: true
    },
    {
        id: 2,
        nom: 'Martin',
        prenom: 'Marie',
        username: 'mmartin',
        email: 'marie.martin@example.com',
        formations_concernees: [1],
        is_user: false,
        created_at: '2024-02-01',
        created_by: 'Admin',
        updated_by: 'Admin',
        updated_at: '2024-02-10',
        pieces_jointes: false
    },
    {
        id: 3,
        nom: 'Durand',
        prenom: 'Paul',
        username: 'pdurand',
        email: 'paul.durand@example.com',
        formations_concernees: [2],
        is_user: true,
        created_at: '2024-03-01',
        created_by: 'Admin',
        updated_by: 'Admin',
        updated_at: '2024-03-10',
        pieces_jointes: true
    }
];

// Static data for formations
const sampleFormations = [
    { id: 1, intitule_formation: 'Formation React' },
    { id: 2, intitule_formation: 'Formation Node.js' }
];

const ParticipantDetail = () => {
    const { id } = useParams();
    const [participant, setParticipant] = useState(null);
    const [deleteReussi, setDeleteReussi] = useState(false);
    const [formationsnames, setFormationsNames] = useState([]);

    useEffect(() => {
        // Simulate data fetch
        const foundParticipant = sampleParticipants.find(p => p.id === parseInt(id));
        if (foundParticipant) {
            setParticipant(foundParticipant);

            const formationsDetails = sampleFormations
                .filter(formation => foundParticipant.formations_concernees.includes(formation.id))
                .map(formation => formation.intitule_formation);

            setFormationsNames(formationsDetails);
        }
    }, [id]);

    const handleDelete = () => {
        // Simulate delete operation
        setDeleteReussi(true);
    };

    if (deleteReussi) {
        return <Navigate to="/Dashboardparticipant" />;
    }

    return (
        <div>
            {participant ? (
                <div className="card">
                    <div className="card-body">
                        <p><strong>ID :</strong> {participant.id}</p>
                        <p><strong>Nom participant :</strong> {participant.nom}</p>
                        <p><strong>Prénom participant :</strong> {participant.prenom}</p>
                        <p><strong>Nom d'utilisateur participant :</strong> {participant.username}</p>
                        <p><strong>Formations concernées :</strong> {formationsnames.join(', ')}</p>
                        <p><strong>Email de participant :</strong> {participant.email}</p>
                        <p><strong>Est un utilisateur :</strong> {participant.is_user ? 'Oui' : 'Non'}</p>
                        <p><strong>Date de création :</strong> {participant.created_at}</p>
                        <p><strong>Créé par :</strong> {participant.created_by}</p>
                        <p><strong>Pièces jointes :</strong> {participant.pieces_jointes ? <a href="#" target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>
                        <p><strong>Modifié par :</strong> {participant.updated_by}</p>
                        <p><strong>Date de modification :</strong> {participant.updated_at}</p>
                    </div>
                    <br />
                    <a href="/Dashboardparticipant"><button className="btn-gray">Retour</button></a>&nbsp;
                    <Link to={`/update-participant/${participant.id}`}><button className="btn-blue">Modifier</button></Link>&nbsp;
                    <button className="btn btn-danger" onClick={handleDelete}>Supprimer</button>
                </div>
            ) : (
                <p>Chargement ...</p>
            )}
        </div>
    );
};

export default ParticipantDetail;
