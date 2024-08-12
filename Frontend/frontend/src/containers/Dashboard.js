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
        { title: "Ressources Humaines", url: "/Dashboardemploye", icon: <FaUser />, className: "bg-color-1" },
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