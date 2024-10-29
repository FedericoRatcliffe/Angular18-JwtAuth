# Proyecto Angular - Sistema de Autenticación

Este proyecto es una aplicación básica de autenticación en Angular que permite a los usuarios registrarse, iniciar sesión y acceder a áreas restringidas del sitio mediante protección con tokens. Implementa formularios reactivos, servicios de autenticación, guardias de ruta, interceptores HTTP y configuración de rutas.


## Tabla de Contenidos

- [Componentes](#componentes)
- [Servicios](#servicios)
- [Guard](#guard)
- [Interceptor](#interceptor)
- [Configuración](#configuración)



## Componentes

1. Login Component:

   ```bash
    #"LoginPageComponent"
        Componente que muestra la página de inicio de sesión (login). Permite al usuario ingresar su correo electrónico y contraseña y envía estos datos al servidor para autenticación.

        Código Principal: src/app/login-page/login-page.component.ts



    ##Propiedades y Métodos:
        formularioLogin: instancia de FormGroup que define el formulario de inicio de sesión.
    


    ## Constructor & Parámetros
        fb: FormBuilder para inicializar formularioLogin.
        enviarFormulario: Servicio SendInfoService para manejar la lógica de envío de datos de autenticación.
    
    
    
    ## Método onSubmit:

        # Descripción: 
        Verifica si el formulario es válido antes de enviar los datos al servidor.
    
        #Lógica:
        Si el formulario es válido, extrae los datos, los envía al servicio SendInfoService, y maneja posibles errores como el estado 401.
        
        # Errores manejados:
        401 Unauthorized: Redirige al usuario a la página de inicio de sesión y elimina el token.
        
        Otros errores: Notifica en consola el error.
    


    ##Dependencias:

    ReactiveFormsModule: Módulo de Angular para el manejo de formularios reactivos.
    ```



## Servicios
1. SendInfoService:

   ```bash
    #"SendInfoService"
        Servicio que gestiona la comunicación con el servidor para los procesos de autenticación, el estado de sesión y el control del token en localStorage.

        Código Principal: src/app/services/send-info.service.ts

    ## Metodos
    
        #enviarRegistro(data: any): Observable<any>: 
            Descripción: Envía los datos de registro al servidor (aunque parece estar en el endpoint de login en el ejemplo). 
    
    
        #enviarLogin(data: any): Observable<any>:
            Descripción: Envía los datos de inicio de sesión al servidor y guarda el token recibido en localStorage.
        
            Token: Almacena el token en localStorage bajo la clave token.
        

        #logout():
            Descripción: Elimina el token del localStorage, actualiza el estado de autenticación y redirige al usuario a la página de inicio de sesión.


    ## Metodos Privados
    
        #hasToken():
            Verifica si existe un token en localStorage.
    

        #validateToken(): 
            Decodifica y verifica si el token es válido y no ha expirado. Si está expirado o es inválido, elimina el token de localStorage.

    

    ## Observables

        #isLoggedIn:
            Observable que indica si el usuario está autenticado (emite true si el token es válido).

    ```


## Guard
1. authGuardGuard:

   ```bash
    #authGuardGuard
        Descripción: Guardia de ruta que controla el acceso a las rutas protegidas verificando la autenticación del usuario.
    
        Código Principal: src/app/guards/auth-guard.guard.ts



    ##Funcionamiento:

        #Verifica la existencia y validez del token en localStorage usando el servicio SendInfoService.
    
        #Si el token es válido, permite el acceso; de lo contrario, muestra una alerta, redirige al usuario a la página de login y deniega el acceso.
   ```




## Interceptor
1. authInterceptor:

   ```bash
    #authInterceptor
        Descripción: Interceptor que añade el token de autenticación en el encabezado Authorization de cada solicitud HTTP si el token existe.
    
        Código Principal: src/app/interceptors/auth.interceptor.ts


    ##Funcionamiento:

        #Si existe un token en localStorage, clona la solicitud original y agrega el encabezado Authorization con el formato Bearer {token}.
    
        #Si no hay token, envía la solicitud sin modificar.
   ```




## Configuración
1. appConfig:

   ```bash
    #appConfig
        Descripción: Configuración de la aplicación que incluye el enrutador, cliente HTTP y el interceptor.
    
        Código Principal: src/app/app.config.ts


    ##Configuración Principal:

        #provideRouter(routes): Configura el enrutador con las rutas definidas en routes.
    
        #provideHttpClient(): Proveedor del cliente HTTP.

        #Interceptor de Autenticación: Añade el authInterceptor a la lista de interceptores de la aplicación.
   ```