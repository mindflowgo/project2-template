# Project #2 Sample Outline
This is a simple project template that has a register page, a login page, 
and logged-in page that only displays info if an authenticated session 
detected.

It highlights user registration/login, and RESTful API communications.

## Installation
You need to create the database and setup the .env to run this. 
You may also need to do an npm install...

### Create Database
Use Mysql Workbench and copy and run each document in it.

### Configure .env
Modify the .env file and put in these elements
DB_NAME=project
DB_PWD=(db-password)

## Run Locally
npm start

open browser to http://localhost:3000

## Deployment to Heroku
Add the JawsDB database and verify there is a 'JAWSDB_URL' configuration variable. 

## Stylistic Notes
This code has been written towards keeping it clean and simple, yet self-explanatory.

It has also been written in a style to sheppard us into the style used in React, 
hence the onClick listeners embedded in the HTML.

We try to use ES6 async functions for clean handling of asyncronous functions.

We serve RESTful API calls on the backend, as is good modern programming practice.

Enjoy! Feel free to use this as a template towards your next project!