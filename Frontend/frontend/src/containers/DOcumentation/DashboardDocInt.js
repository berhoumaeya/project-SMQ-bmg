import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PDFDownloadLink, Document, Page, Text, View } from '@react-pdf/renderer';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './DashboardDocInt.css';
import { styles } from './styles';
import { GrEdit } from 'react-icons/gr';
import { FaTrashAlt } from 'react-icons/fa';
import SidebarDoc from '../../components/SidebarDoc';
import SubNavbarDoc from '../../components/SubNavbarDOC';
import { IoMdArchive } from "react-icons/io";
import { MdPictureAsPdf } from "react-icons/md";

const sampleDocuments = [
    {
        id: 1,
        libelle: 'Document 1',
        selection_site: 'Site 1',
        selection_activite: 'Développement',
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
        selection_site: 'Site 2',
        selection_activite: 'Documentation',
        selection_verificateur: 'Vérificateur 2',
        selection_approbateur: 'Approbateur 2',
        selection_redacteur: 'Rédacteur 2',
        created_at: '2024-02-01',
        updated_by: 'User B',
        updated_at: '2024-02-02',
        fichier: false,
        liste_informee: ['Informé 3']
    },
    {
        id: 3,
        libelle: 'Document 3',
        selection_site: 'Site 3',
        selection_activite: 'Test',
        selection_verificateur: 'Vérificateur 3',
        selection_approbateur: 'Approbateur 3',
        selection_redacteur: 'Rédacteur 3',
        created_at: '2024-03-01',
        updated_by: 'User C',
        updated_at: '2024-03-02',
        fichier: true,
        liste_informee: ['Informé 4', 'Informé 5']
    },
    {
        id: 4,
        libelle: 'Document 4',
        selection_site: 'Site 4',
        selection_activite: 'Déploiement',
        selection_verificateur: 'Vérificateur 4',
        selection_approbateur: 'Approbateur 4',
        selection_redacteur: 'Rédacteur 4',
        created_at: '2024-04-01',
        updated_by: 'User D',
        updated_at: '2024-04-02',
        fichier: false,
        liste_informee: ['Informé 6']
    },
    {
        id: 5,
        libelle: 'Document 5',
        selection_site: 'Site 1',
        selection_activite: 'Support',
        selection_verificateur: 'Vérificateur 5',
        selection_approbateur: 'Approbateur 5',
        selection_redacteur: 'Rédacteur 5',
        created_at: '2024-05-01',
        updated_by: 'User E',
        updated_at: '2024-05-02',
        fichier: true,
        liste_informee: ['Informé 7', 'Informé 8', 'Informé 9']
    },
    {
        id: 6,
        libelle: 'Document 6',
        selection_site: 'Site 2',
        selection_activite: 'Développement',
        selection_verificateur: 'Vérificateur 6',
        selection_approbateur: 'Approbateur 6',
        selection_redacteur: 'Rédacteur 6',
        created_at: '2024-06-01',
        updated_by: 'User F',
        updated_at: '2024-06-02',
        fichier: false,
        liste_informee: ['Informé 10', 'Informé 11']
    },
    {
        id: 7,
        libelle: 'Document 7',
        selection_site: 'Site 3',
        selection_activite: 'Test',
        selection_verificateur: 'Vérificateur 7',
        selection_approbateur: 'Approbateur 7',
        selection_redacteur: 'Rédacteur 7',
        created_at: '2024-07-01',
        updated_by: 'User G',
        updated_at: '2024-07-02',
        fichier: true,
        liste_informee: ['Informé 12', 'Informé 13']
    },
    {
        id: 8,
        libelle: 'Document 8',
        selection_site: 'Site 4',
        selection_activite: 'Support',
        selection_verificateur: 'Vérificateur 8',
        selection_approbateur: 'Approbateur 8',
        selection_redacteur: 'Rédacteur 8',
        created_at: '2024-08-01',
        updated_by: 'User H',
        updated_at: '2024-08-02',
        fichier: false,
        liste_informee: ['Informé 14']
    },
    {
        id: 9,
        libelle: 'Document 9',
        selection_site: 'Site 1',
        selection_activite: 'Déploiement',
        selection_verificateur: 'Vérificateur 9',
        selection_approbateur: 'Approbateur 9',
        selection_redacteur: 'Rédacteur 9',
        created_at: '2024-09-01',
        updated_by: 'User I',
        updated_at: '2024-09-02',
        fichier: true,
        liste_informee: ['Informé 15', 'Informé 16']
    },
    {
        id: 10,
        libelle: 'Document 10',
        selection_site: 'Site 2',
        selection_activite: 'Documentation',
        selection_verificateur: 'Vérificateur 10',
        selection_approbateur: 'Approbateur 10',
        selection_redacteur: 'Rédacteur 10',
        created_at: '2024-10-01',
        updated_by: 'User J',
        updated_at: '2024-10-02',
        fichier: false,
        liste_informee: ['Informé 17', 'Informé 18', 'Informé 19']
    }
];


