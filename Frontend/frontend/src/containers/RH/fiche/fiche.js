/*import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom'; 
import axios from 'axios';
import Cookies from 'js-cookie';
import '../formation/details.css'

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
      'Accept': '*//*',
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
            <p><strong>employe_concerne :</strong> {employe}</p>
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
          </div>
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

export default FicheDetail;*/
import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';

const FicheDetail = () => {
  const { id } = useParams();
  const [deleteReussi, setDeleteReussi] = useState(false);

  const staticFicheEmployes = {
    1: {
      id: 1,
      name: 'Fiche 1',
      employe_concerne: 'Employe 1',
      job_position: 'Poste 1',
      work_mobile: '123-456-7890',
      work_phone: '098-765-4321',
      work_email: 'fiche1@example.com',
      department: ['Department 1'],
      manager: 'Manager 1',
      updated_by: 'User 1',
      updated_at: '2023-07-01',
      coach: 'Coach 1',
      work_address: 'Address 1',
      work_location: 'Location 1',
      working_hours: '9am-5pm',
      bank_account_number: '123456789',
      home_work_distance: '10km',
      martial_status: 'Single',
      emergency_contact: 'Contact 1',
      emergency_phone: '111-222-3333',
      certificate_level: 'Bachelor',
      field_of_study: 'Computer Science',
      school: 'School 1',
      cnss: 'CNSS 1',
      cin: 'CIN 1',
      pieces_jointes: true,
      address: 'Address 1',
      created_by: 'User 1'
    },
    2: {
      id: 2,
      name: 'Fiche 2',
      employe_concerne: 'Employe 2',
      job_position: 'Poste 2',
      work_mobile: '123-456-7890',
      work_phone: '098-765-4321',
      work_email: 'fiche2@example.com',
      department: ['Department 2'],
      manager: 'Manager 2',
      updated_by: 'User 2',
      updated_at: '2023-07-02',
      coach: 'Coach 2',
      work_address: 'Address 2',
      work_location: 'Location 2',
      working_hours: '9am-5pm',
      bank_account_number: '987654321',
      home_work_distance: '20km',
      martial_status: 'Married',
      emergency_contact: 'Contact 2',
      emergency_phone: '222-333-4444',
      certificate_level: 'Master',
      field_of_study: 'Engineering',
      school: 'School 2',
      cnss: 'CNSS 2',
      cin: 'CIN 2',
      pieces_jointes: false,
      address: 'Address 2',
      created_by: 'User 2'
    },
    // Add more static fiche employe objects as needed
  };

  const ficheEmploye = staticFicheEmployes[id];

  const handleDelete = () => {
    setDeleteReussi(true);
  };

  if (deleteReussi) {
    return <Navigate to="/Dashboardfiche" />;
  }

  return (
    <div>
      {ficheEmploye ? (
        <div className="card">
          <div className="card-body">
            <p><strong>ID :</strong> {ficheEmploye.id}</p>
            <p><strong>name fiche_employe :</strong> {ficheEmploye.name}</p>
            <p><strong>employe_concerne :</strong> {ficheEmploye.employe_concerne}</p>
            <p><strong>Post occupé :</strong> {ficheEmploye.job_position}</p>
            <p><strong>work_mobile :</strong> {ficheEmploye.work_mobile}</p>
            <p><strong>work_phone :</strong> {ficheEmploye.work_phone}</p>
            <p><strong>work_email :</strong> {ficheEmploye.work_email}</p>
            <p><strong>department :</strong> {ficheEmploye.department.join(', ')}</p>
            <p><strong>manager :</strong> {ficheEmploye.manager}</p>
            <p><strong>Modifié par :</strong> {ficheEmploye.updated_by}</p>
            <p><strong>Modifié à :</strong> {ficheEmploye.updated_at}</p>
            <p><strong>coach :</strong> {ficheEmploye.coach}</p>
            <p><strong>work_address :</strong> {ficheEmploye.work_address}</p>
            <p><strong>work_location :</strong> {ficheEmploye.work_location}</p>
            <p><strong>working_hours :</strong> {ficheEmploye.working_hours}</p>
            <p><strong>bank_account_number :</strong> {ficheEmploye.bank_account_number}</p>
            <p><strong>home_work_distance :</strong> {ficheEmploye.home_work_distance}</p>
            <p><strong>martial_status :</strong> {ficheEmploye.martial_status}</p>
            <p><strong>emergency_contact :</strong> {ficheEmploye.emergency_contact}</p>
            <p><strong>emergency_phone :</strong> {ficheEmploye.emergency_phone}</p>
            <p><strong>certificate_level :</strong> {ficheEmploye.certificate_level}</p>
            <p><strong>field_of_study :</strong> {ficheEmploye.field_of_study}</p>
            <p><strong>school :</strong> {ficheEmploye.school}</p>
            <p><strong>cnss :</strong> {ficheEmploye.cnss}</p>
            <p><strong>cin :</strong> {ficheEmploye.cin}</p>
            <p><strong>Pièces jointes :</strong> {ficheEmploye.pieces_jointes ? <a href={`${process.env.REACT_APP_API_URL}/RH/piece_jointe/${id}/`} target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>
            <p><strong>address :</strong> {ficheEmploye.address}</p>
            <p><strong>crée par :</strong> {ficheEmploye.created_by}</p>
          </div>
          <button href="/Dashboardfiche"><button className="btn-gray">Retour</button></button>&nbsp;
          <Link to={`/update-fiche/${ficheEmploye.id}`}><button className="btn-blue">Modifier</button></Link>&nbsp;
          <button className="btn btn-danger" onClick={handleDelete}>Supprimer</button>
        </div>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default FicheDetail;

