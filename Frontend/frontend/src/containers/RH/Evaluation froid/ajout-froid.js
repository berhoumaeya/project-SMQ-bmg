import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import SubNavbarRH from '../../../components/SubNavbarRH';
import SidebarRH from '../../../components/SidebarRH';

function FroidForm() {
  const [name, setName] = useState('');
  const [date_realisation, setDate] = useState('');
  const [criteres, setCriteres] = useState('');
  const [coefficients, setCoefficients] = useState('');
  const [pieces_jointes, setPiecesJointes] = useState(null);
  const [formations, setFormations] = useState([]);
  const [formation, setFormation] = useState('');

  const [ajoutReussi, setAjoutReussi] = useState(false);

  // State for validation errors
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_formation/`)
      .then(response => {
        setFormations(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des formations :', error);
      });
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setPiecesJointes(selectedFile);
  };

  const validateForm = () => {
    const formErrors = {};
    if (!name) formErrors.name = 'Nom est requis.';
    if (!date_realisation) formErrors.date_realisation = 'Date de réalisation est requise.';
    if (!criteres) formErrors.criteres = 'Critères sont requis.';
    if (!coefficients) formErrors.coefficients = 'Coefficients sont requis.';
    if (!formation) formErrors.formation = 'Formation est requise.';
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
    formData.append('date_realisation', date_realisation);
    formData.append('criteres', criteres);
    formData.append('coefficients', coefficients);
    formData.append('formation', formation);
    if (pieces_jointes) {
      formData.append('pieces_jointes', pieces_jointes);
    }

    const headers = {
      'Accept': '*/*',
      'Content-Type': 'multipart/form-data',
      'X-CSRFToken': Cookies.get('csrftoken'),
    };

    axios.post(`${process.env.REACT_APP_API_URL}/RH/create_froid/`, formData, { headers })
      .then(response => {
        console.log('Ajout succès', response.data);
        setName('');
        setDate('');
        setCriteres('');
        setCoefficients('');
        setFormation('');
        setPiecesJointes(null);
        setErrors({});
        setAjoutReussi(true);
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout', error);
      });
  };

  if (ajoutReussi) {
    return <Navigate to="/DashboardEvaluationFroid " />;
  }

  return (
    <>
    <SubNavbarRH />
    <main style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#eeeeee' }}>   
    <SidebarRH />   
      <div className="container ajout-form">
       
        <form onSubmit={handleSubmit} className="row">
          <h4>Informations sur l'évaluation à froid</h4>
          <div className="col-md-6">
            <div className="form-label">
              <label className="form-label">Nom <span className="required">*</span>:</label>
              <input type="text" className="form-control" placeholder="Nom*" value={name} onChange={(e) => setName(e.target.value)} />
              {errors.name && <div className="error">{errors.name}</div>}
            </div>
            <div className="form-label">
              <label className="form-label">Date de réalisation <span className="required">*</span>:</label>
              <input type="date" className="form-control" value={date_realisation} onChange={(e) => setDate(e.target.value)} />
              {errors.date_realisation && <div className="error">{errors.date_realisation}</div>}
            </div>
            <div className="form-label">
              <label className="form-label">Critères <span className="required">*</span>:</label>
              <input type="text" className="form-control" placeholder="Critères*" value={criteres} onChange={(e) => setCriteres(e.target.value)} />
              {errors.criteres && <div className="error">{errors.criteres}</div>}
            </div>
          </div>
          <div className="col-md-6">
          <div className="form-label">
              <label className="form-label">Coefficients :</label>
              <select className="form-control" value={coefficients} onChange={(e) => setCoefficients(e.target.value)}>
                <option value="">Sélectionner...</option>
                <option value="1">évaluation insatisfaisante</option>
                <option value="2">évaluation faible</option>
                <option value="3">évaluation moyenne</option>
                <option value="4">évaluation bonne</option>
                <option value="5">évaluation satisfaisante</option>
              </select>


              {errors.coefficients && <div className="error">{errors.coefficients}</div>}
            </div>
            <div className="form-label">
              <label className="form-label">Formation <span className="required">*</span>:</label>
              <select className="form-control" value={formation} onChange={(e) => setFormation(e.target.value)}>
                <option value="">Sélectionner...</option>
                {formations.map(formation => (
                  <option key={formation.id} value={formation.id}>
                    {formation.nom}
                  </option>
                ))}
              </select>
              {errors.formation && <div className="error">{errors.formation}</div>}
            </div>
            <div className="form-label">
              <label className="form-label">Pièces jointes :</label>
              <input type="file" className="form-control" onChange={handleFileChange} />
            </div>
          </div>
          </form>
          <div className="contact-image">
          <div className="button-container">
            <button className="button-add" type="submit" onClick={handleSubmit}>Ajouter une évaluation à froid</button>
          </div>
        </div>
      </div>
    </main></>
  );
}

export default FroidForm;
