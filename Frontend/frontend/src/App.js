import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './hocs/Layout';
import Home from './containers/Home';
import Register from './containers/Register';
import Login from './containers/Log';
import Dashboard from './containers/Dashboard';
import DashboardRH from './containers/RH/DashboardRH';
import Dashboardformation from './containers/RH/formation/Dashboardformation';
import { Student  } from './components/Student';
import { Provider } from 'react-redux';
import store from './store';
import DashboardClient from './containers/Client/DashboardClient';
import DashboardFournisseur from './containers/Fournisseur/DashboardFournisseur'
import DashboardDoc from './containers/DOcumentation/DashboardDoc';
import Formation from './containers/RH/formation/formation';
import AddFormation from './containers/RH/formation/ajouter-formation';
import DashboardEmploye from './containers/RH/Employe/Dashboardemploye';
import EmployeDetail from './containers/RH/Employe/employe';
import AddEmploye from './containers/RH/Employe/ajouter-employe';
import UpdateEmploye from './containers/RH/Employe/update-employe';

import DashboardParticipant from './containers/RH/participant/Dashboardparticipant';
import ParticipantDetail from './containers/RH/participant/participant';
import ParticipantForm from './containers/RH/participant/ajouter-participant';


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
          <Route path="/dashboardformation" element={<Dashboardformation />}/>
          <Route path="/student" element={<Student />} />
          <Route path="/dashboardClient" element={<DashboardClient />} />
          <Route path="/dashboardFournisseur" element={<DashboardFournisseur />} />
          <Route path="/dashboardDoc" element={<DashboardDoc />} />
          <Route path="/formation/:id" element={<Formation />} />
          <Route path="/ajouter-formation/" element={<AddFormation />} />
          <Route path="/dashboardemploye" element={<DashboardEmploye />}/>
          <Route path="/employe/:id" element={<EmployeDetail />}/>
          <Route path="/ajouter-employe/" element={<AddEmploye />} />
          <Route path="/update-employe/:id" element={<UpdateEmploye />} />

          <Route path="/participant/:id" element={<ParticipantDetail />}/>
          <Route path="/ajouter-participant/" element={<ParticipantForm />} />
          <Route path="/Dashboardparticipant" element={<DashboardParticipant />} />
        </Routes>
      </Layout>
    </Router>
  </Provider>
  
);
export default App;