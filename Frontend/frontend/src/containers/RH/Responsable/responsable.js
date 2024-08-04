/*

import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom'; 
import axios from 'axios';
import Cookies from 'js-cookie';
import "../Detail.css"

const ResponsableDetail = () => {
  const { id } = useParams();
  const [formationsnames, setformationsnames] = useState([]);
  const [responsable, setFormation] = useState(null);
  const [deleteReussi, setdeleteReussi] = useState(false);

  useEffect(() => {
    const fetchFormation = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/RH/responsable/${id}/`);
        setFormation(response.data);

        const formationsDetails = await Promise.all(response.data.formations_concernees.map(async (formationId) => {
          const formationResponse = await axios.get(`${process.env.REACT_APP_API_URL}/RH/formation/${formationId}/`);
          return formationResponse.data.intitule_formation;
      }));
      setformationsnames(formationsDetails);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de responsable:', error);
      }
    };

    fetchFormation();
  }, [id]);
  const handleDelete = async () => {
    const headers = {
      'Accept': '*//*',
'Content-Type': 'application/json',
'X-CSRFToken': Cookies.get('csrftoken'),
};
try {
  await axios.delete(`${process.env.REACT_APP_API_URL}/RH/delete_responsable/${id}/`,{headers:headers});
  setdeleteReussi(true)
} catch (error) {
  console.error('Erreur lors de la suppression de l\'employé:', error);
}
};
if (deleteReussi){
return <Navigate to="/Dashboardresponsable"/>
}
return (
  <div>
      {responsable ? (
          <div className="card" >
              <div className="card-body">
                  <p><strong>ID :</strong> {responsable.id}</p>
                  <p><strong>Nom responsable :</strong> {responsable.nom}</p>
                  <p><strong>Prenom responsable :</strong> {responsable.prenom}</p>
                  <p><strong>Nom d'utilisateur responsable  :</strong> {responsable.username}</p>
                  <p><strong>Formation concernée responsable  :</strong>{formationsnames.join(', ')}</p>
                  <p><strong>Email de responsable :</strong> {responsable.email}</p>
                  <p><strong>Est un utilisateur :</strong> {responsable.is_user ? 'Oui' : 'Non'}</p>
                  <p><strong>Date de création :</strong> {responsable.created_at}</p>
                  <p><strong>Créé par :</strong> {responsable.created_by}</p>
                  <p><strong>Pièces jointes :</strong> {responsable.pieces_jointes ? <a href={`${process.env.REACT_APP_API_URL}/RH/piece_jointe_responsable/${id}/`} target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>
                  <p><strong>Modifié par :</strong> {responsable.updated_by}</p>
                  <p><strong>Date de modification :</strong> {responsable.updated_at}</p>
              </div>
              <br />
              <a href="/Dashboardresponsable"><button className="btn-gray">Retour</button></a>&nbsp;
              <Link to={`/update-responsable/${responsable.id}`}><button className="btn-blue">Modifier</button></Link>&nbsp;
              <button className="btn btn-danger" onClick={handleDelete}>Supprimer</button>
          </div>
      ):(
          <p>chargement ... </p>
      )}
  </div>
);
};

export default ResponsableDetail;

*/
import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { GrEdit, GrTrash } from 'react-icons/gr';
import { IoMdArrowRoundBack } from 'react-icons/io';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../Detail.css';

// Sample data
const sampleResponsables = [
  {
    id: 1,
    nom: 'Dupont',
    prenom: 'Jean',
    username: 'jdupont',
    email: 'jean.dupont@example.com',
    is_user: true,
    created_at: '2024-01-01',
    created_by: 'Admin',
    updated_by: 'Admin',
    updated_at: '2024-01-10',
    formations_concernees: [1, 2],
    pieces_jointes: true
  },
  {
    id: 2,
    nom: 'Martin',
    prenom: 'Marie',
    username: 'mmartin',
    email: 'marie.martin@example.com',
    formations_concernees: [1, 2],
    created_at: '2024-01-01',
    created_by: 'Admin',
    updated_by: 'Admin',
    updated_at: '2024-01-10',
    pieces_jointes: true
  },
  {
    id: 3,
    nom: 'Durand',
    prenom: 'Paul',
    username: 'pdurand',
    email: 'paul.durand@example.com',
    formations_concernees: [2, 3],
    created_at: '2024-02-01',
    created_by: 'Admin',
    updated_by: 'Admin',
    updated_at: '2024-02-10',
    pieces_jointes: false
  }
];

