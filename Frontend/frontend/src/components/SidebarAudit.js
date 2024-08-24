import { RiPassValidFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import '../styles/Sidebar.css';
import React from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaUserTie } from "react-icons/fa";

const sidebarItems = [
    { title: 'Liste des audits', link: '/Audits', icon: <FaUserTie /> },
    { title: 'Validation des audits', link: '/valideraudit', icon: <RiPassValidFill />    },
    { title: 'Ajouter un audit', link: '/ajouteraudit', icon: <IoIosAddCircleOutline />}
];
const SidebarAudit = () => {
        
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

    export default SidebarAudit;