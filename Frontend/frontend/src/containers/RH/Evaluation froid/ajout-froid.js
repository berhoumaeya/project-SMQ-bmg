import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../formation/FormationForm.css';
import { Navigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

function FroidForm() {

  const [name, setName] = useState('');
  const [date_realisation, setDate] = useState('');
  const [criteres, setCriteres] = useState('');
  const [coefficients, setCoefficients] = useState('');
  const [pieces_jointes, setPiecesJointes] = useState(null);
  const [formations, setFormations] = useState([]);
  const [formation, setFormation] = useState('');



  const [ajoutReussi, setAjoutReussi] = useState(false);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('date_realisation', date_realisation);
    formData.append('criteres', criteres);
    formData.append('coefficients', coefficients);
    if (pieces_jointes) {
      formData.append('pieces_jointes', pieces_jointes);
    }
    formData.append('formation', formation);

    const headers = {
      'Accept': '*/*',
      'Content-Type': 'multipart/form-data',
      'X-CSRFToken': Cookies.get('csrftoken')
    };

    axios.post(`${process.env.REACT_APP_API_URL}/RH/create_evaluation_froid/`, formData, { headers: headers })
      .then(response => {
        console.log('Evaluation ajouté avec succès :', response.data);
        setName('');
        setDate('');
        setCriteres('');
        setCoefficients('');
        setFormation('');

        setAjoutReussi(true);

      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout du evaluation :', error);
      });
  };
  if (ajoutReussi) {
    return <Navigate to="/DashboardEvaluationFroid" />;
  }
  return (
    <main style={{ backgroundColor: '#5585b5', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div class="container ajout-form">
        <div class="contact-image ">
          <img src="/images/add.png" alt="rocket_contact" />
          <div class="button-container">
            <Link to="/DashboardEvaluationFroid">
              <button className="retour">Retour au tableau de bord</button>
            </Link>   <button className="button-add" type="submit">Evaluer</button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="row">
          <div class="col-md-6">
            <div className="form-label">
              <label className="form-label">
                Nom de l'évaluation :
              </label>
              <input type="text" className="form-control" placeholder='Nom de évaluation*' name="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-label">
              <label className="form-label">
                Date de réalisation :
              </label>
              <input type="date" className="form-control" placeholder='Date de réalisation*' name="date_realisation" value={date_realisation} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="form-label">
              <label className="form-label">
                Critéres :
              </label>
              <input type="text" className="form-control" placeholder='Critéres*' name="criteres" value={criteres} onChange={(e) => setCriteres(e.target.value)} />
            </div>
          </div>
          <div class="col-md-6">
            <div className="form-label">
              <label className="form-label">Coefficients :</label>
              <select className="form-control" value={coefficients} onChange={(e) => setCoefficients(e.target.value)}>
                <option value="">Sélectionner...</option>
                <option value="1">évaluation insatisfaisante'</option>
                <option value="2">évaluation faible</option>
                <option value="3">évaluation moyenne</option>
                <option value="4">évaluation bonne</option>
                <option value="5">évaluation satisfaisante</option>
              </select>
            </div>
            <div className="form-label">
              <label className="form-label">
                Formation à Évaluer  : </label>
              <select className="form-control" value={formation} onChange={(e) => setFormation(e.target.value)}>
                <option value="">Sélectionner...</option>
                {formations.map(formation => (
                  <option key={formation.id} value={formation.id}>{formation.intitule_formation}</option>
                ))}
              </select>
            </div>
            <div className="form-label">
              <label className="form-label">Pièces jointes :</label>
              <input className="form-control" type="file" onChange={handleFileChange} />
            </div>
          </div>
        </form>
      </div >
    </main >


  );
}
export default FroidForm