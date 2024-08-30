import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Navigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import SubNavbarDoc from '../../components/SubNavbarDOC';
import SidebarDoc from '../../components/SidebarDoc';
import { GrEdit } from 'react-icons/gr';
import { IoMdArrowRoundBack } from 'react-icons/io';

function ModifierDoc() {
    const { id } = useParams();

    const [errors, setErrors] = useState({});
    const [fichier, setPiecesJointes] = useState(null);
    const [code, setCode] = useState('');
    const [type_doc, setTypeDoc] = useState('');
    const [libelle, setLibelle] = useState('');
    const [selection_site, setSelectionSite] = useState('');
    const [selection_activite, setSelectionActivite] = useState('');
    const [selection_verificateurID, setSelectionVerificateur] = useState('');
    const [selection_verificateurs, setSelectionVerificateurs] = useState([]);
    const [selection_approbateurID, setSelectionApprobateur] = useState('');
    const [selection_approbateurs, setSelectionApprobateurs] = useState([]);
    const [selection_redacteurID, setSelectionRedacteur] = useState('');
    const [selection_redacteurs, setSelectionRedacteurs] = useState([]);
    const [liste_informeeID, setListeInformee] = useState([]);
    const [liste_informees, setListeInformees] = useState([]);
    const [piecesJointesUrl, setPiecesJointesUrl] = useState('');
    const [commentaire, setCommentaire] = useState('');

    const [updateReussi, setupdateReussi] = useState(false);

    useEffect(() => {
        const fetchDoc = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/doc/details/${id}/`);
                const data = response.data;
                setLibelle(data.libelle);
                setCode(data.code);
                setTypeDoc(data.type_doc);
                setSelectionSite(data.selection_site);
                setSelectionActivite(data.selection_activite);
                setSelectionVerificateur(data.selection_verificateur);
                setSelectionApprobateur(data.selection_approbateur);
                setSelectionRedacteur(data.selection_redacteur);
                setListeInformee(data.liste_informee);
                if (data.fichier) {
                    setPiecesJointesUrl(`${data.fichier}`);
                }
                setCommentaire(data.commentaire);
            } catch (error) {
                console.error('Erreur lors de la récupération des données de document:', error);
            }
        };

        fetchDoc();

        axios.get(`${process.env.REACT_APP_API_URL}/user/users/`)
            .then(response => { setListeInformees(response.data); })
            .catch(error => console.error('Error fetching users:', error));

        axios.get(`${process.env.REACT_APP_API_URL}/user/app/`)
            .then(response => { setSelectionApprobateurs(response.data); })
            .catch(error => console.error('Error fetching approbateurs:', error));

        axios.get(`${process.env.REACT_APP_API_URL}/user/verif/`)
            .then(response => { setSelectionVerificateurs(response.data); })
            .catch(error => console.error('Error fetching verificateurs:', error));

        axios.get(`${process.env.REACT_APP_API_URL}/user/redact/`)
            .then(response => { setSelectionRedacteurs(response.data); })
            .catch(error => console.error('Error fetching redacteurs:', error));
    }, [id]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setPiecesJointes(selectedFile);
    };

    const validateForm = () => {

        const formErrors = {};
        if (!libelle) formErrors.libelle = 'Libellé est requis.';
        if (!selection_site) formErrors.selection_site = 'Site est requis.';
        if (!code) formErrors.code = 'Code est requis';
        if (!type_doc) formErrors.type_doc = 'Type de document est requis.';
        if (!selection_activite) formErrors.selection_activite = 'Activité est requis.';
        if (!selection_verificateurID) formErrors.selection_verificateur = 'Vérificateur est requis.';
        if (!selection_approbateurID) formErrors.selection_approbateur = 'Approbateur est requis.';
        if (liste_informeeID.length === 0) formErrors.liste_informee = 'Liste informée est requis.';
        if (!fichier && piecesJointesUrl === '') formErrors.fichier = 'Pièces jointes est requis.';
        if (!commentaire) formErrors.commentaire = 'Commentaire est requis.';
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
        formData.append('libelle', libelle);
        formData.append('code', code);
        formData.append('type_doc', type_doc);
        formData.append('selection_site', selection_site);
        formData.append('selection_activite', selection_activite);
        formData.append('selection_verificateur', selection_verificateurID);
        formData.append('selection_approbateur', selection_approbateurID);
        formData.append('selection_redacteur', selection_redacteurID);
        formData.append('commentaire', commentaire);
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

        axios.put(`${process.env.REACT_APP_API_URL}/doc/documents/Update/${id}/`, formData, { headers })
            .then(response => {
                console.log('Document modifié avec succès:', response.data);
                setLibelle('');
                setCode('');
                setTypeDoc('');
                setCommentaire('');
                setSelectionSite('');
                setSelectionActivite('');
                setSelectionVerificateur('');
                setSelectionApprobateur('');
                setSelectionRedacteur('');
                setListeInformee([]);
                setPiecesJointes(null);
                setupdateReussi(true);

            })
            .catch(error => {
                console.error('Error updating document:', error);
                setErrors(error.response?.data || { message: 'Une erreur s\'est produite lors de la modification du document.' });
            });
    };

    if (updateReussi) {
        return <Navigate to="/DashboardDocInt" />;
    }

    return (
        <> <SubNavbarDoc />
            <main style={{ display: 'flex', minHeight: '100vh' }}>
                <SidebarDoc />
                <div className="container-xl px-4 mt-4">
                    <div className='row'>
                        <div className="col-xl-4">
                            <div className="card mb-4 mb-xl-0">
                                <div className="card-header-">Commentaire</div>
                                <div className="card-body text-center">
                                    {updateReussi ? (
                                        <div className="small font-italic text-muted mb-4">
                                            {commentaire ? commentaire : "Aucun commentaire disponible"}
                                        </div>
                                    ) : (
                                        <>
                                            <input
                                                className="form-control mb-3"
                                                placeholder="Entrez un commentaire"
                                                value={commentaire}
                                                onChange={(e) => setCommentaire(e.target.value)}
                                            />
                                            <button
                                                className="btn btn-primary" style={{ backgroundColor: '#5585b5' }}
                                                onClick={() => {
                                                    setupdateReussi(true);
                                                }}
                                            >
                                                Sauvegarder
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                            <br />
                            <div className="card mb-4">
                                <div className="card-header-">Historique</div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        {document ? (
                                            <>
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <strong>Date de modification</strong><br />
                                                        <small>{document.updated_at} - {document.updated_by}</small>
                                                    </div>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    <div> <strong>Date de création</strong><br />
                                                        <small>{document.created_at} - {document.created_by}</small>
                                                    </div>

                                                </li>
                                            </>
                                        ) : (<div>Chargement...</div>)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8">
                            <div className="card mb-4">
                                <div className="card-header-">Modifier le Document</div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row gx-3 mb-3">
                                            <div className="col-md-6">
                                                <label className="small mb-1" htmlFor="inputCode">Code</label>
                                                <input
                                                    className="form-control"
                                                    id="inputCode"
                                                    type="text"
                                                    placeholder="Entrez le code"
                                                    value={code}
                                                    onChange={(e) => setCode(e.target.value)}
                                                />
                                                {errors.code && <p className="error">{errors.code}</p>}
                                            </div>
                                            <div className="col-md-6">
                                                <label className="small mb-1" htmlFor="inputLibelle">Libellé</label>
                                                <input
                                                    className="form-control"
                                                    id="inputLibelle"
                                                    type="text"
                                                    placeholder="Entrez le libellé"
                                                    value={libelle}
                                                    onChange={(e) => setLibelle(e.target.value)}
                                                />
                                                {errors.libelle && <p className="error">{errors.libelle}</p>}
                                            </div>
                                        </div>
                                        <div className="row gx-3 mb-3">
                                            <div className="col-md-6">
                                                <label className="small mb-1" htmlFor="inputSite">Site</label>
                                                <select
                                                    className="form-control"
                                                    id="inputSite"
                                                    value={selection_site}
                                                    onChange={(e) => setSelectionSite(e.target.value)}
                                                >
                                                    <option value="">Sélectionner...</option>
                                                    <option value="Site 1">Site 1</option>
                                                    <option value="Site 2">Site 2</option>
                                                    <option value="Site 3">Site 3</option>
                                                    <option value="Site 4">Site 4</option>
                                                </select>
                                                {errors.selection_site && <p className="error">{errors.selection_site}</p>}
                                            </div>
                                            <div className="col-md-6">
                                                <label className="small mb-1" htmlFor="inputActivite">Activité</label>
                                                <select
                                                    className="form-control"
                                                    id="inputActivite"
                                                    value={selection_activite}
                                                    onChange={(e) => setSelectionActivite(e.target.value)}
                                                >
                                                    <option value="">Sélectionner...</option>
                                                    <option value="Développement">Développement</option>
                                                    <option value="Test">Test</option>
                                                    <option value="Documentation">Documentation</option>
                                                    <option value="Déploiement">Déploiement</option>
                                                    <option value="Support">Support</option>
                                                </select>
                                                {errors.selection_activite && <p className="error">{errors.selection_activite}</p>}
                                            </div>
                                        </div>
                                        <div className="row gx-3 mb-3">
                                            <div className="col-md-6">
                                                <label className="small mb-1" htmlFor="inputVerificateur">Vérificateur</label>
                                                <select
                                                    className="form-control"
                                                    id="inputVerificateur"
                                                    value={selection_verificateurID}
                                                    onChange={(e) => setSelectionVerificateur(e.target.value)}
                                                >
                                                    <option value="">Sélectionner...</option>
                                                    {selection_verificateurs.map(verificateur => (
                                                        <option key={verificateur.id} value={verificateur.id}>{verificateur.username}</option>
                                                    ))}
                                                </select>
                                                {errors.selection_verificateur && <p className="error">{errors.selection_verificateur}</p>}
                                            </div>
                                            <div className="col-md-6">
                                                <label className="small mb-1" htmlFor="inputApprobateur">Approbateur</label>
                                                <select
                                                    className="form-control"
                                                    id="inputApprobateur"
                                                    value={selection_approbateurID}
                                                    onChange={(e) => setSelectionApprobateur(e.target.value)}
                                                >
                                                    <option value="">Sélectionner...</option>
                                                    {selection_approbateurs.map(approbateur => (
                                                        <option key={approbateur.id} value={approbateur.id}>{approbateur.username}</option>
                                                    ))}
                                                </select>
                                                {errors.selection_approbateur && <p className="error">{errors.selection_approbateur}</p>}
                                            </div>
                                        </div>
                                        <div className="row gx-3 mb-3">
                                            <div className="mb-3">
                                                <label className="small mb-1" htmlFor="inputTypeDoc">Type de Document</label>
                                                <select
                                                    className="form-control"
                                                    id="inputTypeDoc"
                                                    value={type_doc}
                                                    onChange={(e) => setTypeDoc(e.target.value)}
                                                >
                                                    <option value="">Sélectionner...</option>
                                                    <option value="Interne">Manuel</option>
                                                    <option value="Externe">Procédure</option>
                                                    <option value="Externe">Politique</option>
                                                </select>
                                                {errors.type_doc && <p className="error">{errors.type_doc}</p>}
                                            </div>
                                            <div className="mb-3">
                                                <label className="small mb-1" htmlFor="inputRedacteur">Rédacteur</label>
                                                <select
                                                    className="form-control"
                                                    id="inputRedacteur"
                                                    value={selection_redacteurID}
                                                    onChange={(e) => setSelectionRedacteur(e.target.value)}
                                                >
                                                    <option value="">Sélectionner...</option>
                                                    {selection_redacteurs.map(redacteur => (
                                                        <option key={redacteur.id} value={redacteur.id}>{redacteur.username}</option>
                                                    ))}
                                                </select>
                                                {errors.selection_redacteur && <p className="error">{errors.selection_redacteur}</p>}
                                            </div>
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
                                            <label className="small mb-1" htmlFor="inputFichier">Fichier</label>
                                            <input
                                                className="form-control"
                                                id="inputFichier"
                                                type="file"
                                                onChange={handleFileChange}
                                            />
                                            {errors.fichier && <p className="error">{errors.fichier}</p>}
                                        </div>
                                        <div className="d-flex justify-content-end mt-3">
                                            <Link to="/DashboardDocInt" className="btn btn-secondary me-2">
                                                <IoMdArrowRoundBack /> Retour
                                            </Link>
                                            <button type="submit" className="btn btn-primary me-2">
                                                <GrEdit /> Modifier
                                            </button>

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

export default ModifierDoc;
