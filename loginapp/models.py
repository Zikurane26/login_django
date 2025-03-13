from django.db import models

# Create your models here.

class Usuarios(models.Model):
    id = models.AutoField(primary_key=True)
    nombreUsuario = models.CharField(max_length=150, unique=True)
    contraseña = models.CharField(max_length=50)
    class Meta:
        db_table = "Usuarios"

class Beneficiarios(models.Model):
    cedula = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=50)
    direccion = models.CharField(max_length=50)
    poblacion = models.CharField(max_length=50)
    class Meta:
        db_table = "Beneficiarios"

class Chalecos(models.Model):
    serial = models.IntegerField(primary_key=True)
    beneficiario_cedula = models.ForeignKey(Beneficiarios, on_delete=models.CASCADE)
    class Meta:
        db_table = "Chalecos"

    
