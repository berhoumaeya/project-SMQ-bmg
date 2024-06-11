import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TimeZoneSelect from 'react-timezone-select';
import './FicheForm.css';
import { Navigate ,Link} from 'react-router-dom';
import Cookies from 'js-cookie';

function FicheForm() {
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
    const [timezone_field, setTimezoneField] = useState('UTC');
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
    const [employe_concernes, setEmployes] = useState([]);
    const [employe_concerneID, setEmploye] = useState('');
    const [ajoutReussi, setAjoutReussi] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_employe_fiche/`)
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
    }, []);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setPiecesJointes(selectedFile);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!name) {
            alert('Veuillez saisir votre nom.');
            return;
        }
    
        if (!work_mobile) {
            alert('Veuillez saisir votre numéro de téléphone mobile.');
            return;
        } else if (!/^\d+$/.test(work_mobile)) {
            alert('Le numéro de téléphone mobile ne doit contenir que des chiffres.');
            return;
        }
    
        if (!work_phone) {
            alert('Veuillez saisir votre numéro de téléphone mobile.');
            return;
        } else if (!/^\d+$/.test(work_phone)) {
            alert('Le numéro de téléphone mobile ne doit contenir que des chiffres.');
            return;
        }
    
        if (!work_email) {
            alert('Veuillez saisir votre adresse e-mail professionnelle.');
            return;
        }
    
        if (!work_addressID) {
            alert('Veuillez sélectionner votre adresse de travail.');
            return;
        }
    
        if (!work_location) {
            alert('Veuillez saisir votre lieu de travail.');
            return;
        }
    
        if (!cin) {
            alert('Veuillez saisir votre numéro CIN.');
            return;
        }
        if (!/^\d{8}$/.test(cin)) {
            alert('Le numéro CIN doit contenir exactement 8 chiffres.');
            return;
        }
    
        if (!cnss) {
            alert('Veuillez saisir votre numéro CNSS.');
            return;
        }
    
        if (!field_of_study) {
            alert('Veuillez saisir votre domaine d\'étude.');
            return;
        }
    
        if (!home_work_distance) {
            alert('Veuillez saisir la distance entre votre domicile et votre lieu de travail.');
            return;
        }
        const distance = parseFloat(home_work_distance);
        if (isNaN(distance)) {
            alert('La distance doit être un nombre décimal.');
            return;
}
    
        if (!school) {
            alert('Veuillez saisir le nom de votre école/université.');
            return;
        }
    
        if (!certificate_level) {
            alert('Veuillez saisir votre niveau de certification.');
            return;
        }
    
        if (!emergency_phone) {
            alert('Veuillez saisir un numéro de téléphone d\'urgence.');
            return;
        }
    
        if (!emergency_contact) {
            alert('Veuillez saisir un contact d\'urgence.');
            return;
        }
    
        if (!bank_account_number) {
            alert('Veuillez saisir votre numéro de compte bancaire.');
            return;
        }
    
        if (!working_hours) {
            alert('Veuillez saisir votre nombre d\'heures de travail.');
            return;
        }

        const wh = parseFloat(working_hours);
        if (isNaN(wh)) {
            alert('heure de travail doit être un nombre décimal.');
            return;
        }
    
        if (!martial_status) {
            alert('Veuillez saisir votre statut marital.');
            return;
        }
    
        if (!job_positionID) {
            alert('Veuillez sélectionner votre poste.');
            return;
        }
    
        if (!managerID) {
            alert('Veuillez sélectionner votre manager.');
            return;
        }
    
        if (!coachID) {
            alert('Veuillez sélectionner votre coach.');
            return;
        }
    
        if (!addressID) {
            alert('Veuillez sélectionner votre adresse.');
            return;
        }
    
        if (departmentID.length === 0) {
            alert('Veuillez sélectionner au moins un département.');
            return;
        }
    
        if (!employe_concerneID) {
            alert('Veuillez sélectionner l\'employé concerné.');
            return;
        }
        
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
        formData.append('timezone_field', timezone_field);
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
        }

        const headers = {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': Cookies.get('csrftoken')
        };

        axios.post(`${process.env.REACT_APP_API_URL}/RH/create_fiche_employe/`, formData, { headers: headers })
            .then(response => {
                console.log('Fiche ajoutée avec succès :', response.data);
                setName('');
                setWorkMobile('');
                setWorkPhone('');
                setWorkEmail('');
                setWorkAddress('');
                setWorkLocation('');
                setCin('');
                setCnss('');
                setFieldOfStudy('');
                setSchool('');
                setCertificateLevel('');
                setEmergencyPhone('');
                setEmergencyContact('');
                setHomeWorkDistance('');
                setBankAccountNumber('');
                setWorkingHours('');
                setTimezoneField('UTC');
                setMartialStatus('');
                setJobPosition('');
                setManager('');
                setCoach('');
                setAddress('');
                setDepartment([]);
                setEmploye('');
                setAjoutReussi(true);
            })
            .catch(error => {
                if (error.response.status === 400 && error.response.data && error.response.data.work_email) { 
                    alert('L\'adresse e-mail professionnelle est déjà utilisée. Veuillez saisir une autre adresse e-mail.');
                } else {
                    console.error('Erreur lors de l\'ajout de la fiche :', error);
                    alert('Une erreur est survenue lors de l\'ajout de la fiche. Veuillez réessayer.');
                }
            });
    };

    if (ajoutReussi) {
        return <Navigate to="/Dashboardfiche" />;
    }

    return (
        <div className="form-container">
        <div className="form-card">
        <h3>Ajouter une Fiche</h3>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label>Nom Fiche:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
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
                    <label>Fuseau horaire :</label>
                    <TimeZoneSelect value={timezone_field} onChange={(value) => setTimezoneField(value)} />
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
                    <label>Pièces jointes :</label>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <div className="button-group">
                    <button className="btn btn-success mt-3" type="submit">Ajouter Fiche</button>
                    <Link to="/Dashboardfiche" className="btn btn-gray mt-3">Retour au tableau de bord</Link>
                </div>
            </form>
        </div>
    </div>
    
    );
}

export default FicheForm;
