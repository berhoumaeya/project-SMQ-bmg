import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import SubNavbarDoc from '../../components/SubNavbarDOC';
import SidebarDoc from '../../components/SidebarDoc';


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
    const validateForm = () => {
        const formErrors = {};
        if (!designation) formErrors.designation = 'Désignation est requis.';
        if (!type) formErrors.type = 'Type est requis.';
        if (!lieu_classement) formErrors.lieu_classement = 'Lieu classement est requis.';
        if (!duree_classement) formErrors.duree_classement = 'Durée est requis.';
        if (liste_informeeID.length === 0) formErrors.liste_informee = 'Liste informée est requis.';
        if (!fichier) formErrors.fichier = 'Pièces jointes est requis.';

        return formErrors;
    };

    const handleSubmit = (event) => {

        event.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

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
        <> <SubNavbarDoc />
            <main style={{ display: 'flex', minHeight: '100vh' }}>
                <SidebarDoc />
                <div className="container ajout-form">
                     
                    <form onSubmit={handleSubmit} className="row">
                    <div className="button-container">
                            <button className="button-add" type="submit" onClick={handleSubmit}>Rédiger</button>
                        </div>
                    <h4>Création un document externe</h4>
                        <div className="col-md-6">
                            <div className="form-label">
                                <label className="form-label">Désignation :</label>
                                <input type="text" className="form-control" placeholder='Désignation*' name="designation" value={designation} onChange={(e) => setdesignation(e.target.value)} />
                                {errors.designation && <p className="error">{errors.designation}</p>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">Type :</label>
                                <select className="form-control" value={type} onChange={(e) => setType(e.target.value)}>
                                    <option value="">Sélectionner...</option>
                                    <option value="numerique">Numerique</option>
                                    <option value="papier">Papier</option>
                                </select>
                                {errors.type && <p className="error">{errors.type}</p>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">Lieu classement:</label>
                                <select className="form-control" value={lieu_classement} onChange={(e) => setlieu_classement(e.target.value)}>
                                    <option value="">Sélectionner...</option>
                                    <option value="Archives">Archives</option>
                                    <option value="Bureau">Bureau</option>
                                    <option value="Entrepôt">Entrepôt</option>
                                    <option value="Cloud">Cloud</option>
                                </select>
                                {errors.lieu_classement && <p className="error">{errors.lieu_classement}</p>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">Durée :</label>
                                <input className="form-control" placeholder='Durée*' type="text" name="duree_classement" value={duree_classement} onChange={(e) => setduree_classement(e.target.value)} />
                                {errors.duree_classement && <p className="error">{errors.duree_classement}</p>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-label">
                                <label className="form-label">Liste informée :</label>
                                <select className="form-control" multiple value={liste_informeeID} onChange={(e) => setListeInformee(Array.from(e.target.selectedOptions, option => option.value))}>
                                    {liste_informees.map(liste_informee => (
                                        <option key={liste_informee.id} value={liste_informee.id}>{liste_informee.username}</option>
                                    ))}
                                </select>
                                {errors.liste_informee && <p className="error">{errors.liste_informee}</p>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">Pièces jointes :</label>
                                <input className="form-control" type="file" onChange={handleFileChange} />
                                {errors.fichier && <p className="error">{errors.fichier}</p>}
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default DocExtForm;
