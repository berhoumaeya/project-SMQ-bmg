/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Navigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const ModifierConformite = () => {
    const { id } = useParams();

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
    const [piecesJointesUrl, setPiecesJointesUrl] = useState('');
    const [modificationReussie, setModificationReussie] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/action/dashboard_action/`)
            .then(response => setPlanActions(response.data))
            .catch(error => console.error('Error fetching responsables:', error));

        axios.get(`${process.env.REACT_APP_API_URL}/doc/documentsExt/`)
            .then(response => setSources(response.data))
            .catch(error => console.error('Error fetching documents:', error));

        axios.get(`${process.env.REACT_APP_API_URL}/conformite/Exigence/${id}/`)
            .then(response => {
                const data = response.data;
                setNom(data.nom);
                setTypeFiche(data.type_fiche);
                setSource(data.source);
                setTypeDecideur(data.type_decideur);
                setExigenceDec(data.exigence_dec);
                setNomReglementation(data.nom_reglementation);
                setApplicable(data.applicable);
                setPlanAction(data.plan_action);
                if (data.pieces_jointes) {
                    setPiecesJointesUrl(`${data.pieces_jointes}`);
                }
            })
            .catch(error => console.error('Error fetching reclamation:', error));
    }, [id]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setPiecesJointes(selectedFile);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('type_fiche', type_fiche);
        formData.append('source', source);
        formData.append('type_decideur', type_decideur);
        formData.append('exigence_dec', exigence_dec);
        formData.append('nom_reglementation', nom_reglementation);
        formData.append('applicable', applicable ? 'True' : 'False');
        formData.append('plan_action', plan_action);
        if (pieces_jointes) {
            formData.append('pieces_jointes', pieces_jointes);
        } else if (piecesJointesUrl === '') {
            formData.append('pieces_jointes', '');
        }

        const headers = {
            'Accept': '*//*',
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': Cookies.get('csrftoken')
        };

        axios.put(`${process.env.REACT_APP_API_URL}/conformite/update_Exigence/${id}/`, formData, { headers })
            .then(response => {
                console.log('Reclamation modifiée avec succès:', response.data);
                setNom('');
                setTypeFiche('');
                setSource('');
                setTypeDecideur('');
                setExigenceDec(false);
                setNomReglementation('');
                setApplicable(false);
                setPlanAction('');
                setPiecesJointes(null);
                setPiecesJointesUrl('');
                setModificationReussie(true);
            })
            .catch(error => {
                console.error('Error updating reclamation:', error);
                setErrors(error.response?.data || { message: 'Une erreur s\'est produite lors de la modification de la réclamation.' });
            });
    };

    if (modificationReussie) {
        return <Navigate to={`/Allconformite/`} />;
    }

    return (
        <div className="form-container">
            <div className="form-card">
                <h3>Modifier Conformité</h3>
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label>Nom:</label>
                        {errors.nom && <p className="error-text">{errors.nom}</p>}
                        <input type="text" name="nom" value={nom} onChange={(e) => setNom(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Type decideur:</label>
                        {errors.type_decideur && <p className="error-text">{errors.type_decideur}</p>}
                        <input type="text" name="type_decideur" value={type_decideur} onChange={(e) => setTypeDecideur(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Type fiche:</label>
                        {errors.type_fiche && <p className="error-text">{errors.type_fiche}</p>}
                        <select value={type_fiche} onChange={(e) => setTypeFiche(e.target.value)}>
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
                        <select value={source} onChange={(e) => setSource(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            {sources.map(source => (
                                <option key={source.id} value={source.id}>{source.designation}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Exigence :</label>
                        <input type="checkbox" name="exigence_dec" checked={exigence_dec} onChange={e => setExigenceDec(e.target.checked)} />
                    </div>
                    {exigence_dec && (
                        <>
                            <div className="form-group">
                                <label>Nom régulation:</label>
                                {errors.nom_reglementation && <p className="error-text">{errors.nom_reglementation}</p>}
                                <input type="text" name="nom_reglementation" value={nom_reglementation} onChange={(e) => setNomReglementation(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Applicable ? :</label>
                                <input type="checkbox" name="applicable" checked={applicable} onChange={e => setApplicable(e.target.checked)} />
                            </div>
                            <div className="form-group">
                                <label>Plan Actions:</label>
                                {errors.plan_action && <p className="error-text">{errors.plan_action}</p>}
                                <select value={plan_action} onChange={(e) => setPlanAction(e.target.value)}>
                                    <option value="">Sélectionner...</option>
                                    {plan_actions.map(plan_action => (
                                        <option key={plan_action.id} value={plan_action.id}>{plan_action.nom_action}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Pièces jointes :</label>
                                <input type="file" onChange={handleFileChange} />
                            </div>
                        </>
                    )}
                    <div className="button-group">
                        <button className="btn btn-primary" type="submit">Enregistrer modifications</button>
                        <Link to={`/Allconformite/`} className="btn btn-gray mt-3">Retour au tableau de bord</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModifierConformite;*/
import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import '../Fournisseur/consulterfou.css'; 
import { GrTrash } from 'react-icons/gr';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { CiSaveDown2 } from 'react-icons/ci';

const ModifierConformite = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Initialize formData with static data
    const [formData, setFormData] = useState({
        nom: 'Conformité A',
        type_fiche: 'Sécurité',
        sources: [
            { id: 1, designation: 'Source 1' },
            { id: 2, designation: 'Source 2' }
        ],
        source: '1',
        type_decideur: 'Manager',
        exigence_dec: true,
        nom_reglementation: 'ISO 9001',
        applicable: true,
        plan_actions: [
            { id: 1, nom_action: 'Plan A' },
            { id: 2, nom_action: 'Plan B' }
        ],
        plan_action: '1',
        pieces_jointes: null,
        modifie_le: '01/01/2024', // Example modification date
        modifie_par: 'John Doe'    // Example modifier
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prevData => ({
            ...prevData,
            pieces_jointes: e.target.files[0]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation example
        const newErrors = {};
        if (!formData.type_fiche) newErrors.type_fiche = 'Type fiche is required';
        if (!formData.source) newErrors.source = 'Source is required';
        if (formData.exigence_dec && !formData.nom_reglementation) newErrors.nom_reglementation = 'Nom régulation is required';
        if (formData.exigence_dec && !formData.plan_action) newErrors.plan_action = 'Plan action is required';
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        console.log('Form data:', formData);
        navigate('/AllConformite');
    };

    const handleDelete = () => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette conformité ?')) {
            console.log('Conformité supprimée');
            navigate('/AllConformite');
        }
    };

    return (
        <div className="container-fournisseur px-4 mt-4">
            <nav className="nav-fournisseur">
                <div className="nav-items-container">
                    <Link className="nav-item active" to="#">Modifier conformité</Link>
                </div>
                <Link className="btn btn-return" to={`/AllConformite`}><IoMdArrowRoundBack /> Retour</Link>
            </nav>
            <hr className="divider" />
            <div className="row">
                <div className="col-lg-4">
                    <div className="card-fournisseur mb-4">
                        <div className="card-header-fournisseur">commentaire </div>
                        <div className="card-body-fournisseur text-center">
                           
                            <div className="mt-3">
                              
                            <textarea
                                className="form-control-fournisseur"
                                placeholder="Ajouter un commentaire"
                            />
                            </div>
                        </div>
                    </div>
                    <div className="commentaire-section">
                        <div className="commentaire-card-header">Historique</div>
                        <div className="commentaire-card-body">

                        <div>
                                    <label>Modifié le:</label>
                                    <p>{formData.modifie_le}</p>
                                </div>
                                <div>
                                    <label>Modifié par:</label>
                                    <p>{formData.modifie_par}</p>
                                </div>

                        </div>
                    </div>
                </div>

                <div className="col-lg-8">
                    <div className="card-fournisseur mb-4">
                        <div className="card-header-fournisseur">Modifier Conformité</div>
                        <div className="card-body-fournisseur">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Type fiche:</label>
                                    {errors.type_fiche && <p className="error-text">{errors.type_fiche}</p>}
                                    <select
                                        name="type_fiche"
                                        value={formData.type_fiche}
                                        onChange={handleChange}
                                        className="form-control-fournisseur"
                                    >
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
                                    <select
                                        name="source"
                                        value={formData.source}
                                        onChange={handleChange}
                                        className="form-control-fournisseur"
                                    >
                                        <option value="">Sélectionner...</option>
                                        {formData.sources.map(source => (
                                            <option key={source.id} value={source.id}>{source.designation}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Exigence :</label>
                                    <input
                                        type="checkbox"
                                        name="exigence_dec"
                                        checked={formData.exigence_dec}
                                        onChange={(e) => setFormData(prevData => ({
                                            ...prevData,
                                            exigence_dec: e.target.checked
                                        }))}
                                    />
                                </div>

                                {formData.exigence_dec && (
                                    <>
                                        <div className="form-group">
                                            <label>Nom régulation:</label>
                                            {errors.nom_reglementation && <p className="error-text">{errors.nom_reglementation}</p>}
                                            <input
                                                type="text"
                                                name="nom_reglementation"
                                                value={formData.nom_reglementation}
                                                onChange={handleChange}
                                                className="form-control-fournisseur"
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Applicable ? :</label>
                                            <input
                                                type="checkbox"
                                                name="applicable"
                                                checked={formData.applicable}
                                                onChange={(e) => setFormData(prevData => ({
                                                    ...prevData,
                                                    applicable: e.target.checked
                                                }))}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Plan Actions:</label>
                                            {errors.plan_action && <p className="error-text">{errors.plan_action}</p>}
                                            <select
                                                name="plan_action"
                                                value={formData.plan_action}
                                                onChange={handleChange}
                                                className="form-control-fournisseur"
                                            >
                                                <option value="">Sélectionner...</option>
                                                {formData.plan_actions.map(plan_action => (
                                                    <option key={plan_action.id} value={plan_action.id}>{plan_action.nom_action}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </>
                                )}
                                    <div className="form-group">
                                    <label>Pièces jointes :</label>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="form-control-file"
                                    />
                                </div>

                                <div className="text-end">
                                    <button type="submit" className="btn btn-primary">
                                        <CiSaveDown2 /> Sauvegarder
                                    </button>
                                    <button type="button" className="btn btn-danger ms-2" onClick={handleDelete}>
                                        <GrTrash /> Supprimer
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModifierConformite;
