import React, { useState } from "react";
import { FaUser, FaBook, FaUserFriends, FaBuilding, FaChartBar, FaClipboardList, FaExclamationTriangle, FaHandshake, FaGavel, FaTasks, FaBalanceScale } from 'react-icons/fa';
import '../styles/dashboard.css';

function ModuleTile({ title, url, icon, className }) {
    return (
        <a href={url} className={`module-card ${className}`}>
            <div className="icon-wrapper">
                <div className="icon-main">{icon}</div>
            </div>
            <h4 className="module-title">{title}</h4>
        </a>
    );
}


function Dashboard() {
    const [modules] = useState([
<<<<<<< HEAD
        { title: "Ressources Humaines", url: "/dashboardRH", icon: <FaUser />, className: "bg-color-1" },
        { title: "Documentation", url: "/DashboardDoc", icon: <FaBook />, className: "bg-color-2" },
        { title: "Client", url: "/DashboardClient", icon: <FaUserFriends />, className: "bg-color-3" },
        { title: "Fournisseur", url: "/fournisseurs", icon: <FaBuilding />, className: "bg-color-4" },
        { title: "Indicateur", url: "/indicateurs", icon: <FaChartBar />, className: "bg-color-5" },
        { title: "Audit", url: "/Audits", icon: <FaClipboardList />, className: "bg-color-6" },
        { title: "Produit Non Conforme", url: "/allProduit", icon: <FaExclamationTriangle />, className: "bg-color-7" },
        { title: "Risk", url: "/AllRisque", icon: <FaHandshake />, className: "bg-color-8" },
        { title: "Réunion", url: "/allreunion", icon: <FaGavel />, className: "bg-color-9" },
        { title: "Actions", url: "/Actions", icon: <FaTasks />, className: "bg-color-10" },
        { title: "Conformité reglementaire", url: "/Allconformite", icon: <FaBalanceScale />, className: "bg-color-11" }
=======
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
>>>>>>> fff04b17f20bc9dbab916571748bd04c8cb9cb30
    ]);

    return (
        <main style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="dashboard-container" style={{ width: '100%', maxWidth: '1200px', padding: '20px' }}>
                <div className="container">
                    <div className="row mb-2">
                        {modules.map(module => (
                            <div className="col-md-3 mb-5" key={module.title}>
                                <ModuleTile
                                    title={module.title}
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