const DashboardDocInt = () => {
    const [documents, setDocuments] = useState(sampleDocuments);
    const [searchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [sortConfig, setSortConfig] = useState({ key: 'created_at', direction: 'ascending' });

    const handleDelete = (id) => {
        setDocuments(documents.filter(doc => doc.id !== id));
    };

    const filteredDocuments = documents.filter(doc =>
        doc.libelle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.selection_redacteur.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedDocuments = filteredDocuments.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortArrow = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? '🔼' : '🔽';
        }
        return '↕️';
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

    return (
        <> <SubNavbarDoc viewMode={viewMode} setViewMode={setViewMode} />
            <main style={{ display: 'flex', minHeight: '100vh' }}>
                <SidebarDoc />
                <div className="container dashboard">
                    <div className="row">
                        <div>
                            <div className="table-container">
                                <h3 className="formation-title">Liste des documents Internes</h3>
                                {viewMode === 'list' ? (
                                    <table className="table-header">
                                        <thead>
                                            <tr>
                                                <th scope="col" onClick={() => requestSort('libelle')}>
                                                    Libellé {getSortArrow('libelle')}
                                                </th>
                                                <th scope="col" onClick={() => requestSort('selection_activite')}>Sélection d'activité {getSortArrow('selection_activite')}</th>
                                                <th scope='col' onClick={() => requestSort('selection_redacteur')}>Rédacteur {getSortArrow('selection_redacteur')}</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sortedDocuments.length > 0 ? (
                                                sortedDocuments.map(doc => (
                                                    <tr key={doc.id}>
                                                        <td>{doc.libelle}</td>
                                                        <td>{doc.selection_activite}</td>
                                                        <td>{doc.selection_redacteur}</td>
                                                        <td>
                                                            <Link to={`/archive/${doc.id}`} className="btn btn-outline-primary me-2"><IoMdArchive />
                                                            </Link>
                                                            <Link to={`/modifierDocInt/${doc.id}`} className="btn btn-outline-success me-2">
                                                                <GrEdit />
                                                            </Link>
                                                            <button onClick={() => handleDelete(doc.id)} className="btn btn-outline-danger me-2">
                                                                <FaTrashAlt />
                                                            </button>
                                                            <PDFDownloadLink document={<MyDocument data={doc} />} fileName={`document-${doc.id}.pdf`}>
                                                                {({ blob, url, loading, error }) => (
                                                                    <button className="btn btn-outline-info">
                                                                        <FontAwesomeIcon icon={faFilePdf} />
                                                                    </button>
                                                                )}
                                                            </PDFDownloadLink>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="6">Aucun document trouvé.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="container">
                                        <div className="row clearfix">
                                            {documents.map(doc => (
                                                <div key={doc.id} className="col-lg-3 col-md-4 col-sm-12">
                                                    <div className="card">
                                                        <div className="file">
                                                            <div className="hover">
                                                                <button type="button" className="btn btn-icon btn-danger" onClick={() => handleDelete(doc.id)}>
                                                                    <FaTrashAlt />
                                                                </button>
                                                            </div>
                                                            <div className="icon">
                                                                {doc.fichier} <MdPictureAsPdf style={{ color: '#639cd9' }} />
                                                            </div>
                                                            <div className="file-name">
                                                                <p className="text-muted">{doc.libelle}</p>
                                                                <div className='card-footer'>
                                                                    <small>Selection d'activité : {doc.selection_activite} <span className="date text-muted">{doc.date}</span></small>

                                                                    <div className="actions mt-2">
                                                                        <Link to={`/modifierDocExt/${doc.id}`} className="btn btn-outline-success me-2">
                                                                            <GrEdit />
                                                                        </Link>
                                                                        <PDFDownloadLink document={<MyDocument data={doc} />} fileName={`document-${doc.id}.pdf`}>
                                                                            {({ loading }) => (
                                                                                <button className="btn btn-outline-info">
                                                                                    <FontAwesomeIcon icon={faFilePdf} />
                                                                                </button>
                                                                            )}
                                                                        </PDFDownloadLink>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default DashboardDocInt;
