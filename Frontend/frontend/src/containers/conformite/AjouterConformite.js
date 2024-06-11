import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const AddConformite = () => {

    const [errors, setErrors] = useState({});

    const [nom, setnom] = useState('');
    const [type_fiche, settype_fiche] = useState('');
    const [sources, setsources] = useState([]);
    const [source, setsource] = useState('');
    const [type_decideur, settype_decideur] = useState('');
    const [exigence_dec, setDeclencherPlanAction] = useState(false);

    // Exigences
    const [nom_reglementation, setnom_reglementation] = useState('');
    const [applicable, setapplicable] = useState(false);
    const [plan_actions, setplan_actions] = useState([]);
    const [plan_action, setplan_action] = useState('');
    const [pieces_jointes, setPiecesJointes] = useState(null);

    const [ajoutReussi, setAjoutReussi] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/action/dashboard_action/`)
            .then(response => setplan_actions(response.data))
            .catch(error => console.error('Error fetching responsables:', error));

        axios.get(`${process.env.REACT_APP_API_URL}/doc/documentsExt/`)
            .then(response => setsources(response.data))
            .catch(error => console.error('Error fetching documents:', error));
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
        // Si plan déclenché
        formData.append('nom_reglementation', nom_reglementation);
        formData.append('applicable', applicable ? 'True' : 'False');
        formData.append('plan_action', plan_action);
            if (pieces_jointes) {
            formData.append('pieces_jointes', pieces_jointes);
        }

        const headers = {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': Cookies.get('csrftoken')
        };

        axios.post(`${process.env.REACT_APP_API_URL}/conformite/create_Exigence/`, formData, { headers })
            .then(response => {
                console.log('Document interne créé avec succès:', response.data);
                setnom('');
                settype_decideur('');
                setsource('');
                setplan_action('')
                setAjoutReussi(true);
            })
            .catch(error => {
                console.error('Error creating document:', error);
                setErrors(error.response?.data || { message: 'Une erreur s\'est produite lors de la création du document.' });
            });
    };

    if (ajoutReussi) {
        return <Navigate to={`/Allconformite/`} />;
    }

    return (
        <div className="form-container">
            <div className="form-card">
                <h3>Ajouter Conformité</h3>
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label>nom:</label>
                        {errors.nom && <p className="error-text">{errors.nom}</p>}
                        <input type="text" name="nom" value={nom} onChange={(e) => setnom(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Type decideur:</label>
                        {errors.type_decideur && <p className="error-text">{errors.type_decideur}</p>}
                        <input type="text" name="type_decideur" value={type_decideur} onChange={(e) => settype_decideur(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Type fiche:</label>
                        {errors.type_fiche && <p className="error-text">{errors.type_fiche}</p>}
                        <select value={type_fiche} onChange={(e) => settype_fiche(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            <option value="Sécurité">Sécurité</option>
                            <option value="Environnement">Environnement</option>
                            <option value="Qualité">Qualité</option>
                            <option value="Autre">Autre</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Source:</label>
                        {errors.source && <p className="error-text">{errors.source}</p>}
                        <select value={source} onChange={(e) => setsource(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            {sources.map(source => (
                                <option key={source.id} value={source.id}>{source.designation}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Exigence :</label>
                        <input type="checkbox" name="exigence_dec" checked={exigence_dec} onChange={e => setDeclencherPlanAction(e.target.checked)} />
                    </div>
                    {exigence_dec && (
                        <>
                            <div className="form-group">
                                <label>nom_reglementation</label>
                                {errors.nom_reglementation && <p className="error-text">{errors.nom_reglementation}</p>}
                                <input type="text" name="nom_reglementation" value={nom_reglementation} onChange={(e) => setnom_reglementation(e.target.value)} required />
                            </div>
                            <div className="form-group">
                        <label>Applicable ? :</label>
                        <input type="checkbox" name="exigence_dec" checked={applicable} onChange={e => setapplicable(e.target.checked)} />
                    </div>
                    <div className="form-group">
                        <label>Plan Actions:</label>
                        {errors.plan_action && <p className="error-text">{errors.plan_action}</p>}
                        <select value={plan_action} onChange={(e) => setplan_action(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            {plan_actions.map(plan_action => (
                                <option key={plan_action.id} value={plan_action.id}>{plan_action.nom_action}</option>
                            ))}
                        </select>
                    </div>

                            <div className="form-group">
                                <label>Pièces jointes :</label>
                                <input type="file" onChange={(e) => handleFileChange(e, setPiecesJointes)} />
                            </div>
                        </>
                    )}
                    <div className="button-group">
                        <button className="btn btn-primary" type="submit">Ajouter conformité</button>
                        <Link to={`/Allconformite/`} className="btn btn-gray mt-3">Retour au tableau de bord</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddConformite;
