import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../formation/FormationForm.css';
import { Navigate ,Link} from 'react-router-dom';
import Cookies from 'js-cookie';

function CompetenceForm() {
    const [name, setName] = useState('');
    const [pieces_jointes, setPiecesJointes] = useState(null);
    const [employe_concernes, setEmployes] = useState([]);
    const [employe_concerneID, setEmploye] = useState('');
    const [commentaires, setCommentaires] = useState('');
    const [skillsAcquis, setSkillsAcquis] = useState({
        communication: 7,
        "developpement": 8,
        "marketing": 9,
        "sience":4
    });
    // skillsAcquis
    const [ajoutReussi, setAjoutReussi] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_employe/`)
            .then(response => {
                setEmployes(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des employés :', error);
            });

    }, []);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setPiecesJointes(selectedFile);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!name) {
            alert('Veuillez saisir votre nom.');
            return;
        }
    
        if (!employe_concerneID) {
            alert('Veuillez sélectionner l\'employé concerné.');
            return;
        }
        
        const formData = new FormData();
        formData.append('name', name);
        formData.append('employe_concerne', employe_concerneID);
        formData.append('commentaires', commentaires);
        formData.append('skillsAcquis', JSON.stringify(skillsAcquis));
        if (pieces_jointes) {
            formData.append('pieces_jointes', pieces_jointes);
        }

        const headers = {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': Cookies.get('csrftoken')
        };

        axios.post(`${process.env.REACT_APP_API_URL}/RH/create_evaluation_competence/`, formData, { headers: headers })
            .then(response => {
                console.log('Fiche ajoutée avec succès :', response.data);
                setName('');
                setEmploye('');
                setCommentaires('');
                setSkillsAcquis({});
                setAjoutReussi(true);
            })
            .catch(error => { console.error('Erreur',error)
            });
    };

    if (ajoutReussi) {
        return <Navigate to="/Dashboardcompetence" />;
    }

    return (
        <div className="form-container">
            <div className="form-card">
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label>Nom :</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Commentaires :</label>
                        <input type="text" value={commentaires} onChange={(e) => setCommentaires(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Employé concerné :</label>
                        <select value={employe_concerneID} onChange={(e) => setEmploye(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            {employe_concernes && employe_concernes.map(employe_concerne => (
                                <option key={employe_concerne.id} value={employe_concerne.id}>{employe_concerne.username}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
    <label>Compétences acquises :</label>
    <textarea 
        value={Object.entries(skillsAcquis).map(([skill, level]) => `${skill}: ${level}`).join('\n')} 
        onChange={(e) => {
            const skills = e.target.value.split('\n').map(skill => skill.trim()).filter(skill => skill !== '');
            const newSkillsAcquis = {};
            skills.forEach(skill => {
                const [competence, niveau] = skill.split(':').map(entry => entry.trim());
                newSkillsAcquis[competence] = niveau;
            });
            setSkillsAcquis(newSkillsAcquis);
        }} 
    />
</div>
                    <div className="form-group">
                        <label>Pièces jointes :</label>
                        <input type="file" onChange={handleFileChange} />
                    </div>
                    <button className="btn btn-success mt-3" type="submit">Evaluer</button>
                    <Link to="/Dashboardfiche">Retour au tableau de bord</Link>
                </form>
            </div>
        </div>
    );
}

export default CompetenceForm;
