import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Navigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

function ModifierDoc() {
    const { id } = useParams();

    const [errors, setErrors] = useState({});
    const [fichier, setPiecesJointes] = useState(null);
    const [libelle, setLibelle] = useState('');
    const [selection_site, setSelectionSite] = useState('');
    const [selection_activite, setSelectionActivite] = useState('');
    const [selection_verificateurID, setSelectionVerificateur] = useState('');
    const [selection_verificateurs, setSelectionVerificateurs] = useState([]);
    const [selection_approbateurID, setSelectionApprobateur] = useState('');
    const [selection_approbateurs, setSelectionApprobateurs] = useState([]);
    const [liste_informeeID, setListeInformee] = useState([]);
    const [liste_informees, setListeInformees] = useState([]);
    const [piecesJointesUrl, setPiecesJointesUrl] = useState('');

    const [updateReussi, setupdateReussi] = useState(false);

    useEffect(() => {
        const fetchDoc = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/doc/details/${id}/`);
                const data = response.data;
                setLibelle(data.libelle);
                setSelectionSite(data.selection_site);
                setSelectionActivite(data.selection_activite);
                setSelectionVerificateur(data.selection_verificateur);
                setSelectionApprobateur(data.selection_approbateur);
                setListeInformee(data.liste_informee);
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

        axios.get(`${process.env.REACT_APP_API_URL}/user/app/`)
            .then(response => { setSelectionApprobateurs(response.data); })
            .catch(error => console.error('Error fetching approbateurs:', error));

        axios.get(`${process.env.REACT_APP_API_URL}/user/verif/`)
            .then(response => { setSelectionVerificateurs(response.data); })
            .catch(error => console.error('Error fetching verificateurs:', error));
    }, [id]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setPiecesJointes(selectedFile);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('libelle', libelle);
        formData.append('selection_site', selection_site);
        formData.append('selection_activite', selection_activite);
        formData.append('selection_verificateur', selection_verificateurID);
        formData.append('selection_approbateur', selection_approbateurID);
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
                setSelectionSite('');
                setSelectionActivite('');
                setSelectionVerificateur('');
                setSelectionApprobateur('');
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
        <main style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="col-xl-8">
                <div className="card mb-4">
                    <div className="card-header--">Modifier le Document</div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="small mb-1" htmlFor="inputLibelle">Libellé</label>
                                <input
                                    className="form-control"
                                    id="inputLibelle"
                                    type="text"
                                    placeholder="Entrez le libellé"
                                    value={libelle}
                                    onChange={(e) => setLibelle(e.target.value)}
                                />
                                {errors.libelle && <p className="text-danger">{errors.libelle}</p>}
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
                                    {errors.selection_site && <p className="text-danger">{errors.selection_site}</p>}
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
                                    {errors.selection_activite && <p className="text-danger">{errors.selection_activite}</p>}
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
                                    {errors.selection_verificateur && <p className="text-danger">{errors.selection_verificateur}</p>}
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
                                    {errors.selection_approbateur && <p className="text-danger">{errors.selection_approbateur}</p>}
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
                                {errors.liste_informee && <p className="text-danger">{errors.liste_informee}</p>}
                            </div>
                            <div className="mb-3">
                                <label className="small mb-1" htmlFor="inputFichier">Fichier</label>
                                <input
                                    className="form-control"
                                    id="inputFichier"
                                    type="file"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className="text-center">
                                <button className="button-add-" type="submit">Modifier</button>
                                <Link to="/DashboardDocInt" > <button className="retour ms-2">Annuler </button></Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ModifierDoc;
