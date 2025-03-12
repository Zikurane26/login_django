# Generated by Django 5.1.7 on 2025-03-12 17:35

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Beneficiarios',
            fields=[
                ('cedula', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=50)),
                ('direccion', models.CharField(max_length=50)),
                ('poblacion', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'Beneficiarios',
            },
        ),
        migrations.CreateModel(
            name='Usuarios',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nombreUsuario', models.CharField(max_length=50, unique=True)),
                ('contraseña', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'Usuarios',
            },
        ),
        migrations.CreateModel(
            name='Chalecos',
            fields=[
                ('serial', models.AutoField(primary_key=True, serialize=False)),
                ('beneficiario_cedula', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='loginapp.beneficiarios')),
            ],
            options={
                'db_table': 'Chalecos',
            },
        ),
    ]
