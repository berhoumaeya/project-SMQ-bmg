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
];

const DashboardDocInt = () => {
    const [documents, setDocuments] = useState(sampleDocuments);
    const [searchQuery] = useState('');
    const [viewMode, setViewMode] = useState('list');
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

    return (
        <> <SubNavbarDoc viewMode={viewMode} setViewMode={setViewMode} />
            <main style={{ display: 'flex', minHeight: '100vh' }}>
                <SidebarDoc />
                <div className="container dashboard">
                    <div className="row">
                        <div>
                            <div className="table-container">
                                <h3 className="doc-title">Liste des documents Internes</h3>
                                {viewMode === 'list' ? (
                                    <table className="table-header">
                                        <thead>
                                            <tr>
                                                <th scope="col" onClick={() => requestSort('libelle')}>
                                                    Libellé {getSortArrow('libelle')}
                                                </th>
                                                <th scope="col" onClick={() => requestSort('updated_by')}>
                                                    Modifié par {getSortArrow('updated_by')}
                                                </th>
                                                <th scope="col" onClick={() => requestSort('updated_at')}>
                                                    Modifié le {getSortArrow('updated_at')}
                                                </th>
                                                <th scope="col" onClick={() => requestSort('selection_redacteur')}>
                                                    Créé par {getSortArrow('selection_redacteur')}
                                                </th>
                                                <th scope="col" onClick={() => requestSort('created_at')}>
                                                    Créé à {getSortArrow('created_at')}
                                                </th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sortedDocuments.length > 0 ? (
                                                sortedDocuments.map(doc => (
                                                    <tr key={doc.id}>
                                                        <td>{doc.libelle}</td>
                                                        <td>{doc.updated_by}</td>
                                                        <td>{doc.updated_at}</td>
                                                        <td>{doc.selection_redacteur}</td>
                                                        <td>{doc.created_at}</td>
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
                                    <div className="grid">
                                        {filteredDocuments.map(doc => (
                                            <div key={doc.id} className="responsable-item">
                                                <div className="responsable-info">
                                                    <p className="responsable-text "><strong>Libellé:</strong> {doc.libelle}</p>
                                                    <p className="responsable-text"><strong>Modifié par:</strong> {doc.updated_by}</p>
                                                    <p className="responsable-text"><strong>Modifié le:</strong> {doc.updated_at}</p>
                                                    <p className="responsable-text"><strong>Créé par:</strong> {doc.selection_redacteur}</p>
                                                    <p className="responsable-text"><strong>Créé à:</strong> {doc.created_at}</p>
                                                    <td>
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
                                                </div>
                                            </div>
                                        ))}
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
