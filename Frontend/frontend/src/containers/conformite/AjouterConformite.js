import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../Client/forms.css'; // Ensure this matches the path to your CSS

const AddConformite = () => {
    const [errors, setErrors] = useState({});
    const [nom, setNom] = useState('');
    const [type_fiche, setTypeFiche] = useState('');
    const [sources, setSources] = useState([]);
    const [source, setSource] = useState('');
    const [type_decideur, setTypeDecideur] = useState('');
    const [exigence_dec, setExigenceDec] = useState(false);
    const [nom_reglementation, setNomReglementation] = useState('');
    const [applicable, setApplicable] = useState(false);
    const [plan_actions, setPlanActions] = useState([]);
    const [plan_action, setPlanAction] = useState('');
    const [pieces_jointes, setPiecesJointes] = useState(null);
    const [ajoutReussi, setAjoutReussi] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/action/dashboard_action/`)
            .then(response => setPlanActions(response.data))
            .catch(error => console.error('Error fetching actions:', error));

        axios.get(`${process.env.REACT_APP_API_URL}/doc/documentsExt/`)
            .then(response => setSources(response.data))
            .catch(error => console.error('Error fetching sources:', error));
    }, []);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setPiecesJointes(selectedFile);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('source', source);
        formData.append('type_decideur', type_decideur);
        formData.append('type_fiche', type_fiche);
        formData.append('exigence_dec', exigence_dec ? 'True' : 'False');
        formData.append('nom_reglementation', nom_reglementation);
        formData.append('applicable', applicable ? 'True' : 'False');
        formData.append('plan_action', plan_action);
        if (pieces_jointes) {
            formData.append('pieces_jointes', pieces_jointes);
        }

        const headers = {
            'Accept':
            '*/*',
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': Cookies.get('csrftoken')
        };

        axios.post(`${process.env.REACT_APP_API_URL}/conformite/create_Exigence/`, formData, { headers })
            .then(response => {
                console.log('Conformité ajoutée avec succès:', response.data);
                setNom('');
                setTypeFiche('');
                setSource('');
                setTypeDecideur('');
                setNomReglementation('');
                setApplicable(false);
                setPlanAction('');
                setPiecesJointes(null);
                setAjoutReussi(true);
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout de la conformité:', error);
                setErrors(error.response?.data || { message: 'Une erreur s\'est produite lors de l\'ajout de la conformité.' });
            });
    };

    if (ajoutReussi) {
        return <Navigate to="/Allconformite" />;
    }

    return (
        <main style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="container ajout-form">
                <div className="contact-image">
                    <img src="/images/add.png" alt="add_conformite" />
                    <div className="button-container">
                        <Link to="/Allconformite">
                            <button className="retour">Retour au tableau de bord</button>
                        </Link>
                        <button className="button-add" type="submit" form="add-conformite-form">Ajouter conformité</button>
                    </div>
                </div>
                <form id="add-conformite-form" onSubmit={handleSubmit} className="row">
                    <div className="col-md-6">
                        <div className="form-label">
                            <label className="form-label">Nom:</label>
                            <input type="text" className="form-control" placeholder='Nom*' value={nom} onChange={(e) => setNom(e.target.value)} />
                            {errors.nom && <p className="error-text">{errors.nom}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Type Décideur:</label>
                            <input type="text" className="form-control" placeholder='Type Décideur' value={type_decideur} onChange={(e) => setTypeDecideur(e.target.value)} />
                            {errors.type_decideur && <p className="error-text">{errors.type_decideur}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Type Fiche:</label>
                            <select className="form-control" value={type_fiche} onChange={(e) => setTypeFiche(e.target.value)}>
                                <option value="">Sélectionner...</option>
                                <option value="Sécurité">Sécurité</option>
                                <option value="Environnement">Environnement</option>
                                <option value="Qualité">Qualité</option>
                                <option value="Autre">Autre</option>
                            </select>
                            {errors.type_fiche && <p className="error-text">{errors.type_fiche}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Source:</label>
                            <select className="form-control" value={source} onChange={(e) => setSource(e.target.value)}>
                                <option value="">Sélectionner...</option>
                                {sources.map(source => (
                                    <option key={source.id} value={source.id}>{source.designation}</option>
                                ))}
                            </select>
                            {errors.source && <p className="error-text">{errors.source}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Exigence:</label>
                            <input type="checkbox" className="form-control" checked={exigence_dec} onChange={e => setExigenceDec(e.target.checked)} />
                        </div>
                        {exigence_dec && (
                            <>
                                <div className="form-label">
                                    <label className="form-label">Nom Réglementation:</label>
                                    <input type="text" className="form-control" placeholder='Nom Réglementation' value={nom_reglementation} onChange={(e) => setNomReglementation(e.target.value)} required />
                                    {errors.nom_reglementation && <p className="error-text">{errors.nom_reglementation}</p>}
                                </div>
                                <div className="form-label">
                                    <label className="form-label">Applicable ?:</label>
                                    <input type="checkbox" className="form-control" checked={applicable} onChange={e => setApplicable(e.target.checked)} />
                                </div>
                                <div className="form-label">
                                    <label className="form-label">Plan Actions:</label>
                                    <select className="form-control" value={plan_action} onChange={(e) => setPlanAction(e.target.value)}>
                                        <option value="">Sélectionner...</option>
                                        {plan_actions.map(plan_action => (
                                            <option key={plan_action.id} value={plan_action.id}>{plan_action.nom_action}</option>
                                        ))}
                                    </select>
                                    {errors.plan_action && <p className="error-text">{errors.plan_action}</p>}
                                </div>
                            </>
                        )}
                        <div className="form-label">
                            <label className="form-label">Pièces Jointes:</label>
                            <input type="file" className="form-control" onChange={handleFileChange} />
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default AddConformite;

