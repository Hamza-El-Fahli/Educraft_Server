## API guide:

### Users API
***PUT     /api/uses***
*add one user
*request body : {name , email , password } 
***GET     /api/uses***
*select all users
*request body : null
***POST    /api/uses***
*select one user (check if email and password are correct)
*request body : {email , password } 
***DELETE  /api/uses/[id]***
*delete a user by id
*request body : null

***DELETE  /api/uses/[id]***
*update a user by id
*request body : {name , email , password }


