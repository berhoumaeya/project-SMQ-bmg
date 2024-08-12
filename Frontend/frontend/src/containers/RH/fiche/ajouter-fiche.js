import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TimeZoneSelect from 'react-timezone-select';
import './FicheForm.css';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import SubNavbarRH from '../../../components/SubNavbarRH';
import SidebarRH from '../../../components/SidebarRH';

function FicheForm() {
    const [errors, setErrors] = useState({});
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
    const validateForm = () => {
        const formErrors = {};
        if (!name) formErrors.name = 'Nom est requis.';
        if (!work_mobile) formErrors.work_mobile = 'Mobile est requis.';
        if (!work_phone) formErrors.work_phone = 'Téléphone est requis.';
        if (!work_email) formErrors.work_email = 'Email est requis.';
        if (!work_addressID) formErrors.work_address = 'Adresse de travail est requis.';
        if (!work_location) formErrors.work_location = 'Localisation de travail est requis.';
        if (!cin) formErrors.cin = 'CIN est requis.';
        if (!cnss) formErrors.cnss = 'CNSS est requis.';
        if (!field_of_study) formErrors.field_of_study = 'Domaine d\'étude est requis.';
        if (!home_work_distance) formErrors.home_work_distance = 'Distance domicile-travail est requis.';
        if (!school) formErrors.school = 'Établissement scolaire est requis.';
        if (!certificate_level) formErrors.certificate_level = 'Niveau de certificat est requis.';
        if (!emergency_contact) formErrors.emergency_contact = 'Contact d\'urgence est requis.';
        if (!emergency_phone) formErrors.emergency_phone = 'Téléphone d\'urgence est requis.';
        if (!bank_account_number) formErrors.bank_account_number = 'Numéro de compte bancaire est requis.';
        if (!working_hours) formErrors.working_hours = 'Heures de travail est requis.';
        if (!martial_status) formErrors.martial_status = 'État civil est requis.';
        if (!job_positionID) formErrors.job_position = 'Poste est requis.';
        if (!managerID) formErrors.manager = 'Manager est requis.';
        if (!coachID) formErrors.coach = 'Coach est requis.';
        if (!addressID) formErrors.address = 'Adresse est requis.';
        if (departmentID.length === 0) formErrors.department = 'Départements est requis.';
        if (!employe_concerneID) formErrors.employe_concerne = 'Employé concerné est requis.';
        if (!pieces_jointes) formErrors.pieces_jointes = 'Pièces jointes est requis.';
        if (!timezone_field) formErrors.timezone_field = 'Fuseau horaire est requis.';
        return formErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
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
        <>
            <SubNavbarRH />
            <main style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#eeeeee' }}>
            <SidebarRH />
                <div class="container ajout-form">
                    
                    <form onSubmit={handleSubmit} className="row">

                        <div class="col-md-6">
                            <div className="form-label">
                                <label className="form-label">Nom Fiche:</label>
                                <input type="text" className="form-control" placeholder='Nom de la fiche*' value={name} onChange={(e) => setName(e.target.value)} />
                                {errors.name && <p className="error">{errors.name}</p>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">Employé concerné :</label>
                                <select className="form-control" value={employe_concerneID} onChange={(e) => setEmploye(e.target.value)}>
                                    <option value="">Sélectionner...</option>
                                    {employe_concernes.map(employe_concerne => (
                                        <option key={employe_concerne.id} value={employe_concerne.id}>{employe_concerne.username}</option>
                                    ))}
                                </select>
                                {errors.employe_concerne && <p className="error">{errors.employe_concerne}</p>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">Mobile :</label>
                                <input type="text" className="form-control" placeholder='Mobile*' value={work_mobile} onChange={(e) => setWorkMobile(e.target.value)} />
                                {errors.work_mobile && <p className="error">{errors.work_mobile}</p>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">Téléphone :</label>
                                <input type="text" className="form-control" placeholder='Téléphone*' value={work_phone} onChange={(e) => setWorkPhone(e.target.value)} />
                                {errors.work_phone && <p className="error">{errors.work_phone}</p>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">Email :</label>
                                <input type="email" className="form-control" placeholder='Email*' value={work_email} onChange={(e) => setWorkEmail(e.target.value)} />
                                {errors.work_email && <p className="error">{errors.work_email}</p>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">Adresse de travail :</label>
                                <select className="form-control" value={work_addressID} onChange={(e) => setWorkAddress(e.target.value)}>
                                    <option value="">Sélectionner...</option>
                                    {addresss.map(address => (
                                        <option key={address.id} value={address.id}>{address.name}</option>
                                    ))}
                                </select>
                                {errors.work_address && <p className="error">{errors.work_address}</p>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">Localisation de travail :</label>
                                <input type="text" className="form-control" placeholder='Localisation de travail*' value={work_location} onChange={(e) => setWorkLocation(e.target.value)} />
                                {errors.work_location && <p className="error">{errors.work_location}</p>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">CIN :</label>
                                <input type="text" className="form-control" placeholder='CIN*' value={cin} onChange={(e) => setCin(e.target.value)} />
                                {errors.cin && <p className="error">{errors.cin}</p>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">CNSS :</label>
                                <input type="text" className="form-control" placeholder='CNSS*' value={cnss} onChange={(e) => setCnss(e.target.value)} />
                                {errors.cnss && <p className="error">{errors.cnss}</p>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">Domaine d'étude :</label>
                                <input type="text" className="form-control" placeholder='Domaine étude*' value={field_of_study} onChange={(e) => setFieldOfStudy(e.target.value)} />
                                {errors.field_of_study && <p className="error">{errors.field_of_study}</p>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">Distance domicile-travail :</label>
                                <input type="text" className="form-control" placeholder='Distance domicile-travail*' value={home_work_distance} onChange={(e) => setHomeWorkDistance(e.target.value)} />
                                {errors.home_work_distance && <p className="error">{errors.home_work_distance}</p>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">Établissement scolaire :</label>
                                <input type="text" className="form-control" placeholder='Établissement scolaire*' value={school} onChange={(e) => setSchool(e.target.value)} />
                                {errors.school && <p className="error">{errors.school}</p>}
                            </div>

                            <div className="form-label">
                                <label className="form-label">Niveau de certificat :</label>
                                <input type="text" className="form-control" placeholder='Niveau de certificat*' value={certificate_level} onChange={(e) => setCertificateLevel(e.target.value)} />
                                {errors.certificate_level && <p className="error">{errors.certificate_level}</p>}
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div className="form-label">
                                <label className="form-label">Contact d'urgence :</label>
                                <input type="text" className="form-control" placeholder='Contact en cas urgence*' value={emergency_contact} onChange={(e) => setEmergencyContact(e.target.value)} />
                                {errors.emergency_contact && <p className="error">{errors.emergency_contact}</p>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">Téléphone d'urgence :</label>
                                <input type="text" className="form-control" placeholder='Téléphone en cas urgence*' value={emergency_phone} onChange={(e) => setEmergencyPhone(e.target.value)} />
                                {errors.emergency_phone && <p className="error">{errors.emergency_phone}</p>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">Numéro de compte bancaire :</label>
                                <input type="text" className="form-control" placeholder='Numéro de compte bancaire*' value={bank_account_number} onChange={(e) => setBankAccountNumber(e.target.value)} />
                                {errors.bank_account_number && <p className="error">{errors.bank_account_number}</p>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">Heures de travail :</label>
                                <input type="text" className="form-control" placeholder='Heures de travail*' value={working_hours} onChange={(e) => setWorkingHours(e.target.value)} />
                                {errors.working_hours && <p className="error">{errors.working_hours}</p>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">Fuseau horaire :</label>
                                {errors.timezone_field && <p className="error">{errors.timezone_field}</p>}

                                <TimeZoneSelect className="form-control" value={timezone_field} onChange={(value) => setTimezoneField(value)} />
                            </div>
                            <div className="form-label">
                                <label className="form-label">État civil :</label>
                                <select className="form-control" value={martial_status} onChange={(e) => setMartialStatus(e.target.value)}>
                                    <option value="">Sélectionner...</option>
                                    <option value="C">Célibataire</option>
                                    <option value="M">Marié</option>
                                    <option value="D">Divorcé</option>
                                    <option value="V">Veuf</option>
                                </select>
                                {errors.martial_status && <p className="error">{errors.martial_status}</p>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">Poste :</label>
                                <select className="form-control" value={job_positionID} onChange={(e) => setJobPosition(e.target.value)}>
                                    <option value="">Sélectionner...</option>
                                    {job_positions.map(job_position => (
                                        <option key={job_position.id} value={job_position.id}>{job_position.title}</option>
                                    ))}
                                </select>
                                {errors.job_position && <p className="error">{errors.job_position}</p>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">Manager :</label>
                                <select className="form-control" value={managerID} onChange={(e) => setManager(e.target.value)}>
                                    <option value="">Sélectionner...</option>
                                    {managers.map(manager => (
                                        <option key={manager.id} value={manager.id}>{manager.username}</option>
                                    ))}
                                </select>
                                {errors.manager && <p className="error">{errors.manager}</p>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">Coach :</label>
                                <select className="form-control" value={coachID} onChange={(e) => setCoach(e.target.value)}>
                                    <option value="">Sélectionner...</option>
                                    {coachs.map(coach => (
                                        <option key={coach.id} value={coach.id}>{coach.username}</option>
                                    ))}
                                </select>
                                {errors.coach && <p className="error">{errors.coach}</p>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">Adresse :</label>
                                <select className="form-control" value={addressID} onChange={(e) => setAddress(e.target.value)}>
                                    <option value="">Sélectionner...</option>
                                    {addresss.map(address => (
                                        <option key={address.id} value={address.id}>{address.name}</option>
                                    ))}
                                </select>
                                {errors.address && <p className="error">{errors.address}</p>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">Départements :</label>
                                <select className="form-control" multiple value={departmentID} onChange={(e) => setDepartment(Array.from(e.target.selectedOptions, option => option.value))}>
                                    {departments.map(department => (
                                        <option key={department.id} value={department.id}>{department.name}</option>
                                    ))}
                                </select>
                                {errors.department && <p className="error">{errors.department}</p>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">Pièces jointes :</label>
                                <input type="file" className="form-control" onChange={handleFileChange} />
                                {errors.pieces_jointes && <p className="error">{errors.pieces_jointes}</p>}
                            </div>
                        </div>
                        
                    </form>
                    <div class="contact-image ">
                        <div class="button-container">
                            <button className="button-add" type="submit" onClick={handleSubmit}>Ajouter une fiche</button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default FicheForm;
