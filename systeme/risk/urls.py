from django.urls import path
from .views import RisqueListCreateAPIView, RisqueRetrieveUpdateDestroyAPIView, CritereEvaluationListCreateAPIView, CritereEvaluationRetrieveUpdateDestroyAPIView,get_piece_jointe_risk

urlpatterns = [

    path('pieces_jointes_risk/<int:risk_id>/', get_piece_jointe_risk, name='pieces_jointes_risk'),
    path('risques/', RisqueListCreateAPIView.as_view(), name='liste_risques'),
    path('risques/<int:id>/', RisqueRetrieveUpdateDestroyAPIView.as_view(), name='detail_risque'),
    path('risques/<int:risque_id>/criteres/', CritereEvaluationListCreateAPIView.as_view(), name='liste_criteres'),
    path('criteres/<int:id>/', CritereEvaluationRetrieveUpdateDestroyAPIView.as_view(), name='detail_critere'),
]
