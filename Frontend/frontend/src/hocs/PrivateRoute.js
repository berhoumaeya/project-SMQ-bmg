import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import { connect } from "react-redux";

const PrivateRoute = ({ element: Element, isAuthenticated, ...rest }) => {
  return (
    <Routes>
      <Route
        {...rest}
        element={isAuthenticated ? <Element /> : <Navigate to='/login' />}
      />
    </Routes>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(PrivateRoute);