import React, { Fragment, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { connect } from 'react-redux';
import { checkAuthenticated } from '../actions/auth';

const Layout = ({ children, checkAuthenticated }) => {
    useEffect(() => {
        checkAuthenticated();
    }, [checkAuthenticated]);

    return (
        <Fragment>
            <Navbar />

            {children}
        </Fragment>
    );
};

const mapDispatchToProps = {
    checkAuthenticated
};

export default connect(null, mapDispatchToProps)(Layout);