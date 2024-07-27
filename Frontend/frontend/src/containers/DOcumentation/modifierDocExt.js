/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Navigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

function ModifierDocExt() {
    const { id } = useParams();

    const [errors, setErrors] = useState({});

    const [fichier, setPiecesJointes] = useState(null);
    const [designation, setdesignation] = useState('');
    const [type, setType] = useState('');
    const [lieu_classement, setlieu_classement] = useState('');
    const [duree_classement, setduree_classement] = useState('');
    const [liste_informees, setListeInformees] = useState([]);
    const [liste_informeeID, setListeInformee] = useState([]);

    const [piecesJointesUrl, setPiecesJointesUrl] = useState('');

    const [updateReussi, setupdateReussi] = useState(false);


    useEffect(() => {
        const fetchDoc = async () => {
            try {
              const response = await axios.get(`${process.env.REACT_APP_API_URL}/doc/detailsExt/${id}/`);
              const data = response.data;
              setdesignation(data.designation);
              setType(data.type);
              setlieu_classement(data.lieu_classement);
              setduree_classement(data.duree_classement)
              setListeInformee(data.liste_informee.map(user => user.id));
               if (data.fichier){
                setPiecesJointesUrl(`${data.fichier}`);
               }
            } catch (error) {
              console.error('Erreur lors de la récupération des données de employe:', error);
            }
          };
      
          fetchDoc();

          axios.get(`${process.env.REACT_APP_API_URL}/user/users/`)
          .then(response => {setListeInformees(response.data);})
          .catch(error => console.error('Error fetching users:', error));
    }, [id]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setPiecesJointes(selectedFile);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('designation', designation);
        formData.append('lieu_classement', lieu_classement);
        formData.append('type', type);
        formData.append('duree_classement', duree_classement);
        liste_informeeID.forEach(id => {formData.append('liste_informee', id)});
        if (fichier) {
            formData.append('fichier', fichier);
        }else if (piecesJointesUrl === '') {
        formData.append('fichier', '');
        }
        const headers = {
            'Accept': '*//*',
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': Cookies.get('csrftoken')
        };

        axios.put(`${process.env.REACT_APP_API_URL}/doc/documentsExt/Update/${id}/`, formData, { headers })
            .then(response => {
                console.log('Document modifié avec succès:', response.data);
              setdesignation('');
              setType('');
              setListeInformee('');
              setlieu_classement('');
              setduree_classement('');
              setPiecesJointes(null);

                setupdateReussi(true)
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
        <div className="form-container">
            <div className="form-card">
                <h3>Modifier document</h3>
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
                    <div className="button-group">
                        <button className="btn btn-success mt-3" type="submit">Enregistrer les modifications</button>
                        <Link to="/DashboardDocInt" className="btn btn-gray mt-3">Annuler</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModifierDocExt;
*/
import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';

function ModifierDocExt() {
    const [errors, setErrors] = useState({});
    const [fichier, setPiecesJointes] = useState(null);
    const [designation, setDesignation] = useState('Design Example');
    const [type, setType] = useState('numerique');
    const [lieu_classement, setLieuClassement] = useState('Archives');
    const [duree_classement, setDureeClassement] = useState('1 an');
    const [liste_informees, setListeInformees] = useState([
        { id: '1', username: 'user1' },
        { id: '2', username: 'user2' },
        { id: '3', username: 'user3' }
    ]);
    const [liste_informeeID, setListeInformeeID] = useState(['1', '2']);
    const [piecesJointesUrl, setPiecesJointesUrl] = useState('http://example.com/file.pdf');
    const [updateReussi, setUpdateReussi] = useState(false);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setPiecesJointes(selectedFile);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission with static data here
        console.log('Form submitted with:', {
            designation,
            type,
            lieu_classement,
            duree_classement,
            liste_informeeID,
            fichier,
            piecesJointesUrl
        });
        setUpdateReussi(true);
    };

    if (updateReussi) {
        return <Navigate to="/DashboardDocExt" />;
    }

    return (
        <main style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="container ajout-form">
                <div className="contact-image">
                    <img src="/images/change.png" alt="rocket_contact" />
                    <div className="button-container">
                        <Link to={`/DashboardDocExt`}>
                            <button className="retour">Annuler </button>
                        </Link>
                        <button className="button-add-" type="submit">Enregistrer les modifications</button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="row">
                    <div className="col-md-6">
                        <div className="form-label">
                            <label className="form-label">Designation:</label>
                            {errors.designation && <p className="error-text">{errors.designation}</p>}
                            <input className="form-control" type="text" name="designation" value={designation} onChange={(e) => setDesignation(e.target.value)} />
                        </div>
                        <div className="form-label">
                            <label className="form-label">Type:</label>
                            {errors.type && <p className="error-text">{errors.type}</p>}
                            <select className="form-control" value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="">Sélectionner...</option>
                                <option value="numerique">numerique</option>
                                <option value="papier">papier</option>
                            </select>
                        </div>
                        <div className="form-label">
                            <label className="form-label">Lieu classement:</label>
                            {errors.lieu_classement && <p className="error-text">{errors.lieu_classement}</p>}
                            <select className="form-control" value={lieu_classement} onChange={(e) => setLieuClassement(e.target.value)}>
                                <option value="">Sélectionner...</option>
                                <option value="Archives">Archives</option>
                                <option value="Bureau">Bureau</option>
                                <option value="Entrepôt">Entrepôt</option>
                                <option value="Cloud">Cloud</option>
                            </select>
                        </div>
                        <div className="form-label">
                            <label className="form-label">Durée:</label>
                            {errors.duree_classement && <p className="error-text">{errors.duree_classement}</p>}
                            <input className="form-control" type="text" name="duree_classement" value={duree_classement} onChange={(e) => setDureeClassement(e.target.value)} />
                        </div>
                        </div>
                        <div className="col-md-6">
                        <div className="form-label">
                            <label className="form-label">Liste informée :</label>
                            {errors.liste_informee && <p className="error-text">{errors.liste_informee}</p>}
                            <select className="form-control" multiple value={liste_informeeID} onChange={(e) => setListeInformeeID(Array.from(e.target.selectedOptions, option => option.value))}>
                                {liste_informees.map(liste_informee => (
                                    <option key={liste_informee.id} value={liste_informee.id}>{liste_informee.username}</option>
                                ))}
                            </select>
                        </div>
                   
                        <div className="form-label">
                            <label className="form-label">Pièces jointes :</label>
                            {piecesJointesUrl ? (
                                <div>
                                    <input
                                        type="text"
                                        value={piecesJointesUrl}
                                        onChange={(e) => setPiecesJointesUrl(e.target.value)}
                                        className="form-control"
                                    />
                                    <a href={piecesJointesUrl} target="_blank" rel="noopener noreferrer">Consulter</a>
                                </div>
                            ) : (
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="form-control"
                                />
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default ModifierDocExt;