const sampleFormations = [
  {
    id: 1,
    intitule_formation: 'Formation React'
  },
  {
    id: 2,
    intitule_formation: 'Formation Node.js'
  },
  {
    id: 3,
    intitule_formation: 'Formation UX/UI'
  }
];

const ResponsableDetail = () => {
  const { id } = useParams();
  const [responsable, setResponsable] = useState(null);
  const [formationsnames, setFormationsnames] = useState([]);
  const [deleteReussi, setDeleteReussi] = useState(false);
  const [updateReussi, setUpdateReussi] = useState(false);
  const [piecesJointes, setPiecesJointes] = useState(null);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [is_user, setIsUser] = useState(false);

  useEffect(() => {
    const fetchedResponsable = sampleResponsables.find(r => r.id === parseInt(id));
    setResponsable(fetchedResponsable);

    if (fetchedResponsable) {
      setNom(fetchedResponsable.nom);
      setPrenom(fetchedResponsable.prenom);
      setEmail(fetchedResponsable.email);
      setUsername(fetchedResponsable.username);
      setIsUser(fetchedResponsable.is_user);

      const fetchedFormations = sampleFormations.filter(f => fetchedResponsable.formations_concernees.includes(f.id));
      setFormationsnames(fetchedFormations.map(f => f.intitule_formation));
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/RH/delete_responsable/${id}/`, {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken'),
        }
      });
      setDeleteReussi(true);
    } catch (error) {
      console.error('Erreur lors de la suppression du responsable:', error);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setPiecesJointes(selectedFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('prenom', prenom);
    formData.append('email', email);
    formData.append('username', username);
    formData.append('is_user', is_user ? 'True' : 'False');
    if (piecesJointes) {
      formData.append('pieces_jointes', piecesJointes);
    }

    const headers = {
      'Accept': '*/*',
      'Content-Type': 'multipart/form-data',
      'X-CSRFToken': Cookies.get('csrftoken')
    };

    axios.put(`${process.env.REACT_APP_API_URL}/RH/update_responsable_formation/${id}/`, formData, { headers: headers })
      .then(response => {
        console.log('Responsable mis à jour avec succès :', response.data);
        setUpdateReussi(true);
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour du responsable:', error);
      });
  };

  if (deleteReussi) {
    return <Navigate to="/DashboardResponsable" />;
  }

  if (updateReussi) {
    return <Navigate to={`/responsable/${id}`} />;
  }

  return (
    <main style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
          </div>
          <div className="col-xl-8">
            <div className="card mb-4">
              <div className="card-header-">Account Details</div>
              <div className="card-body">
                {responsable ? (
                  <form onSubmit={handleSubmit} className="row">
                    
                    <div className="row gx-3 mb-3">
                      <div className="col-md-6">
                        <label className="small mb-1">Nom responsable</label>
                        <input className="form-control" type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
                      </div>
                      <div className="col-md-6">
                        <label className="small mb-1">Prénom responsable</label>
                        <input className="form-control" type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                      </div>
                    </div>
                    <div className="row gx-3 mb-3">
                      <div className="col-md-6">
                        <label className="small mb-1">Nom d'utilisateur responsable</label>
                        <input className="form-control" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                      </div>
                      <div className="col-md-6">
                        <label className="small mb-1">Email de responsable</label>
                        <input className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="small mb-1">Formations concernées responsable</label>
                      <input className="form-control" type="text" value={formationsnames.join(', ')} readOnly />
                    </div>
                    <div className="mb-3">
                      <label className="small mb-1">Est un utilisateur</label>
                      <input
                        type="checkbox"
                        checked={is_user}
                        onChange={(e) => setIsUser(e.target.checked)}
                      />
                    </div>
                    <div className="row gx-3 mb-3">
                      <div className="col-md-6">
                        <label className="small mb-1">Date de création</label>
                        <input className="form-control" type="text" value={responsable.created_at} readOnly />
                      </div>
                      <div className="col-md-6">
                        <label className="small mb-1">Créé par</label>
                        <input className="form-control" type="text" value={responsable.created_by} readOnly />
                      </div>
                    </div>
                    <div className="row gx-3 mb-3">
                      <div className="col-md-6">
                        <label className="small mb-1">Modifié par</label>
                        <input className="form-control" type="text" value={responsable.updated_by} readOnly />
                      </div>
                      <div className="col-md-6">
                        <label className="small mb-1">Date de modification</label>
                        <input className="form-control" type="text" value={responsable.updated_at} readOnly />
                      </div>
                    </div>
                   

                    <div className="d-flex justify-content-end mt-3">
                      <Link to="/DashboardResponsable" className="btn btn-secondary me-2">
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
    </main>
  );
};

export default ResponsableDetail;