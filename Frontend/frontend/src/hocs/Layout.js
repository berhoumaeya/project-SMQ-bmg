import React, { Fragment, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { connect } from 'react-redux';
import { checkAuthenticated } from '../actions/auth';
import { load_user } from '../actions/profile';

const Layout = ({ children, checkAuthenticated, load_user }) => {
    useEffect(() => {
        checkAuthenticated();
        load_user();
    }, [checkAuthenticated, load_user]);

    return (
        <Fragment>
            <Navbar />
            {children}
        </Fragment>
    );
};

const mapDispatchToProps = {
    checkAuthenticated,
    load_user,
};

export default connect(null, mapDispatchToProps)(Layout);