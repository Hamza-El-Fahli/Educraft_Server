# API guide:

## Users API

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
* Request body : `{name , email , password }`







## Courses API

**POST /api/courses**
* Add one course
* Request body: `{course_name , description , instructor}`

**GET /api/courses**
* Select all courses
* Request body: `null`


**DELETE /api/courses/{id}**
* Delete a course by id
* Request body: `null`


**PUT  /api/courses/[id]**
* Update a course by id
* Request body : `{ new_course_name,new_description,new_instructor}`






## Modules API

**POST /api/modules**
* Add one module
* Request body: `{ corse_id , title, description,  order}`

**GET /api/modules**
* Select all modules 
* Request body: `null`

**GET /api/modules?id=course_id**
* Select all modules and filter by course_id 
* Request body: `null`


**DELETE /api/modules/{id}**
* Delete a module by id
* Request body: `null`


**PUT  /api/modules/[id]**
* Update a course by id
* Request body : `{new_title , new_desciption , new_order} `





## Chapters API

**POST /api/chapters**
* Add one chapter
* Request body: `{ module_id , title, description}`

**GET /api/chapters**
* Select all chapters 
* Request body: `null`

**GET /api/chapters?id=course_id**
* Select all chapters and filter by module_id
* Request body: `null`
