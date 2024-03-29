from django.urls import path
from . import views
from .views import *
urlpatterns = [
    path('',views.home,name=""),
    path('home',views.index,name="home"),
    path('register',views.register,name="register"),
    path('login',views.login,name="login"),
    path('logout',views.logout,name="logout"),

    path('dashboard',views.dashboard, name="dashboard"),
    path('create_jobpost',views.create_jobpost,name="create_jobpost"),
    path('update_jobpost/<int:pk>',views.update_jobpost,name="update_jobpost"),
    path('jobpost/<int:pk>',views.singular_jobpost,name="jobpost"),
    path('delete_jobpost/<int:pk>',views.delete_jobpost,name="delete_jobpost"),

    path('dashboard_responsable',views.dashboard_responsable, name="dashboard_responsable"),
    path('create_responsable',views.create_responsable,name="create_responsable"),
    path('update_responsable/<int:pk>',views.update_responsable,name="update_responsable"),
    path('responsable/<int:pk>',views.singular_responsable,name="responsable"),
    path('delete_responsable/<int:pk>',views.delete_responsable,name="delete_responsable"),

    path('dashboard_participant', DashboardParticipantView.as_view(), name='dashboard_participant'),
    path('create_participant', CreateParticipantView.as_view(), name='create_participant'),
    path('update_participant/<int:pk>', UpdateParticipantView.as_view(), name='update_participant'),
    path('participant/<int:pk>', ViewParticipantView.as_view(), name='participant'),
    path('delete_participant/<int:pk>', DeleteParticipantView.as_view(), name='delete_participant'),

    path('dashboard_employe',DashboardEmployeView.as_view(), name="dashboard_employe"),
    path('create_employe',CreateEmployeView.as_view(),name="create_employe"),
    path('update_employe/<int:pk>',UpdateEmployeView.as_view(),name="update_employe"),
    path('employe/<int:pk>',ViewEmployeView.as_view(),name="employe"),
    path('delete_employe/<int:pk>',DeleteEmployeView.as_view(),name="delete_employe"),

    path('dashboard_department', DashboardDepartmentView.as_view(), name='dashboard_department'),
    path('create_department', CreateDepartmentView.as_view(), name='create_department'),
    path('update_department/<int:pk>', UpdateDepartmentView.as_view(), name='update_department'),
    path('department/<int:pk>', ViewDepartmentView.as_view(), name='department'),
    path('delete_department/<int:pk>', DeleteDepartmentView.as_view(), name='delete_department'),

    path('dashboard_fiche_employe',DashboardFicheEmployeView.as_view(), name="dashboard_fiche_employe"),
    path('create_fiche_employe',CreateFicheEmployeView.as_view(),name="create_fiche_employe"),
    path('update_fiche_employe/<int:pk>',UpdateFicheEmployeView.as_view(),name="update_fiche_employe"),
    path('fiche_employe/<int:pk>',ViewFicheEmployeView.as_view(),name="fiche_employe"),
    path('delete_fiche_employe/<int:pk>',DeleteFicheEmployeView.as_view(),name="delete_fiche_employe"),

    path('dashboard_formation',DashboardFormationView.as_view(), name="dashboard_formation"),
    path('create_formation',CreateFormationView.as_view(),name="create_formation"),
    path('update_formation/<int:pk>',UpdateFormationView.as_view(),name="update_formation"),
    path('formation/<int:pk>',ViewFormationView.as_view(),name="formation"),
    path('delete_formation/<int:pk>',DeleteFormationView.as_view(),name="delete_formation"),

    path('dashboard_evaluation_froid',DashboardEvaluationFroidView.as_view(), name="dashboard_evaluation_froid"),
    path('create_evaluation_froid',CreateEvaluationFroidView.as_view(),name="create_evaluation_froid"),
    path('update_evaluation_froid/<int:pk>',UpdateEvaluationFroidView.as_view(),name="update_evaluation_froid"),
    path('evaluation_froid/<int:pk>',ViewEvaluationFroidView.as_view(),name="evaluation_froid"),
    path('delete_evaluation_froid/<int:pk>',DeleteEvaluationFroidView.as_view(),name="delete_evaluation_froid"),

    path('dashboard_evaluation_chaud',DashboardEvaluationChaudView.as_view(), name="dashboard_evaluation_chaud"),
    path('create_evaluation_chaud',CreateEvaluationChaudView.as_view(),name="create_evaluation_chaud"),
    path('update_evaluation_chaud/<int:pk>',UpdateEvaluationChaudView.as_view(),name="update_evaluation_chaud"),
    path('evaluation_chaud/<int:pk>',ViewEvaluationChaudView.as_view(),name="evaluation_chaud"),
    path('delete_evaluation_chaud/<int:pk>',DeleteEvaluationChaudView.as_view(),name="delete_evaluation_chaud"),

    path('dashboard_evaluation_competence',DashboardEvaluationCompetenceView.as_view(), name="dashboard_evaluation_competence"),
    path('create_evaluation_competence',CreateEvaluationCompetenceView.as_view(),name="create_evaluation_competence"),
    path('update_evaluation_competence/<int:pk>',UpdateEvaluationCompetenceView.as_view(),name="update_evaluation_competence"),
    path('evaluation_competence/<int:pk>',ViewEvaluationCompetenceView.as_view(),name="evaluation_competence"),
    path('delete_evaluation_competence/<int:pk>',DeleteEvaluationCompetenceView.as_view(),name="delete_evaluation_competence"),


]
