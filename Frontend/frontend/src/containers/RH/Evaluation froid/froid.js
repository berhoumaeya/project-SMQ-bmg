/*import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom'; 
import axios from 'axios';
import Cookies from 'js-cookie';
import "../Detail.css"

const FroidDetail = () => {
  const { id } = useParams();
  const [froid, setFormation] = useState(null);
  const [formation, setForm] = useState('');
  const [deleteReussi, setdeleteReussi] = useState(false);

  useEffect(() => {
    const fetchFormation = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/RH/evaluation_froid/${id}/`);
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
      'Accept': '*//*',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    };
    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/RH/delete_evaluation_froid/${id}/`,{headers:headers});
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
            {froid ? (
                <div className="card" >
                    <div className="card-body">
                        <p><strong>ID :</strong> {froid.id}</p>
                        <p><strong>name evaluation :</strong> {froid.name}</p>
                        <p><strong>Formation :</strong> {formation}</p>
                        <p><strong>Date de réalisation :</strong> {froid.date_realisation}</p>
                        <p><strong>criteres   :</strong> {froid.criteres}</p>
                        <p><strong>coefficients  :</strong> {froid.coefficients}</p>
                        <p><strong>Pièces jointes :</strong> {froid.pieces_jointes ? <a href={`${process.env.REACT_APP_API_URL}/RH/piece_jointe_froid/${id}/`} target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>
                        <p><strong>crée par  :</strong> {froid.created_by}</p>
                        <p><strong>crée à :</strong> {froid.created_at}</p>

                    </div>
                    <br />
                    <a href="/DashboardEvaluationFroid"><button className="btn-gray">Retour</button></a>&nbsp;
                    <button className="btn btn-danger" onClick={handleDelete}>Supprimer</button>
                </div>
            ):(
                <p>chargement ... </p>
            )}
        </div>
    );
};

export default FroidDetail;
*/
import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom'; 
import '../Detail.css';
import { FaFileAlt } from 'react-icons/fa';
import { GrEdit, GrTrash } from 'react-icons/gr';
import { IoMdArrowRoundBack } from 'react-icons/io';

// Static data
const staticFroids = [
    {
        id: 1,
        name: 'Évaluation Froid 1',
        formation: 'Formation A',
        date_realisation: '2024-01-01',
        criteres: 'Critères A',
        coefficients: 'Coefficients A',
        pieces_jointes: true,
        created_by: 'Admin',
        created_at: '2024-01-01'
    },
    {
        id: 2,
        name: 'Évaluation Froid 2',
        formation: 'Formation B',
        date_realisation: '2024-02-01',
        criteres: 'Critères B',
        coefficients: 'Coefficients B',
        pieces_jointes: false,
        created_by: 'Admin',
        created_at: '2024-02-01'
    },
    {
        id: 3,
        name: 'Évaluation Froid 3',
        formation: 'Formation C',
        date_realisation: '2024-03-01',
        criteres: 'Critères C',
        coefficients: 'Coefficients C',
        pieces_jointes: true,
        created_by: 'Admin',
        created_at: '2024-03-01'
    }
];

const FroidDetail = () => {
    const { id } = useParams();
    const [froid, setFroid] = useState(null);
    const [deleteReussi, setDeleteReussi] = useState(false);

    useEffect(() => {
        // Simulating data fetch
        const fetchFroid = staticFroids.find(f => f.id === parseInt(id, 10));
        if (fetchFroid) {
            setFroid(fetchFroid);
        }
    }, [id]);

    const handleDelete = () => {
        // Simulating delete
        setDeleteReussi(true);
    };

    if (deleteReussi) {
        return <Navigate to="/DashboardEvaluationFroid" />;
    }

    return (
        <main style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="card">
                <div className="card-body">
                    {froid ? (
                        <>
                            <p><strong>ID :</strong> {froid.id}</p>
                            <p><strong>Nom froid :</strong> {froid.nom}</p>
                            <p><strong>Description :</strong> {froid.description}</p>
                            <p><strong>Date de création :</strong> {froid.created_at}</p>
                            <p><strong>Créé par :</strong> {froid.created_by}</p>
                            <p><strong>Pièces jointes :</strong> {froid.pieces_jointes ? <a href={`${process.env.REACT_APP_API_URL}/RH/piece_jointe_froid/${froid.id}/`} target="_blank" rel="noopener noreferrer"><FaFileAlt /> Consulter</a> : 'Aucune'}</p>
                            <p><strong>Modifié par :</strong> {froid.updated_by}</p>
                            <p><strong>Date de modification :</strong> {froid.updated_at}</p>
                        </>
                    ) : (
                        <p>Chargement...</p>
                    )}
                </div>
                <div className="buttons" style={{ display: 'flex', gap: '10px', justifyContent: 'center', padding: '10px' }}>
                    <Link to="/DashboardFroid">
                    <button className="btn-gray"><IoMdArrowRoundBack /></button></Link>                
                    <Link to={`/update-froid/${froid ? froid.id : ''}`}>
                    <button className="btn-blue">  <GrEdit /></button>
                    </Link>
                    <button className="btn btn-danger" onClick={handleDelete}><GrTrash /></button>
                </div>
                
            </div>
        </main>
    );
};

export default FroidDetail;