# express-vue-crud-app
Full stack web app for managing people records (Node + Vue)

This project implements a web server using Node.js and Express.js, designed to manage a collection of persons through a RESTful API. The server exposes endpoints for creating, retrieving, updating, and deleting person data. Initially accessible via Postman, the project later integrates a web-based frontend using Vue.js and Vuetify.js to interact with the server. Data manipulations are initially transient but can be extended to persist beyond runtime by storing data in a file.

Steps Completed
Server Setup: Created a Node.js server reachable at http://localhost:8086

Building the API: Defined RESTful endpoints

GET: Retrieve person data by personID.
POST: Add a new person.
PUT: Update an existing person.
DELETE: Delete a person by personID.
Testing: Validated API functionality using Postman.

Data Persistence: To store data beyond runtime by saving to a file.

Frontend: Vuetify.js to create a user-friendly frontend for interacting with the server's endpoints. With add persons, get persons list, edit persons and delete persons functionalities.


## Installation

- Step 1 :- Start of Backend

cd backend
npm install
node server.js
http://localhost:8086/

- Step 2 :- Start of Frontend

cd frontend
npm install
npm run dev
http://localhost:3000/

- Step 3 :- Project Started !
