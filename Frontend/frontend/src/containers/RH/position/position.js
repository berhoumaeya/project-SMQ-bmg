/*import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom'; 
import axios from 'axios';
import Cookies from 'js-cookie';
import "../Detail.css"

const PostDetail = () => {
  const { id } = useParams();
  const [position, setFormation] = useState(null);
  const [deleteReussi, setdeleteReussi] = useState(false);

  useEffect(() => {
    const fetchFormation = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/RH/job_post/${id}/`);
        setFormation(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de position:', error);
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
  await axios.delete(`${process.env.REACT_APP_API_URL}/RH/delete_job_post/${id}/`,{headers:headers});
  setdeleteReussi(true)
} catch (error) {
  console.error('Erreur lors de la suppression de position:', error);
}
};
if (deleteReussi){
return <Navigate to="/Dashboardposition"/>
}
return (
  <div>
      {position ? (
          <div className="card" >
              <div className="card-body">
                  <p><strong>ID :</strong> {position.id}</p>
                  <p><strong>Titre position :</strong> {position.title}</p>
                  <p><strong>Position position :</strong> {position.position}</p>
                  <p><strong>Mission principale  :</strong> {position.main_mission}</p>
                  <p><strong>Compétences requis :</strong> {position.required_skills}</p>
                  <p><strong>Activité principale :</strong> {position.main_activity}</p>
                  <p><strong>Date de création :</strong> {position.created_at}</p>
                  <p><strong>Créé par :</strong> {position.created_by}</p>
                  <p><strong>Pièces jointes :</strong> {position.pieces_jointes ? <a href={`${process.env.REACT_APP_API_URL}/RH/piece_jointe_position/${id}/`} target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>
                  <p><strong>Modifié par :</strong> {position.updated_by}</p>
                  <p><strong>Date de modification :</strong> {position.updated_at}</p>
              </div>
              <br />
              <a href="/Dashboardposition"><button className="btn-gray">Retour</button></a>&nbsp;
              <Link to={`/update-position/${position.id}`}><button className="btn-blue">Modifier</button></Link>&nbsp;
              <button className="btn btn-danger" onClick={handleDelete}>Supprimer</button>
          </div>
      ):(
          <p>chargement ... </p>
      )}
  </div>
);
};

export default PostDetail;
*/
import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { GrEdit, GrTrash } from 'react-icons/gr';
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from 'axios';
import Cookies from 'js-cookie';
import '../Detail.css';
import SubNavbarRH from '../../../components/SubNavbarRH';
import SidebarRH from '../../../components/SidebarRH';
const samplePosts = [
  {
    id: 1,
    title: 'Développeur Frontend',
    position: 'Développeur',
    main_mission: 'Développer des interfaces utilisateur',
    required_skills: 'React, JavaScript, CSS',
    main_activity: 'Développement frontend',
    created_at: '2024-01-01',
    created_by: 'Admin',
    pieces_jointes: false,
    updated_by: 'Admin',
    updated_at: '2024-01-02',
  },
  {
    id: 2,
    title: 'Développeur Backend',
    position: 'Développeur',
    main_mission: 'Gérer les bases de données et les API',
    required_skills: 'Node.js, SQL, MongoDB',
    main_activity: 'Développement backend',
    created_at: '2024-02-01',
    created_by: 'Admin',
    pieces_jointes: true,
    updated_by: 'Admin',
    updated_at: '2024-02-02',
  },
  {
    id: 3,
    title: 'Designer UX/UI',
    position: 'Designer',
    main_mission: 'Concevoir des interfaces utilisateur intuitives',
    required_skills: 'Figma, Adobe XD, Sketch',
    main_activity: 'Design UI/UX',
    created_at: '2024-03-01',
    created_by: 'Admin',
    pieces_jointes: false,
    updated_by: 'Admin',
    updated_at: '2024-03-02',
  }
];
const PostDetail = () => {
  const { id } = useParams();
  const [position, setPosition] = useState(null);
  const [deleteReussi, setDeleteReussi] = useState(false);
  const [updateReussi, setUpdateReussi] = useState(false);
  const [piecesJointes, setPiecesJointes] = useState(null);
  const [formValues, setFormValues] = useState({
    title: '',
    position: '',
    main_mission: '',
    required_skills: '',
    main_activity: '',
  });

  useEffect(() => {
    // Simulate data fetch
    const post = samplePosts.find(p => p.id === parseInt(id, 10));
    if (post) {
      setPosition(post);
      setFormValues({
        title: post.title,
        position: post.position,
        main_mission: post.main_mission,
        required_skills: post.required_skills,
        main_activity: post.main_activity,
      });
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/RH/delete_job_post/${id}/`, {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken'),
        }
      });
      setDeleteReussi(true);
    } catch (error) {
      console.error('Erreur lors de la suppression de position:', error);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setPiecesJointes(selectedFile);
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', formValues.title);
    formData.append('position', formValues.position);
    formData.append('main_mission', formValues.main_mission);
    formData.append('required_skills', formValues.required_skills);
    formData.append('main_activity', formValues.main_activity);
    if (piecesJointes) {
      formData.append('pieces_jointes', piecesJointes);
    }

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/RH/update_job_post/${id}/`, formData, {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': Cookies.get('csrftoken')
        }
      });
      setUpdateReussi(true);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de position:', error);
    }
  };

  if (deleteReussi) {
    return <Navigate to="/DashboardPost" />;
  }

  if (updateReussi) {
    return <Navigate to={`/position/${id}`} />;
  }

  return (

    <>
      <SubNavbarRH />
      <main style={{ display: 'flex', minHeight: '100vh' }}>
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
            </div>
            <div className="col-xl-8">
              <div className="card mb-4">
                <div className="card-header-">Position Details</div>
                <div className="card-body">
                  {position ? (
                    <form className="row" onSubmit={handleSubmit}>

                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label className="small mb-1">Titre position</label>
                          <input className="form-control" type="text" name="title" value={formValues.title} onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                          <label className="small mb-1">Position</label>
                          <input className="form-control" type="text" name="position" value={formValues.position} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label className="small mb-1">Mission principale</label>
                          <input className="form-control" type="text" name="main_mission" value={formValues.main_mission} onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                          <label className="small mb-1">Compétences requis</label>
                          <input className="form-control" type="text" name="required_skills" value={formValues.required_skills} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="small mb-1">Activité principale</label>
                        <input className="form-control" type="text" name="main_activity" value={formValues.main_activity} onChange={handleChange} />
                      </div>
                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label className="small mb-1">Date de création</label>
                          <input className="form-control" type="text" value={position.created_at} readOnly />
                        </div>
                        <div className="col-md-6">
                          <label className="small mb-1">Créé par</label>
                          <input className="form-control" type="text" value={position.created_by} readOnly />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="small mb-1">Pièces jointes</label>
                        <input className="form-control" type="text" value={position.pieces_jointes ? 'Consulter' : 'null'} readOnly />
                      </div>
                      <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                          <label className="small mb-1">Date de modification</label>
                          <input className="form-control" type="text" value={position.updated_at} readOnly />
                        </div>
                        <div className="col-md-6">
                          <label className="small mb-1">Modifié par</label>
                          <input className="form-control" type="text" value={position.updated_by} readOnly />
                        </div>
                      </div>
                      <div className="d-flex justify-content-end mt-3">
                        <Link to="/Dashboardposition" className="btn btn-secondary me-2">
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

export default PostDetail;