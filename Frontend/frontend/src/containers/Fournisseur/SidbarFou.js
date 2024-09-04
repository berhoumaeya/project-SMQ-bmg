import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserShield, FaBriefcase, FaUsers, FaUserTie, FaBook } from 'react-icons/fa';
import '../Client/sidbarcli.css';
import { AiFillBulb } from "react-icons/ai";
import { MdOutlineContentPasteSearch } from "react-icons/md";

import { CiReceipt } from "react-icons/ci";
const sidebarItems = [
    { title: 'Réclamation', link: '/AllReclamationFournisseur/:id', icon: <CiReceipt /> },
    { title: 'Evaluations', link: '/AllEvaluationFournisseur/:id', icon: <MdOutlineContentPasteSearch />
    },    
   
   
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
