import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ParticipantForm() {
  const [employes, setEmployes] = useState([]);
  const [formations, setFormations] = useState([]);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [employeId, setEmployeId] = useState('');
  const [formationId, setFormationId] = useState('');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_employe/`)
      .then(response => {
        setEmployes(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des employés :', error);
      });

    axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_formation/`)
      .then(response => {
        setFormations(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des formations :', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const participantData = {
      nom: nom,
      prenom: prenom,
      email: email,
      employe: employeId,
      formation_concerne: formationId
    };

    axios.post(`${process.env.REACT_APP_API_URL}/RH/create_participant/`, participantData)
      .then(response => {
        console.log('Participant ajouté avec succès :', response.data);
        setNom('');
        setPrenom('');
        setEmail('');
        setEmployeId('');
        setFormationId('');
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout du participant :', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nom :
        <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
      </label>
      <label>
        Prénom :
        <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
      </label>
      <label>
        Email :
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Employé :
        <select value={employeId} onChange={(e) => setEmployeId(e.target.value)}>
          <option value="">Sélectionner...</option>
          {employes.map(employe => (
            <option key={employe.id} value={employe.id}>{employe.nom}</option>
          ))}
        </select>
      </label>
      <label>
        Formation concernée :
        <select value={formationId} onChange={(e) => setFormationId(e.target.value)}>
          <option value="">Sélectionner...</option>
          {formations.map(formation => (
            <option key={formation.id} value={formation.id}>{formation.titre}</option>
          ))}
        </select>
      </label>
      <button type="submit">Ajouter Participant</button>
    </form>
  );
}

export default ParticipantForm;
