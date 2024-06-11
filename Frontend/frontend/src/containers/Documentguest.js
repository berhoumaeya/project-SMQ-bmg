import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PDFDownloadLink, Document, Page, Text, View } from '@react-pdf/renderer';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../containers/DOcumentation/DashboardDocInt.css';
import { styles } from '../containers/DOcumentation/styles';

const DashboardDocIntGuest = () => {
    const [documents, setDocuments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/doc/documents/`, {
                    headers: {
                        'Accept': '*/*',
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
                <Link to={`/guest/`} className="btn btn-secondary">Retour</Link>
            </div>
        </div>
    );
};

export default DashboardDocIntGuest;
