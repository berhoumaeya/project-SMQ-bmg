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
              setSelectionApprobateur(data.selection_approbateur)
              setListeInformee(data.liste_informee)
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

      axios.get(`${process.env.REACT_APP_API_URL}/user/app/`)
          .then(response => {setSelectionApprobateurs(response.data);})
          .catch(error => console.error('Error fetching approbateurs:', error));

      axios.get(`${process.env.REACT_APP_API_URL}/user/verif/`)
          .then(response => {setSelectionVerificateurs(response.data);})
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
        liste_informeeID.forEach(id => {formData.append('liste_informee', id)});
        if (fichier) {
            formData.append('fichier', fichier);
        }else if (piecesJointesUrl === '') {
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
              setSelectionApprobateur('')
              setListeInformee('')
              setPiecesJointes(null);

                setupdateReussi(true)
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
        <div className="form-container">
            <div className="form-card">
                <h3>Modifier document</h3>
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label>Libellé:</label>
                        {errors.libelle && <p className="error-text">{errors.libelle}</p>}
                        <input type="text" name="libelle" value={libelle} onChange={(e) => setLibelle(e.target.value )} />
                    </div>
                    <div className="form-group">
                        <label>Site:</label>
                        {errors.selection_site && <p className="error-text">{errors.selection_site}</p>}
                        <select value={selection_site} onChange={(e) => setSelectionSite(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            <option value="Site 1">Site 1</option>
                            <option value="Site 2">Site 2</option>
                            <option value="Site 3">Site 3</option>
                            <option value="Site 4">Site 4</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Activité:</label>
                        {errors.selection_activite && <p className="error-text">{errors.selection_activite}</p>}
                        <select value={selection_activite} onChange={(e) => setSelectionActivite(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            <option value="Développement">Développement</option>
                            <option value="Test">Test</option>
                            <option value="Documentation">Documentation</option>
                            <option value="Déploiement">Déploiement</option>
                            <option value="Support">Support</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Vérificateur:</label>
                        {errors.selection_verificateur && <p className="error-text">{errors.selection_verificateur}</p>}
                        <select value={selection_verificateurID} onChange={(e) => setSelectionVerificateur(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            {selection_verificateurs.map(selection_verificateur => (
                                <option key={selection_verificateur.id} value={selection_verificateur.id}>{selection_verificateur.username}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Approbateur:</label>
                        {errors.selection_approbateur && <p className="error-text">{errors.selection_approbateur}</p>}
                        <select value={selection_approbateurID} onChange={(e) => setSelectionApprobateur(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            {selection_approbateurs.map(selection_approbateur => (
                                <option key={selection_approbateur.id} value={selection_approbateur.id}>{selection_approbateur.username}</option>
                            ))}
                        </select>
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

export default ModifierDoc;
