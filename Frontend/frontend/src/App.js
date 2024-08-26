import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './hocs/Layout';
import Home from './containers/Home';
import Register from './containers/Register';
import Login from './containers/Log';
import PasswordResetRequest from './containers/ResetPassword';
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
import Archive from './containers/DOcumentation/archive';

import DemandeAcc from './containers/DOcumentation/demandeAccepte';

import CreateDemande from './containers/DOcumentation/CréerDemande';

// Clients
import AllClients from './containers/Client/Clients';
import Client from './containers/Client/ConsulterClient';
import AddClient from './containers/Client/CréerClient';
import ModifierClient from './containers/Client/modifierclient';
import ReclamationDetails from './containers/Client/ReclamationDetails';

//Réclamation Client
import CreateReclamation from './containers/Client/CréerReclamationClient';
import AllReclamations  from './containers/Client/AllReclamations';
import ModifierReclamation from './containers/Client/ModifierReclamation';
// Enquetes
import AllEnquetes from './containers/Client/AllEnquete';
import AddEnquete from './containers/Client/CréerEnquete';
import DetailsEnquete from './containers/Client/DetailsEnquete';
//Suggestions
import AllSuggestions from './containers/Client/AllSuggestion';
import CreateSuggestion from './containers/Client/CréerSuggestionClient';
import SuggestionDetails from './containers/Client/SuggestionDetails';
//Fournisseurs
import AllFournisseurs from './containers/Fournisseur/fournisseurs';
import Fournisseur from './containers/Fournisseur/ConsulterFournisseur';
import AddFournisseur from './containers/Fournisseur/CréerFournisseur';
import AddEvaluationFournisseur from './containers/Fournisseur/CréerEvaluationFournisseur';
import AllEvaluations from './containers/Fournisseur/AllEvaluationFournisseur';
import AllReclamation from './containers/Fournisseur/AllReclamationFournisseur';
import AddReclamationFournisseur from './containers/Fournisseur/CréerRéclamationFournisseur';
import ReclamationfouDetails from './containers/Fournisseur/ReclamationfouDetails'; 

import EvaluationDetails from './containers/Fournisseur/EvaluationDetails';
//Risques
import DashboardRisk from './containers/risque/AllRisque';
import AddRisque from './containers/risque/AjouterRisk';
import ModifierRisk from './containers/risque/ModifierRisk';

//Conformite
import DashboardConformite from './containers/conformite/Allconformite';
import AddConformite from './containers/conformite/AjouterConformite';
import ModifierConformite from './containers/conformite/ModifierConformite';

//reunion
import DashboardMeetings from './containers/reunion/allreunion';
import Meet from './containers/reunion/ConsulterReunion';
import AddDecision from './containers/reunion/PrendreDecision';
import AddReunion from './containers/reunion/AjouterReunion';
//actions
import CreateActionForm from './containers/actions/ajouteraction';
import Actions from './containers/actions/Actions';

//indicateur
import DashboardIndicateurs from './containers/indicateur/indicateurs';
import Indicateur from './containers/indicateur/ConsulterIndicateur';
import AddIndicateur from './containers/indicateur/AjouterIndicateur';
import CreateSuiviIndicateurForm from './containers/indicateur/AjouterSuiviIndicateur';
import SuiviIndicateur from './containers/indicateur/SuiviIndicateur';
import ConsulterSuivi from './containers/indicateur/ConsulterSuivi'; 
//
import Audits from './containers/audit/audits';
import ValidAudit from './containers/audit/valideraudit';

//Guest
import DashboardGuest from './containers/guest';
import DashboardDocIntGuest from './containers/Documentguest';
import DashboardMeetingsGuest from './containers/Reunionguest';

//Produit
import DashboardProduit from './containers/Produit/allProduit';
import FormProduit from './containers/Produit/FormProduit';
import ConsulterProduit from './containers/Produit/ConsulterProduit';

import AuditDetail from './containers/audit/auditDetail';
import AddAudit from './containers/audit/ajouteraudit';
import Allreclamations from './containers/Client/AllReclamations';
import SubNavbarfou from './containers/Fournisseur/SubNavbarfou';


