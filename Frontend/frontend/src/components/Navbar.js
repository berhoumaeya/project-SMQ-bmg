import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import '../styles/navbar.css'; 

const Navbar = ({ isAuthenticated, user, logout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="/images/logo.png" alt="BMG Logo" height="30" className="logo" /> BMG
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            {!isAuthenticated && (
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/" activeClassName="active">Home</NavLink>
              </li>
            )}
            {!isAuthenticated && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login" activeClassName="active">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register" activeClassName="active">Register</NavLink>
                </li>
              </>
            )}
            {isAuthenticated && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard" activeClassName="active">Dashboard</NavLink>
              </li>
            )}
          </ul>
          {isAuthenticated && (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#!" role="button" onClick={toggleDropdown}>
                  {user ? `Welcome, ${user.username}` : 'Account'}
                </a>
                {dropdownOpen && (
                  <div className="dropdown-menu dropdown-menu-end show">
                    <Link className="dropdown-item" to="/profile">Profile</Link>
                    <Link className="dropdown-item" to="/" onClick={logout}>Logout</Link>
                  </div>
                )}
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, { logout })(Navbar);
