import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserShield, FaBriefcase, FaUsers, FaUserTie, FaBook } from 'react-icons/fa';
import '../styles/Sidebar.css';

const sidebarItems = [
    { title: 'Employés', link: '/dashboardemploye', icon: <FaUserTie /> },
    { title: 'Job position', link: '/dashboardposition', icon: <FaBriefcase /> },    
    { title: 'Formations', link: '/dashboardformation', icon: <FaBook /> },
    { title: 'Participants', link: '/dashboardparticipant', icon: <FaUsers /> },
    { title: 'Responsables formation', link: '/dashboardresponsable', icon: <FaUserShield /> },

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
