import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserShield, FaBriefcase, FaUsers, FaUserTie, FaBook } from 'react-icons/fa';
import './sidbarcli.css';
import { AiFillBulb } from "react-icons/ai";
import { MdContentPasteSearch } from "react-icons/md";
import { CiReceipt } from "react-icons/ci";
const sidebarItems = [
    { title: 'Réclamation', link: '/AllReclamations', icon: <CiReceipt /> },
    { title: 'suggestion', link: '/AllSuggestion', icon: <AiFillBulb /> },    
    { title: 'Enquete', link: '/AllEnquete', icon: <MdContentPasteSearch />},
   
];

const SidbarCli = () => {
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

export default SidbarCli;
