from django.urls import path
from .views.views1 import *
from .views.views2 import *
from .views.views3 import *
urlpatterns = [

    path('piece_jointe/<int:fiche_id>/', get_piece_jointe, name='piece_jointe'),
    path('piece_jointe_responsable/<int:responsable_id>/', get_piece_jointe_responsable, name='piece_jointe_responsable'),
    path('piece_jointe_participant/<int:participant_id>/', get_piece_jointe_participant, name='piece_jointe_participant'),
    path('piece_jointe_employe/<int:employe_id>/', get_piece_jointe_employe, name='piece_jointe_employe'),
    path('piece_jointe_formation/<int:formation_id>/', get_piece_jointe_formation, name='piece_jointe_formation'),


    #CRUD position occupé

    path('dashboard_job_post/',DashboardJobPostAPIView.as_view(), name='dashboard_job_post'),
    path('create_job_post/', CreateJobPostAPIView.as_view(), name='create_job_post'),
    path('update_job_post/<int:pk>/', UpdateJobPostAPIView.as_view(), name='update_job_post'),
    path('job_post/<int:pk>/', SingularJobPostAPIView.as_view(), name='singular_job_post'),
    path('delete_job_post/<int:pk>/', DeleteJobPostAPIView.as_view(), name='delete_job_post'),

    #CRUD Departement

    path('dashboard_department/',DashboardDepartmentAPIView.as_view(), name='dashboard_department'),
    path('create_department/', CreateDepartmentAPIView.as_view(), name='create_department'),
    path('update_department/<int:pk>/', UpdateDepartmentAPIView.as_view(), name='update_department'),
    path('department/<int:pk>/', SingularDepartmentAPIView.as_view(), name='singular_department'),
    path('delete_department/<int:pk>/', DeleteDepartmentAPIView.as_view(), name='delete_department'),

    #CRUD Address

    path('dashboard_address/',DashboardAddressAPIView.as_view(), name='dashboard_address'),
    path('create_address/', CreateAddressAPIView.as_view(), name='create_address'),
    path('update_address/<int:pk>/', UpdateAddressAPIView.as_view(), name='update_address'),
    path('address/<int:pk>/', SingularAddressAPIView.as_view(), name='singular_address'),
    path('delete_address/<int:pk>/', DeleteAddressAPIView.as_view(), name='delete_address'),

    #CRUD Fiche Employe

    path('dashboard_fiche_employe/',DashboardFicheEmployeAPIView.as_view(), name='dashboard_fiche_employe'),
    path('create_fiche_employe/', CreateFicheEmployeAPIView.as_view(), name='create_fiche_employe'),
    path('update_fiche_employe/<int:pk>/', UpdateFicheEmployeAPIView.as_view(), name='update_fiche_employe'),
    path('fiche_employe/<int:pk>/', SingularFicheEmployeAPIView.as_view(), name='singular_fiche_employe'),
    path('delete_fiche_employe/<int:pk>/', DeleteFicheEmployeAPIView.as_view(), name='delete_fiche_employe'),

    #CRUD  Employe

    path('dashboard_employe/',DashboardEmployeAPIView.as_view(), name='dashboard_employe'),
    path('create-employe/', EmployeCreationView.as_view(), name='create_employe'),
    path('update_employe/<int:pk>/', UpdateEmployeAPIView.as_view(), name='update_employe'),
    path('employe/<int:pk>/', SingularEmployeAPIView.as_view(), name='singular_employe'),
    path('delete_employe/<int:pk>/', DeleteEmployeAPIView.as_view(), name='delete_employe'),

    #CRUD  Participant

    path('dashboard_participant/',DashboardParticipantAPIView.as_view(), name='dashboard_participant'),
    path('create_participant/', ParticipantCreationView.as_view(), name='create_participant'),
    path('update_participant/<int:pk>/', UpdateParticipantAPIView.as_view(), name='update_participant'),
    path('participant/<int:pk>/', SingularParticipantAPIView.as_view(), name='singular_participant'),
    path('delete_participant/<int:pk>/', DeleteParticipantAPIView.as_view(), name='delete_participant'),

    #CRUD  Responsable Formation

    path('dashboard_responsable_formation/',DashboardResponsableFormationAPIView.as_view(), name='dashboard_responsable_formation'),
    path('create_responsable_formation/', ResponsableFormationCreationView.as_view(), name='create_responsable_formation'),
    path('update_responsable_formation/<int:pk>/', UpdateResponsableFormationAPIView.as_view(), name='update_responsable_formation'),
    path('responsable_formation/<int:pk>/', SingularResponsableFormationAPIView.as_view(), name='singular_responsable_formation'),
    path('delete_responsable_formation/<int:pk>/', DeleteResponsableFormationAPIView.as_view(), name='delete_responsable_formation'),

    #CRUD  Formation

    path('dashboard_formation/',DashboardFormationAPIView.as_view(), name='dashboard_formation'),
    path('create_formation/', CreateFormationAPIView.as_view(), name='create_formation'),
    path('update_formation/<int:pk>/', UpdateFormationAPIView.as_view(), name='update_formation'),
    path('formation/<int:pk>/', SingularFormationAPIView.as_view(), name='singular_formation'),
    path('delete_formation/<int:pk>/', DeleteFormationAPIView.as_view(), name='delete_formation'),

    #CRUD  Evaluation Competence

    path('dashboard_evaluation_competence/',DashboardEvaluationCompetenceAPIView.as_view(), name='dashboard_evaluation_competence'),
    path('create_evaluation_competence/', CreateEvaluationCompetenceAPIView.as_view(), name='create_evaluation_competence'),
    path('update_evaluation_competence/<int:pk>/', UpdateEvaluationCompetenceAPIView.as_view(), name='update_evaluation_competence'),
    path('evaluation_competence/<int:pk>/', SingularEvaluationCompetenceAPIView.as_view(), name='singular_evaluation_competence'),
    path('delete_evaluation_competence/<int:pk>/', DeleteEvaluationCompetenceAPIView.as_view(), name='delete_evaluation_competence'),

    #CRUD  Evaluation Chaud

    path('dashboard_evaluation_chaud/',DashboardEvaluationChaudAPIView.as_view(), name='dashboard_evaluation_chaud'),
    path('create_evaluation_chaud/', CreateEvaluationChaudAPIView.as_view(), name='create_evaluation_chaud'),
    path('update_evaluation_chaud/<int:pk>/', UpdateEvaluationChaudAPIView.as_view(), name='update_evaluation_chaud'),
    path('evaluation_chaud/<int:pk>/', SingularEvaluationChaudAPIView.as_view(), name='singular_evaluation_chaud'),
    path('delete_evaluation_chaud/<int:pk>/', DeleteEvaluationChaudAPIView.as_view(), name='delete_evaluation_chaud'),

     #CRUD  Evaluation Froid

    path('dashboard_evaluation_froid/',DashboardEvaluationFroidAPIView.as_view(), name='dashboard_evaluation_froid'),
    path('create_evaluation_froid/', CreateEvaluationFroidAPIView.as_view(), name='create_evaluation_froid'),
    path('update_evaluation_froid/<int:pk>/', UpdateEvaluationFroidAPIView.as_view(), name='update_evaluation_froid'),
    path('evaluation_froid/<int:pk>/', SingularEvaluationFroidAPIView.as_view(), name='singular_evaluation_froid'),
    path('delete_evaluation_froid/<int:pk>/', DeleteEvaluationFroidAPIView.as_view(), name='delete_evaluation_froid'),

    #CRUD Plan Action

    path('dashboard_plan/',DashboardPlanActionAPIView.as_view(), name='dashboard_plan'),

]
