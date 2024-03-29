from django.shortcuts import render,redirect,get_list_or_404
from django.views.generic import ListView, CreateView, UpdateView, DeleteView,DetailView
from .forms import *
from django.urls import reverse
from django.contrib.auth.models import auth
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required

from .models import JobPost

def home(request):
    
    return render(request,'RH/index.html')

def register(request):
    form = CreateUserForm()

    if request.method == "POST":
        form = CreateUserForm(request.POST)

        if form.is_valid():
            form.save()

            return redirect('login')

    context = {'form':form}

    return render(request,'RH/register.html',context=context)


def login(request):
    form = LoginForm()

    if request.method == "POST":
        form = LoginForm(request,data=request.POST)

        if form.is_valid():
            username = request.POST.get('username')
            password = request.POST.get('password')

            user = authenticate(request,username=username,password=password)

            if user is not None:
                auth.login(request,user)
                return redirect('home')

    context = {'form':form}
    return render(request,'RH/login.html', context=context)


def logout(request):
    auth.logout(request)
    return redirect('login')

@login_required(login_url='login')

def index(request):
    return render(request,'RH/home.html')


@login_required(login_url='login')

def dashboard(request):

    post = JobPost.objects.all()
    context = {'posts': post}


    return render(request,'RH/dashboard.html',context=context)

@login_required(login_url='login')

def create_jobpost(request):
    form = CreateJobPostForm()

    if request.method =="POST":
        form = CreateJobPostForm(request.POST)

        if form.is_valid():
            form.save()
            return redirect("dashboard")
    context = {'form':form}

    return render(request,'RH/create.html',context=context)

@login_required(login_url='login')
def update_jobpost(request,pk):
    jobpost = JobPost.objects.get(id=pk)

    form = UpdateJobPostForm(instance=jobpost)

    if request.method =='POST':
        form = UpdateJobPostForm(request.POST,instance=jobpost)

        if form.is_valid():
            form.save()
            return redirect("dashboard")
        
    context = {'form':form}

    return render(request,'RH/update.html',context=context)

@login_required(login_url='login')
def singular_jobpost(request,pk):

    all_jobpost = JobPost.objects.get(id=pk)

    context = {"jobpost":all_jobpost}

    return render(request,'RH/view.html',context=context)

@login_required(login_url='login')
def delete_jobpost(request,pk):
    jobpost = JobPost.objects.get(id=pk)

    jobpost.delete()

    return redirect("dashboard")



@login_required(login_url='login')

def dashboard_responsable(request):

    responsable = ResponsableFormation.objects.all()
    context = {'responsables': responsable}


    return render(request,'ResponsableFormation/dashboard.html',context=context)

@login_required(login_url='login')

def create_responsable(request):
    form = CreateResponsableFormation()

    if request.method =="POST":
        form = CreateResponsableFormation(request.POST)

        if form.is_valid():
            form.save()
            return redirect("dashboard_responsable")
    context = {'form':form}

    return render(request,'ResponsableFormation/create.html',context=context)

@login_required(login_url='login')
def update_responsable(request,pk):
    responsable = ResponsableFormation.objects.get(id=pk)

    form = UpdateResponsableFormation(instance=responsable)

    if request.method =='POST':
        form = UpdateResponsableFormation(request.POST,instance=responsable)

        if form.is_valid():
            form.save()
            return redirect("dashboard_responsable")
        
    context = {'form':form}

    return render(request,'ResponsableFormation/update.html',context=context)

@login_required(login_url='login')
def singular_responsable(request,pk):

    responsables = ResponsableFormation.objects.get(id=pk)

    context = {"responsable":responsables}

    return render(request,'ResponsableFormation/view.html',context=context)

@login_required(login_url='login')
def delete_responsable(request,pk):
    responsable = ResponsableFormation.objects.get(id=pk)

    responsable.delete()

    return redirect("dashboard_responsable")

#Participant : 


class DashboardParticipantView(ListView):
    model = Participant
    template_name = 'Participant/dashboard.html'
    context_object_name = 'participants'

class CreateParticipantView(CreateView):
    model = Participant
    form_class = CreateParticipant
    template_name = 'Participant/create.html'
    
    def get_success_url(self):
        return reverse('dashboard_participant')

