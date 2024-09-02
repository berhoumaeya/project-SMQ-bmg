import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PDFDownloadLink, Document, Page, Text, View } from '@react-pdf/renderer';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './DOcumentation/DashboardDocInt.css';
import { GrEdit } from 'react-icons/gr';
import { FaArrowLeft, FaTrashAlt } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import { styles } from './DOcumentation/styles';
import { MdPictureAsPdf } from 'react-icons/md';

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
];

const DashboardDocInt = () => {
    const [documents, setDocuments] = useState(sampleDocuments);
    const [viewMode, setViewMode] = useState('grid');
    const [sortConfig, setSortConfig] = useState({ key: 'created_at', direction: 'ascending' });
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const documentsPerPage = 4;

    const handleDelete = (id) => {
        setDocuments(documents.filter(doc => doc.id !== id));
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchFieldChange = (e) => {
        setSearchField(e.target.value);
    };

    const sortedDocuments = documents.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const filteredDocuments = useMemo(() => {
        if (!searchField) {
            return sortedDocuments;
        }
        return sortedDocuments.filter(doc =>
            doc[searchField]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [sortedDocuments, searchField, searchTerm]);

    const indexOfLastDocument = (currentPage + 1) * documentsPerPage;
    const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
    const currentDocuments = filteredDocuments.slice(indexOfFirstDocument, indexOfLastDocument);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const pageCount = Math.ceil(filteredDocuments.length / documentsPerPage);

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
                        <Text style={styles.label}>Rédacteur:</Text>
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
        <>
            <main style={{ display: 'flex', minHeight: '100vh' }}>
                <div className="container dashboard">
                    <div className="row">
                        <div>
                            <div className="table-container">
                                <h3 className="formation-title">Liste des documents Internes</h3>
                                <div className="search-container">
                                    <input
                                        type="text"
                                        placeholder="Rechercher..."
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        disabled={!searchField}
                                    />
                                    <select onChange={handleSearchFieldChange} value={searchField}>
                                        <option value="">Sélectionner un champ</option>
                                        <option value="libelle">Libellé</option>
                                        <option value="selection_site">Site</option>
                                        <option value="selection_activite">Activité</option>
                                        <option value="selection_verificateur">Vérificateur</option>
                                        <option value="selection_approbateur">Approbateur</option>
                                        <option value="selection_redacteur">Rédacteur</option>
                                    </select>
                                </div>
                                {viewMode === 'grid' ? (
                                    <div className="row">
                                        {currentDocuments.map(doc => (
                                            <div key={doc.id} className="col-lg-3 col-md-4 col-sm-12">
                                                <div className="card">
                                                    <div className="file">
                                                        <div className="hover">
                                                            <button type="button" className="btn btn-icon btn-danger" onClick={() => handleDelete(doc.id)}>
                                                                <FaTrashAlt />
                                                            </button>
                                                        </div>
                                                        <div className="icon">
                                                            {doc.fichier ? <MdPictureAsPdf style={{ color: '#639cd9' }} /> : null}
                                                        </div>
                                                        <div className="file-name">
                                                            <p className="text-muted">{doc.libelle}</p>
                                                            <div className="card-footer">
                                                                <small>Selection d'activité : {doc.selection_activite} - <span className="date text-muted">{doc.created_at}</span></small>
                                                                <small>Selection de site : {doc.selection_site} - <span className="date text-muted">{doc.updated_at}</span></small>
                                                                <small>Selection de vérificateur : {doc.selection_verificateur}</small>
                                                                <small>Selection d'approbateur : {doc.selection_approbateur}</small>
                                                                <small>Selection de rédacteur : {doc.selection_redacteur}</small>
                                                                <small>Informé : {doc.liste_informee.join(', ')}</small>
                                                                <small>Modifié par : {doc.updated_by}</small>
                                                                <small>Modifié le : {doc.updated_at}</small>
                                                                <div className="actions mt-2">
                                                                    <Link to={`/modifierDocInt/${doc.id}`} className="btn btn-outline-success me-2">
                                                                        <GrEdit />
                                                                    </Link>
                                                                    <PDFDownloadLink document={<MyDocument data={doc} />} fileName={`document-${doc.id}.pdf`}>
                                                                        {({ loading }) => (
                                                                            <button className="btn btn-outline-info" disabled={loading}>
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
                                ) : (
                                    <tr>
                                    <td colSpan="5" className="text-center">Aucune réunion disponible</td>
                                </tr>
                                )}
                                    <ReactPaginate
                                        previousLabel={"Précédent"}
                                        nextLabel={"Suivant"}
                                        pageCount={pageCount}
                                        onPageChange={handlePageClick}
                                        containerClassName={"pagination"}
                                        pageClassName={"page-item"}
                                        pageLinkClassName={"page-link"}
                                        previousClassName={"page-item"}
                                        previousLinkClassName={"page-link"}
                                        nextClassName={"page-item"}
                                        nextLinkClassName={"page-link"}
                                        breakClassName={"page-item"}
                                        breakLinkClassName={"page-link"}
                                        activeClassName={"active"}
                                    />
                                </div>
                        </div>
                    </div>
                </div>
               
            </main>
            <div className="dashboard-buttons" style={{ marginTop: '40px', marginBottom :'10px' }}>
            <Link to={`/guest`} className="btn btn-secondary">
                        <FaArrowLeft style={{ marginRight: '10px' }} /> Retour
                    </Link>
                </div>
        </>
    );
};

export default DashboardDocInt;