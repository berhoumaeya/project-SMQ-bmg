from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils.decorators import method_decorator
from django.shortcuts import get_object_or_404
from rest_framework import status
from produit.models import NonConformite
from produit.serializers import NonConformiteSerializer
from .serializers import ClientSerializer,ReclamationClientSerializer,EnqueteSerializer,SuggestionClientSerializer
from .models import*
from django.http import FileResponse
from django.contrib.auth.decorators import login_required

def get_piece_jointe_client(request, client_id):
    client = get_object_or_404(Client, id=client_id)
    piece_jointe_path = client.pieces_jointes.path
    return FileResponse(open(piece_jointe_path, 'rb'), content_type='application/pdf')

def get_piece_jointe_reclamation_client(request, client_id):
    client = get_object_or_404(ReclamationClient, id=client_id)
    piece_jointe_path = client.reclamation_fournisseur.path
    return FileResponse(open(piece_jointe_path, 'rb'), content_type='application/pdf')

def get_piece_jointe_plan_action(request, client_id):
    client = get_object_or_404(ReclamationClient, id=client_id)
    piece_jointe_path = client.plan_action.path
    return FileResponse(open(piece_jointe_path, 'rb'), content_type='application/pdf')

def get_piece_jointe_pdf(request, client_id):
    client = get_object_or_404(ReclamationClient, id=client_id)
    piece_jointe_path = client.fichier_pdf.path
    return FileResponse(open(piece_jointe_path, 'rb'), content_type='application/pdf')

def get_piece_jointe_enquete_client(request, client_id):
    client = get_object_or_404(ClientEnquete, id=client_id)
    piece_jointe_path = client.pieces_jointes.path
    return FileResponse(open(piece_jointe_path, 'rb'), content_type='application/pdf')

def get_piece_jointe_suggestion_client(request, client_id):
    client = get_object_or_404(SuggestionClient, id=client_id)
    piece_jointe_path = client.pieces_jointes.path
    return FileResponse(open(piece_jointe_path, 'rb'), content_type='application/pdf')


# Afficher un client

@method_decorator(login_required(login_url='login'), name='dispatch')
class SingularClientAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request,pk):
        client = get_object_or_404(Client, pk=pk)
        created_by_name = client.created_by.first_name if client.created_by else None
        updated_by_name = client.updated_by.first_name if client.updated_by else None
        created_at_str = client.created_at.strftime('%Y-%m-%d %H:%M:%S') if client.created_at else None
        updated_at_str = client.updated_at.strftime('%Y-%m-%d %H:%M:%S') if client.updated_at else None
        client_data = {
                'id' : client.id,
                'nom' : client.nom,
                'code_client' : client.code_client,
                'raison_sociale' : client.raison_sociale,
                'type_client':client.type_client,
                'categorie':client.categorie,
                'activite': client.activite,
                'pieces_jointes':client.pieces_jointes.url if client.pieces_jointes else None,
                'created_by': created_by_name,
                'updated_by': updated_by_name,
                'created_at': created_at_str,
                'updated_at': updated_at_str,
            }
        return Response(client_data, status=status.HTTP_200_OK)

