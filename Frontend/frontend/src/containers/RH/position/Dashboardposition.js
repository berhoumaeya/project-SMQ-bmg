import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../list.css';
import SubNavbarRH from '../../../components/SubNavbarRH';
import SidebarRh from '../../../components/SidebarRH';
import { GrEdit } from 'react-icons/gr';
import ReactPaginate from 'react-paginate';

const samplePosts = [
    { id: 1, title: 'Développeur Frontend', position: 'Développeur', main_mission: 'Développer des interfaces utilisateur' },
    { id: 2, title: 'Développeur Backend', position: 'Développeur', main_mission: 'Gérer les bases de données et les API' },
    { id: 3, title: 'Designer UX/UI', position: 'Designer', main_mission: 'Concevoir des interfaces utilisateur intuitives' }
];

const DashboardPost = () => {
    const [posts, setPosts] = useState([]);
    const [viewMode, setViewMode] = useState('list');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const meetingsPerPage = 5;
    useEffect(() => {
        setPosts(samplePosts);
    }, []);
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchFieldChange = (e) => {
        setSearchField(e.target.value);
    };

    const sortedPosts = React.useMemo(() => {
        let sortablePosts = [...posts];
        if (sortConfig !== null) {
            sortablePosts.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortablePosts;
    }, [posts, sortConfig]);
    const filteredPosts = useMemo(() => {
        if (!searchField) {
            return sortedPosts;
        }
        return sortedPosts.filter(post =>
            post[searchField]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [sortedPosts, searchField, searchTerm]);

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
    const indexOfLastMeeting = (currentPage + 1) * meetingsPerPage;
    const indexOfFirstMeeting = indexOfLastMeeting - meetingsPerPage;
    const currentMeetings = filteredPosts.slice(indexOfFirstMeeting, indexOfLastMeeting);
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };
    const pageCount = Math.ceil(filteredPosts.length / meetingsPerPage);

    return (
        <>
            <SubNavbarRH viewMode={viewMode} setViewMode={setViewMode} />
            <main style={{ display: 'flex', minHeight: '100vh' , backgroundColor :'white'}}>
                <SidebarRh />
                <div className="container dashboard">
                    <div className="row">
                        <div>
                            <div className="table-container">
                                <h3 className="formation-title">Liste des Posts</h3>
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
                                        <option value="title">Titre Position</option>
                                        <option value="position">Position</option>
                                        <option value="main_mission"> Mission principale </option>
                                    </select>
                                </div>
                                <div>
                                    {viewMode === 'list' ? (
                                        <>  <table className="table-header">
                                            <thead>
                                                <tr>
                                                    <th scope="col" onClick={() => requestSort('title')}>
                                                        Titre Position {getSortArrow('title')}
                                                    </th>
                                                    <th scope="col" onClick={() => requestSort('position')}>
                                                        Position {getSortArrow('position')}
                                                    </th>
                                                    <th scope="col" onClick={() => requestSort('main_mission')}>
                                                        Mission principale {getSortArrow('main_mission')}
                                                    </th>
                                                    <th scope="col">Détails</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentMeetings.length > 0 ? (
                                                    currentMeetings.map(post => (
                                                        <tr key={post.id}>
                                                            <td>{post.title}</td>
                                                            <td>{post.position}</td>
                                                            <td>{post.main_mission}</td>
                                                            <td>
                                                                <Link to={`/update-position/${post.id}`} className="btn btn-outline-info">
                                                                    <GrEdit />
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="4" className="text-center">Aucun post disponible</td>
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
                                        </>
                                    ) : (
                                        <>    <div className="grid">
                                            {currentMeetings.length > 0 ? (
                                                currentMeetings.map(post => (
                                                    <div key={post.id} className="responsable-item">
                                                        <img src="https://via.placeholder.com/100" alt={post.title} className="responsable-img" />
                                                        <div className="responsable-info">
                                                            <h5 className="responsable-title">{post.title}</h5>
                                                            <p><strong>Position :</strong> {post.position}</p>
                                                            <p><strong>Mission principale :</strong> {post.main_mission}</p>
                                                            <Link to={`/update-position/${post.id}`} className="btn btn-outline-info btn-sm">
                                                                <GrEdit />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-center">Aucun post disponible</p>
                                            )}
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
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default DashboardPost;
