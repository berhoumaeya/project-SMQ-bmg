import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
import '../formation/FormationForm.css';
import { Navigate ,Link} from 'react-router-dom';
import Cookies from 'js-cookie';

function UpdateFiche() {
    const { id } = useParams();


    const [name, setName] = useState('');
    const [work_mobile, setWorkMobile] = useState('');
    const [work_phone, setWorkPhone] = useState('');
    const [work_email, setWorkEmail] = useState('');
    const [work_addressID, setWorkAddress] = useState('');
    const [work_location, setWorkLocation] = useState('');
    const [cin, setCin] = useState('');
    const [cnss, setCnss] = useState('');
    const [field_of_study, setFieldOfStudy] = useState('');
    const [school, setSchool] = useState('');
    const [certificate_level, setCertificateLevel] = useState('');
    const [emergency_phone, setEmergencyPhone] = useState('');
    const [emergency_contact, setEmergencyContact] = useState('');
    const [bank_account_number, setBankAccountNumber] = useState('');
    const [working_hours, setWorkingHours] = useState('');
    const [home_work_distance, setHomeWorkDistance] = useState('');
    const [martial_status, setMartialStatus] = useState('');
    const [pieces_jointes, setPiecesJointes] = useState(null);
    const [job_positions, setJobPositions] = useState([]);
    const [job_positionID, setJobPosition] = useState('');
    const [departments, setDepartments] = useState([]);
    const [departmentID, setDepartment] = useState([]);
    const [managers, setManagers] = useState([]);
    const [managerID, setManager] = useState('');
    const [coachs, setCoachs] = useState([]);
    const [coachID, setCoach] = useState('');
    const [addresss, setAddresss] = useState([]);
    const [addressID, setAddress] = useState('');
    const [piecesJointesUrl, setPiecesJointesUrl] = useState('');
    const [employe_concernes, setEmployes] = useState([]);
    const [employe_concerneID, setEmploye] = useState('');
    const [ajoutReussi, setAjoutReussi] = useState(false);

    

  useEffect(() => {

    const fetchEmploye = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/RH/fiche_employe/${id}/`);
          const data = response.data;
           setName(data.name);
           setJobPosition(data.job_position);
           setWorkMobile(data.work_mobile);
           setWorkPhone(data.work_phone);
           setWorkEmail(data.work_email);
           setManager(data.manager)
           setCoach(data.coach)
           setDepartment(data.department);
           setWorkAddress(data.work_address);
           setWorkLocation(data.work_location);
           setAddress(data.address);
           setWorkingHours(data.working_hours);
           setBankAccountNumber(data.bank_account_number);
           setHomeWorkDistance(data.home_work_distance);
           setMartialStatus(data.martial_status);
           setEmergencyContact(data.emergency_contact);
           setEmergencyPhone(data.emergency_phone);
           setCertificateLevel(data.certificate_level);
           setFieldOfStudy(data.field_of_study);
           setSchool(data.school);
           setCnss(data.cnss);
           setCin(data.cin);
           if (data.pieces_jointes){
            setPiecesJointesUrl(`${data.pieces_jointes}`);
           }
           setEmploye(data.employe_concerne);
        } catch (error) {
          console.error('Erreur lors de la récupération des données de employe:', error);
        }
      };
  
      fetchEmploye();


      axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_employe/`)
      .then(response => {
          setEmployes(response.data);
          setManagers(response.data);
          setCoachs(response.data);
      })
      .catch(error => {
          console.error('Erreur lors de la récupération des employés :', error);
      });

  axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_job_post/`)
      .then(response => {
          setJobPositions(response.data);
      })
      .catch(error => {
          console.error('Erreur lors de la récupération des positions :', error);
      });

  axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_address/`)
      .then(response => {
          setAddresss(response.data);
      })
      .catch(error => {
          console.error('Erreur lors de la récupération des adresses :', error);
      });

  axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_department/`)
      .then(response => {
          setDepartments(response.data);
      })
      .catch(error => {
          console.error('Erreur lors de la récupération des départements :', error);
      });
}, [id]);

const handleFileChange = (event) => {
  const selectedFile = event.target.files[0];
  setPiecesJointes(selectedFile);
};


const handleSubmit = (event) => {
  event.preventDefault();
  
  const formData = new FormData();
  formData.append('name', name);
  formData.append('work_mobile', work_mobile);
  formData.append('work_phone', work_phone);
  formData.append('work_email', work_email);
  formData.append('work_address', work_addressID);
  formData.append('work_location', work_location);
  formData.append('cin', cin);
  formData.append('cnss', cnss);
  formData.append('field_of_study', field_of_study);
  formData.append('home_work_distance', home_work_distance);
  formData.append('school', school);
  formData.append('certificate_level', certificate_level);
  formData.append('emergency_phone', emergency_phone);
  formData.append('emergency_contact', emergency_contact);
  formData.append('bank_account_number', bank_account_number);
  formData.append('working_hours', working_hours);
  formData.append('martial_status', martial_status);
  formData.append('job_position', job_positionID);
  formData.append('manager', managerID);
  formData.append('coach', coachID);
  formData.append('address', addressID);
  departmentID.forEach(id => {
      formData.append('department', id);
  });
  formData.append('employe_concerne', employe_concerneID);
  if (pieces_jointes) {
      formData.append('pieces_jointes', pieces_jointes);
  }else if (piecesJointesUrl === '') {
    formData.append('pieces_jointes', '');
    }
  const headers = {
    'Accept': '*/*',
    'Content-Type': 'multipart/form-data',
    'X-CSRFToken': Cookies.get('csrftoken')
};

    axios.put(`${process.env.REACT_APP_API_URL}/RH/update_fiche_employe/${id}/`, formData, { headers: headers })
      .then(response => {
        console.log('Fiche modifié avec succès :', response.data);
        setName('');
        setJobPosition('');
        setWorkMobile('');
        setWorkPhone('');
        setWorkEmail('');
        setManager('')
        setCoach('')
        setDepartment('');
        setWorkAddress('');
        setWorkLocation('');
        setAddress('');
        setWorkingHours('');
        setBankAccountNumber('');
        setHomeWorkDistance('');
        setMartialStatus('');
        setEmergencyContact('');
        setEmergencyPhone('');
        setCertificateLevel('');
        setFieldOfStudy('');
        setSchool('');
        setCnss('');
        setCin('');
        setPiecesJointes(null);
        setEmploye('');

        setAjoutReussi(true);
      })
      .catch(error => {
        console.error('Erreur lors de la modification du fiche :', error);
      });
  };
  if(ajoutReussi){
    return <Navigate to={`/fiche/${id}`} />;
  }


return (
  <div className="form-container">
      <div className="form-card">
          <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
                  <label>Nom :</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="form-group">
                  <label>Mobile :</label>
                  <input type="text" value={work_mobile} onChange={(e) => setWorkMobile(e.target.value)} />
              </div>
              <div className="form-group">
                  <label>Téléphone :</label>
                  <input type="text" value={work_phone} onChange={(e) => setWorkPhone(e.target.value)} />
              </div>
              <div className="form-group">
                  <label>Email :</label>
                  <input type="email" value={work_email} onChange={(e) => setWorkEmail(e.target.value)} />
              </div>
              <div className="form-group">
                  <label>Adresse de travail :</label>
                  <select value={work_addressID} onChange={(e) => setWorkAddress(e.target.value)}>
                      <option value="">Sélectionner...</option>
                      {addresss.map(address => (
                          <option key={address.id} value={address.id}>{address.name}</option>
                      ))}
                  </select>
              </div>
              <div className="form-group">
                  <label>Localisation de travail :</label>
                  <input type="text" value={work_location} onChange={(e) => setWorkLocation(e.target.value)} />
              </div>
              <div className="form-group">
                  <label>CIN :</label>
                  <input type="text" value={cin} onChange={(e) => setCin(e.target.value)} />
              </div>
              <div className="form-group">
                  <label>CNSS :</label>
                  <input type="text" value={cnss} onChange={(e) => setCnss(e.target.value)} />
              </div>
              <div className="form-group">
                  <label>Domaine d'étude :</label>
                  <input type="text" value={field_of_study} onChange={(e) => setFieldOfStudy(e.target.value)} />
              </div>
              <div className="form-group">
                  <label>Distance domicile-travail :</label>
                  <input type="text" value={home_work_distance} onChange={(e) => setHomeWorkDistance(e.target.value)} />
              </div>
              <div className="form-group">
                  <label>Établissement scolaire :</label>
                  <input type="text" value={school} onChange={(e) => setSchool(e.target.value)} />
              </div>
              <div className="form-group">
                  <label>Niveau de certificat :</label>
                  <input type="text" value={certificate_level} onChange={(e) => setCertificateLevel(e.target.value)} />
              </div>
              <div className="form-group">
                  <label>Contact d'urgence :</label>
                  <input type="text" value={emergency_contact} onChange={(e) => setEmergencyContact(e.target.value)} />
              </div>
              <div className="form-group">
                  <label>Téléphone d'urgence :</label>
                  <input type="text" value={emergency_phone} onChange={(e) => setEmergencyPhone(e.target.value)} />
              </div>
              <div className="form-group">
                  <label>Numéro de compte bancaire :</label>
                  <input type="text" value={bank_account_number} onChange={(e) => setBankAccountNumber(e.target.value)} />
              </div>
              <div className="form-group">
                  <label>Heures de travail :</label>
                  <input type="text" value={working_hours} onChange={(e) => setWorkingHours(e.target.value)} />
              </div>
              <div className="form-group">
                  <label>État civil :</label>
                  <select value={martial_status} onChange={(e) => setMartialStatus(e.target.value)}>
                      <option value="">Sélectionner...</option>
                      <option value="C">Célibataire</option>
                      <option value="M">Marié</option>
                      <option value="D">Divorcé</option>
                      <option value="V">Veuf</option>
                  </select>
              </div>
              <div className="form-group">
                  <label>Poste :</label>
                  <select value={job_positionID} onChange={(e) => setJobPosition(e.target.value)}>
                      <option value="">Sélectionner...</option>
                      {job_positions.map(job_position => (
                          <option key={job_position.id} value={job_position.id}>{job_position.title}</option>
                      ))}
                  </select>
              </div>
              <div className="form-group">
                  <label>Manager :</label>
                  <select value={managerID} onChange={(e) => setManager(e.target.value)}>
                      <option value="">Sélectionner...</option>
                      {managers.map(manager => (
                          <option key={manager.id} value={manager.id}>{manager.username}</option>
                      ))}
                  </select>
              </div>
              <div className="form-group">
                  <label>Coach :</label>
                  <select value={coachID} onChange={(e) => setCoach(e.target.value)}>
                      <option value="">Sélectionner...</option>
                      {coachs.map(coach => (
                          <option key={coach.id} value={coach.id}>{coach.username}</option>
                      ))}
                  </select>
              </div>
              <div className="form-group">
                  <label>Adresse :</label>
                  <select value={addressID} onChange={(e) => setAddress(e.target.value)}>
                      <option value="">Sélectionner...</option>
                      {addresss.map(address => (
                          <option key={address.id} value={address.id}>{address.name}</option>
                      ))}
                  </select>
              </div>
              <div className="form-group">
                  <label>Départements :</label>
                  <select multiple value={departmentID} onChange={(e) => setDepartment(Array.from(e.target.selectedOptions, option => option.value))}>
                      {departments.map(department => (
                          <option key={department.id} value={department.id}>{department.name}</option>
                      ))}
                  </select>
              </div>
              <div className="form-group">
                  <label>Employé concerné :</label>
                  <select value={employe_concerneID} onChange={(e) => setEmploye(e.target.value)}>
                      <option value="">Sélectionner...</option>
                      {employe_concernes.map(employe_concerne => (
                          <option key={employe_concerne.id} value={employe_concerne.id}>{employe_concerne.username}</option>
                      ))}
                  </select>
              </div>
              <div className="form-group">
    <label>Pièces jointes :</label>
    {piecesJointesUrl ? (
        <div>
            <input 
                type="text" 
                value={piecesJointesUrl} 
                onChange={(e) => setPiecesJointesUrl(e.target.value)} 
            />
            <a href={piecesJointesUrl} target="_blank" rel="noopener noreferrer">Consulter</a>
        </div>
    ) : (
        <input 
            type="file" 
            onChange={handleFileChange} 
        />
    )}
</div>
              <button className="btn btn-success mt-3" type="submit">Modifier Fiche</button>
              <Link to="/Dashboardfiche">
                  <button className="btn btn-gray mt-3">Retour au tableau de bord</button>
              </Link>
          </form>
      </div>
  </div>
);
}


export default UpdateFiche;
