/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../Dashboard.css"

const DashboardPost = () => {
    const [posts, setFormations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFormations = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_job_post/`, {
                    headers: {
                        'Accept': '*//*', 
}
});
setFormations(response.data);
} catch (error) {
console.error('Error fetching formations:', error);
setError(error.message || 'Une erreur s\'est produite lors de la récupération des données.');
}
};

fetchFormations();
}, []);

if (error) {
return <div>Erreur : {error}</div>;
}

return (
<div>
<div className="posts-header">
<h3>Liste des posts</h3>
</div>
<table className="table table-bordered" id="dataTable">
<thead>
<tr>
<th>ID</th>
<th>Titre Position</th>
<th>Position</th>
<th>Mission principale</th>
<th>Détails de Position</th>
</tr>
</thead>
<tbody>
{posts.map(Position => (
<tr key={Position.id}>
    <td>{Position.id}</td>
    <td>{Position.title}</td>
    <td>{Position.position}</td>
    <td>{Position.main_mission}</td>
    <Link to={`/Position/${Position.id}`}>Détails</Link>
</tr>
))}
</tbody>
</table>
<div className="button-group">
<Link to={`/ajouter-Position/`} className="btn btn-primary">Ajouter Position</Link>
<Link to={`/DashboardRH/`} className="btn btn-secondary">Retour</Link>
</div>
</div>
);
};

export default DashboardPost;
*/
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaList, FaTh } from 'react-icons/fa';
import '../list.css';

const samplePosts = [
    {
        id: 1,
        title: 'Développeur Frontend',
        position: 'Développeur',
        main_mission: 'Développer des interfaces utilisateur',
    },
    {
        id: 2,
        title: 'Développeur Backend',
        position: 'Développeur',
        main_mission: 'Gérer les bases de données et les API',
    },
    {
        id: 3,
        title: 'Designer UX/UI',
        position: 'Designer',
        main_mission: 'Concevoir des interfaces utilisateur intuitives',
    }
];

const DashboardPost = () => {
    const [posts, setPosts] = useState([]);
    const [error] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('list');

    useEffect(() => {

        setPosts(samplePosts);
    }, []);

    if (error) {
        return <div>Erreur : {error}</div>;
    }

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.main_mission.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
            <div className="container dashboard">
                <div className="row">
                    <div>
                        <br />
                        <br />
                        <div className="table-container">
                            <div className="view-toggle">
                                <button className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>
                                    <FaList />
                                </button>
                                <button className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>
                                    <FaTh />
                                </button>
                            </div>
                            <h3 className="formation-title">Liste des Posts</h3>
                            <div className="button-container">
                                <Link to="/DashboardRH/">
                                    <button className="retour">Retour</button>
                                </Link>
                                <Link to={`/ajouter-position/`}>
                                    <button className="button-add">Ajouter Position</button>
                                </Link>
                            </div>
                            <br />
                            <div className="search-container">
                                <input
                                    type="text"
                                    placeholder="Rechercher..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="search-input"
                                />
                            </div>
                            <br />
                            <div>
                                {viewMode === 'list' ? (
                                    <table>
                                        <thead className="table-header">
                                            <tr>
                                                <th scope="col">ID</th>
                                                <th scope="col">Titre Position</th>
                                                <th scope="col">Position</th>
                                                <th scope="col">Mission principale</th>
                                                <th scope="col">Détails</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredPosts.length > 0 ? (
                                                filteredPosts.map(post => (
                                                    <tr key={post.id}>
                                                        <td>{post.id}</td>
                                                        <td>{post.title}</td>
                                                        <td>{post.position}</td>
                                                        <td>{post.main_mission}</td>
                                                        <td>
                                                            <Link to={`/Position/${post.id}`} className="btn btn-outline-info btn-sm">
                                                                <FaEdit />

                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="text-center">Aucun post disponible</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="grid">
                                        {filteredPosts.length > 0 ? (
                                            filteredPosts.map(post => (
                                                <div key={post.id} className="responsable-item">
                                                    <img src="https://via.placeholder.com/100" alt={post.title} className="responsable-img" />
                                                    <div className="responsable-info">
                                                        <h5 className="responsable-title">{post.title}</h5>
                                                        <p><strong className="responsable-text">Position :</strong> {post.position}</p>
                                                        <p><strong className="responsable-text">Mission principale :</strong> {post.main_mission}</p>
                                                        <Link to={`/Position/${post.id}`} className="btn btn-outline-info btn-sm">
                                                            <FaEdit />

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
    );
};

export default DashboardPost;
