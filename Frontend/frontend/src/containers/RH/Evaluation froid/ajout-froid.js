import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../formation/FormationForm.css';
import { Navigate ,Link} from 'react-router-dom';
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

    },[]);

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
            'Accept':'*/*',
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
if(ajoutReussi){
    return <Navigate to="/DashboardEvaluationFroid" />;
}
return(
    <div className="form-container">
      <div className="form-card">
        <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
            <label>
              Nom de l'evaluation :
              <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
          </div>
          <div className="form-group">
            <label>
            date de realisation :
              <input type="date" name="date_realisation" value={date_realisation} onChange={(e) => setDate(e.target.value)} />
            </label>
          </div>
          <div className="form-group">
            <label>
            criteres :
              <input type="text" name="criteres" value={criteres} onChange={(e) => setCriteres(e.target.value)} />
            </label>
          </div>
          <div>
        <label>coefficients :</label>
        <select value={coefficients} onChange={(e) => setCoefficients(e.target.value)}>
          <option value="">Sélectionner...</option>
          <option value="1">évaluation insatisfaisante'</option>
          <option value="2">évaluation faible</option>
          <option value="3">évaluation moyenne</option>
          <option value="4">évaluation bonne</option>
          <option value="5">évaluation satisfaisante</option>
        </select>
      </div>
          <label>
            Formation à Évaluer  :
            <select value={formation} onChange={(e) => setFormation(e.target.value)}>
              <option value="">Sélectionner...</option>
              {formations.map(formation => (
                <option key={formation.id} value={formation.id}>{formation.intitule_formation}</option>
              ))}
            </select>
          </label>
          <div className="form-group">
                        <label>Pièces jointes :</label>
                        <input type="file" onChange={handleFileChange} />
                    </div>
          <button className="btn btn-success mt-3" type="submit">Evaluer</button>
                    <Link to="/DashboardEvaluationFroid">
                        <button className="btn btn-gray mt-3">Retour au tableau de bord</button>
                    </Link>

        </form>
      </div>
    </div>

);
}
export default FroidForm