class UpdateParticipantView(UpdateView):
    model = Participant
    form_class = UpdateParticipant
    template_name = 'Participant/update.html'
    context_object_name = 'participant'

    def get_success_url(self):
        return reverse('dashboard_participant')

class ViewParticipantView(DetailView):
    model = Participant
    template_name = 'Participant/view.html'
    context_object_name = 'participant'

class DeleteParticipantView(DeleteView):
    model = Participant
    success_url = '/dashboard_participant/'
    template_name = 'Participant/delete.html'

#Employe


class DashboardEmployeView(ListView):
    model = Employe
    template_name = 'Employe/dashboard.html'
    context_object_name = 'employes'

class CreateEmployeView(CreateView):
    model = Employe
    form_class = CreateEmploye
    template_name = 'Employe/create.html'
    
    def get_success_url(self):
        return reverse('dashboard_employe')

class UpdateEmployeView(UpdateView):
    model = Employe
    form_class = UpdateEmploye
    template_name = 'Employe/update.html'
    context_object_name = 'employe'

    def get_success_url(self):
        return reverse('dashboard_employe')

class ViewEmployeView(DetailView):
    model = Employe
    template_name = 'Employe/view.html'
    context_object_name = 'employe'

class DeleteEmployeView(DeleteView):
    model = Employe
    success_url = '/dashboard_employe/'
    template_name = 'Employe/delete.html'

#Department
    
class DashboardDepartmentView(ListView):
    model = Department
    template_name = 'Department/dashboard.html'
    context_object_name = 'departments'

class CreateDepartmentView(CreateView):
    model = Department
    form_class = CreateDepartment
    template_name = 'Department/create.html'
    
    def get_success_url(self):
        return reverse('dashboard_department')

class UpdateDepartmentView(UpdateView):
    model = Department
    form_class = UpdateDepartment
    template_name = 'Department/update.html'
    context_object_name = 'department'

    def get_success_url(self):
        return reverse('dashboard_department')

class ViewDepartmentView(DetailView):
    model = Department
    template_name = 'Department/view.html'
    context_object_name = 'department'

class DeleteDepartmentView(DeleteView):
    model = Department
    success_url = '/dashboard_department/'
    template_name = 'Department/delete.html'

#Fiche Employe
    
class DashboardFicheEmployeView(ListView):
    model = FicheEmployee
    template_name = 'FicheEmploye/dashboard.html'
    context_object_name = 'fiche_employes'

class CreateFicheEmployeView(CreateView):
    model = FicheEmployee
    form_class = CreateFicheEmploye
    template_name = 'FicheEmploye/create.html'
    
    def get_success_url(self):
        return reverse('dashboard_fiche_employe')

class UpdateFicheEmployeView(UpdateView):
    model = FicheEmployee
    form_class = UpdateFicheEmploye
    template_name = 'FicheEmploye/update.html'
    context_object_name = 'fiche_employe'

    def get_success_url(self):
        return reverse('dashboard_fiche_employe')

class ViewFicheEmployeView(DetailView):
    model = FicheEmployee
    template_name = 'FicheEmploye/view.html'
    context_object_name = 'fiche_employe'

class DeleteFicheEmployeView(DeleteView):
    model = FicheEmployee
    success_url = '/dashboard_fiche_employe/'
    template_name = 'FicheEmploye/delete.html'

#Formation
    
class DashboardFormationView(ListView):
    model = Formation
    template_name = 'Formation/dashboard.html'
    context_object_name = 'formations'

class CreateFormationView(CreateView):
    model = Formation
    form_class = CreateFormation
    template_name = 'Formation/create.html'
    
    def get_success_url(self):
        return reverse('dashboard_formation')

class UpdateFormationView(UpdateView):
    model = Formation
    form_class = UpdateFormation
    template_name = 'Formation/update.html'
    context_object_name = 'formation'

    def get_success_url(self):
        return reverse('dashboard_formation')

class ViewFormationView(DetailView):
    model = Formation
    template_name = 'Formation/view.html'
    context_object_name = 'formation'

class DeleteFormationView(DeleteView):
    model = Formation
    success_url = '/dashboard_formation/'
    template_name = 'Formation/delete.html'

#Evaluation Froid
    
