import React, { useState } from "react";
import { FaUser, FaBook, FaUserFriends, FaBuilding, FaChartBar, FaClipboardList, FaExclamationTriangle, FaHandshake, FaGavel, FaUsers, FaCalendarAlt, FaTasks, FaBalanceScale, FaFileAlt } from 'react-icons/fa';

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
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSearchSubmit} className="mb-4">
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Rechercher un module..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button type="submit" className="btn btn-primary">
                    Rechercher
                </button>
            </div>
        </form>
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
            url: "/DashboardFournisseur",
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




// // Dashboard component displays user profile information and allows updates
// const Dashboard = ({
//     delete_account,
//     update_profile,
//     first_name_global,
//     last_name_global,
//     phone_global,
//     city_global
// }) => {
//     const [formData, setFormData] = useState({
//         first_name: '',
//         last_name: '',
//         phone: '',
//         city: ''
//     });

//     // Destructure form data
//     const { first_name, last_name, phone, city } = formData;

//     // Update form data when global profile information changes
//     useEffect(() => {
//         setFormData({
//             first_name: first_name_global,
//             last_name: last_name_global,
//             phone: phone_global,
//             city: city_global,
//         });
//     }, [first_name_global, last_name_global, phone_global, city_global]);

//     // Handle form input changes
//     const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//     // Handle form submission
//     const onSubmit = e => {
//         e.preventDefault();
//         update_profile(first_name, last_name, phone, city);
//     };

//     return (
//         <div className='container'>
//             <h1 className='mt-3'>Welcome to Your Dashboard</h1>
//             <p className='mt-3 mb-3'>Update Your profile below:</p>
//             <form onSubmit={e => onSubmit(e)}>
//                 <div className='form-group'>
//                     <label className='form-label mt-3' htmlFor='first_name'>First Name</label>
//                     <input
//                         className='form-control'
//                         type='text'
//                         name='first_name'
//                         placeholder={`${first_name_global}`}
//                         onChange={e => onChange(e)}
//                         value={first_name}
//                     />
//                 </div>
//                 <div className='form-group'>
//                     <label className='form-label mt-3' htmlFor='last_name'>Last Name</label>
//                     <input
//                         className='form-control'
//                         type='text'
//                         name='last_name'
//                         placeholder={`${last_name_global}`}
//                         onChange={e => onChange(e)}
//                         value={last_name}
//                     />
//                 </div>
//                 <div className='form-group'>
//                     <label className='form-label mt-3' htmlFor='phone'>Phone</label>
//                     <input
//                         className='form-control'
//                         type='text'
//                         name='phone'
//                         placeholder={`${phone_global}`}
//                         onChange={e => onChange(e)}
//                         value={phone}
//                     />
//                 </div>
//                 <div className='form-group'>
//                     <label className='form-label mt-3' htmlFor='city'>City</label>
//                     <input
//                         className='form-control'
//                         type='text'
//                         name='city'
//                         placeholder={`${city_global}`}
//                         onChange={e => onChange(e)}
//                         value={city}
//                     />
//                 </div>
//                 <button className='btn btn-primary mt-3' type='submit'>Update Profile</button>
//             </form>
//             <p className='mt-5'>
//                 Click the button below to delete your account:
//             </p>
//             <a
//                 className='btn btn-danger'
//                 href='#!'
//                 onClick={delete_account}
//             >
//                 Delete Account
//             </a>
//         </div>
//     );
// };

// // Map global profile information to props
// const mapStateToProps = state => ({
//     first_name_global: state.profile.first_name,
//     last_name_global: state.profile.last_name,
//     phone_global: state.profile.phone,
//     city_global: state.profile.city,
// });

// // Connect component to Redux store and export
// export default connect(mapStateToProps, {
//     delete_account,
//     update_profile
// })(Dashboard);