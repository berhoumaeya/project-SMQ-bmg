import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Navigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import SubNavbarDoc from '../../components/SubNavbarDOC';
import SidebarDoc from '../../components/SidebarDoc';

function ModifierDocExt() {
    const { id } = useParams();

    const [errors, setErrors] = useState({});
    const [fichier, setPiecesJointes] = useState(null);
    const [designation, setDesignation] = useState('');
    const [type, setType] = useState('');
    const [lieu_classement, setLieuClassement] = useState('');
    const [duree_classement, setDureeClassement] = useState('');
    const [liste_informees, setListeInformees] = useState([]);
    const [liste_informeeID, setListeInformee] = useState([]);
    const [piecesJointesUrl, setPiecesJointesUrl] = useState('');
    const [updateReussi, setUpdateReussi] = useState(false);

    useEffect(() => {
        const fetchDoc = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/doc/detailsExt/${id}/`);
                const data = response.data;
                setDesignation(data.designation);
                setType(data.type);
                setLieuClassement(data.lieu_classement);
                setDureeClassement(data.duree_classement);
                setListeInformee(data.liste_informee.map(user => user.id));
                if (data.fichier) {
                    setPiecesJointesUrl(`${data.fichier}`);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données de document:', error);
            }
        };

        fetchDoc();

        axios.get(`${process.env.REACT_APP_API_URL}/user/users/`)
            .then(response => { setListeInformees(response.data); })
            .catch(error => console.error('Error fetching users:', error));
    }, [id]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setPiecesJointes(selectedFile);
    };

    const validateForm = () => {

        const formErrors = {};
        if (!designation) formErrors.designation = 'Désignation est requis.';
        if (!type) formErrors.type = 'Type est requis.';
        if (!lieu_classement) formErrors.lieu_classement = 'Lieu de classement est requis.';
        if (!duree_classement) formErrors.duree_classement = 'Durée de classement est requis.';
        if (liste_informeeID.length === 0) formErrors.liste_informee = 'Liste informée est requis.';
        if (!fichier && piecesJointesUrl === '') formErrors.fichier = 'Pièces jointes est requis.';
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
        formData.append('lieu_classement', lieu_classement);
        formData.append('type', type);
        formData.append('duree_classement', duree_classement);
        liste_informeeID.forEach(id => { formData.append('liste_informee', id) });
        if (fichier) {
            formData.append('fichier', fichier);
        } else if (piecesJointesUrl === '') {
            formData.append('fichier', '');
        }

        const headers = {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': Cookies.get('csrftoken')
        };

        axios.put(`${process.env.REACT_APP_API_URL}/doc/documentsExt/Update/${id}/`, formData, { headers })
            .then(response => {
                console.log('Document modifié avec succès:', response.data);
                setDesignation('');
                setType('');
                setLieuClassement('');
                setDureeClassement('');
                setPiecesJointes(null);
                setUpdateReussi(true);
            })
            .catch(error => {
                console.error('Error updating document:', error);
                setErrors(error.response?.data || { message: 'Une erreur s\'est produite lors de la modification du document.' });
            });
    };

    if (updateReussi) {
        return <Navigate to="/DashboardDocExt" />;
    }

    return (
        <> <SubNavbarDoc />
        <main style={{ display: 'flex', minHeight: '100vh' }}>
            <SidebarDoc />             
            <div className="container-xl px-4 mt-4">
                <div className='row'>
                    <div className="col-xl-4">
                        <div className="card mb-4 mb-xl-0">
                            <div className="card-header--">Profile Picture</div>
                            <div className="card-body text-center">
                                <div className="img-container mb-2">
                                    <img
                                        className="img-account-profile rounded-circle"
                                        src="http://bootdey.com/img/Content/avatar/avatar1.png"
                                        alt="Profile"
                                        style={{ width: '150px', height: '150px' }}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8">

                        <div className="card mb-4">
                            <div className="card-header--">Modifier le Document</div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="small mb-1" htmlFor="inputDesignation">Désignation</label>
                                        <input
                                            className="form-control"
                                            id="inputDesignation"
                                            type="text"
                                            placeholder="Entrez la désignation"
                                            value={designation}
                                            onChange={(e) => setDesignation(e.target.value)}
                                        />
                                        {errors.designation && <p className="error">{errors.designation}</p>}
                                    </div>
                                    <div className="row gx-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="inputType">Type</label>
                                            <select
                                                className="form-control"
                                                id="inputType"
                                                value={type}
                                                onChange={(e) => setType(e.target.value)}
                                            >
                                                <option value="">Sélectionner...</option>
                                                <option value="numerique">Numérique</option>
                                                <option value="papier">Papier</option>
                                            </select>
                                            {errors.type && <p className="error">{errors.type}</p>}
                                        </div>
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="inputLieuClassement">Lieu de Classement</label>
                                            <select
                                                className="form-control"
                                                id="inputLieuClassement"
                                                value={lieu_classement}
                                                onChange={(e) => setLieuClassement(e.target.value)}
                                            >
                                                <option value="">Sélectionner...</option>
                                                <option value="Archives">Archives</option>
                                                <option value="Bureau">Bureau</option>
                                                <option value="Entrepôt">Entrepôt</option>
                                                <option value="Cloud">Cloud</option>
                                            </select>
                                            {errors.lieu_classement && <p className="error">{errors.lieu_classement}</p>}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="small mb-1" htmlFor="inputDureeClassement">Durée de Classement</label>
                                        <input
                                            className="form-control"
                                            id="inputDureeClassement"
                                            type="text"
                                            placeholder="Entrez la durée de classement"
                                            value={duree_classement}
                                            onChange={(e) => setDureeClassement(e.target.value)}
                                        />
                                        {errors.duree_classement && <p className="error">{errors.duree_classement}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="small mb-1" htmlFor="inputListeInformee">Liste Informée</label>
                                        <select
                                            multiple
                                            className="form-control"
                                            id="inputListeInformee"
                                            value={liste_informeeID}
                                            onChange={(e) => setListeInformee([...e.target.selectedOptions].map(option => option.value))}
                                        >
                                            {liste_informees.map(informee => (
                                                <option key={informee.id} value={informee.id}>{informee.username}</option>
                                            ))}
                                        </select>
                                        {errors.liste_informee && <p className="error">{errors.liste_informee}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="small mb-1" htmlFor="inputFichier">Pièces Jointes</label>
                                        {piecesJointesUrl ? (
                                            <div>
                                                <input
                                                    className="form-control"
                                                    id="inputFichier"
                                                    type="text"
                                                    value={piecesJointesUrl}
                                                    onChange={(e) => setPiecesJointesUrl(e.target.value)}
                                                />
                                                <a href={piecesJointesUrl} target="_blank" rel="noopener noreferrer">Consulter</a>
                                            </div>
                                        ) : (
                                            <input
                                                className="form-control"
                                                id="inputFichier"
                                                type="file"
                                                onChange={handleFileChange}
                                            />
                                        )}
                                        {errors.fichier && <p className="error">{errors.fichier}</p>}
                                    </div>
                                    <div className="text-center">
                                        <button className="button-add-" type="submit">Modifier</button>
                                        <Link to="/DashboardDocExt"><button className="retour ms-2">Annuler </button></Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </>
    );
}

export default ModifierDocExt;
