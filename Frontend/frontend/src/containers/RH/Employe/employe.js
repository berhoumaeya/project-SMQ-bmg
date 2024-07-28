/*import React, { useState, useEffect } from 'react';
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
      'Accept': '*//*',
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
                        <p><strong>Nom d'utilisateur employe  :</strong> {employe.username}</p>
                        <p><strong>Email de employe :</strong> {employe.email}</p>
                        <p><strong>Est un utilisateur :</strong> {employe.is_user ? 'Oui' : 'Non'}</p>
                        <p><strong>Date de création :</strong> {employe.created_at}</p>
                        <p><strong>Créé par :</strong> {employe.created_by}</p>
                        <p><strong>Pièces jointes :</strong> {employe.pieces_jointes ? <a href={`${process.env.REACT_APP_API_URL}/RH/piece_jointe_employe/${id}/`} target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>
                        <p><strong>Modifié par :</strong> {employe.updated_by}</p>
                        <p><strong>Date de modification :</strong> {employe.updated_at}</p>
                    </div>
                    <div className="dashboard-buttons">
                    <a href="/Dashboardemploye"><button className="btn btn-secondary">Retour</button></a>
                    <Link to={`/update-employe/${employe.id}`}><button className="btn btn-success mt-3">Modifier</button></Link>
                    <Link to={`/Dashboardcompetence/${employe.id}`}><button className="btn btn-primary">Consulter evaluations</button></Link>
                    <button className="btn btn-danger" onClick={handleDelete}>Supprimer</button>
                    </div>
                </div>
            ):(
                <p>chargement ... </p>
            )}
        </div>
    );
};

export default EmployeDetail;
*/
import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { FaFileAlt } from 'react-icons/fa';
import '../Detail.css'; 
import { GrTrash } from 'react-icons/gr';
import { IoMdArrowRoundBack } from "react-icons/io";
import { GrEdit } from 'react-icons/gr';

const sampleEmployes = [
    {
        id: 1,
        nom: 'Doe',
        prenom: 'John',
        username: 'jdoe',
        email: 'john.doe@example.com',
        is_user: true,
        created_at: '2024-01-01',
        created_by: 'Admin',
        updated_by: 'Admin',
        updated_at: '2024-01-10',
        pieces_jointes: true
    },
    // Add more sample data if needed
];

const EmployeDetail = () => {
    const { id } = useParams();
    const [employe, setEmploye] = useState(null);
    const [deleteReussi, setDeleteReussi] = useState(false);

    useEffect(() => {
        // Simulate data fetch
        const foundEmploye = sampleEmployes.find(emp => emp.id === parseInt(id));
        setEmploye(foundEmploye || null);
    }, [id]);

    const handleDelete = () => {
        // Simulate delete action
        setDeleteReussi(true);
    };

    if (deleteReussi) {
        return <Navigate to="/Dashboardemploye" />;
    }

    return (
        <main style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="card">
                <div className="card-body">
                    {employe ? (
                        <>
                            <p><strong>ID :</strong> {employe.id}</p>
                            <p><strong>Nom employé :</strong> {employe.nom}</p>
                            <p><strong>Prénom employé :</strong> {employe.prenom}</p>
                            <p><strong>Nom d'utilisateur :</strong> {employe.username}</p>
                            <p><strong>Email :</strong> {employe.email}</p>
                            <p><strong>Est un utilisateur :</strong> {employe.is_user ? 'Oui' : 'Non'}</p>
                            <p><strong>Date de création :</strong> {employe.created_at}</p>
                            <p><strong>Créé par :</strong> {employe.created_by}</p>
                            <p><strong>Pièces jointes :</strong> {employe.pieces_jointes ? <a href={`${process.env.REACT_APP_API_URL}/RH/piece_jointe_employe/${employe.id}/`} target="_blank" rel="noopener noreferrer"><FaFileAlt /> Consulter</a> : 'Aucune'}</p>
                            <p><strong>Modifié par :</strong> {employe.updated_by}</p>
                            <p><strong>Date de modification :</strong> {employe.updated_at}</p>
                        </>
                    ) : (
                        <p>Chargement...</p>
                    )}
                </div>
                <div className="buttons" style={{ display: 'flex', gap: '10px', justifyContent: 'center', padding: '10px' }}>
                    <Link to="/Dashboardemploye">
                        <button className="btn-gray"><IoMdArrowRoundBack /></button>
                    </Link>
                    <Link to={`/update-employe/${employe ? employe.id : ''}`}>
                        <button className="btn-blue"><GrEdit /></button>
                    </Link>
                    <Link to={`/Dashboardcompetence/${employe ? employe.id : ''}`}>
                        <button className="btn btn-primary">Consulter évaluations</button>
                    </Link>
                    <button className="btn btn-danger" onClick={handleDelete}><GrTrash /></button>
                </div>
            </div>
        </main>
    );
};

export default EmployeDetail;
