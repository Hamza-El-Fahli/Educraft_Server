## API guide:

### Users API

**PUT /api/users**
* Add one user
* Request body: `{name, email, password}`

**GET /api/users**
* Select all users
* Request body: `null`

**POST /api/users**
* Select one user (check if email and password are correct)
* Request body: `{email, password}`

**DELETE /api/users/{id}**
* Delete a user by id
* Request body: `null`


**PUT  /api/uses/[id]**
* Update a user by id
* Request body : {name , email , password }
