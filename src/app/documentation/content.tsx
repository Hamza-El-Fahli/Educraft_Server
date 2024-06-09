import "./docStyling.css";
const API_Documentation = () => {
  return (
    <>
      <User_PUT />
      <User_GET />
      <User_Update_N_Delete />
    </>
  );
};

const User_PUT = () => {
  return (
    <div className="w-full documentation-container">
      <h1>API Documentation for User Management</h1>
      <hr />
      <div>
        <h2 id="addUser">Add User</h2>
        <ul>
          <li>
            <strong>Endpoint</strong>: <code>/api/users</code>
          </li>
          <li>
            <strong>Method</strong>: <code>PUT</code>
          </li>
          <li>
            <strong>Description</strong>: Adds a new user to the database.
          </li>
          <li>
            <strong>Request Body</strong>:
            <pre>
              <code>
                {`
{
  "name": "string",
  "email": "string",
  "password": "string",
  "annee": "number",
  "filiere": "string",
  "profile": "string"
}
`}
              </code>
            </pre>
          </li>
          <li>
            <strong>Response</strong>:
            <ul>
              <li>
                <strong>Success (201)</strong>:
                <pre>
                  <code>
                    {`
{
  "message": "user created",
  "_id": "string"
}
`}
                  </code>
                </pre>
              </li>
              <li>
                <strong>Error</strong>:
                <pre>
                  <code>
                    {`
{
  "error": "string"
}
`}
                  </code>
                </pre>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <hr />
      {/* Autres sections de documentation ici... */}
      <div>
        <h2>Sample Usage</h2>
        <h3>PUT /api/users</h3>
        <pre>
          <code>
            {`
curl -X PUT "http://your-api-url/api/users" \\
-H "Content-Type: application/json" \\
-d '{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securepassword",
  "annee": 1, // eleve de la 1 ere Annees 
  "filiere": "Computer Science",
  "profile": "student" 
}'
`}
          </code>
        </pre>
        {/* Autres exemples ici... */}
      </div>
    </div>
  );
};

const User_GET = () => {
  return (
    <>
      <div className="section">
        <h2 id="AuthUser">Authentication</h2>
        <ul>
          <li>
            <strong>Endpoint</strong>: <code>/api/authenticateUser</code>
          </li>
          <li>
            <strong>Method</strong>: <code>POST</code>
          </li>
          <li>
            <strong>Description</strong>: Authenticates a user using email and
            password.
          </li>
          <li>
            <strong>Request Body</strong>:
            <pre>
              <code>
                {`
{
"email": "string",
"password": "string"
}
`}
              </code>
            </pre>
          </li>
          <li>
            <strong>Response</strong>:
            <ul>
              <li>
                <strong>Success (200)</strong>:
                <pre>
                  <code>
                    {`
{
    "accessToken": "string"
    }
    `}
                  </code>
                </pre>
              </li>
              <li>
                <strong>Error (401)</strong>:
                <pre>
                  <code>
                    {`
{
    "error": "Invalid email or password"
    }
    `}
                  </code>
                </pre>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <hr />

      <div className="section">
        <h2 id="getAllUsers">Get All Users</h2>
        <ul>
          <li>
            <strong>Endpoint</strong>: <code>/api/getAllUsers</code>
          </li>
          <li>
            <strong>Method</strong>: <code>GET</code>
          </li>
          <li>
            <strong>Description</strong>: Retrieves all users from the database.
          </li>
          <li>
            <strong>Response</strong>:
            <ul>
              <li>
                <strong>Success (200)</strong>:
                <pre>
                  <code>
                    {`
[
    {
        "_id": "string",
        "name": "string",
        "email": "string",
        "annee": "number",
        "filiere": "string",
        "profile": "string",
        "lastActivity": "date"
        },
        ...
        ]
        `}
                  </code>
                </pre>
              </li>
              <li>
                <strong>Error (500)</strong>:
                <pre>
                  <code>
                    {`
{
    "error": "An error occurred"
    }
    `}
                  </code>
                </pre>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
};

const User_Update_N_Delete = () => {
  return (
    <>
      <div className="section">
        <h2 id="updateUser">Update User</h2>
        <ul>
          <li>
            <strong>Endpoint</strong>: <code>/api/users/:id</code>
          </li>
          <li>
            <strong>Method</strong>: <code>PUT</code>
          </li>
          <li>
            <strong>Description</strong>: Updates a user's information based on
            the provided ID.
          </li>
          <li>
            <strong>Request Body</strong>:
            <pre>
              <code>
                {`
{
  "name": "string",
  "email": "string",
  "password": "string",
  "annee": "number",
  "filiere": "string",
  "profile": "string"
}
                `}
              </code>
            </pre>
          </li>
          <li>
            <strong>Response</strong>:
            <ul>
              <li>
                <strong>Success (200)</strong>:
                <pre>
                  <code>
                    {`
{
  "message": "User Updated successfully"
}
                    `}
                  </code>
                </pre>
              </li>
              <li>
                <strong>Error</strong>:
                <pre>
                  <code>
                    {`
{
  "message": "no user updated"
}
                    `}
                  </code>
                </pre>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <hr />

      <div className="section">
        <h2 id="deleteUser">Delete User</h2>
        <ul>
          <li>
            <strong>Endpoint</strong>: <code>/api/users/:id</code>
          </li>
          <li>
            <strong>Method</strong>: <code>DELETE</code>
          </li>
          <li>
            <strong>Description</strong>: Deletes a user based on the provided
            ID.
          </li>
          <li>
            <strong>Response</strong>:
            <ul>
              <li>
                <strong>Success (200)</strong>:
                <pre>
                  <code>
                    {`
{
  "message": "User deleted"
}
                    `}
                  </code>
                </pre>
              </li>
              <li>
                <strong>Error</strong>:
                <pre>
                  <code>
                    {`
{
  "message": "User not found"
}
                    `}
                  </code>
                </pre>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
};
export default API_Documentation;
