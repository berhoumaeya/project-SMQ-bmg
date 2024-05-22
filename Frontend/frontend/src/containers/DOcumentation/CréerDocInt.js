import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate ,Link} from 'react-router-dom';
import Cookies from 'js-cookie';

const CreateDocumentForm = () => {

        const [errors, setErrors] = useState({});
 
        const [pieces_jointes, setPiecesJointes] = useState(null);
        const [libelle, setlibelle] = useState('');
        const [type, settype] = useState('');
        const [selection_site, setselection_site] = useState('');
        const [selection_activite, setselection_activite] = useState('');

        const [selection_verificateurID, setselection_verificateur] = useState('');
        const [selection_verificateurs, setselection_verificateurs] = useState([]);

        const [selection_approbateurID, setselection_approbateur] = useState('');
        const [selection_approbateurs, setselection_approbateurs] = useState([]);

        const [liste_informeeID, setliste_informee] = useState([]);
        const [liste_informees, setliste_informees] = useState([]);

        const [demandes, setdemandes] = useState([]);
        const [demandeID, setdemande] = useState('');

        const [ajoutReussi, setAjoutReussi] = useState(false);

        useEffect(() => {
            axios.get(`${process.env.REACT_APP_API_URL}/user/users/`)
           .then(response => {
            setselection_verificateurs(response.data);
            setselection_approbateurs(response.data);
            setliste_informees(response.data);
           })
           .catch(error => {
               console.error('Error',error)
           });

           axios.get(`${process.env.REACT_APP_API_URL}/doc/document-Accepted/`)
            .then(response => {
                setdemandes(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des positions :', error);
            });

       },[]);

       const handleFileChange = (event) => {
           const selectedFile = event.target.files[0];
           setPiecesJointes(selectedFile);
       };      

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('libelle', libelle);
        formData.append('type', type);
        formData.append('selection_site', selection_site);
        formData.append('selection_activite', selection_activite);
        formData.append('selection_verificateur', selection_verificateurID);
        formData.append('selection_approbateur', selection_approbateurID);
        liste_informeeID.forEach(id => {
            formData.append('liste_informee', id);
        });
        if (pieces_jointes) {
            formData.append('pieces_jointes', pieces_jointes);
        }

        const headers = {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': Cookies.get('csrftoken')
        };

        axios.post(`${process.env.REACT_APP_API_URL}/doc/create-document-interne/`, formData, { headers: headers })
        .then(response => {
            console.log('Document interne créé avec succès:', response.data);
            setlibelle('');
            settype('');
            setliste_informee([]);
            setselection_approbateur('');
            setselection_verificateur('');
            setselection_activite('');
            setselection_site('');
            setdemande('');

            setAjoutReussi(true);
        })
        

        .catch((error) => {
            const errResponse = error.response.data.errors;
            const errObj = {};
            for (const key of Object.keys(errResponse)) {
              errObj[key] = errResponse[key].message;
            }
            setErrors(errObj);
            console.log(setErrors(errObj));
          });
    };
    if (ajoutReussi) {
        return <Navigate to="/DashboardDoc" />;
    }

    return (
        <div className="form-container">
        <div className="form-card">
        <h3>Ajouter document</h3>
        <div className="form-group">
                    <label>ID demande:</label>
                    <select value={demandeID} onChange={(e) => setdemande(e.target.value)}>
                        <option value="">Sélectionner...</option>
                        {demandes.map(document_id => (
                            <option key={document_id.id} value={document_id.id}>{document_id.id}</option>
                        ))}
                    </select>
                </div>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label>Libelle:</label>
                    <input type="text" value={libelle} onChange={(e) => setlibelle(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Type:</label>
                    <input type="text" value={type} onChange={(e) => settype(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Site:</label>
                    <input type="text" value={selection_site} onChange={(e) => setselection_site(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Activité:</label>
                    <input type="text" value={selection_activite} onChange={(e) => setselection_activite(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Vérificateur:</label>
                    <select value={selection_verificateurID} onChange={(e) => setselection_verificateur(e.target.value)}>
                        <option value="">Sélectionner...</option>
                        {selection_verificateurs.map(selection_verificateur => (
                            <option key={selection_verificateur.id} value={selection_verificateur.id}>{selection_verificateur.username}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Approbateur:</label>
                    <select value={selection_approbateurID} onChange={(e) => setselection_approbateur(e.target.value)}>
                        <option value="">Sélectionner...</option>
                        {selection_approbateurs.map(selection_approbateur => (
                            <option key={selection_approbateur.id} value={selection_approbateur.id}>{selection_approbateur.username}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Liste informée :</label>
                    <select multiple value={liste_informeeID} onChange={(e) => setliste_informee(Array.from(e.target.selectedOptions, option => option.value))}>
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

export default CreateDocumentForm;
