/*import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom'; 
import axios from 'axios';
import Cookies from 'js-cookie';
import "../Detail.css"

const FroidDetail = () => {
  const { id } = useParams();
  const [froid, setFormation] = useState(null);
  const [formation, setForm] = useState('');
  const [deleteReussi, setdeleteReussi] = useState(false);

  useEffect(() => {
    const fetchFormation = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/RH/evaluation_froid/${id}/`);
        setFormation(response.data);

        const responseForm = await axios.get(`${process.env.REACT_APP_API_URL}/RH/formation/${response.data.formation}/`);
        setForm(responseForm.data.intitule_formation);
      } catch (error) {
        console.error('Erreur lors de la récupération des données des evaluation:', error);
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
        await axios.delete(`${process.env.REACT_APP_API_URL}/RH/delete_evaluation_froid/${id}/`,{headers:headers});
        setdeleteReussi(true)
    } catch (error) {
        console.error('Erreur lors de la suppression de la evaluation:', error);
    }
};
if (deleteReussi){
  return <Navigate to="/Dashboardfiche"/>
}
    return (    
        <div>
            {froid ? (
                <div className="card" >
                    <div className="card-body">
                        <p><strong>ID :</strong> {froid.id}</p>
                        <p><strong>name evaluation :</strong> {froid.name}</p>
                        <p><strong>Formation :</strong> {formation}</p>
                        <p><strong>Date de réalisation :</strong> {froid.date_realisation}</p>
                        <p><strong>criteres   :</strong> {froid.criteres}</p>
                        <p><strong>coefficients  :</strong> {froid.coefficients}</p>
                        <p><strong>Pièces jointes :</strong> {froid.pieces_jointes ? <a href={`${process.env.REACT_APP_API_URL}/RH/piece_jointe_froid/${id}/`} target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>
                        <p><strong>crée par  :</strong> {froid.created_by}</p>
                        <p><strong>crée à :</strong> {froid.created_at}</p>

                    </div>
                    <br />
                    <a href="/DashboardEvaluationFroid"><button className="btn-gray">Retour</button></a>&nbsp;
                    <button className="btn btn-danger" onClick={handleDelete}>Supprimer</button>
                </div>
            ):(
                <p>chargement ... </p>
            )}
        </div>
    );
};

export default FroidDetail;
*/
import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { GrEdit, GrTrash } from 'react-icons/gr';
import "../Detail.css";
import axios from 'axios';
import Cookies from 'js-cookie';

const sampleFroidDetails = {
    1: {
        id: 1,
        name: 'Évaluation Froid 1',
        formation: 1,
        date_realisation: '2024-01-15',
        criteres: 'Critère 1, Critère 2',
        coefficients: '0.5, 1.0',
        pieces_jointes: true,
        created_by: 'Admin',
        created_at: '2024-01-01'
    },
    2: {
        id: 2,
        name: 'Évaluation Froid 2',
        formation: 2,
        date_realisation: '2024-02-15',
        criteres: 'Critère 3, Critère 4',
        coefficients: '0.7, 1.2',
        pieces_jointes: false,
        created_by: 'Admin',
        created_at: '2024-02-15'
    }
};

const sampleFormations = [
    { id: 1, intitule_formation: 'Formation React' },
    { id: 2, intitule_formation: 'Formation Node.js' }
];

const FroidDetail = () => {
    const { id } = useParams();
    const [froid, setFroid] = useState(null);
    const [formation, setFormation] = useState('');
    const [piecesJointes, setPiecesJointes] = useState(null);
    const [deleteReussi, setDeleteReussi] = useState(false);
    const [ajoutReussi, setAjoutReussi] = useState(false);

    useEffect(() => {
        const froidDetail = sampleFroidDetails[id];
        setFroid(froidDetail);
        const formationData = sampleFormations.find(form => form.id === froidDetail.formation);
        setFormation(formationData ? formationData.intitule_formation : 'N/A');
    }, [id]);

    const handleDelete = () => {
        setDeleteReussi(true);
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setPiecesJointes(selectedFile);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', froid.name);
        formData.append('formation', froid.formation);
        formData.append('date_realisation', froid.date_realisation);
        formData.append('criteres', froid.criteres);
        formData.append('coefficients', froid.coefficients);

        if (piecesJointes) {
            formData.append('pieces_jointes', piecesJointes);
        }

        const headers = {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': Cookies.get('csrftoken')
        };

        axios.put(`${process.env.REACT_APP_API_URL}/RH/update_evaluation_froid/${id}/`, formData, { headers: headers })
            .then(response => {
                console.log('Évaluation mise à jour avec succès:', response.data);
                setAjoutReussi(true);
            })
            .catch(error => {
                console.error('Erreur lors de la mise à jour de l\'évaluation:', error);
            });
    };

    if (deleteReussi) {
        return <Navigate to="/DashboardEvaluationFroid" />;
    }

    if (ajoutReussi) {
        return <Navigate to={`/froid/${id}`} />;
    }

    return (
        <main style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                            <div className="card-header-">Détails de l'évaluation</div>
                            <div className="card-body">
                                {froid ? (
                                    <form className="row" onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="small mb-1">Nom évaluation</label>
                                            <input className="form-control" type="text" value={froid.name} readOnly />
                                        </div>
                                        <div className="mb-3">
                                            <label className="small mb-1">Formation</label>
                                            <input className="form-control" type="text" value={formation} readOnly />
                                        </div>
                                        <div className="mb-3">
                                            <label className="small mb-1">Date de réalisation</label>
                                            <input className="form-control" type="text" value={froid.date_realisation} readOnly />
                                        </div>
                                        <div className="mb-3">
                                            <label className="small mb-1">Critères</label>
                                            <input className="form-control" type="text" value={froid.criteres} readOnly />
                                        </div>
                                        <div className="mb-3">
                                            <label className="small mb-1">Coefficients</label>
                                            <input className="form-control" type="text" value={froid.coefficients} readOnly />
                                        </div>
                                        <div className="mb-3">
                                            <label className="small mb-1">Pièces jointes</label>
                                            <input className="form-control" type="text" value={froid.pieces_jointes ? 'Oui' : 'Non'} readOnly />
                                        </div>
                                        <div className="row gx-3 mb-3">
                                            <div className="col-md-6">
                                                <label className="small mb-1">Créé par</label>
                                                <input className="form-control" type="text" value={froid.created_by} readOnly />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="small mb-1">Date de création</label>
                                                <input className="form-control" type="text" value={froid.created_at} readOnly />
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-end mt-3">
                                            <Link to={`/DashboardEvaluationFroid`} className="btn btn-secondary me-2">
                                                <IoMdArrowRoundBack /> Retour
                                            </Link>
                                            <button type="submit" className="btn btn-primary me-2">
                                                <GrEdit /> Modifier
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={handleDelete}
                                            >
                                                <GrTrash /> Supprimer
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <p>Chargement ...</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default FroidDetail;
