// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserShield, FaBriefcase, FaUsers, FaUserTie, FaFile, FaBook } from 'react-icons/fa';
import '../styles/Sidebar.css';

// Define the sidebar items with icons
const sidebarItems = [
    { title: 'Responsables formation', link: '/DashboardResponsable', icon: <FaUserShield /> },
    { title: 'Job post', link: '/DashboardPosition', icon: <FaBriefcase /> },
    { title: 'Participants', link: '/DashboardParticipant', icon: <FaUsers /> },
    { title: 'Employés', link: '/DashboardEmploye', icon: <FaUserTie /> },
    { title: 'Fiche Employé', link: '/DashboardFiche', icon: <FaFile /> },
    { title: 'Formations', link: '/DashboardFormation', icon: <FaBook /> },
];

const SidebarRH = () => {
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

export default SidebarRH;
