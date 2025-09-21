# Maparty 🎉🗺️

## Descripción

**Maparty** es un proyecto personal enfocado en ayudarte a descubrir
**fiestas cercanas a tu ubicación**.\
Los organizadores pueden crear perfiles y publicar sus eventos, que los
usuarios verán representados en un mapa interactivo.\
Al hacer clic en cada fiesta, se muestra información detallada. Además,
existen filtros para encontrar el evento ideal.

## Tecnologías

-   **Backend:** Python + FastAPI\
-   **Frontend web:** Vue.js\
-   **Versión móvil:** React Native (con Expo) *(en desarrollo,
    actualmente con conflictos de dependencias)*\
-   **Base de datos y migraciones:** Alembic + MySQL / MongoDB

## Instalación y ejecución

1.  Clona este repositorio

    ``` bash
    git clone <url-del-repo>
    cd maparty
    ```

2.  Instala dependencias del backend

    ``` bash
    pip install -r requirements.txt
    alembic upgrade head
    ```

3.  Arranca el backend

    ``` bash
    uvicorn app.main:app --reload
    ```

4.  Instala dependencias del frontend

    ``` bash
    cd frontend
    npm install
    ```

5.  Arranca el frontend

    ``` bash
    npm run dev
    ```


## Variables de entorno

El proyecto requiere un archivo `.env` con las siguientes variables:

``` ini
MYSQL_HOST=localhost
MYSQL_USER=<your_user>
MYSQL_PASSWORD=<your_password>
MYSQL_DB=festes_app
MYSQL_PORT=3306
MYSQL_DB_TEST=festes_app_test

ALGORITHM=HS256
SECRET_KEY=<clave-secreta-larga>

PASSWORD=<your_password>
MONGO_DB=festes_app
MONGO_COLLECTION=festes
```

**Nota:** Recuerda reemplazar `SECRET_KEY` por una clave segura y
única en producción.

## Funcionalidades actuales

✅ Crear perfil\
✅ Iniciar sesión\
✅ Visualizar fiestas aleatorias generadas

## Funcionalidades planificadas 

-   Ver mapa con fiestas\
-   Filtrar por distancia\
-   Ver detalle de la fiesta\
-   Ver perfil del organizador\
-   Publicar fiesta\
-   Seguir organizadores\
-   Recibir notificaciones\
-   Filtrar por género de música\
-   Registro como organizador o usuario\
-   Cómo llegar a la fiesta (direcciones)\
-   Compartir fiesta\
-   Modo invitado

## Estado del proyecto

El proyecto está en desarrollo. Actualmente se trabaja en la integración
de filtros y la versión móvil.

