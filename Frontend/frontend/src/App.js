import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './hocs/Layout';
import Home from './containers/Home';
import Register from './containers/Register';
import Login from './containers/Log';
import Dashboard from './containers/Dashboard';
import DashboardRH from './containers/RH/DashboardRH';
import Dashboardformation from './containers/RH/formation/Dashboardformation';
import { Provider } from 'react-redux';
import store from './store';
import DashboardClient from './containers/Client/DashboardClient';
import DashboardFournisseur from './containers/Fournisseur/DashboardFournisseur'
import DashboardDoc from './containers/DOcumentation/DashboardDoc';

import Formation from './containers/RH/formation/formation';
import AddFormation from './containers/RH/formation/ajouter-formation';
import UpdateFormation from './containers/RH/formation/update-formation';

import DashboardEmploye from './containers/RH/Employe/Dashboardemploye';
import EmployeDetail from './containers/RH/Employe/employe';
import AddEmploye from './containers/RH/Employe/ajouter-employe';
import UpdateEmploye from './containers/RH/Employe/update-employe';

import DashboardParticipant from './containers/RH/participant/Dashboardparticipant';
import ParticipantDetail from './containers/RH/participant/participant';
import ParticipantForm from './containers/RH/participant/ajouter-participant';
import UpdateParticipant from './containers/RH/participant/update-participant';

import DashboardResponsable from './containers/RH/Responsable/Dashboardresponsable';
import ResponsableForm from './containers/RH/Responsable/ajouter-responsable';
import ResponsableDetail from './containers/RH/Responsable/responsable';
import UpdateResponsable from './containers/RH/Responsable/update-responsable';

import DashboardCompetence from './containers/RH/Competences/Dashboardcompetence';
import CompetenceForm from './containers/RH/Competences/ajouter-competence';


import DashboardFiche from './containers/RH/fiche/Dashboardfiche';
import FicheDetail from './containers/RH/fiche/fiche';
import FicheForm from './containers/RH/fiche/ajouter-fiche';
import UpdateFiche from './containers/RH/fiche/update-fiche';

import DashboardChaud from './containers/RH/Evaluation chaud/DashboardEvaluationChaud';
import ChaudDetail from './containers/RH/Evaluation chaud/chaud';
import ChaudForm from './containers/RH/Evaluation chaud/ajouter-chaud';

import DashboardFroid from './containers/RH/Evaluation froid/DashboardEvaluationFroid';
import FroidDetail from './containers/RH/Evaluation froid/froid';
import FroidForm from './containers/RH/Evaluation froid/ajout-froid';

import DashboardPost from './containers/RH/position/Dashboardposition';
import AddPost from './containers/RH/position/ajouter-position';
import PostDetail from './containers/RH/position/position';
import UpdatePost from './containers/RH/position/update-position';
import UserProfile from './containers/Profile';

import DemandList from './containers/DOcumentation/ListeDemande';
import VerifList from './containers/DOcumentation/VerifDoc';
import ApprouveList from './containers/DOcumentation/ApprouveDoc';

import CreateDocumentForm from './containers/DOcumentation/CréerDocInt';
import ModifierDoc from './containers/DOcumentation/modifierDocInt';
import ModifierDocExt from './containers/DOcumentation/modifierDocExt';

import DocExtForm from './containers/DOcumentation/CréerDocExt';

import DashboardDocInt from './containers/DOcumentation/DashboardDocInt';
import DashboardDocExt from './containers/DOcumentation/DashboardDocExt';

import DemandeAcc from './containers/DOcumentation/demandeAccepte';

import CreateDemande from './containers/DOcumentation/CréerDemande';

// Clients
import AllClients from './containers/Client/Clients';
import Client from './containers/Client/ConsulterClient';
import AddClient from './containers/Client/CréerClient';
import ModifierClient from './containers/Client/modifierclient';

//Réclamation Client
import CreateReclamation from './containers/Client/CréerReclamationClient';
import Allreclamations from './containers/Client/AllReclamations';

//Fournisseurs
import AllFournisseurs from './containers/Fournisseur/fournisseurs';
import Fournisseur from './containers/Fournisseur/ConsulterFournisseur';
import AddFournisseur from './containers/Fournisseur/CréerFournisseur';
import AddEvaluationFournisseur from './containers/Fournisseur/CréerEvaluationFournisseur';
import AllEvaluations from './containers/Fournisseur/AllEvaluationFournisseur';
import AllReclamation from './containers/Fournisseur/AllReclamationFournisseur';
import AddReclamationFournisseur from './containers/Fournisseur/CréerRéclamationFournisseur';


