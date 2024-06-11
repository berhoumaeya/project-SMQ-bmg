import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';


const DocExtForm = () => {

    const [errors, setErrors] = useState({});
    const [fichier, setPiecesJointes] = useState(null);
    const [designation, setdesignation] = useState('');
    const [type, setType] = useState('');
    const [lieu_classement, setlieu_classement] = useState('');
    const [duree_classement, setduree_classement] = useState('');
    const [liste_informeeID, setListeInformee] = useState([]);
    const [liste_informees, setListeInformees] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/user/users/`)
            .then(response => setListeInformees(response.data))
            .catch(error => console.error('Error fetching users:', error));

    }, []);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setPiecesJointes(selectedFile);
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('designation', designation);
        formData.append('type', type);
        formData.append('lieu_classement', lieu_classement);
        formData.append('duree_classement', duree_classement);
        liste_informeeID.forEach(id => formData.append('liste_informee', id));
        if (fichier) {
            formData.append('fichier', fichier);
        }

        const headers = {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': Cookies.get('csrftoken')
        };

        axios.post(`${process.env.REACT_APP_API_URL}/doc/create-document-Externe/`, formData, { headers })
            .then(response => {
                console.log('Document interne créé avec succès:', response.data);
                setdesignation('');
                setListeInformee([]);
                setduree_classement('');
                setlieu_classement('');
                toast.success('Ajout avec succès!');
                navigate('/DashboardDocExt');
            })
            .catch(error => {
                console.error('Error creating document:', error);
                setErrors(error.response?.data || { message: 'Une erreur s\'est produite lors de la création du document.' });
            });
    };


    return (
        <div className="form-container">
            <div className="form-card">
                <h3>Ajouter document</h3>
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label>designation:</label>
                        {errors.designation && <p className="error-text">{errors.designation}</p>}
                        <input type="text" name="designation" value={designation} onChange={(e) => setdesignation(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Type:</label>
                        {errors.type && <p className="error-text">{errors.type}</p>}
                        <select value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            <option value="numerique">numerique</option>
                            <option value="papier">papier</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Lieu classement:</label>
                        {errors.lieu_classement && <p className="error-text">{errors.lieu_classement}</p>}
                        <select value={lieu_classement} onChange={(e) => setlieu_classement(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            <option value="Archives">Archives</option>
                            <option value="Bureau">Bureau</option>
                            <option value="Entrepôt">Entrepôt</option>
                            <option value="Cloud">Cloud</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Durée:</label>
                        {errors.duree_classement && <p className="error-text">{errors.duree_classement}</p>}
                        <input type="text" name="duree_classement" value={duree_classement} onChange={(e) => setduree_classement(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Liste informée :</label>
                        {errors.liste_informee && <p className="error-text">{errors.liste_informee}</p>}
                        <select multiple value={liste_informeeID} onChange={(e) => setListeInformee(Array.from(e.target.selectedOptions, option => option.value))}>
                            {liste_informees.map(liste_informee => (
                                <option key={liste_informee.id} value={liste_informee.id}>{liste_informee.username}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Pièces jointes :</label>
                        <input type="file" onChange={handleFileChange} />
                    </div>
                    <div className="button-group">
                        <button className="btn btn-success mt-3" type="submit">Rédiger document</button>
                        <Link to="/DashboardDoc" className="btn btn-gray mt-3">Retour au tableau de bord</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DocExtForm;
