import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import SubNavbarRH from '../../../components/SubNavbarRH';
import SidebarRH from '../../../components/SidebarRH';

function ChaudForm() {
  const [name, setName] = useState('');
  const [date_realisation, setDate] = useState('');
  const [coefficients, setCoefficients] = useState('');
  const [pieces_jointes, setPiecesJointes] = useState(null);
  const [formations, setFormations] = useState([]);
  const [formation, setFormation] = useState('');
  const [criteres, setCriteres] = useState([]);
  const [selectedCritere, setSelectedCritere] = useState('');
  const [ajoutReussi, setAjoutReussi] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_formation/`)
      .then(response => setFormations(response.data))
      .catch(error => console.error('Erreur lors de la récupération des formations :', error));

    setCriteres([
      'Pertinence des contenus',
      'Qualité des supports pédagogiques',
      'Pédagogie de l’intervenant',
      'Niveau d’interaction et d’engagement des participants'
    ]);
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setPiecesJointes(selectedFile);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Nom de l\'évaluation est requis';
    if (!date_realisation) newErrors.date_realisation = 'Date de réalisation est requise';
    if (!selectedCritere) newErrors.criteres = 'Critère d’évaluation est requis';
    if (!coefficients) newErrors.coefficients = 'Coefficients sont requis';
    if (!formation) newErrors.formation = 'Formation à évaluer est requise';
    return newErrors;
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
    formData.append('criteres', selectedCritere);
    formData.append('coefficients', coefficients);
    if (pieces_jointes) formData.append('pieces_jointes', pieces_jointes);
    formData.append('formation', formation);

    const headers = {
      'Accept': '*/*',
      'Content-Type': 'multipart/form-data',
      'X-CSRFToken': Cookies.get('csrftoken')
    };

    axios.post(`${process.env.REACT_APP_API_URL}/RH/create_evaluation_chaud/`, formData, { headers })
      .then(response => {
        console.log('Évaluation ajoutée avec succès :', response.data);
        setName('');
        setDate('');
        setCoefficients('');
        setFormation('');
        setSelectedCritere('');
        setAjoutReussi(true);
      })
      .catch(error => console.error('Erreur lors de l\'ajout de l\'évaluation :', error));
  };

  if (ajoutReussi) {
    return <Navigate to="/DashboardEvaluationChaud" />;
  }

  return (
    <>
      <SubNavbarRH />
      <main style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#eeeeee' }}>
        <SidebarRH />
        <div class="container ajout-form">        
          
      
          <form onSubmit={handleSubmit} className="row">
          <div className="button-container">
            <button className="button-add" type="submit" onClick={handleSubmit}>Evaluer</button>
          </div>
          <h4>Ajout d'une évaluation à chaud</h4>
          <div className="col-md-6">
              <div className="form-label">
                <label className="form-label">Nom de l'évaluation :</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nom de l'évaluation*"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>
              <div className="form-label">
                <label className="form-label">Date de réalisation :</label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Date de réalisation*"
                  name="date_realisation"
                  value={date_realisation}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
                {errors.date_realisation && <span className="error">{errors.date_realisation}</span>}
              </div>
              <div className="form-label">
                <label className="form-label">Critère d’évaluation :</label>
                <select
                  className="form-control"
                  value={selectedCritere}
                  onChange={(e) => setSelectedCritere(e.target.value)}
                  required
                >
                  <option value="">Sélectionner un critère...</option>
                  {criteres.map(criteres => (
                    <option key={criteres} value={criteres}>{criteres}</option>
                  ))}
                </select>
                {errors.criteres && <span className="error">{errors.criteres}</span>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-label">
                <label className="form-label">Coefficients :</label>
                <select
                  className="form-control"
                  value={coefficients}
                  onChange={(e) => setCoefficients(e.target.value)}
                  required
                >
                  <option value="">Sélectionner...</option>
                  <option value="1">Évaluation insatisfaisante</option>
                  <option value="2">Évaluation faible</option>
                  <option value="3">Évaluation moyenne</option>
                  <option value="4">Évaluation bonne</option>
                  <option value="5">Évaluation satisfaisante</option>
                </select>
                {errors.coefficients && <span className="error">{errors.coefficients}</span>}
              </div>
              <div className="form-label">
                <label className="form-label">Formation à Évaluer :</label>
                <select
                  className="form-control"
                  value={formation}
                  onChange={(e) => setFormation(e.target.value)}
                  required
                >
                  <option value="">Sélectionner...</option>
                  {formations.map(formation => (
                    <option key={formation.id} value={formation.id}>{formation.intitule_formation}</option>
                  ))}
                </select>
                {errors.formation && <span className="error">{errors.formation}</span>}
              </div>
              <div className="form-label">
                <label className="form-label">Pièces jointes :</label>
                <input
                  className="form-control"
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            </form>     
        </div>
      </main>
    </>
  );
}

export default ChaudForm;
