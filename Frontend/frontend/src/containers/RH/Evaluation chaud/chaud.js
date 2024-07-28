/*import React, { useState, useEffect } from 'react';
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
      'Accept': '*//*',
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
*/
import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import "../Detail.css";
import { IoMdArrowRoundBack } from 'react-icons/io';
import { GrEdit, GrTrash } from 'react-icons/gr';

// Static data for chaud evaluations
const sampleChaudDetails = {
    1: {
        id: 1,
        name: 'Evaluation A',
        formation: 1,
        date_realisation: '2024-01-15',
        criteres: 'Critère 1, Critère 2',
        coefficients: '0.5, 1.0',
        pieces_jointes: true,
        created_by: 'Admin',
        created_at: '2024-01-01'
    },
    2: {
        id: 2,
        name: 'Evaluation B',
        formation: 2,
        date_realisation: '2024-02-15',
        criteres: 'Critère 3, Critère 4',
        coefficients: '0.7, 1.2',
        pieces_jointes: false,
        created_by: 'Admin',
        created_at: '2024-02-15'
    }
};

const sampleFormations = [
    { id: 1, intitule_formation: 'Formation React' },
    { id: 2, intitule_formation: 'Formation Node.js' }
];

const ChaudDetail = () => {
    const { id } = useParams();
    const [chaud, setChaud] = useState(null);
    const [formation, setFormation] = useState('');
    const [deleteReussi, setDeleteReussi] = useState(false);

    useEffect(() => {
        // Simulating data fetch
        const chaudDetail = sampleChaudDetails[id];
        setChaud(chaudDetail);
        const formationData = sampleFormations.find(form => form.id === chaudDetail.formation);
        setFormation(formationData ? formationData.intitule_formation : 'N/A');
    }, [id]);

    const handleDelete = () => {
        // Simulate delete operation
        setDeleteReussi(true);
    };

    if (deleteReussi) {
        return <Navigate to="/DashboardEvaluationChaud" />;
    }

    return (
        <main style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="card" style={{ width: '80%', maxWidth: '800px' }}>
                <div className="card-body">
                    {chaud ? (
                        <>
                            <p><strong>ID :</strong> {chaud.id}</p>
                            <p><strong>Nom évaluation :</strong> {chaud.name}</p>
                            <p><strong>Formation :</strong> {formation}</p>
                            <p><strong>Date de réalisation :</strong> {chaud.date_realisation}</p>
                            <p><strong>Critères :</strong> {chaud.criteres}</p>
                            <p><strong>Coefficients :</strong> {chaud.coefficients}</p>
                            <p><strong>Pièces jointes :</strong> {chaud.pieces_jointes ? <a href="#" target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>
                            <p><strong>Créé par :</strong> {chaud.created_by}</p>
                            <p><strong>Créé à :</strong> {chaud.created_at}</p>
                        </>
                    ) : (
                        <p>Chargement ...</p>
                    )}
                </div>
                <div className="buttons" style={{ display: 'flex', gap: '10px', justifyContent: 'center', padding: '10px' }}>
                    <Link to="/DashboardChaud">
                        <button className="btn-gray">
                            <IoMdArrowRoundBack />
                        </button>
                    </Link>
                    <Link to={`/update-chaud/${chaud?.id}`}>
                        <button className="btn-blue">
                            <GrEdit />
                        </button>
                    </Link>
                    <button className="btn btn-danger" onClick={handleDelete}>
                        <GrTrash />
                    </button>
                </div>
            </div>
        </main>
    );
};

export default ChaudDetail;