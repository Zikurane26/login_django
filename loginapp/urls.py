from django.urls import path

from .views import (
    BeneficiarioListCreateView, 
    ChalecoListCreateView, 
    BeneficiarioByCedulaView, 
    BeneficiarioByNombreView,
    BeneficiarioConChalecosPorCedulaView,
    BeneficiarioConChalecosPorNombreView,
    LoginView
)

urlpatterns = [
    path('beneficiarios/', BeneficiarioListCreateView.as_view(), name='beneficiario-list-create'),
    path('chalecos/', ChalecoListCreateView.as_view(), name='chaleco-list-create'),
    path('beneficiarios/cedula/<int:cedula>/', BeneficiarioByCedulaView.as_view(), name='beneficiario-by-cedula'),
    path('beneficiarios/nombre/<str:nombre>/', BeneficiarioByNombreView.as_view(), name='beneficiario-by-nombre'),
    path("login/", LoginView.as_view(), name="login"),
    path('beneficiarios-con-chalecos/cedula/<int:cedula>/', BeneficiarioConChalecosPorCedulaView.as_view(), name='beneficiario-chalecos-cedula'),
    path('beneficiarios-con-chalecos/nombre/<str:nombre>/', BeneficiarioConChalecosPorNombreView.as_view(), name='beneficiario-chalecos-nombre'),

]
