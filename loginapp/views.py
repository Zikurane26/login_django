from django.contrib.auth.hashers import check_password
from rest_framework import generics, status
from rest_framework.generics import RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Beneficiarios, Chalecos, Usuarios
from .serializers import BeneficiariosSerializer, ChalecosSerializer, BeneficiarioConChalecosSerializer

# Crear y listar beneficiarios
class BeneficiarioListCreateView(generics.ListCreateAPIView):
    queryset = Beneficiarios.objects.all()
    serializer_class = BeneficiariosSerializer

# Crear y listar chalecos
class ChalecoListCreateView(generics.ListCreateAPIView):
    queryset = Chalecos.objects.all()
    serializer_class = ChalecosSerializer

# Filtrar beneficiarios por cédula
class BeneficiarioByCedulaView(generics.ListAPIView):
    serializer_class = BeneficiariosSerializer

    def get_queryset(self):
        cedula = self.kwargs['cedula']
        return Beneficiarios.objects.filter(cedula=cedula)

# Filtrar beneficiarios por nombre
class BeneficiarioByNombreView(generics.ListAPIView):
    serializer_class = BeneficiariosSerializer

    def get_queryset(self):
        nombre = self.kwargs['nombre']
        return Beneficiarios.objects.filter(nombre__icontains=nombre)
    
class BeneficiarioConChalecosPorCedulaView(RetrieveAPIView):
    queryset = Beneficiarios.objects.all()
    serializer_class = BeneficiarioConChalecosSerializer
    lookup_field = 'cedula'

class BeneficiarioConChalecosPorNombreView(RetrieveAPIView):
    queryset = Beneficiarios.objects.all()
    serializer_class = BeneficiarioConChalecosSerializer
    lookup_field = 'nombre'

class LoginView(APIView):
    def post(self, request):
        nombre_usuario = request.data.get("nombreUsuario")
        contraseña = request.data.get("contraseña")

        try:
            usuario = Usuarios.objects.get(nombreUsuario=nombre_usuario)
        except Usuarios.DoesNotExist:
            return Response({"error": "Usuario no encontrado"}, status=404)

        if usuario.contraseña == contraseña:  
            return Response({"mensaje": "Login exitoso"}, status=200)
        else:
            return Response({"error": "Contraseña incorrecta"}, status=401)