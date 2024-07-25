/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { PDFDownloadLink, Document, Page, Text, View } from '@react-pdf/renderer';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './DashboardDocInt.css';
import { styles } from './styles';

const DashboardDocExt = () => {
    const [documents, setDocuments] = useState([]);
    const [error, setError] = useState(null);
    const [deleteReussi, setDeleteReussi] = useState(false);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/doc/documentsExt/`, {
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
            await axios.delete(`${process.env.REACT_APP_API_URL}/doc/documentsExt/Delete/${id}/`, { headers: headers });
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
                    <Text style={styles.label}>designation:</Text>
                    <Text style={styles.text}>{data.designation}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.label}>Type:</Text>
                    <Text style={styles.text}>{data.type}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.label}>lieu classement:</Text>
                    <Text style={styles.text}>{data.lieu_classement}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.label}>duree classement:</Text>
                    <Text style={styles.text}>{data.duree_classement}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.label}>Créé par:</Text>
                    <Text style={styles.text}>{data.created_by}</Text>
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
                <h3>Liste des documents Externes</h3>
            </div>
            <div className="documents-container">
                {documents.map(doc => (
                    <div key={doc.id} className="document-card">
                        <div className="document-card-body">
                            <p className="document-card-text"><strong>designation:</strong> {doc.designation}</p>
                            <p className="document-card-text"><strong>Type:</strong> {doc.type}</p>
                            <p className="document-card-text"><strong>lieu classement:</strong> {doc.lieu_classement}</p>
                            <p className="document-card-text"><strong>duree classement:</strong> {doc.duree_classement}</p>
                            <p className="document-card-text"><strong>Liste informée:</strong> {doc.liste_informee.join(', ')}</p>
                            <p className="document-card-text"><strong>Modifié par:</strong> {doc.updated_by}</p>
                            <p className="document-card-text"><strong>Modifié le :</strong> {doc.updated_at}</p>
                            <p className="document-card-text"><strong>Crée par:</strong> {doc.created_by}</p>
                            <p className="document-card-text"><strong>Crée à:</strong> {doc.created_at}</p>
                            <p><strong>Pièces jointes :</strong> {doc.fichier ? <a href={`${process.env.REACT_APP_API_URL}/doc/documentsExt/${doc.id}/`} target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>
                            <div className="document-card-buttons">
                                <Link to={`/modifierDocExt/${doc.id}`} className="btn btn-primary">Modifier</Link>
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
                <Link to={`/CréerDocExt/`} className="btn btn-primary">Créer document externe</Link>
            </div>
            <div className="dashboard-buttons">
                <Link to={`/DashboardDoc/`} className="btn btn-secondary">Retour</Link>
            </div>
        </div>
    );
};

export default DashboardDocExt;
*/
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PDFDownloadLink, Document, Page, Text, View } from '@react-pdf/renderer';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './DashboardDocInt.css';
import { styles } from './styles';

// Sample static data
const sampleDocumentsExt = [
    {
        id: 1,
        designation: 'Document A',
        type: 'Type X',
        lieu_classement: 'Lieu 1',
        duree_classement: '1 an',
        created_by: 'User A',
        created_at: '2024-01-01',
        updated_by: 'User B',
        updated_at: '2024-01-02',
        fichier: true,
        liste_informee: ['Informé 1', 'Informé 2']
    },
    {
        id: 2,
        designation: 'Document B',
        type: 'Type Y',
        lieu_classement: 'Lieu 2',
        duree_classement: '6 mois',
        created_by: 'User C',
        created_at: '2024-02-01',
        updated_by: 'User D',
        updated_at: '2024-02-02',
        fichier: false,
        liste_informee: ['Informé 3']
    },
    // Add more sample documents as needed
];

const DashboardDocExt = () => {
    const [documents, setDocuments] = useState(sampleDocumentsExt);
    const [error, setError] = useState(null);
    const [deleteReussi, setDeleteReussi] = useState(false);

    const handleDelete = (id) => {
        setDocuments(documents.filter(doc => doc.id !== id));
        setDeleteReussi(true);
    };

    const MyDocument = ({ data }) => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.header}>Informations sur le document</Text>
                    <View style={styles.info}>
                        <Text style={styles.label}>Désignation:</Text>
                        <Text style={styles.text}>{data.designation}</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.label}>Type:</Text>
                        <Text style={styles.text}>{data.type}</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.label}>Lieu de classement:</Text>
                        <Text style={styles.text}>{data.lieu_classement}</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.label}>Durée de classement:</Text>
                        <Text style={styles.text}>{data.duree_classement}</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.label}>Créé par:</Text>
                        <Text style={styles.text}>{data.created_by}</Text>
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
        <div className="dashboard-doc-ext">
            <div className="header">
                <h3>Liste des documents Externes</h3>
            </div>
            <div className="documents-container">
                {documents.map(doc => (
                    <div key={doc.id} className="document-card">
                        <div className="document-card-body">
                            <p className="document-card-text"><strong>Désignation:</strong> {doc.designation}</p>
                            <p className="document-card-text"><strong>Type:</strong> {doc.type}</p>
                            <p className="document-card-text"><strong>Lieu de classement:</strong> {doc.lieu_classement}</p>
                            <p className="document-card-text"><strong>Durée de classement:</strong> {doc.duree_classement}</p>
                            <p className="document-card-text"><strong>Liste informée:</strong> {doc.liste_informee.join(', ')}</p>
                            <p className="document-card-text"><strong>Modifié par:</strong> {doc.updated_by}</p>
                            <p className="document-card-text"><strong>Modifié le :</strong> {doc.updated_at}</p>
                            <p className="document-card-text"><strong>Créé par:</strong> {doc.created_by}</p>
                            <p className="document-card-text"><strong>Créé à:</strong> {doc.created_at}</p>
                            <p><strong>Pièces jointes :</strong> {doc.fichier ? <a href={`#`} target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>
                            <div className="document-card-buttons">
                               <Link to={`/modifierDocExt/${doc.id}`} className="btn btn-primary">Modifier</Link>
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
                <Link to={`/CréerDocExt/`} className="btn btn-primary">Créer document externe</Link>
            </div>
            <div className="dashboard-buttons">
                <Link to={`/DashboardDoc/`} className="btn btn-secondary">Retour</Link>
            </div>
        </div>
    );
};

export default DashboardDocExt;
