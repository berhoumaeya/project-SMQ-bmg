import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PDFDownloadLink, Document, Page, Text, View } from '@react-pdf/renderer';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './DashboardDocInt.css';
import { styles } from './styles';
import { GrEdit } from 'react-icons/gr';
import { FaTrashAlt, FaList, FaTh } from 'react-icons/fa';

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
];

const DashboardDocExt = () => {
    const [documents, setDocuments] = useState(sampleDocumentsExt);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('list');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

    const handleDelete = (id) => {
        setDocuments(documents.filter(doc => doc.id !== id));
    };

    const filteredDocuments = useMemo(() => {
        return documents.filter(doc =>
            doc.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.created_by.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [documents, searchQuery]);

    const sortedDocuments = useMemo(() => {
        const sortableDocuments = [...filteredDocuments];
        if (sortConfig !== null) {
            sortableDocuments.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableDocuments;
    }, [filteredDocuments, sortConfig]);

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
                        <Text style={styles.label}>Désignation:</Text>
                        <Text style={styles.text}>{data.designation}</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.label}>Type:</Text>
                        <Text style={styles.text}>{data.type}</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.label}>Lieu classement:</Text>
                        <Text style={styles.text}>{data.lieu_classement}</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.label}>Durée classement:</Text>
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

    return (
        <main style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
            <div className="container dashboard">
                <div className="row">
                    <div>
                        <br />
                        <br />
                        <div className="table-container">
                            <div className="view-toggle" style={{ marginBottom: '20px' }}>
                                <button className={`view-btn-doc ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>
                                    <FaList />
                                </button>
                                <button className={`view-btn-doc ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>
                                    <FaTh />
                                </button>
                            </div>
                            <h3 className="doc-title">Liste des documents Externes</h3>

                            <div className="button-container" style={{ marginBottom: '20px' }}>
                                <Link to="/DashboardDoc/">
                                    <button className="retour">Retour</button>
                                </Link>
                                <Link to="/CréerDocExt/">
                                    <button className="button-add-" style={{ marginLeft: '10px' }}>Créer document externe</button>
                                </Link>
                            </div>
                            <div className="search-container" style={{ marginBottom: '20px' }}>
                                <input
                                    type="text"
                                    placeholder="Rechercher..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="search-input-doc"
                                />
                            </div>

                            {viewMode === 'list' ? (
                                <table>
                                    <thead>
                                        <tr>
                                            <th style={{ backgroundColor: '#76ab78' }} scope="col" onClick={() => requestSort('designation')}>
                                                Désignation {getSortArrow('designation')}
                                            </th>
                                            <th style={{ backgroundColor: '#76ab78' }} scope="col" onClick={() => requestSort('updated_by')}>
                                                Modifié par {getSortArrow('updated_by')}
                                            </th>
                                            <th style={{ backgroundColor: '#76ab78' }} scope="col" onClick={() => requestSort('updated_at')}>
                                                Modifié le {getSortArrow('updated_at')}
                                            </th>
                                            <th style={{ backgroundColor: '#76ab78' }} scope="col" onClick={() => requestSort('created_by')}>
                                                Créé par {getSortArrow('created_by')}
                                            </th>
                                            <th style={{ backgroundColor: '#76ab78' }} scope="col" onClick={() => requestSort('created_at')}>
                                                Créé à {getSortArrow('created_at')}
                                            </th>
                                            <th style={{ backgroundColor: '#76ab78' }} scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedDocuments.length > 0 ? (
                                            sortedDocuments.map(doc => (
                                                <tr key={doc.id}>
                                                    <td>{doc.designation}</td>
                                                    <td>{doc.updated_by}</td>
                                                    <td>{doc.updated_at}</td>
                                                    <td>{doc.created_by}</td>
                                                    <td>{doc.created_at}</td>
                                                    <td>
                                                        <Link to={`/modifierDocExt/${doc.id}`} className="btn btn-outline-success me-2">
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
                                                <td colSpan="6">Aucun document trouvé</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="grid-container">
                                    {sortedDocuments.length > 0 ? (
                                        sortedDocuments.map(doc => (
                                            <div key={doc.id} className="card">
                                                <div className="card-body">
                                                    <h5 className="card-title">{doc.designation}</h5>
                                                    <p className="card-text">
                                                        Type: {doc.type}<br />
                                                        Lieu classement: {doc.lieu_classement}<br />
                                                        Durée classement: {doc.duree_classement}<br />
                                                        Créé par: {doc.created_by}<br />
                                                        Créé à: {doc.created_at}
                                                    </p>
                                                    <div className="card-buttons">
                                                        <Link to={`/modifierDocExt/${doc.id}`} className="btn btn-outline-success me-2">
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
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>Aucun document trouvé</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DashboardDocExt;