class DashboardEvaluationFroidView(ListView):
    model = EvaluationFroid
    template_name = 'EvaluationFroid/dashboard.html'
    context_object_name = 'froids'

class CreateEvaluationFroidView(CreateView):
    model = EvaluationFroid
    form_class = CreateEvaluationFroid
    template_name = 'EvaluationFroid/create.html'
    
    def get_success_url(self):
        return reverse('dashboard_evaluation_froid')

class UpdateEvaluationFroidView(UpdateView):
    model = EvaluationFroid
    form_class = UpdateEvaluationFroid
    template_name = 'EvaluationFroid/update.html'
    context_object_name = 'froid'

    def get_success_url(self):
        return reverse('dashboard_evaluation_froid')

class ViewEvaluationFroidView(DetailView):
    model = EvaluationFroid
    template_name = 'EvaluationFroid/view.html'
    context_object_name = 'froid'

class DeleteEvaluationFroidView(DeleteView):
    model = EvaluationFroid
    success_url = '/dashboard_evaluation_froid/'
    template_name = 'EvaluationFroid/delete.html'

#Evaluation Chaud
    
class DashboardEvaluationChaudView(ListView):
    model = EvaluationChaud
    template_name = 'EvaluationChaud/dashboard.html'
    context_object_name = 'chauds'

class CreateEvaluationChaudView(CreateView):
    model = EvaluationChaud
    form_class = CreateEvaluationChaud
    template_name = 'EvaluationChaud/create.html'
    
    def get_success_url(self):
        return reverse('dashboard_evaluation_chaud')

class UpdateEvaluationChaudView(UpdateView):
    model = EvaluationChaud
    form_class = UpdateEvaluationChaud
    template_name = 'EvaluationChaud/update.html'
    context_object_name = 'chaud'

    def get_success_url(self):
        return reverse('dashboard_evaluation_chaud')

class ViewEvaluationChaudView(DetailView):
    model = EvaluationChaud
    template_name = 'EvaluationChaud/view.html'
    context_object_name = 'chaud'

class DeleteEvaluationChaudView(DeleteView):
    model = EvaluationChaud
    success_url = '/dashboard_evaluation_chaud/'
    template_name = 'EvaluationChaud/delete.html'

#Competence
    
class DashboardCompetenceView(ListView):
    model = Competence
    template_name = 'Competence/dashboard.html'
    context_object_name = 'competences'

class CreateCompetenceView(CreateView):
    model = Competence
    form_class = CreateCompetence
    template_name = 'Competence/create.html'
    
    def get_success_url(self):
        return reverse('dashboard_competence')

class UpdateCompetenceView(UpdateView):
    model = Competence
    form_class = UpdateCompetence
    template_name = 'Competence/update.html'
    context_object_name = 'competence'

    def get_success_url(self):
        return reverse('dashboard_competence')

class ViewCompetenceView(DetailView):
    model = Competence
    template_name = 'Competence/view.html'
    context_object_name = 'competence'

class DeleteCompetenceView(DeleteView):
    model = Competence
    success_url = '/dashboard_competence/'
    template_name = 'Competence/delete.html'

#Evaluation Competence
    
class DashboardEvaluationCompetenceView(ListView):
    model = EvaluationCompetence
    template_name = 'EvaluationCompetence/dashboard.html'
    context_object_name = 'evaluation_competences'

class CreateEvaluationCompetenceView(CreateView):
    model = EvaluationCompetence
    form_class = CreateEvaluationCompetence
    template_name = 'EvaluationCompetence/create.html'
    
    def get_success_url(self):
        return reverse('dashboard_evaluation_competence')

class UpdateEvaluationCompetenceView(UpdateView):
    model = EvaluationCompetence
    form_class = UpdateEvaluationCompetence
    template_name = 'EvaluationCompetence/update.html'
    context_object_name = 'evaluation_competence'

    def get_success_url(self):
        return reverse('dashboard_evaluation_competence')

class ViewEvaluationCompetenceView(DetailView):
    model = EvaluationCompetence
    template_name = 'EvaluationCompetence/view.html'
    context_object_name = 'evaluation_competence'

class DeleteEvaluationCompetenceView(DeleteView):
    model = EvaluationCompetence
    success_url = '/dashboard_evaluation_competence/'
    template_name = 'EvaluationCompetence/delete.html'