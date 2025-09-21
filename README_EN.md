# Maparty 🎉🗺️

## Description

**Maparty** is a personal project designed to help you discover
**parties near your location**.\
Organizers can create profiles and publish their events, which users can
explore on an interactive map.\
Clicking on an event shows detailed information, and filters are
available to help you find the perfect party.

## Technologies

-   **Backend:** Python + FastAPI\
-   **Web frontend:** Vue.js\
-   **Mobile version:** React Native (with Expo) *(in development,
    currently with dependency conflicts)*\
-   **Database & migrations:** Alembic + MySQL / MongoDB

## Installation & Run

1.  Clone this repository

    ``` bash
    git clone <repo-url>
    cd maparty
    ```

2.  Install backend dependencies

    ``` bash
    pip install -r requirements.txt
    alembic upgrade head
    ```

3.  Run the backend

    ``` bash
    uvicorn app.main:app --reload
    ```

4.  Install frontend dependencies

    ``` bash
    cd frontend
    npm install
    ```

5.  Run the frontend

    ``` bash
    npm run dev
    ```


## Environment variables

The project requires a `.env` file with the following variables:

``` ini
MYSQL_HOST=localhost
MYSQL_USER=<your_user>
MYSQL_PASSWORD=<your_password>
MYSQL_DB=festes_app
MYSQL_PORT=3306
MYSQL_DB_TEST=festes_app_test

ALGORITHM=HS256
SECRET_KEY=<long-secret-key>

PASSWORD=<your_password>
MONGO_DB=festes_app
MONGO_COLLECTION=festes
```

**Note:** Make sure to replace `SECRET_KEY` with a strong and unique
key in production.

## Current features

✅ Create profile\
✅ Log in\
✅ View randomly generated parties

## Planned features 🚧

-   View parties on the map\
-   Filter by distance\
-   View party details\
-   View organizer profiles\
-   Publish parties\
-   Follow organizers\
-   Receive notifications\
-   Filter by music genre\
-   Register as organizer or user\
-   Directions to the party\
-   Share party\
-   Guest mode

## Project status

The project is under active development. Work is ongoing to integrate
filters and the mobile version.

## License

MIT