const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/Profile" element={<UserProfile />} />

          <Route path="/ListeDemande" element={<DemandList />} />
          <Route path="/CréerDemande" element={<CreateDemande />} />

          <Route path="/CréerDocInt/:id" element={<CreateDocumentForm />} />
          <Route path="/modifierDocInt/:id" element={<ModifierDoc />} />
          <Route path="/VerifDoc" element={<VerifList />} />
          <Route path="/ApprouveDoc" element={<ApprouveList />} />


          <Route path="/DashboardDocInt" element={<DashboardDocInt />} />
          <Route path="/DashboardDocExt" element={<DashboardDocExt />} />

          <Route path="/CréerDocExt" element={<DocExtForm />} />
          <Route path="/modifierDocExt/:id" element={<ModifierDocExt />} />



          <Route path="/demandeAccepte" element={<DemandeAcc />} />



          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/dashboardRH" element={<DashboardRH />}/>
          <Route path="/dashboardClient" element={<DashboardClient />} />
          <Route path="/dashboardFournisseur" element={<DashboardFournisseur />} />
          <Route path="/dashboardDoc" element={<DashboardDoc />} />

          <Route path="/dashboardformation" element={<Dashboardformation />}/>
          <Route path="/formation/:id" element={<Formation />} />
          <Route path="/ajouter-formation/" element={<AddFormation />} />
          <Route path="/update-formation/:id" element={<UpdateFormation />} />

          <Route path="/dashboardemploye" element={<DashboardEmploye />}/>
          <Route path="/employe/:id" element={<EmployeDetail />}/>
          <Route path="/ajouter-employe/" element={<AddEmploye />} />
          <Route path="/update-employe/:id" element={<UpdateEmploye />} />

          <Route path="/Dashboardposition" element={<DashboardPost />}/>
          <Route path="/position/:id" element={<PostDetail />}/>
          <Route path="/ajouter-position/" element={<AddPost />} />
          <Route path="/update-position/" element={<UpdatePost />} />


          <Route path="/dashboardresponsable" element={<DashboardResponsable />}/>
          <Route path="/responsable/:id" element={<ResponsableDetail />}/>
          <Route path="/ajouter-responsable/" element={<ResponsableForm />} />
          <Route path="/update-responsable/:id" element={<UpdateResponsable />} />

          <Route path="/dashboardcompetence" element={<DashboardCompetence />}/>
          <Route path="/ajouter-competence/" element={<CompetenceForm />} />

          <Route path="/participant/:id" element={<ParticipantDetail />}/>
          <Route path="/ajouter-participant/" element={<ParticipantForm />} />
          <Route path="/Dashboardparticipant" element={<DashboardParticipant />} />
          <Route path="/update-participant/:id" element={<UpdateParticipant />} />

          <Route path="/dashboardfiche/" element={<DashboardFiche />} />
          <Route path="/ajouter-fiche/" element={<FicheForm />} />
          <Route path="/update-fiche/:id" element={<UpdateFiche />} />
          <Route path="/fiche/:id" element={<FicheDetail />} />

          <Route path="/DashboardEvaluationChaud/" element={<DashboardChaud />} />
          <Route path="/chaud/:id" element={<ChaudDetail />} />
          <Route path="/ajouter-chaud/" element={<ChaudForm />} />

          <Route path="/DashboardEvaluationFroid/" element={<DashboardFroid />} />
          <Route path="/froid/:id" element={<FroidDetail />} />
          <Route path="/ajouter-froid/" element={<FroidForm />} />

          {/* Clients : */}
          <Route path="/Clients" element={<AllClients />} />
          <Route path="/ConsulterClient/:id" element={<Client />} />
          <Route path="/CréerClient" element={<AddClient />} />
          <Route path="/modifierclient/:id" element={<ModifierClient />} />

          {/* Réclamation Clients : */}
          <Route path="/CréerReclamationClient/:id" element={<CreateReclamation />} />
          <Route path="/AllReclamations/:id/" element={<Allreclamations />} />

          {/* Fournisseurs : */}
          <Route path="/fournisseurs" element={<AllFournisseurs />} />
          <Route path="/ConsulterFournisseur/:id/" element={<Fournisseur />} />
          <Route path="/CréerFournisseur" element={<AddFournisseur />} />
          <Route path="/CréerEvaluationFournisseur/:id/" element={<AddEvaluationFournisseur />} />
          <Route path="/AllEvaluationFournisseur/:id/" element={<AllEvaluations />} />
          <Route path="/AllReclamationFournisseur/:id/" element={<AllReclamation />} />
          <Route path="/CréerRéclamationFournisseur/:id/" element={<AddReclamationFournisseur />} />



          








        </Routes>
      </Layout>
    </Router>
  </Provider>
  
);
export default App;