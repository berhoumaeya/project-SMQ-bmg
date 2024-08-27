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
import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { GrEdit, GrTrash } from 'react-icons/gr';
import { IoMdArrowRoundBack } from 'react-icons/io';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../Detail.css';
import SubNavbarRH from '../../../components/SubNavbarRH';
import SidebarRH from '../../../components/SidebarRH';

const sampleFiches = [
  {
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

  {
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
];
const FicheDetail = () => {
  const { id } = useParams();
  const [fiche, setFiche] = useState(null);
  const [deleteReussi, setDeleteReussi] = useState(false);
  const [updateReussi, setUpdateReussi] = useState(false);
  const [piecesJointes, setPiecesJointes] = useState(null);

  useEffect(() => {
    const fetchedFiche = sampleFiches.find(f => f.id === parseInt(id));
    setFiche(fetchedFiche);
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/RH/delete_fiche/${id}/`, {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken'),
        }
      });
      setDeleteReussi(true);
    } catch (error) {
      console.error('Erreur lors de la suppression de la fiche:', error);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setPiecesJointes(selectedFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    // Append necessary form data here
    if (piecesJointes) {
      formData.append('pieces_jointes', piecesJointes);
    }

    const headers = {
      'Accept': '*/*',
      'Content-Type': 'multipart/form-data',
      'X-CSRFToken': Cookies.get('csrftoken')
    };

    axios.put(`${process.env.REACT_APP_API_URL}/RH/update_fiche/${id}/`, formData, { headers: headers })
      .then(response => {
        console.log('Fiche mise à jour avec succès :', response.data);
        setUpdateReussi(true);
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour de la fiche:', error);
      });
  };

  if (deleteReussi) {
    return <Navigate to="/DashboardFiche" />;
  }

  if (updateReussi) {
    return <Navigate to={`/fiche/${id}`} />;
  }

  return (
    <>
      <SubNavbarRH />
      <main style={{ display: 'flex', minHeight: '100vh' }}>
        <SidebarRH />
        <div className="container-xl px-4 mt-4">
          <div className="row">
            <div className="col-xl-4">
              <div className="card mb-4 mb-xl-0">
                <div className="card-header-">Profile Picture</div>
                <div className="card-body text-center">
                  <div className="img-container mb-2">
                    <img
                      className="img-account-profile rounded-circle"
                      src={piecesJointes ? URL.createObjectURL(piecesJointes) : "http://bootdey.com/img/Content/avatar/avatar1.png"}
                      alt="Profile"
                      style={{ width: '150px', height: '150px' }}
                    />
                  </div>
                  <div className="small font-italic text-muted mb-4">
                    JPG or PNG no larger than 5 MB
                  </div>
                  <input
                    type="file"
                    className="form-control mb-2"
                    onChange={handleFileChange}
                    accept=".jpg, .png"
                  />
                </div>
              </div>
              <br />
              <div className="card mb-4">
                <div className="card-header-">Historique</div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    {fiche ? (
                      <>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <div>
                            <strong>Date de modification</strong><br />
                            <small>{fiche.updated_at} - {fiche.updated_by}</small>
                          </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <div> <strong>Date de création</strong><br />
                            <small>{fiche.created_at} - {fiche.created_by}</small>
                          </div>

                        </li>
                      </>
                    ) : (<div>Chargement...</div>)}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="card mb-4">
                <div className="card-header-">Account Details</div>
                <div className="card-body">
                  {fiche ? (
                    <form onSubmit={handleSubmit} className="row">
                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label className="small mb-1">Nom fiche</label>
                          <input className="form-control" type="text" value={fiche.name} readOnly />
                        </div>
                        <div className="col-md-6">
                          <label className="small mb-1">Employé concerné</label>
                          <input className="form-control" type="text" value={fiche.employe_concerne} readOnly />
                        </div>
                      </div>
                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label className="small mb-1">Poste occupé</label>
                          <input className="form-control" type="text" value={fiche.job_position} readOnly />
                        </div>
                        <div className="col-md-6">
                          <label className="small mb-1">Téléphone travail</label>
                          <input className="form-control" type="text" value={fiche.work_phone} readOnly />
                        </div>
                      </div>
                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label className="small mb-1">Téléphone mobile</label>
                          <input className="form-control" type="text" value={fiche.work_mobile} readOnly />
                        </div>
                        <div className="col-md-6">
                          <label className="small mb-1">Email travail</label>
                          <input className="form-control" type="text" value={fiche.work_email} readOnly />
                        </div>
                      </div>
                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label className="small mb-1">Département</label>
                          <input className="form-control" type="text" value={fiche.department.join(', ')} readOnly />
                        </div>
                        <div className="col-md-6">
                          <label className="small mb-1">Manager</label>
                          <input className="form-control" type="text" value={fiche.manager} readOnly />
                        </div>
                      </div>
                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label className="small mb-1">Mis à jour par</label>
                          <input className="form-control" type="text" value={fiche.updated_by} readOnly />
                        </div>
                        <div className="col-md-6">
                          <label className="small mb-1">Date de mise à jour</label>
                          <input className="form-control" type="text" value={fiche.updated_at} readOnly />
                        </div>
                      </div>
                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label className="small mb-1">Coach</label>
                          <input className="form-control" type="text" value={fiche.coach} readOnly />
                        </div>
                        <div className="col-md-6">
                          <label className="small mb-1">Adresse travail</label>
                          <input className="form-control" type="text" value={fiche.work_address} readOnly />
                        </div>
                      </div>
                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label className="small mb-1">Lieu travail</label>
                          <input className="form-control" type="text" value={fiche.work_location} readOnly />
                        </div>
                        <div className="col-md-6">
                          <label className="small mb-1">Horaires de travail</label>
                          <input className="form-control" type="text" value={fiche.working_hours} readOnly />
                        </div>
                      </div>
                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label className="small mb-1">Numéro de compte bancaire</label>
                          <input className="form-control" type="text" value={fiche.bank_account_number} readOnly />
                        </div>
                        <div className="col-md-6">
                          <label className="small mb-1">Distance domicile-travail</label>
                          <input className="form-control" type="text" value={fiche.home_work_distance} readOnly />
                        </div>
                      </div>
                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label className="small mb-1">Statut marital</label>
                          <input className="form-control" type="text" value={fiche.martial_status} readOnly />
                        </div>
                        <div className="col-md-6">
                          <label className="small mb-1">Contact d'urgence</label>
                          <input className="form-control" type="text" value={fiche.emergency_contact} readOnly />
                        </div>
                      </div>
                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label className="small mb-1">Téléphone d'urgence</label>
                          <input className="form-control" type="text" value={fiche.emergency_phone} readOnly />
                        </div>
                        <div className="col-md-6">
                          <label className="small mb-1">Niveau de certificat</label>
                          <input className="form-control" type="text" value={fiche.certificate_level} readOnly />
                        </div>
                      </div>
                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label className="small mb-1">Domaine d'étude</label>
                          <input className="form-control" type="text" value={fiche.field_of_study} readOnly />
                        </div>
                        <div className="col-md-6">
                          <label className="small mb-1">École</label>
                          <input className="form-control" type="text" value={fiche.school} readOnly />
                        </div>
                      </div>
                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label className="small mb-1">CNSS</label>
                          <input className="form-control" type="text" value={fiche.cnss} readOnly />
                        </div>
                        <div className="col-md-6">
                          <label className="small mb-1">CIN</label>
                          <input className="form-control" type="text" value={fiche.cin} readOnly />
                        </div>
                      </div>
                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label className="small mb-1">Adresse</label>
                          <input className="form-control" type="text" value={fiche.address} readOnly />
                        </div>
                        <div className="col-md-6">
                          <label className="small mb-1">Créé par</label>
                          <input className="form-control" type="text" value={fiche.created_by} readOnly />
                        </div>
                      </div>
                      <div className="d-flex justify-content-end mt-3">
                        <Link to="/DashboardFiche" className="btn btn-secondary me-2">
                          <IoMdArrowRoundBack /> Retour
                        </Link>
                        <button type="submit" className="btn btn-primary me-2">
                          <GrEdit /> Modifier
                        </button>
                        <button type="button" className="btn btn-danger" onClick={handleDelete}>
                          <GrTrash /> Supprimer
                        </button>
                      </div>
                    </form>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main></>
  );
};

export default FicheDetail;