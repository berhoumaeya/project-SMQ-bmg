import React, { useState } from "react";
import { FaUser, FaBook, FaUserFriends, FaBuilding, FaChartBar, FaClipboardList, FaExclamationTriangle, FaHandshake, FaGavel, FaTasks, FaBalanceScale } from 'react-icons/fa';
import '../styles/dashboard.css';

function ModuleTile({ title, description, url, icon, className }) {
    return (
        <div className={`module-card p-5 ${className}`}>
            <h4 className="icon-wrapper" style={{ textAlign: 'center', color: '#6c476e' }}>
                {icon} {title}
            </h4>
            <p>{description}</p>
            <div className="cta">
                <a href={url} className="cta-link hover-underline-animation" style={{ textDecoration: 'none', color: '#4d3664' }}>Accéder</a>
                <svg
                    id="arrow-horizontal"
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="10"
                    viewBox="0 0 46 16"
                >
                    <path
                        id="Path_10"
                        data-name="Path 10"
                        d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                        transform="translate(30)"
                    ></path>
                </svg>
            </div>
        </div>
    );
}

function SearchBar({ onSearch }) {
    const handleSearchChange = (event) => {
        onSearch(event.target.value);
    };

    return (
        <div className="search-bar-wrapper mb-4">
            <input
                type="text"
                className="search-bar-input"
                placeholder="Rechercher un module..."
                onChange={handleSearchChange}
            />
        </div>
    );
}

function Dashboard() {
    const [modules] = useState([
        {
            title: "Ressources Humaines",
            description: "Gérez les ressources humaines de votre entreprise.",
            url: "/dashboardRH",
            icon: <FaUser />,
            className: "bg-color-1"
        },
        {
            title: "Documentation",
            description: "Accédez à la documentation pour obtenir des informations utiles.",
            url: "/DashboardDoc",
            icon: <FaBook />,
            className: "bg-color-2"
        },
        {
            title: "Client",
            description: "Consultez les informations sur les clients et les contacts.",
            url: "/Clients",
            icon: <FaUserFriends />,
            className: "bg-color-3"
        },
        {
            title: "Fournisseur",
            description: "Gérez les informations sur les fournisseurs et les contacts.",
            url: "/fournisseurs",
            icon: <FaBuilding />,
            className: "bg-color-4"
        },
        {
            title: "Indicateur",
            description: "Visualisez les indicateurs clés de performance de votre entreprise.",
            url: "/indicateurs",
            icon: <FaChartBar />,
            className: "bg-color-5"
        },
        {
            title: "Audit",
            description: "Accédez à l'outil d'audit pour suivre les performances.",
            url: "/Audits",
            icon: <FaClipboardList />,
            className: "bg-color-6"
        },
        {
            title: "Produit Non Conforme",
            description: "Gérez les produits non conformes et les actions correctives.",
            url: "/allProduit",
            icon: <FaExclamationTriangle />,
            className: "bg-color-7"
        },
        {
            title: "Risk",
            description: "Évaluez et gérez les risques associés à vos activités.",
            url: "/AllRisque",
            icon: <FaHandshake />,
            className: "bg-color-8"
        },
        {
            title: "Réunion",
            description: "Planifiez et organisez vos réunions efficacement.",
            url: "/allreunion",
            icon: <FaGavel />,
            className: "bg-color-9"
        },
        {
            title: "Actions",
            description: "Gérez et suivez les actions en cours dans votre entreprise.",
            url: "/Actions",
            icon: <FaTasks />,
            className: "bg-color-10"
        },
        {
            title: "Conformité reglementaire",
            description: "Assurez-vous que votre entreprise respecte les réglementations en vigueur.",
            url: "/Allconformite",
            icon: <FaBalanceScale />,
            className: "bg-color-11"
        },
    ]);

    const [filteredModules, setFilteredModules] = useState(modules);

    const handleSearch = (searchTerm) => {
        const filtered = modules.filter(module =>
            module.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredModules(filtered);
    };

    return (
        <main style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="dashboard-container" style={{ width: '100%', maxWidth: '1200px', padding: '20px' }}>
                <div className="container">
                    <SearchBar onSearch={handleSearch} />
                    <div className="row mb-4">
                        {filteredModules.map(module => (
                            <div className="col-md-4 mb-4" key={module.title}>
                                <ModuleTile
                                    title={module.title}
                                    description={module.description}
                                    url={module.url}
                                    icon={module.icon}
                                    className={module.className}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Dashboard;
