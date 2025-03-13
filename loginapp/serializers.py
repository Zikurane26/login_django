from rest_framework import serializers
from .models import Beneficiarios, Chalecos

class BeneficiariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Beneficiarios
        fields = '__all__'  

class ChalecosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chalecos
        fields = '__all__'

class BeneficiarioConChalecosSerializer(serializers.ModelSerializer):
    chalecos = serializers.SerializerMethodField()  
    class Meta:
        model = Beneficiarios
        fields = ['cedula', 'nombre', 'chalecos']

    def get_chalecos(self, obj):
        return Chalecos.objects.filter(beneficiario_cedula=obj).values_list('serial', flat=True)