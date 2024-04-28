import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './hocs/Layout';
import Home from './containers/Home';
import Register from './containers/Register';
import Login from './containers/Log';
import Dashboard from './containers/Dashboard';
import DashboardRH from './containers/DashboardRH';
import Application  from './containers/Application';

import { Provider } from 'react-redux';
import store from './store';

const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboardRH" element={<DashboardRH />}/>
          <Route path="/app" element={<Application />}/>
        </Routes>
      </Layout>
    </Router>
  </Provider>
  
);
export default App;