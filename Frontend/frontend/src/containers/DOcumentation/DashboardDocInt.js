/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { PDFDownloadLink, Document, Page, Text, View } from '@react-pdf/renderer';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './DashboardDocInt.css';
import { styles } from './styles';

const DashboardDocInt = () => {
    const [documents, setDocuments] = useState([]);
    const [error, setError] = useState(null);
    const [deleteReussi, setDeleteReussi] = useState(false);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/doc/documents/`, {
                    headers: {
                        'Accept': '*//*',
}
});
setDocuments(response.data);
} catch (error) {
console.error('Error fetching documents:', error);
setError(error.message || 'Une erreur s\'est produite lors de la récupération des données.');
}
};

fetchDocuments();
}, []);

const handleDelete = async (id) => {
const headers = {
'Accept': '*//*',
'Content-Type': 'application/json',
'X-CSRFToken': Cookies.get('csrftoken'),
};
try {
await axios.delete(`${process.env.REACT_APP_API_URL}/doc/documents/Delete/${id}/`, { headers: headers });
setDeleteReussi(true);
} catch (error) {
console.error('Error deleting document:', error);
setError(error.message || 'Une erreur s\'est produite lors de la suppression du document.');
}
};

const MyDocument = ({ data }) => (
<Document>
<Page size="A4" style={styles.page}>
<View style={styles.section}>
    <Text style={styles.header}>Informations sur le document</Text>
    <View style={styles.info}>
        <Text style={styles.label}>Libellé:</Text>
        <Text style={styles.text}>{data.libelle}</Text>
    </View>
    <View style={styles.info}>
        <Text style={styles.label}>Type:</Text>
        <Text style={styles.text}>{data.type}</Text>
    </View>
    <View style={styles.info}>
        <Text style={styles.label}>Site:</Text>
        <Text style={styles.text}>{data.selection_site}</Text>
    </View>
    <View style={styles.info}>
        <Text style={styles.label}>Activité:</Text>
        <Text style={styles.text}>{data.selection_activite}</Text>
    </View>
    <View style={styles.info}>
        <Text style={styles.label}>Vérificateur:</Text>
        <Text style={styles.text}>{data.selection_verificateur}</Text>
    </View>
    <View style={styles.info}>
        <Text style={styles.label}>Approbateur:</Text>
        <Text style={styles.text}>{data.selection_approbateur}</Text>
    </View>
    <View style={styles.info}>
        <Text style={styles.label}>Créé par:</Text>
        <Text style={styles.text}>{data.selection_redacteur}</Text>
    </View>
    <View style={styles.info}>
        <Text style={styles.label}>Créé à:</Text>
        <Text style={styles.text}>{data.created_at}</Text>
    </View>
</View>
</Page>
</Document>
);



if (error) {
return <div className="error-message">Erreur : {error}</div>;
}

if (deleteReussi) {
window.location.reload();
}

return (
<div className="dashboard-doc-int">
<div className="header">
    <h3>Liste des documents</h3>
</div>
<div className="documents-container">
    {documents.map(doc => (
        <div key={doc.id} className="document-card">
            <div className="document-card-body">
                <p className="document-card-text"><strong>libelle:</strong> {doc.libelle}</p>
                <p className="document-card-text"><strong>Type:</strong> {doc.type}</p>
                <p className="document-card-text"><strong>Site:</strong> {doc.selection_site}</p>
                <p className="document-card-text"><strong>Activité:</strong> {doc.selection_activite}</p>
                <p className="document-card-text"><strong>Vérificateur:</strong> {doc.selection_verificateur}</p>
                <p className="document-card-text"><strong>Approbateur:</strong> {doc.selection_approbateur}</p>
                <p className="document-card-text"><strong>Liste informée:</strong> {doc.liste_informee.join(', ')}</p>
                <p className="document-card-text"><strong>Modifié par:</strong> {doc.updated_by}</p>
                <p className="document-card-text"><strong>Modifié le :</strong> {doc.updated_at}</p>
                <p className="document-card-text"><strong>Crée par:</strong> {doc.selection_redacteur}</p>
                <p className="document-card-text"><strong>Crée à:</strong> {doc.created_at}</p>
                <p><strong>Pièces jointes :</strong> {doc.fichier ? <a href={`${process.env.REACT_APP_API_URL}/doc/documents/${doc.id}/`} target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>
                <div className="document-card-buttons">
                   <Link to={`/archive/${doc.id}`} className="btn btn-primary">Archive</Link>
                    <Link to={`/modifierDocInt/${doc.id}`} className="btn btn-primary">Modifier</Link>
                    <button onClick={() => handleDelete(doc.id)} className="btn btn-danger">Supprimer</button>
                    <PDFDownloadLink document={<MyDocument data={doc} />} fileName={`document-${doc.id}.pdf`}>
                        {({ blob, url, loading, error }) => (
                            <button className="btn btn-primary pdf-button">
                                <FontAwesomeIcon icon={faFilePdf} />
                            </button>
                        )}
                    </PDFDownloadLink>
                </div>
            </div>
        </div>
    ))}
</div>
<div className="dashboard-buttons">
    <Link to={`/demandeAccepte/`} className="btn btn-primary">Rédiger document</Link>
</div>
<div className="dashboard-buttons">
    <Link to={`/DashboardDoc/`} className="btn btn-secondary">Retour</Link>
</div>
</div>
);
};

export default DashboardDocInt;
*/
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PDFDownloadLink, Document, Page, Text, View } from '@react-pdf/renderer';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './DashboardDocInt.css';
import { styles } from './styles';
import { GrEdit } from 'react-icons/gr';
import { FaArchive, FaTrashAlt } from 'react-icons/fa';

const sampleDocuments = [
    {
        id: 1,
        libelle: 'Document 1',
        type: 'Type A',
        selection_site: 'Site 1',
        selection_activite: 'Activité 1',
        selection_verificateur: 'Vérificateur 1',
        selection_approbateur: 'Approbateur 1',
        selection_redacteur: 'Rédacteur 1',
        created_at: '2024-01-01',
        updated_by: 'User A',
        updated_at: '2024-01-02',
        fichier: true,
        liste_informee: ['Informé 1', 'Informé 2']
    },
    {
        id: 2,
        libelle: 'Document 2',
        type: 'Type B',
        selection_site: 'Site 2',
        selection_activite: 'Activité 2',
        selection_verificateur: 'Vérificateur 2',
        selection_approbateur: 'Approbateur 2',
        selection_redacteur: 'Rédacteur 2',
        created_at: '2024-02-01',
        updated_by: 'User B',
        updated_at: '2024-02-02',
        fichier: false,
        liste_informee: ['Informé 3']
    },
    // Add more sample documents as needed
];

const DashboardDocInt = () => {
    const [documents, setDocuments] = useState(sampleDocuments);
    const [deleteReussi, setDeleteReussi] = useState(false);

    const handleDelete = (id) => {
        // Simulate deleting document
        setDocuments(documents.filter(doc => doc.id !== id));
        setDeleteReussi(true);
    };

    const MyDocument = ({ data }) => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.header}>Informations sur le document</Text>
                    <View style={styles.info}>
                        <Text style={styles.label}>Libellé:</Text>
                        <Text style={styles.text}>{data.libelle}</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.label}>Type:</Text>
                        <Text style={styles.text}>{data.type}</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.label}>Site:</Text>
                        <Text style={styles.text}>{data.selection_site}</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.label}>Activité:</Text>
                        <Text style={styles.text}>{data.selection_activite}</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.label}>Vérificateur:</Text>
                        <Text style={styles.text}>{data.selection_verificateur}</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.label}>Approbateur:</Text>
                        <Text style={styles.text}>{data.selection_approbateur}</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.label}>Créé par:</Text>
                        <Text style={styles.text}>{data.selection_redacteur}</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.label}>Créé à:</Text>
                        <Text style={styles.text}>{data.created_at}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );

    if (deleteReussi) {
        window.location.reload();
    }

    return (
        <div className='' style={{ backgroundColor: '#eeeeee',display:'flex' }}> 
        <div className="dashboard-doc-int" style={{ backgroundColor: '#ffff', minHeight: '100vh', padding: '20px' }}>
            <div className="button-container" style={{ marginTop: '20px' }}>
                <Link to={`/DashboardDoc/`}> <button className="retour">Retour </button></Link>
                <Link to={`/demandeAccepte/`} > <button className="button-add-" style={{ marginRight: '10px' }}>Rédiger document </button></Link>
            </div>
            <div className="doc-title">
                <h3>Liste des documents</h3>
            </div>
            <div className="documents-list">
                {documents.map(doc => (
                    <div key={doc.id} className="document-item" style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#f7f7f7' }}>
                        <p><strong>Libellé:</strong> {doc.libelle}</p>
                        <p><strong>Type:</strong> {doc.type}</p>
                        <p><strong>Site:</strong> {doc.selection_site}</p>
                        <p><strong>Activité:</strong> {doc.selection_activite}</p>
                        <p><strong>Vérificateur:</strong> {doc.selection_verificateur}</p>
                        <p><strong>Approbateur:</strong> {doc.selection_approbateur}</p>
                        <p><strong>Liste informée:</strong> {doc.liste_informee.join(', ')}</p>
                        <p><strong>Modifié par:</strong> {doc.updated_by}</p>
                        <p><strong>Modifié le :</strong> {doc.updated_at}</p>
                        <p><strong>Créé par:</strong> {doc.selection_redacteur}</p>
                        <p><strong>Créé à:</strong> {doc.created_at}</p>
                        <p><strong>Pièces jointes :</strong> {doc.fichier ? <a href={`#`} target="_blank" rel="noopener noreferrer">Consulter</a> : 'Aucun'}</p>
                        <div className="document-buttons" style={{ marginTop: '10px' }}>
                            <Link to={`/archive/${doc.id}`} className="btn btn-success" style={{ marginRight: '10px' }}><FaArchive />
                            </Link>
                            <Link to={`/modifierDocInt/${doc.id}`} className="btn btn-primary" style={{ marginRight: '10px' }}> <GrEdit /></Link>
                            <button onClick={() => handleDelete(doc.id)} className="btn btn-danger" style={{ marginRight: '10px' }}><FaTrashAlt />
                            </button>
                            <PDFDownloadLink document={<MyDocument data={doc} />} fileName={`document-${doc.id}.pdf`}>
                                {({ blob, url, loading, error }) => (
                                    <button className="btn btn-primary" style={{ marginRight: '20px' }}>
                                        <FontAwesomeIcon icon={faFilePdf} />
                                    </button>
                                )}
                            </PDFDownloadLink>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
};

export default DashboardDocInt;
