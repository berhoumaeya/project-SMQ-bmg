import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../list.css';
import SubNavbarRH from '../../../components/SubNavbarRH';
import SidebarRh from '../../../components/SidebarRH';
import { GrEdit } from 'react-icons/gr';

const samplePosts = [
    { id: 1, title: 'Développeur Frontend', position: 'Développeur', main_mission: 'Développer des interfaces utilisateur' },
    { id: 2, title: 'Développeur Backend', position: 'Développeur', main_mission: 'Gérer les bases de données et les API' },
    { id: 3, title: 'Designer UX/UI', position: 'Designer', main_mission: 'Concevoir des interfaces utilisateur intuitives' }
];

const DashboardPost = () => {
    const [posts, setPosts] = useState([]);
    const [viewMode, setViewMode] = useState('list');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

    useEffect(() => {
        setPosts(samplePosts);
    }, []);

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

    return (
        <>
            <SubNavbarRH viewMode={viewMode} setViewMode={setViewMode} />
            <main style={{ display: 'flex', minHeight: '100vh' }}>
                <SidebarRh /> 
                <div className="container dashboard">
                    <div className="row">
                        <div>
                            <div className="table-container">
                                <h3 className="formation-title">Liste des Posts</h3>    
                                <div>
                                    {viewMode === 'list' ? (
                                        <table className="table-header">
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
                                                {sortedPosts.length > 0 ? (
                                                    sortedPosts.map(post => (
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
                                    ) : (
                                        <div className="grid">
                                            {sortedPosts.length > 0 ? (
                                                sortedPosts.map(post => (
                                                    <div key={post.id} className="responsable-item">
                                                        <img src="https://via.placeholder.com/100" alt={post.title} className="responsable-img" />
                                                        <div className="responsable-info">
                                                            <h5 className="responsable-title">{post.title}</h5>
                                                            <p><strong className="responsable-text">Position :</strong> {post.position}</p>
                                                            <p><strong className="responsable-text">Mission principale :</strong> {post.main_mission}</p>
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
