import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate ,Link} from 'react-router-dom';
import Cookies from 'js-cookie';

const CreateDocumentForm = () => {

        const [pieces_jointes, setPiecesJointes] = useState(null);
        const [libelle, setlibelle] = useState('');
        const [type, settype] = useState('');

        const [selection_verificateurID, setselection_verificateur] = useState('');
        const [selection_verificateur, setselection_verificateurs] = useState([]);

        const [selection_approbateurID, setselection_approbateur] = useState('');
        const [selection_approbateur, setselection_approbateurs] = useState([]);

        const [liste_informeeID, setliste_informee] = useState([]);
        const [liste_informee, setliste_informees] = useState([]);

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
            // Réinitialiser le formulaire ou effectuer d'autres actions après la création réussie
        })
        .catch(error => {
            console.error('Erreur lors de la création du document interne:', error);
            // Gérer les erreurs
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Libellé:</label>
                <input type="text" name="libelle" value={formData.libelle} onChange={handleChange} />
            </div>
            <div>
                <label>Type:</label>
                <input type="text" name="type" value={formData.type} onChange={handleChange} />
            </div>
            <div>
                <label>Fichier:</label>
                <input type="file" name="fichier" onChange={handleFileChange} />
            </div>
            <div>
                <label>Sélection Site:</label>
                <input type="text" name="selection_site" value={formData.selection_site} onChange={handleChange} />
            </div>
            <div>
                <label>Sélection Activité:</label>
                <input type="text" name="selection_activite" value={formData.selection_activite} onChange={handleChange} />
            </div>
            <div>
                <label>Sélection Rédacteur:</label>
                <input type="text" name="selection_redacteur" value={formData.selection_redacteur} onChange={handleChange} />
            </div>
            <div>
                <label>Sélection Vérificateur:</label>
                <input type="text" name="selection_verificateur" value={formData.selection_verificateur} onChange={handleChange} />
            </div>
            <div>
                <label>Sélection Approbateur:</label>
                <input type="text" name="selection_approbateur" value={formData.selection_approbateur} onChange={handleChange} />
            </div>
            <div>
                <label>Liste Informée:</label>
                {/* Ici, vous pouvez ajouter un composant ou un champ pour sélectionner plusieurs utilisateurs */}
            </div>
            {/* Ajoutez d'autres champs du modèle ici */}
            <button type="submit">Soumettre</button>
        </form>
    );
};

export default CreateDocumentForm;
