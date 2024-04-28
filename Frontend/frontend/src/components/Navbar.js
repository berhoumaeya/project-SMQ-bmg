import React, { Fragment, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

const Navbar = ({ isAuthenticated, logout, userName }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const authLinks = (
    <Fragment>
      <li className='nav-item'>
        <NavLink className='nav-link' to='/dashboard'>Dashboard</NavLink>
      </li>
      <li className='nav-item dropdown'>
        <button className='nav-link dropdown-toggle' onClick={toggleDropdown}>
          {userName}
        </button>
        {dropdownOpen && (
          <div className='dropdown-menu' aria-labelledby='navbarDropdown'>
            <Link className='dropdown-item' to='/profile'>My Profile</Link>
            <a className='dropdown-item' onClick={logout} href='#!'>Logout</a>
          </div>
        )}
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li className='nav-item'>
        <NavLink className='nav-link' to='/login'>Login</NavLink>
      </li>
      <li className='nav-item'>
        <NavLink className='nav-link' to='/register'>Register</NavLink>
      </li>
    </Fragment>
  );

  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary'>
      <div className='container-fluid'>
        <Link className='navbar-brand' exact to='/'>BMG</Link>
        <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <NavLink className='nav-link' exact to='/'>Home</NavLink>
            </li>
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    userName: state.auth.user ? state.auth.user.name : '' // Vérifiez si user est défini avant d'accéder à sa propriété name
  });
  

export default connect(mapStateToProps, { logout })(Navbar);
