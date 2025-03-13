----------------------------------------------------------
            PROYECTO: Sistema de Gestión UNP
----------------------------------------------------------

DESCRIPCIÓN GENERAL:
--------------------
Este proyecto integra un backend desarrollado en Django y un frontend en React (utilizando Vite) para gestionar la información de 
beneficiarios y chalecos, además de implementar autenticación de usuarios. La aplicación permite:

  • Autenticación de usuarios: Solo se puede acceder a las funcionalidades del sistema si el usuario se encuentra registrado en la 
    tabla "Usuarios". 
  • CRUD de Beneficiarios: Crear, listar, actualizar y eliminar beneficiarios.
  • CRUD de Chalecos: Crear, listar, actualizar y eliminar chalecos, los cuales están asociados a un beneficiario a través de 
    una clave foránea.
  • Filtrado de Chalecos: Permite filtrar la cantidad de chalecos asociados a un beneficiario, ya sea por cédula o por nombre.

ARQUITECTURA:
-------------
- **Backend (Django):**
  - Base de datos SQLite (modo desarrollo) o PostgreSQL.
  - Modelos:
      • Usuarios: Define el usuario con campos id, nombreUsuario y contraseña.
      • Beneficiarios: Define el beneficiario con campos cedula, nombre, direccion y poblacion.
      • Chalecos: Relaciona los chalecos a beneficiarios mediante la clave foránea "beneficiario_cedula".
  - Vistas y Endpoints:
      • API REST desarrollada con Django REST Framework para operaciones CRUD en Beneficiarios y Chalecos.
      • Endpoints adicionales para filtrar beneficiarios (por cédula o nombre) e incluir la cantidad de chalecos.
      • Endpoint de login que valida credenciales contra la tabla "Usuarios".
  - Consideraciones de seguridad:
      • Se configuró CORS mediante `django-cors-headers` para permitir solicitudes desde el frontend.

- **Frontend (React con Vite):**
  - Componentes principales:
      • Login: Permite autenticarse y, al hacerlo, guarda el estado en localStorage para mantener la sesión.
      • BeneficiariosCRUD: Interfaz para crear y listar beneficiarios.
      • ChalecosCRUD: Interfaz para crear y listar chalecos asociados.
      • FiltrarChalecos: Permite buscar beneficiarios y mostrar la cantidad y detalles de los chalecos asociados.
  - Navegación:
      • Se implementó un menú de navegación (con enlaces) en la parte superior de la aplicación para cambiar entre 
        BeneficiariosCRUD, ChalecosCRUD y FiltrarChalecos sin perder la sesión.

OBSERVACIONES PERTINENTES:
---------------------------
1. **Autenticación y Sesión:**
   - La sesión se mantiene utilizando localStorage, permitiendo que el estado de autenticación no se pierda al cambiar de 
     ventana o recargar la página.
   - Se implementó un endpoint de login en Django, y se adaptó el componente Login en React para consumirlo.

2. **Gestión de Datos:**
   - Los modelos están relacionados de forma que cada chaleco se asocia a un beneficiario mediante la clave foránea "beneficiario_cedula".
   - Se crearon endpoints específicos para obtener beneficiarios con sus chalecos, permitiendo un filtrado eficaz por cédula o nombre.
   - Se implementaron serializers personalizados para incluir en la respuesta la lista (o conteo) de chalecos asociados.

3. **Interfaz de Usuario:**
   - La UI se adapta a los colores y estilo institucional
   - Se incorporó un menú de navegación en la parte superior para cambiar entre las distintas secciones sin afectar la sesión 
     del usuario.

4. **Integración y Mantenimiento:**
   - Se actualizó la nomenclatura de importaciones para alinear la aplicación con las nuevas rutas de la librería, sin alterar 
     la funcionalidad.
   - Se realizaron pruebas con Postman y en el navegador para garantizar que todos los endpoints funcionen correctamente.
   - Se contemplaron medidas para la seguridad de la API, como la correcta configuración de CORS y la recomendación de encriptar 
     contraseñas.

CONCLUSIÓN:
-----------
Este sistema integra una solución completa para la gestión de beneficiarios y chalecos, con un backend robusto en Django y 
un frontend moderno en React que sigue las pautas de la entidad. Se han implementado mecanismos de autenticación, 
filtrado, y una interfaz amigable que respeta la identidad institucional, permitiendo así una administración centralizada 
y segura de la información.

----------------------------------------------------------
