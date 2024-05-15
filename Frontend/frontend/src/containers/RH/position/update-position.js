import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
import Cookies from 'js-cookie';
import { Navigate , Link } from 'react-router-dom';



const UpdatePost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [position, setPosition] = useState('');
  const [main_mission, setMain_mission] = useState('');
  const [required_skills, setRequired_skills] = useState('');
  const [main_activity, setMain_activity] = useState('');
  const [pieces_jointes, setPiecesJointes] = useState(null);
  const [piecesJointesUrl, setPiecesJointesUrl] = useState('');
  const [updateReussi, setupdateReussi] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/RH/job_post/${id}/`);
        const data = response.data
        setTitle(data.title);
        setPosition(data.position)
        setMain_mission(data.main_mission)
        setRequired_skills(data.required_skills)
        setMain_activity(data.main_activity)
        if (data.pieces_jointes){
          setPiecesJointesUrl(`${data.pieces_jointes}`);
         }
      } catch (error) {
        console.error('Erreur lors de la récupération des données de job_post:', error);
      }
    };

    fetchPost();
  }, [id]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setPiecesJointes(selectedFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('position', position);
    formData.append('main_mission', main_mission);
    formData.append('required_skills', required_skills);
    formData.append('main_activity', main_activity);
    if (pieces_jointes) {
      formData.append('pieces_jointes', pieces_jointes);
  }

    const headers = {
      'Accept': '*/*',
      'Content-Type': 'multipart/form-data',
      'X-CSRFToken': Cookies.get('csrftoken')
  };
       axios.put(`${process.env.REACT_APP_API_URL}/RH/update_job_post/${id}/`, formData, {headers: headers })
      .then(response => {
        console.log('position modifié avec succès :', response.data);
        setTitle('');
        setPosition('');
        setMain_mission('');
        setRequired_skills('');
        setMain_activity('');
        setPiecesJointes(null);

        setupdateReussi(true)
      })
    .catch (error =>  {
      console.error('Erreur lors de la mise à jour de position:', error);
    })
  };
  if(updateReussi){
    return <Navigate to={`/position/${id}`} />;
  }

  return (
    <div className="form-container">
      <div className="form-card">
        <h3>Modifier un employe</h3>
        <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
            <label>
              title :
              <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
          </div>
          <div className="form-group">
            <label>
              Position :
              <input type="text" name="position" value={position} onChange={(e) => setPosition(e.target.value)} />
            </label>
          </div>
          <div className="form-group">
            <label>
              Mission principale :
              <input type="text" name="main_mission" value={main_mission} onChange={(e) => setMain_mission(e.target.value)} />
            </label>
          </div>
          <div className="form-group">
            <label>
              Competences requis :
              <input type="text" name="required_skills" value={required_skills} onChange={(e) => setRequired_skills(e.target.value)} />
            </label>
          </div>
          <div className="form-group">
            <label>
              Activité principale :
              <input type="text" name="main_activity" value={main_activity} onChange={(e) => setMain_activity(e.target.value)} />
            </label>
          </div>
          <div className="form-group">
    <label>Pièces jointes :</label>
    {piecesJointesUrl ? (
        <div>
            <input 
                type="text" 
                value={piecesJointesUrl} 
                onChange={(e) => setPiecesJointesUrl(e.target.value)} 
            />
            <a href={piecesJointesUrl} target="_blank" rel="noopener noreferrer">Consulter</a>
        </div>
    ) : (
        <input 
            type="file" 
            onChange={handleFileChange} 
        />
    )}
</div>
          <button className="btn btn-primary" type="submit">Modifier post</button>
          <Link to={`/position/${id}`}>
      <button>Retour</button>
    </Link>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
