/*import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom'; 
import axios from 'axios';
import Cookies from 'js-cookie';
import "../Detail.css"

const ChaudDetail = () => {
  const { id } = useParams();
  const [chaud, setFormation] = useState(null);
  const [formation, setForm] = useState('');
  const [deleteReussi, setdeleteReussi] = useState(false);

  useEffect(() => {
    const fetchFormation = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/RH/evaluation_chaud/${id}/`);
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
await axios.delete(`${process.env.REACT_APP_API_URL}/RH/delete_evaluation_chaud/${id}/`,{headers:headers});
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
{chaud ? (
<div className="card" >
<div className="card-body">
<p><strong>ID :</strong> {chaud.id}</p>
<p><strong>name evaluation :</strong> {chaud.name}</p>
<p><strong>Formation :</strong> {formation}</p>
<p><strong>Date de réalisation :</strong> {chaud.date_realisation}</p>
<p><strong>criteres   :</strong> {chaud.criteres}</p>
<p><strong>coefficients  :</strong> {chaud.coefficients}</p>
<p><strong>Pièces jointes :</strong> {chaud.pieces_jointes ? <a href={`${process.env.REACT_APP_API_URL}/RH/piece_jointe_chaud/${id}/`} target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>
<p><strong>crée par  :</strong> {chaud.created_by}</p>
<p><strong>crée à :</strong> {chaud.created_at}</p>

</div>
<br />
<a href="/DashboardEvaluationChaud"><button className="btn-gray">Retour</button></a>&nbsp;
<button className="btn btn-danger" onClick={handleDelete}>Supprimer</button>
</div>
):(
<p>chargement ... </p>
)}
</div>
);
};

export default ChaudDetail;
*/
import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { GrEdit, GrTrash } from 'react-icons/gr';
import "../Detail.css";
import axios from 'axios';
import Cookies from 'js-cookie';
import SubNavbarRH from '../../../components/SubNavbarRH';
import SidebarRH from '../../../components/SidebarRH';

const sampleChaudDetails = {
    1: {
        id: 1,
        name: 'Evaluation A',
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
        name: 'Evaluation B',
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

const ChaudDetail = () => {
    const { id } = useParams();
    const [chaud, setChaud] = useState(null);
    const [formation, setFormation] = useState('');
    const [piecesJointes, setPiecesJointes] = useState(null);
    const [deleteReussi, setDeleteReussi] = useState(false);
    const [ajoutReussi, setAjoutReussi] = useState(false);

    useEffect(() => {
        const chaudDetail = sampleChaudDetails[id];
        setChaud(chaudDetail);
        const formationData = sampleFormations.find(form => form.id === chaudDetail.formation);
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
        formData.append('name', chaud.name);
        formData.append('formation', chaud.formation);
        formData.append('date_realisation', chaud.date_realisation);
        formData.append('criteres', chaud.criteres);
        formData.append('coefficients', chaud.coefficients);

        if (piecesJointes) {
            formData.append('pieces_jointes', piecesJointes);
        }

        const headers = {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': Cookies.get('csrftoken')
        };

        axios.put(`${process.env.REACT_APP_API_URL}/RH/update_evaluation_chaud/${id}/`, formData, { headers: headers })
            .then(response => {
                console.log('Evaluation updated successfully:', response.data);
                setAjoutReussi(true);
            })
            .catch(error => {
                console.error('Error updating evaluation:', error);
            });
    };

    if (deleteReussi) {
        return <Navigate to="/DashboardEvaluationChaud" />;
    }

    if (ajoutReussi) {
        return <Navigate to={`/chaud/${id}`} />;
    }

    return (
        <>
            <SubNavbarRH />
            <main style={{ display: 'flex', minHeight: '100vh' , backgroundColor :'white'}}>
                <SidebarRH />
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
                            <br />
                            <div className="card mb-4">
                                <div className="card-header-">Historique</div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        {chaud ? (
                                            <>
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <strong>Date de modification</strong><br />
                                                        <small>{chaud.updated_at} - {chaud.updated_by}</small>
                                                    </div>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    <div> <strong>Date de création</strong><br />
                                                        <small>{chaud.created_at} - {chaud.created_by}</small>
                                                    </div>

                                                </li>
                                            </>
                                        ) : (<div>Chargement...</div>)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8">
                            <div className="card mb-4">
                                <div className="card-header-">Détails de l'évaluation</div>
                                <div className="card-body">
                                    {chaud ? (
                                        <form className="row" onSubmit={handleSubmit}>
                                            <div className="row gx-3 mb-3">
                                                <div className="col-md-6">
                                                    <label className="small mb-1">Nom évaluation</label>
                                                    <input className="form-control" type="text" value={chaud.name} readOnly />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="small mb-1">Formation</label>
                                                    <input className="form-control" type="text" value={formation} readOnly />
                                                </div>
                                            </div>
                                            <div className="row gx-3 mb-3">

                                                <div className="col-md-6">
                                                    <label className="small mb-1">Date de réalisation</label>
                                                    <input className="form-control" type="text" value={chaud.date_realisation} readOnly />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="small mb-1">Critères</label>
                                                    <input className="form-control" type="text" value={chaud.criteres} readOnly />
                                                </div>
                                            </div>
                                            <div className="row gx-3 mb-3">

                                                <div className="col-md-6">
                                                    <label className="small mb-1">Coefficients</label>
                                                    <input className="form-control" type="text" value={chaud.coefficients} readOnly />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="small mb-1">Pièces jointes</label>
                                                    <input className="form-control" type="text" value={chaud.pieces_jointes ? 'Oui' : 'Non'} readOnly />
                                                </div>
                                            </div>
                                            <div className="row gx-3 mb-3">
                                                <div className="col-md-6">
                                                    <label className="small mb-1">Créé par</label>
                                                    <input className="form-control" type="text" value={chaud.created_by} readOnly />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="small mb-1">Date de création</label>
                                                    <input className="form-control" type="text" value={chaud.created_at} readOnly />
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-end mt-3">
                                                <Link to={`/DashboardEvaluationChaud`} className="btn btn-secondary me-2">
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
        </>
    );
};

export default ChaudDetail;
