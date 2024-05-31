import React, { useState } from "react";
import { FaUser, FaBook, FaUserFriends, FaBuilding, FaChartBar, FaClipboardList, FaExclamationTriangle, FaHandshake, FaGavel, FaTasks, FaBalanceScale } from 'react-icons/fa';

function ModuleTile({ title, description, url, icon }) {
    return (
        <div className="border p-5">
            <h4>{icon} {title}</h4>
            <p>{description}</p>
            <a href={url} className="btn btn-primary">Accéder</a>   
        </div>
    );
}

function SearchBar({ onSearch }) {
    const handleSearchChange = (event) => {
        onSearch(event.target.value);
    };

    return (
        <div className="input-group mb-4">
            <input
                type="text"
                className="form-control"
                placeholder="Rechercher un module..."
                onChange={handleSearchChange}
            />
            <div className="input-group-append">
                <span className="input-group-text">🔍</span>
            </div>
        </div>
    );
}

function Dashboard() {
    const [modules] = useState([
        {
            title: "Ressources Humaines",
            description: "Gérez les ressources humaines de votre entreprise.",
            url: "/dashboardRH",
            icon: <FaUser />
        },
        {
            title: "Documentation",
            description: "Accédez à la documentation pour obtenir des informations utiles.",
            url: "/DashboardDoc",
            icon: <FaBook />
        },
        {
            title: "Client",
            description: "Consultez les informations sur les clients et les contacts.",
            url: "/DashboardClient",
            icon: <FaUserFriends />
        },
        {
            title: "Fournisseur",
            description: "Gérez les informations sur les fournisseurs et les contacts.",
            url: "/fournisseurs",
            icon: <FaBuilding />
        },
        {
            title: "Indicateur",
            description: "Visualisez les indicateurs clés de performance de votre entreprise.",
            url: "/dashboard_indicateur",
            icon: <FaChartBar />
        },
        {
            title: "Audit",
            description: "Accédez à l'outil d'audit pour suivre les performances.",
            url: "/dashboard_audit",
            icon: <FaClipboardList />
        },
        {
            title: "Produit Non Conforme",
            description: "Gérez les produits non conformes et les actions correctives.",
            url: "/dashboard_produit",
            icon: <FaExclamationTriangle />
        },
        {
            title: "Risk",
            description: "Évaluez et gérez les risques associés à vos activités.",
            url: "/dashboard_risk",
            icon: <FaHandshake />
        },
        {
            title: "Réunion",
            description: "Planifiez et organisez vos réunions efficacement.",
            url: "/dashboard_reunion",
            icon: <FaGavel />
        },
        {
            title: "Actions",
            description: "Gérez et suivez les actions en cours dans votre entreprise.",
            url: "/dashboard_action",
            icon: <FaTasks />
        },
        {
            title: "Conformité reglementaire",
            description: "Assurez-vous que votre entreprise respecte les réglementations en vigueur.",
            url: "/dashboard_conformité",
            icon: <FaBalanceScale />
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
        <div className="dashboard">
            <hr />
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
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;