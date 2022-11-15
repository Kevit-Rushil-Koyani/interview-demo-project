# demo-project

## Introduction

-   Purpose of project
    -   A Passport Authentication Backend Middleware to Authenticate the user and store in database.

#### 1.1 Purpose of this module

-   This is the main core of the project. It connects Web UI, Database.
-   All the API calls are pointed here.

#### 1.2 Module features

-   All logical operations are performed here.
-   A received user registration is created into the Database.
-   From API calls we can also retrive the users with their courses.

#### 1.3 Module technical stack

-   **Server runtime** : NodeJS v14.x
-   **Database** : Mongodb 5.x
-   **Authentication Serivce** : Passport

#### 1.4 Get up and running

-   Install requirements

    -   Open the terminal from root folder of this repository
    -   Run `npm i` to install all the dependencies
    -   Currently, the backend server will start on PORT 3200, which is configurable

-   Create Database & Database User

    -   Create a Database, Database User and grant all privileges on this Database to this created User.
    -   Paste Database related configs in the .env file
    -   Once done, run `npm start`, and the server starts running on port 3200 (specified in env file)
    -   For create Postman collection or understand the all APIs behaviour need to refer `Project.postman_collection.json`.

-   Start the Server
    -   Once the above steps are performed correctly, run `npm start`, and the Backend Middleware runs on port `PORT` configured in `.env` file.
