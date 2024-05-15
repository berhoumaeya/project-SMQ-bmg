import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom'; 
import axios from 'axios';
import Cookies from 'js-cookie';
import "../Detail.css";

const FicheDetail = () => {
  const { id } = useParams();
  const [fiche_employe, setFicheEmploye] = useState(null);
  const [employe, setEmploye] = useState('');
  const [post, setPost] = useState('');
  const [manager, setManager] = useState('');
  const [coach, setCoach] = useState('');
  const [address, setAddress] = useState('');
  const [address_Work, setAddress_Work] = useState('');
  const [departmentsNames, setDepartment] = useState([]);
  const [deleteReussi, setDeleteReussi] = useState(false);

  useEffect(() => {
    const fetchFicheEmploye = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/RH/fiche_employe/${id}/`);
        setFicheEmploye(response.data);

        const employeResponse = await axios.get(`${process.env.REACT_APP_API_URL}/RH/employe/${response.data.employe_concerne}/`);
        setEmploye(employeResponse.data.username);

        const postResponse = await axios.get(`${process.env.REACT_APP_API_URL}/RH/job_post/${response.data.job_position}/`);
        setPost(postResponse.data.title);

        const managerResponse = await axios.get(`${process.env.REACT_APP_API_URL}/RH/employe/${response.data.manager}/`);
        setManager(managerResponse.data.username);

        const coachResponse = await axios.get(`${process.env.REACT_APP_API_URL}/RH/employe/${response.data.coach}/`);
        setCoach(coachResponse.data.username);

        const addressResponse = await axios.get(`${process.env.REACT_APP_API_URL}/RH/address/${response.data.address}/`);
        setAddress(addressResponse.data.name);

        const addressWorkResponse = await axios.get(`${process.env.REACT_APP_API_URL}/RH/address/${response.data.work_address}/`);
        setAddress_Work(addressWorkResponse.data.name);

        const depDetails = await Promise.all(response.data.department.map(async (depID) => {
          const depResponse = await axios.get(`${process.env.REACT_APP_API_URL}/RH/department/${depID}/`);
          return depResponse.data.name;
        }));
        setDepartment(depDetails);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de fiche employé:', error);
      }
    };

    fetchFicheEmploye();
  }, [id]);

  const handleDelete = async () => {
    const headers = {
      'Accept': '*/*',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    };
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/RH/delete_fiche_employe/${id}/`, { headers: headers });
      setDeleteReussi(true);
    } catch (error) {
      console.error('Erreur lors de la suppression de la fiche:', error);
    }
  };

  if (deleteReussi) {
    return <Navigate to="/Dashboardfiche" />;
  }

  return (
    <div>
      {fiche_employe ? (
        <div className="card">
          <div className="card-body">
            <p><strong>ID :</strong> {fiche_employe.id}</p>
            <p><strong>name fiche_employe :</strong> {fiche_employe.name}</p>
            <p><strong>Post occupé :</strong> {post}</p>
            <p><strong>work_mobile   :</strong> {fiche_employe.work_mobile}</p>
            <p><strong>work_phone  :</strong> {fiche_employe.work_phone}</p>
            <p><strong>work_email  :</strong> {fiche_employe.work_email}</p>
            <p><strong>department :</strong> {departmentsNames.join(', ')}</p>
            <p><strong>manager :</strong> {manager}</p>
            <p><strong>Modifié par :</strong> {fiche_employe.updated_by}</p>
            <p><strong>Modifié à :</strong> {fiche_employe.updated_at}</p>
            <p><strong>coach :</strong> {coach}</p>
            <p><strong>work_address :</strong> {address_Work}</p>
            <p><strong>work_location :</strong> {fiche_employe.work_location}</p>
            <p><strong>working_hours :</strong> {fiche_employe.working_hours}</p>
            <p><strong>bank_account_number   :</strong> {fiche_employe.bank_account_number}</p>
            <p><strong>home_work_distance  :</strong> {fiche_employe.home_work_distance}</p>
            <p><strong>martial_status  :</strong> {fiche_employe.martial_status}</p>
            <p><strong>emergency_contact :</strong> {fiche_employe.emergency_contact}</p>
            <p><strong>emergency_phone :</strong> {fiche_employe.emergency_phone}</p>
            <p><strong>certificate_level :</strong> {fiche_employe.certificate_level}</p>
            <p><strong>field_of_study :</strong> {fiche_employe.field_of_study}</p>
            <p><strong>school   :</strong> {fiche_employe.school}</p>
            <p><strong>cnss  :</strong> {fiche_employe.cnss}</p>
            <p><strong>cin  :</strong> {fiche_employe.cin}</p>
            <p><strong>Pièces jointes :</strong> {fiche_employe.pieces_jointes ? <a href={`${process.env.REACT_APP_API_URL}/RH/piece_jointe/${id}/`} target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>
            <p><strong>address :</strong> {address}</p>
            <p><strong>crée par  :</strong> {fiche_employe.created_by}</p>
            <p><strong>employe_concerne :</strong> {employe}</p>
          </div>
          <br />
          <a href="/Dashboardfiche"><button className="btn-gray">Retour</button></a>&nbsp;
          <Link to={`/update-fiche/${fiche_employe.id}`}><button className="btn-blue">Modifier</button></Link>&nbsp;
          <button className="btn btn-danger" onClick={handleDelete}>Supprimer</button>
        </div>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default FicheDetail;