const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Routes>

          <Route path="/guest" element={<DashboardGuest />} />
          <Route path="/Documentguest" element={<DashboardDocIntGuest />} />
          <Route path="/Reunionguest" element={<DashboardMeetingsGuest />} />




          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ResetPassword" element={<PasswordResetRequest />} />

          <Route path="/Profile" element={<UserProfile />} />

          <Route path="/ListeDemande" element={<DemandList />} />
          <Route path="/CréerDemande" element={<CreateDemande />} />

          <Route path="/CréerDocInt/:id" element={<CreateDocumentForm />} />
          <Route path="/modifierDocInt/:id" element={<ModifierDoc />} />
          <Route path="/VerifDoc" element={<VerifList />} />
          <Route path="/ApprouveDoc" element={<ApprouveList />} />



          <Route path="/DashboardDocInt" element={<DashboardDocInt />} />
          <Route path="/DashboardDocExt" element={<DashboardDocExt />} />
          <Route path="/archive/:id" element={<Archive />} />

          <Route path="/CréerDocExt" element={<DocExtForm />} />
          <Route path="/modifierDocExt/:id" element={<ModifierDocExt />} />



          <Route path="/demandeAccepte" element={<DemandeAcc />} />



          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/dashboardRH" element={<DashboardRH />} />
          <Route path="/dashboardClient" element={<DashboardClient />} />
          <Route path="/dashboardFournisseur" element={<DashboardFournisseur />} />
          <Route path="/dashboardDoc" element={<DashboardDoc />} />

          <Route path="/dashboardformation" element={<Dashboardformation />} />
          <Route path="/formation/:id" element={<Formation />} />
          <Route path="/ajouter-formation/" element={<AddFormation />} />
          <Route path="/update-formation/:id" element={<UpdateFormation />} />

          <Route path="/dashboardemploye" element={<DashboardEmploye />} />
          <Route path="/employe/:id" element={<EmployeDetail />} />
          <Route path="/ajouter-employe/" element={<AddEmploye />} />
          <Route path="/update-employe/:id" element={<UpdateEmploye />} />

          <Route path="/Dashboardposition" element={<DashboardPost />} />
          <Route path="/position/:id" element={<PostDetail />} />
          <Route path="/ajouter-position/" element={<AddPost />} />
          <Route path="/update-position/:id" element={<UpdatePost />} />


          <Route path="/dashboardresponsable" element={<DashboardResponsable />} />
          <Route path="/responsable/:id" element={<ResponsableDetail />} />
          <Route path="/ajouter-responsable/" element={<ResponsableForm />} />
          <Route path="/update-responsable/:id" element={<UpdateResponsable />} />

          <Route path="/dashboardcompetence/:id/" element={<DashboardCompetence />} />
          <Route path="/ajouter-competence/:id/" element={<CompetenceForm />} />

          <Route path="/participant/:id" element={<ParticipantDetail />} />
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
          <Route path="/ModifierReclamation/:reclamationId/" element={<ModifierReclamation />} />
          <Route path="/AllReclamations" element={<AllReclamations />} />
          <Route path="/ReclamationDetails/:id" element={<ReclamationDetails />} />
          

          {/* Enquetes Clients : */}
          <Route path="/AllEnquete/" element={<AllEnquetes />} />
          <Route path="/CréerEnquete/" element={<AddEnquete />} />
          <Route path="/DetailEnquete/:id" element={<DetailsEnquete />} />

          

          {/* Suggestions Clients : */}
          <Route path="/AllSuggestion" element={<AllSuggestions />} />
          <Route path="/CréerSuggestionClient/" element={<CreateSuggestion />} />
          <Route path="/suggestion/:id" element={<SuggestionDetails />} />
          {/* Fournisseurs : */}
          <Route path="/fournisseurs" element={<AllFournisseurs />} />
          <Route path="/ConsulterFournisseur/:id/" element={<Fournisseur />} />
          <Route path="/CréerFournisseur" element={<AddFournisseur />} />
          <Route path="/CréerEvaluationFournisseur/:id/" element={<AddEvaluationFournisseur />} />
          <Route path="/AllEvaluationFournisseur/:id/" element={<AllEvaluations />} />
          <Route path="/AllReclamationFournisseur/:id/" element={<AllReclamation />} />
          <Route path="/CréerRéclamationFournisseur/" element={<AddReclamationFournisseur />} />
          <Route path="/ReclamationfouDetails/:id" element={<ReclamationfouDetails/>} />
          <Route path="/EvaluationDetails/:id" element={<EvaluationDetails/>} />
          {/* Risk : */}
          <Route path="/AllRisque/" element={<DashboardRisk />} />
          <Route path="/AjouterRisk/" element={<AddRisque />} />
          <Route path="/ModifierRisk/:id/" element={<ModifierRisk />} />

          {/* Conformite : */}
          <Route path="/Allconformite/" element={<DashboardConformite />} />
          <Route path="/AjouterConformite/" element={<AddConformite />} />
          <Route path="/ModifierConformite/:id/" element={<ModifierConformite />} />

          {/* réunion : */}
          <Route path="/allreunion/" element={<DashboardMeetings />} />
          <Route path="/ConsulterReunion/:id/" element={<Meet />} />
          <Route path="/PrendreDecision/:id/" element={<AddDecision />} />
          <Route path="/AjouterReunion/" element={<AddReunion />} />
          {/* Indicateurs : */}
          <Route path="/indicateurs/" element={<DashboardIndicateurs />} />
          <Route path="/ConsulterIndicateur/:id" element={<Indicateur />} />
          <Route path="/AjouterIndicateur/" element={<AddIndicateur />} />
          <Route path="/AjouterSuiviIndicateur/:id/" element={<CreateSuiviIndicateurForm />} />
          <Route path="/SuiviIndicateur/:id/" element={<SuiviIndicateur />} />
          <Route path="/ConsulterSuivi/:id" element={<ConsulterSuivi />} />
 {/* Produitnon conforme : */}
          <Route path="/allProduit" element={<DashboardProduit />} />
          <Route path="/FormProduit" element={<FormProduit />} />
          <Route path="/ConsulterProduit/:id" element={<ConsulterProduit />} />

          {/* actions : */}
          <Route path="/ajouteraction/" element={<CreateActionForm />} />
          <Route path="/Actions/" element={<Actions />} />

          {/* audits : */}
          <Route path="/Audits/" element={<Audits />} />
          <Route path="/valideraudit/" element={<ValidAudit />} />
          <Route path="/audit/:id" element={<AuditDetail />} />
          <Route path="/ajouteraudit/" element={<AddAudit />} />


          <Route path="/SubNavbarfou/" element={<SubNavbarfou/>} />




















        </Routes>
      </Layout>
    </Router>
  </Provider>

);
export default App;