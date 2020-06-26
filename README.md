# Project #2
Please add notes for how to setup your project

## Create Database
mysql -u root -p{your-db-password} < docs/schema.sql

mysql -u root -p{your-db-password} < docs/seed.sql

## Configure
Create a .env file and put in these elements
DB_NAME=(db-name)
DB_USER=(db-user)
DB_PWD=(db-password)

## Run
node server.js
