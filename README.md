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


**PUT  /api/users/[id]**
* Update a user by id
* Request body : {name , email , password }







### Courses API

**PUT /api/courses**
* Add one course
* Request body: `{course_name , description , instructor}`

**GET /api/courses**
* Select all courses
* Request body: `null`


**DELETE /api/courses/{id}**
* Delete a course by id
* Request body: `null`


**POST  /api/courses/[id]**
* Update a course by id
* Request body : `{ new_course_name,new_description,new_instructor}`
