import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';
import { FaFileAlt, FaFileSignature, FaListAlt } from 'react-icons/fa';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { MdApproval } from 'react-icons/md';
const sidebarItems = [
    { title: 'Documents internes', link: '/DashboardDocInt', icon: <FaFileAlt /> },
    { title: 'Documents externes', link: '/DashboardDocExt', icon: <FaFileSignature /> },
    { title: 'Liste des demandes', link: '/ListeDemande', icon: <FaListAlt /> },
    { title: 'Liste des documents à vérifier', link: '/VerifDoc', icon: <AiOutlineFileSearch /> },
    { title: 'Liste des documents à approuver', link: '/ApprouveDoc', icon: <MdApproval /> },
];




const SidebarDoc = () => {
    return (
        <aside className="sidebar">
            <ul>
                {sidebarItems.map((item, index) => (
                    <li key={index}>
                        <Link to={item.link} className="sidebar-link">
                            {item.icon}
                            <span>{item.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default SidebarDoc;