# Ajouter un client
@method_decorator(login_required(login_url='login'), name='dispatch')
class CreateClientAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ClientSerializer(data=request.data)
        if serializer.is_valid():
            created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['created_at'] = created_at
            serializer.save(created_by=request.user)
            client_data = serializer.data
            client_data['created_by'] = request.user.first_name
            client_data['created_at'] = created_at
            client_data['id'] = serializer.instance.id 
            return Response(client_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Modifier un client
@method_decorator(login_required(login_url='login'), name='dispatch')
class UpdateClientAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        client = get_object_or_404(Client, pk=pk)
        serializer = ClientSerializer(client, data=request.data)
        if serializer.is_valid():
            updated_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['updated_at'] = updated_at
            serializer.save(updated_by=request.user)
            client_data = serializer.data
            client_data['updated_by'] = request.user.first_name
            client_data['updated_at'] = updated_at
            return Response(client_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Afficher tous clients
@method_decorator(login_required(login_url='login'), name='dispatch')
class DashboardClientAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        clients = Client.objects.all()
        data = []
        for client in clients:
            doc_data = {
                'id' : client.id,
                'nom' : client.nom,
                'code_client' : client.code_client,
            }
            data.append(doc_data)
        return Response(data, status=status.HTTP_200_OK)

# Supprimer un client
@method_decorator(login_required(login_url='login'), name='dispatch')
class DeleteClientAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        client = get_object_or_404(Client, pk=pk)
        client.delete()
        return Response({"message": "Le client a été supprimé avec succès"}, status=status.HTTP_204_NO_CONTENT)
    

# Afficher toutes les réclamations clients
@method_decorator(login_required(login_url='login'), name='dispatch')
class DashboardReclamationClientAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, client_id):
        client = get_object_or_404(Client, pk=client_id)
        reclamations = ReclamationClient.objects.filter(client=client)
        data = []

        for reclamation in reclamations:
            created_by_name = reclamation.created_by.first_name if reclamation.created_by else None
            updated_by_name = reclamation.updated_by.first_name if reclamation.updated_by else None
            created_at_str = reclamation.created_at.strftime('%Y-%m-%d %H:%M:%S') if reclamation.created_at else None
            updated_at_str = reclamation.updated_at.strftime('%Y-%m-%d %H:%M:%S') if reclamation.updated_at else None
            responsable_traitement_name = reclamation.responsable_traitement.first_name if reclamation.responsable_traitement else None
            reclamation_data = {
                'id': reclamation.id,
                'code': reclamation.code,
                'description': reclamation.description,
                'type_reclamation': reclamation.type_reclamation,
                'date_livraison': reclamation.date_livraison,
                'gravite': reclamation.gravite,
                'responsable_traitement': responsable_traitement_name,
                'decisions': reclamation.decisions,
                'reclamation_fournisseur': reclamation.reclamation_fournisseur.url if reclamation.reclamation_fournisseur else None,
                'plan_action': reclamation.plan_action.url if reclamation.plan_action else None,
                'fichier_pdf': reclamation.fichier_pdf.url if reclamation.fichier_pdf else None,
                'declencher_plan_action':reclamation.declencher_plan_action,
                'created_by': created_by_name,
                'updated_by': updated_by_name,
                'created_at': created_at_str,
                'updated_at': updated_at_str,
            }

            if reclamation.declencher_plan_action:
                non_conformite = NonConformite.objects.filter(reclamation_client=reclamation).first()
                if non_conformite:
                    personnes_a_notifier_names = [user.first_name for user in non_conformite.personnes_a_notifier.all()]
                    reclamation_data.update({
                        'date_detection': non_conformite.date_detection.strftime('%Y-%m-%d') if non_conformite.date_detection else None,
                        'designation_produit_non_conforme': non_conformite.designation_produit_non_conforme,
                        'description_non_conformite': non_conformite.description_non_conformite,
                        'produits_non_conformes': non_conformite.produits_non_conformes.nom,
                        'type_non_conformite': non_conformite.type_non_conformite,
                        'source_non_conformite': non_conformite.source_non_conformite,
                        'niveau_gravite': non_conformite.niveau_gravite,
                        'pieces_jointes': non_conformite.pieces_jointes.url if non_conformite.pieces_jointes else None,
                        'personnes_a_notifier': personnes_a_notifier_names,
                    })

            data.append(reclamation_data)

        return Response(data, status=status.HTTP_200_OK)

# Ajouter une réclamation client
@method_decorator(login_required(login_url='login'), name='dispatch')
class CreateReclamationClientAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, client_id):
        client = get_object_or_404(Client, pk=client_id)
        serializer = ReclamationClientSerializer(data=request.data)

        if serializer.is_valid():
            created_at = timezone.now()
            serializer.validated_data['created_at'] = created_at

            reclamation  = serializer.save(created_by=request.user, client=client)
            reclamation_data = serializer.data
            reclamation_data['created_by'] = request.user.first_name
            reclamation_data['created_at'] = created_at.strftime('%Y-%m-%d %H:%M:%S')

            plan = serializer.validated_data.get('declencher_plan_action')
            if plan:
                request_data = request.data.copy()
                request_data['reclamation_client'] = reclamation.id

                serializer2 = NonConformiteSerializer(data=request_data)
                if serializer2.is_valid():
                    serializer2.validated_data['created_at'] = created_at
                    serializer2.save(created_by=request.user)
                else:
                    print("NonConformite errors:", serializer2.errors)
                    return Response(serializer2.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response(reclamation_data, status=status.HTTP_201_CREATED)
        
        print("ReclamationClient errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Modifier une réclamation client
@method_decorator(login_required(login_url='login'), name='dispatch')
class UpdateReclamationClientAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request,reclamation_id):
        reclamation = get_object_or_404(ReclamationClient, pk=reclamation_id)

        serializer = ReclamationClientSerializer(reclamation, data=request.data, partial=False)

        if serializer.is_valid():
            updated_at = timezone.now()
            serializer.validated_data['updated_at'] = updated_at

            reclamation = serializer.save(updated_by=request.user)
            reclamation_data = serializer.data
            reclamation_data['updated_by'] = request.user.first_name
            reclamation_data['updated_at'] = updated_at.strftime('%Y-%m-%d %H:%M:%S')

            plan = serializer.validated_data.get('declencher_plan_action')
            if plan:
                personnes_a_notifier = request.data.get('personnes_a_notifier', [])
                if isinstance(personnes_a_notifier, str):
                    # Assuming the string is a comma-separated list of user IDs
                    personnes_a_notifier = personnes_a_notifier.split(',')
                non_conformite_data = {
                    'date_detection': request.data.get('date_detection'),
                    'reclamation_client': reclamation.id,
                    'designation_produit_non_conforme': request.data.get('designation_produit_non_conforme'),
                    'description_non_conformite': request.data.get('description_non_conformite'),
                    'produits_non_conformes': request.data.get('produits_non_conformes'),
                    'type_non_conformite': request.data.get('type_non_conformite'),
                    'source_non_conformite': request.data.get('source_non_conformite'),
                    'niveau_gravite': request.data.get('niveau_gravite'),
                    'personnes_a_notifier': personnes_a_notifier,
                    'pieces_jointes': request.data.get('pieces_jointes'),
                }

                non_conformite = NonConformite.objects.filter(reclamation_client=reclamation).first()
                if non_conformite:
                    serializer2 = NonConformiteSerializer(non_conformite, data=non_conformite_data, partial=True)
                else:
                    serializer2 = NonConformiteSerializer(data=non_conformite_data)

                if serializer2.is_valid():
                    serializer2.validated_data['updated_at'] = updated_at
                    serializer2.save(updated_by=request.user)
                else:
                    print("NonConformite errors:", serializer2.errors)
                    return Response(serializer2.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response(reclamation_data, status=status.HTTP_200_OK)
        
        print("ReclamationClient errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Afficher une réclamation client
@method_decorator(login_required(login_url='login'), name='dispatch')
class SingularReclamationClientAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, reclamation_id):
            reclamation = get_object_or_404(ReclamationClient, pk=reclamation_id)
            non_conformite = NonConformite.objects.filter(reclamation_client=reclamation).first()
            created_by_name = reclamation.created_by.first_name if reclamation.created_by else None
            updated_by_name = reclamation.updated_by.first_name if reclamation.updated_by else None
            created_at_str = reclamation.created_at.strftime('%Y-%m-%d %H:%M:%S') if reclamation.created_at else None
            updated_at_str = reclamation.updated_at.strftime('%Y-%m-%d %H:%M:%S') if reclamation.updated_at else None
            responsable_traitement_name = reclamation.responsable_traitement.first_name if reclamation.responsable_traitement else None
            reclamation_data = {
                'client':reclamation.client.id,
                'id': reclamation.id,
                'code': reclamation.code,
                'description': reclamation.description,
                'type_reclamation': reclamation.type_reclamation,
                'date_livraison': reclamation.date_livraison,
                'gravite': reclamation.gravite,
                'responsable_traitement': responsable_traitement_name,
                'decisions': reclamation.decisions,
                'reclamation_fournisseur': reclamation.reclamation_fournisseur.url if reclamation.reclamation_fournisseur else None,
                'plan_action': reclamation.plan_action.url if reclamation.plan_action else None,
                'fichier_pdf': reclamation.fichier_pdf.url if reclamation.fichier_pdf else None,
                'declencher_plan_action':reclamation.declencher_plan_action,
                'created_by': created_by_name,
                'updated_by': updated_by_name,
                'created_at': created_at_str,
                'updated_at': updated_at_str,
            }

            if reclamation.declencher_plan_action:
                non_conformite = NonConformite.objects.filter(reclamation_client=reclamation).first()
                if non_conformite:
                    personnes_a_notifier_names = [user.first_name for user in non_conformite.personnes_a_notifier.all()]
                    reclamation_data.update({
                        'date_detection': non_conformite.date_detection.strftime('%Y-%m-%d') if non_conformite.date_detection else None,
                        'designation_produit_non_conforme': non_conformite.designation_produit_non_conforme,
                        'description_non_conformite': non_conformite.description_non_conformite,
                        'produits_non_conformes': non_conformite.produits_non_conformes.nom,
                        'type_non_conformite': non_conformite.type_non_conformite,
                        'source_non_conformite': non_conformite.source_non_conformite,
                        'niveau_gravite': non_conformite.niveau_gravite,
                        'pieces_jointes': non_conformite.pieces_jointes.url if non_conformite.pieces_jointes else None,
                        'personnes_a_notifier': personnes_a_notifier_names,
                    })

            return Response(reclamation_data, status=status.HTTP_200_OK)

# Supprimer une réclamation client
@method_decorator(login_required(login_url='login'), name='dispatch')
class DeleteReclamationClientAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        reclamation = get_object_or_404(ReclamationClient, pk=pk)
        reclamation.delete()
        return Response({"message": "La réclamation a été supprimée avec succès"}, status=status.HTTP_204_NO_CONTENT)
    
# Afficher toutes les enquêtes
@method_decorator(login_required(login_url='login'), name='dispatch')
class DashboardEnqueteAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        enquetes = ClientEnquete.objects.all()
        data = []
        for enquete in enquetes:
            created_by_name = enquete.created_by.first_name 
            updated_by_name = enquete.updated_by.first_name if enquete.updated_by else None
            created_at_str = enquete.created_at.strftime('%Y-%m-%d %H:%M:%S') 
            updated_at_str = enquete.updated_at.strftime('%Y-%m-%d %H:%M:%S') if enquete.updated_at else None
            enquete_data = {
                'id': enquete.id,
                'name_enquete': enquete.name_enquete,
                'date_debut': enquete.date_debut,
                'date_fin': enquete.date_fin,
                'type_questionnaire': enquete.type_questionnaire,
                'clients': [client.nom for client in enquete.clients.all()],
                'pieces_jointes': enquete.pieces_jointes.url if enquete.pieces_jointes else None ,
                'created_by': created_by_name,
                'updated_by': updated_by_name,
                'created_at': created_at_str,
                'updated_at': updated_at_str,
            }
            data.append(enquete_data)
        return Response(data, status=status.HTTP_200_OK)

# Ajouter une enquête
@method_decorator(login_required(login_url='login'), name='dispatch')
class CreateEnqueteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = EnqueteSerializer(data=request.data)
        if serializer.is_valid():
            created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['created_at'] = created_at
            serializer.save(created_by=request.user)
            enquete_data = serializer.data
            enquete_data['created_by'] = request.user.first_name
            enquete_data['created_at'] = created_at
            return Response(enquete_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Modifier une enquête
@method_decorator(login_required(login_url='login'), name='dispatch')
class UpdateEnqueteAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        enquete = get_object_or_404(ClientEnquete, pk=pk)
        serializer = EnqueteSerializer(enquete, data=request.data)
        if serializer.is_valid():
            updated_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['updated_at'] = updated_at
            serializer.save(updated_by=request.user)
            enquete_data = serializer.data
            enquete_data['updated_by'] = request.user.first_name
            enquete_data['updated_at'] = updated_at
            return Response(enquete_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Afficher une enquête
@method_decorator(login_required(login_url='login'), name='dispatch')
class SingularEnqueteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        enquete = get_object_or_404(ClientEnquete, pk=pk)
        serializer = EnqueteSerializer(enquete)
        serialized_data = serializer.data
        serialized_data['created_by'] = enquete.created_by.first_name 
        serialized_data['updated_by'] = enquete.updated_by.first_name 
        serialized_data['created_at'] = enquete.created_at.strftime('%Y-%m-%d %H:%M:%S') if enquete.created_at else None
        serialized_data['updated_at'] = enquete.updated_at.strftime('%Y-%m-%d %H:%M:%S') if enquete.updated_at else None
        return Response(serialized_data)

# Supprimer une enquête
@method_decorator(login_required(login_url='login'), name='dispatch')
class DeleteEnqueteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        enquete = get_object_or_404(ClientEnquete, pk=pk)
        enquete.delete()
        return Response({"message": "L'enquête a été supprimée avec succès"}, status=status.HTTP_204_NO_CONTENT)


# Afficher toutes les suggestions clients
@method_decorator(login_required(login_url='login'), name='dispatch')
class DashboardSuggestionAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request,client_id):
        client = get_object_or_404(Client, pk=client_id)
        suggestions = SuggestionClient.objects.filter(client=client)
        data = []
        for suggestion in suggestions:
            created_by_name = suggestion.created_by.first_name if suggestion.created_by else None
            updated_by_name = suggestion.updated_by.first_name if suggestion.updated_by else None
            created_at_str = suggestion.created_at.strftime('%Y-%m-%d %H:%M:%S') if suggestion.created_at else None
            updated_at_str = suggestion.updated_at.strftime('%Y-%m-%d %H:%M:%S') if suggestion.updated_at else None
            suggestion_data = {
                'id': suggestion.id,  
                'name': suggestion.name,
                'date': suggestion.date,
                'type_suggestion': suggestion.type_suggestion,
                'receptionnaire': suggestion.receptionnaire.first_name if suggestion.receptionnaire else None,
                'description': suggestion.description,
                'actions': suggestion.actions,
                'pieces_jointes': suggestion.pieces_jointes.url if suggestion.pieces_jointes else None ,
                'created_by': created_by_name,
                'updated_by': updated_by_name,
                'created_at': created_at_str,
                'updated_at': updated_at_str,
            }
            data.append(suggestion_data)
        return Response(data, status=status.HTTP_200_OK)

# Ajouter une suggestion client
@method_decorator(login_required(login_url='login'), name='dispatch')
class CreateSuggestionAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request,client_id):
        client = get_object_or_404(Client, pk=client_id)
        serializer = SuggestionClientSerializer(data=request.data)
        if serializer.is_valid():
            created_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['created_at'] = created_at
            serializer.save(created_by=request.user,client=client)
            suggestion_data = serializer.data
            suggestion_data['created_by'] = request.user.first_name
            suggestion_data['created_at'] = created_at
            suggestion_data['id'] = serializer.instance.id 
            return Response(suggestion_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Modifier une suggestion client
@method_decorator(login_required(login_url='login'), name='dispatch')
class UpdateSuggestionAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        suggestion = get_object_or_404(SuggestionClient, pk=pk)
        serializer = SuggestionClientSerializer(suggestion, data=request.data)
        if serializer.is_valid():
            updated_at = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            serializer.validated_data['updated_at'] = updated_at
            serializer.save(updated_by=request.user)
            suggestion_data = serializer.data
            suggestion_data['updated_by'] = request.user.first_name
            suggestion_data['updated_at'] = updated_at
            return Response(suggestion_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Afficher une suggestion client
@method_decorator(login_required(login_url='login'), name='dispatch')
class SingularSuggestionAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        suggestion = get_object_or_404(SuggestionClient, pk=pk)
        serializer = SuggestionClientSerializer(suggestion)
        serialized_data = serializer.data
        serialized_data['created_by'] = suggestion.created_by.first_name 
        serialized_data['updated_by'] = suggestion.updated_by.first_name 
        serialized_data['created_at'] = suggestion.created_at.strftime('%Y-%m-%d %H:%M:%S') if suggestion.created_at else None
        serialized_data['updated_at'] = suggestion.updated_at.strftime('%Y-%m-%d %H:%M:%S') if suggestion.updated_at else None
        return Response(serialized_data)

# Supprimer une suggestion client
@method_decorator(login_required(login_url='login'), name='dispatch')
class DeleteSuggestionAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        suggestion = get_object_or_404(SuggestionClient, pk=pk)
        suggestion.delete()
        return Response({"message": "La suggestion a été supprimée avec succès"}, status=status.HTTP_204_NO_CONTENT)
    
class AllReclamationClient(APIView):
    def get(self, request):
        types_produits = ReclamationClient.objects.all()
        serializer = ReclamationClientSerializer(types_produits, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


