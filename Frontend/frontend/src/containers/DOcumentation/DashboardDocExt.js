import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PDFDownloadLink, Document, Page, Text, View } from '@react-pdf/renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './DashboardDocInt.css';
import { styles } from './styles';
import { GrEdit } from 'react-icons/gr';
import { FaTrashAlt } from 'react-icons/fa';
import SidebarDoc from '../../components/SidebarDoc';
import SubNavbarDoc from '../../components/SubNavbarDOC';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { MdPictureAsPdf } from "react-icons/md";
import ReactPaginate from 'react-paginate';

const sampleDocumentsExt = [
    {
        id: 1,
        designation: 'Mails_inbox',
        type: 'Papier',
        lieu_classement: 'Archives',
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
        designation: 'Employés 2023',
        type: 'Numerique',
        lieu_classement: 'Bureau',
        duree_classement: '6 mois',
        created_by: 'User C',
        created_at: '2024-02-01',
        updated_by: 'User D',
        updated_at: '2024-02-02',
        fichier: false,
        liste_informee: ['Informé 3']
    },
    {
        id: 3,
        designation: 'Contrats fournisseurs',
        type: 'Papier',
        lieu_classement: 'Entrepôt',
        duree_classement: '2 ans',
        created_by: 'User E',
        created_at: '2024-03-01',
        updated_by: 'User F',
        updated_at: '2024-03-02',
        fichier: true,
        liste_informee: ['Informé 4', 'Informé 5']
    },
    {
        id: 4,
        designation: 'Rapports financiers 2023',
        type: 'Numerique',
        lieu_classement: 'Cloud',
        duree_classement: '5 ans',
        created_by: 'User G',
        created_at: '2024-04-01',
        updated_by: 'User H',
        updated_at: '2024-04-02',
        fichier: true,
        liste_informee: ['Informé 6']
    },
    {
        id: 5,
        designation: 'Politiques internes',
        type: 'Papier',
        lieu_classement: 'Bureau',
        duree_classement: 'Indéfini',
        created_by: 'User I',
        created_at: '2024-05-01',
        updated_by: 'User J',
        updated_at: '2024-05-02',
        fichier: false,
        liste_informee: ['Informé 7', 'Informé 8']
    },
    {
        id: 6,
        designation: 'Manuels d\'utilisation',
        type: 'Numerique',
        lieu_classement: 'Cloud',
        duree_classement: '3 ans',
        created_by: 'User K',
        created_at: '2024-06-01',
        updated_by: 'User L',
        updated_at: '2024-06-02',
        fichier: true,
        liste_informee: ['Informé 9', 'Informé 10']
    },
    {
        id: 7,
        designation: 'Relevés bancaires',
        type: 'Papier',
        lieu_classement: 'Archives',
        duree_classement: '10 ans',
        created_by: 'User M',
        created_at: '2024-07-01',
        updated_by: 'User N',
        updated_at: '2024-07-02',
        fichier: false,
        liste_informee: ['Informé 11']
    },
    {
        id: 8,
        designation: 'Dossiers clients 2023',
        type: 'Numerique',
        lieu_classement: 'Entrepôt',
        duree_classement: '4 ans',
        created_by: 'User O',
        created_at: '2024-08-01',
        updated_by: 'User P',
        updated_at: '2024-08-02',
        fichier: true,
        liste_informee: ['Informé 12', 'Informé 13']
    },
    {
        id: 9,
        designation: 'Rapports de projet',
        type: 'Papier',
        lieu_classement: 'Bureau',
        duree_classement: '6 mois',
        created_by: 'User Q',
        created_at: '2024-09-01',
        updated_by: 'User R',
        updated_at: '2024-09-02',
        fichier: true,
        liste_informee: ['Informé 14', 'Informé 15']
    },
    {
        id: 10,
        designation: 'Audit interne 2024',
        type: 'Numerique',
        lieu_classement: 'Cloud',
        duree_classement: '1 an',
        created_by: 'User S',
        created_at: '2024-10-01',
        updated_by: 'User T',
        updated_at: '2024-10-02',
        fichier: false,
        liste_informee: ['Informé 16', 'Informé 17', 'Informé 18']
    }
];
const DashboardDocExt = () => {
    const [documents, setDocuments] = useState(sampleDocumentsExt);
    const [viewMode, setViewMode] = useState('grid');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const meetingsPerPage = 4;

    const handleDelete = (id) => {
        setDocuments(documents.filter(doc => doc.id !== id));
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchFieldChange = (e) => {
        setSearchField(e.target.value);
    };

    const sortedDocuments = documents
        .sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
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

    const indexOfLastMeeting = (currentPage + 1) * meetingsPerPage;
    const indexOfFirstMeeting = indexOfLastMeeting - meetingsPerPage;
    const currentMeetings = filteredDocuments.slice(indexOfFirstMeeting, indexOfLastMeeting);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };
    const pageCount = Math.ceil(filteredDocuments.length / meetingsPerPage);

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
        <>
            <SubNavbarDoc viewMode={viewMode} setViewMode={setViewMode} />

            <main style={{ display: 'flex', minHeight: '100vh' }}>
                <SidebarDoc />
                <div className="container dashboard">
                    <div className="row">
                        <div>
                            <div className="table-container">
                                <h3 className="formation-title">Liste des documents Externes</h3>
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
                                        <option value="designation">Désignation</option>
                                        <option value="type">Type</option>
                                        <option value="lieu_classement">Lieu classement</option>
                                    </select>
                                </div>
                                {viewMode === 'list' ? (
                                    <>
                                        <table className="table-header">
                                            <thead>
                                                <tr>
                                                    <th scope="col" onClick={() => requestSort('designation')}>
                                                        Désignation {getSortArrow('designation')}
                                                    </th>
                                                    <th scope="col" onClick={() => requestSort('type')}>
                                                        Type {getSortArrow('type')}
                                                    </th>
                                                    <th scope="col" onClick={() => requestSort('lieu_classement')}>
                                                        Lieu classement {getSortArrow('lieu_classement')}
                                                    </th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentMeetings.length > 0 ? (
                                                    currentMeetings.map(doc => (
                                                        <tr key={doc.id}>
                                                            <td>{doc.designation}</td>
                                                            <td>{doc.type}</td>
                                                            <td>{doc.lieu_classement}</td>
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
                                        <ReactPaginate
                                            previousLabel={'Précédent'}
                                            nextLabel={'Suivant'}
                                            breakLabel={'...'}
                                            pageCount={pageCount}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={7}
                                            onPageChange={handlePageClick}
                                            containerClassName={'pagination'}
                                            pageClassName={'page-item'}
                                            pageLinkClassName={'page-link'}
                                            previousClassName={'page-item'}
                                            previousLinkClassName={'page-link'}
                                            nextClassName={'page-item'}
                                            nextLinkClassName={'page-link'}
                                            breakClassName={'page-item'}
                                            breakLinkClassName={'page-link'}
                                            activeClassName={'active'}
                                        />
                                    </>
                                ) : (
                                    <div className="container">
                                        <div className="row clearfix">
                                            {currentMeetings.map(doc => (
                                                <div key={doc.id} className="col-lg-3 col-md-4 col-sm-12">
                                                    <div className="card">
                                                        <div className="file">
                                                            <div className="hover">
                                                                <button type="button" className="btn btn-icon btn-outline-secondary">
                                                                    <PDFDownloadLink document={<MyDocument data={doc} />} fileName={`document-${doc.id}.pdf`}>
                                                                        {({ blob, url, loading, error }) => (
                                                                            <FontAwesomeIcon icon={faFilePdf} />
                                                                        )}
                                                                    </PDFDownloadLink>
                                                                </button>
                                                            </div>
                                                            <div className="icon">
                                                                {doc.fichier} <MdPictureAsPdf style={{ color: '#639cd9' }} />
                                                            </div>
                                                            <div className="file-name">
                                                                <p className="text-muted">{doc.designation}</p>
                                                                <div className="card-footer">
                                                                    <small>Type: {doc.type}</small>
                                                                    <small>Lieu classement: {doc.lieu_classement}</small>
                                                                    <Link to={`/modifierDocExt/${doc.id}`} className="btn btn-outline-success me-2">
                                                                        <GrEdit />
                                                                    </Link>
                                                                    <button onClick={() => handleDelete(doc.id)} className="btn btn-outline-danger me-2">
                                                                        <FaTrashAlt />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <ReactPaginate
                                            previousLabel={'Précédent'}
                                            nextLabel={'Suivant'}
                                            breakLabel={'...'}
                                            pageCount={pageCount}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={5}
                                            onPageChange={handlePageClick}
                                            containerClassName={'pagination'}
                                            pageClassName={'page-item'}
                                            pageLinkClassName={'page-link'}
                                            previousClassName={'page-item'}
                                            previousLinkClassName={'page-link'}
                                            nextClassName={'page-item'}
                                            nextLinkClassName={'page-link'}
                                            breakClassName={'page-item'}
                                            breakLinkClassName={'page-link'}
                                            activeClassName={'active'}
                                        />
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

export default DashboardDocExt;