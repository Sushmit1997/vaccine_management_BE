# vaccine_management_BE

This is a Node Js server for Vaccine Management Application.

To run this server locally, ensure MongoDB is installed in your system. 

Clone main branch from this repository. On root directory of this project run : `npm install`. It will install all the required dependencies and start the server with `npm start` command.

# API Documentation

## Fetch Vaccines
  GET http://localhost:5000/vaccines
   
## Add Vaccine
  POST http://localhost:5000/vaccines
Content-Type: application/json
Sample payload: `{
  "name": "CoVax",
  "company_email" : "johnsons&johnsons@gmail.com",
  "company_contact": 984234423,
  "number_of_dose": 2,
  "gender": "male"
}`

## Update Vaccine
  PATCH http://localhost:5000/vaccines/:id/
Content-Type: application/json
  `{
  "name": "Moderna 2",
  "company_email" : "moderna@gmail.com",
  "company_contact": 984234423,
  "number_of_dose": 2,
  "gender": "male"
}`

## Delete Vaccine 
  DELETE http://localhost:5000/vaccines/:id
  
## Sign up User
 POST http://localhost:5000/users/signup
Content-Type: application/json

`{
  "email": "sushmit.rajaure@gmail.com",
  "password": "1234"
}`

## Sign In User
POST http://localhost:5000/signin
Content-Type: application/json

`{
  "email": "sushmit.rajaure@gmail.com",
  "password": "1234"
}`

## Live App
The live version of this application is hosted on https://main--peppy-pony-00d3ac.netlify.app/

