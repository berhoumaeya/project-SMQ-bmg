from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

from django import forms 
from .models import *
from django.contrib.auth.forms import AuthenticationForm
from django.forms.widgets import PasswordInput,TextInput,EmailInput

class CreateUserForm(UserCreationForm):
    email = forms.EmailField(widget=EmailInput())
    class Meta:
        model = User
        fields = ['email','username','password1','password2']

class LoginForm(AuthenticationForm):
    username = forms.CharField(widget=TextInput())
    password = forms.CharField(widget=PasswordInput())


#JobPost


class CreateJobPostForm(forms.ModelForm):
    class Meta:
        model = JobPost
        fields = ['created_by','title','position','main_mission','required_skills','main_activity','pieces_jointes']

class UpdateJobPostForm(forms.ModelForm):
    class Meta:
        model = JobPost
        fields = ['updated_by','title','position','main_mission','required_skills','main_activity','pieces_jointes']

#Responsable Formation

class CreateResponsableFormation(forms.ModelForm):
    class Meta:
        model = ResponsableFormation
        fields = ['created_by','nom','prenom','username','email','pieces_jointes']

class UpdateResponsableFormation(forms.ModelForm):
    class Meta:
        model = ResponsableFormation
        fields = ['updated_by','nom','prenom','username','email','pieces_jointes']

#Participant

class CreateParticipant(forms.ModelForm):
    class Meta:
        model = Participant
        fields = ['created_by','nom','prenom','username','email','pieces_jointes']

class UpdateParticipant(forms.ModelForm):
    class Meta:
        model = Participant
        fields = ['updated_by','nom','prenom','username','email','pieces_jointes']

#Employe

class CreateEmploye(forms.ModelForm):
    class Meta:
        model = Employe
        fields = ['created_by','nom','prenom','username','email','pieces_jointes','participant']

class UpdateEmploye(forms.ModelForm):
    class Meta:
        model = Employe
        fields = ['updated_by','nom','prenom','username','email','pieces_jointes','participant']

#Department
        
class CreateDepartment(forms.ModelForm):
    class Meta:
        model = Department
        fields = ['name','created_by']

class UpdateDepartment(forms.ModelForm):
    class Meta:
        model = Department
        fields = ['name','updated_by']

#Fiche Employe
        
class CreateFicheEmploye(forms.ModelForm):
    class Meta:
        model = FicheEmployee
        fields = ['created_by','job_position','work_mobile','work_phone','work_email','department','manager','coach','work_address','work_location','address','working_hours','timezone_field','bank_account_number','home_work_distance','martial_status','emergency_contact','emergency_phone','certificate_level','field_of_study','school','cnss','cin','pieces_jointes','employe_concerne']

class UpdateFicheEmploye(forms.ModelForm):
    class Meta:
        model = FicheEmployee
        fields = ['updated_by','job_position','work_mobile','work_phone','work_email','department','manager','coach','work_address','work_location','address','working_hours','timezone_field','bank_account_number','home_work_distance','martial_status','emergency_contact','emergency_phone','certificate_level','field_of_study','school','cnss','cin','pieces_jointes','employe_concerne']

#Formation
        
class CreateFormation(forms.ModelForm):
    class Meta:
        model = Formation
        fields = ['created_by','intitule_formation','type_formation','organisme_formation','theme_formation','date_debut_formation','date_fin_formation','responsable_validation','participants','pieces_jointes','parametre_validation','date_cloture_formation']

class UpdateFormation(forms.ModelForm):
    class Meta:
        model = Formation
        fields = ['updated_by','intitule_formation','type_formation','organisme_formation','theme_formation','date_debut_formation','date_fin_formation','responsable_validation','participants','pieces_jointes','parametre_validation','date_cloture_formation']

#Evaluation chaud
        
class CreateEvaluationChaud(forms.ModelForm):
    class Meta:
        model = EvaluationChaud
        fields = ['created_by','formation','date_realisation','criteres','coefficients','pieces_jointes','participant']

class UpdateEvaluationChaud(forms.ModelForm):
    class Meta:
        model = EvaluationChaud
        fields = ['updated_by','formation','date_realisation','criteres','coefficients','pieces_jointes','participant']

#Evaluation Froid
        
class CreateEvaluationFroid(forms.ModelForm):
    class Meta:
        model = EvaluationFroid
        fields = ['created_by','formation','date_realisation','criteres','coefficients','pieces_jointes','responsable_formation']

class UpdateEvaluationFroid(forms.ModelForm):
    class Meta:
        model = EvaluationFroid
        fields = ['updated_by','formation','date_realisation','criteres','coefficients','pieces_jointes','responsable_formation']

#Competence
        
class CreateCompetence(forms.ModelForm):
    class Meta:
        model = Competence
        fields = ['created_by','nom','niveau_requis']

class UpdateCompetence(forms.ModelForm):
    class Meta:
        model = Competence
        fields = ['updated_by','nom','niveau_requis']

#Evaluation Competences

class CreateEvaluationCompetence(forms.ModelForm):
    class Meta:
        model = EvaluationCompetence
        fields = ['created_by','competence','niveau_acquis','commentaires','pieces_jointes']

class UpdateEvaluationCompetence(forms.ModelForm):
    class Meta:
        model = EvaluationCompetence
        fields = ['updated_by','competence','niveau_acquis','commentaires','pieces_jointes']
