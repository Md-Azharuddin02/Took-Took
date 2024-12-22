# User Authentication API

This API provides user registration, login, profile access, and logout functionality using Node.js and Express.

---

## Workflow

### Registration
1. User submits their `firstName`, `lastName`, `email`, and `password` to the `/register` endpoint.
2. The inputs are validated using `express-validator`.
3. If validation passes:
   - The password is hashed.
   - A new user is created and saved in the database.
   - An authentication token is generated and returned.
4. If validation fails, an error response is returned.

### Login
1. User submits their `email` and `password` to the `/login` endpoint.
2. The inputs are validated using `express-validator`.
3. If validation passes:
   - The database is queried for the user with the provided email.
   - The submitted password is compared with the stored hashed password.
   - If authentication is successful, an authentication token is returned.
4. If validation fails or authentication is unsuccessful, an error response is returned.

### Profile Access
1. The `/profile` endpoint is protected with an authentication middleware.
2. The middleware checks for a valid token in the request cookies or authorization header.
3. If the token is valid and not blacklisted:
   - The user's profile is returned.
4. If authentication fails, an error response is returned.

### Logout
1. User sends a request to the `/logout` endpoint.
2. The authentication middleware ensures the user is authenticated.
3. The token is added to a blacklist with a 24-hour expiration.
4. The authentication token cookie is cleared from the client.
5. A success message is returned.

---

## Endpoints

### POST `/register`
Registers a new user.

#### Request Body
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

#### Response
**Success (201):**
```json
{
  "user": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com"
  },
  "token": "<JWT Token>"
}
```

**Validation Error (400):**
```json
{
  "error": [
    {
      "msg": "Full name must be greater than 3 characters",
      "param": "firstName",
      "location": "body"
    }
  ]
}
```

---

### POST `/login`
Logs in an existing user.

#### Request Body
```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

#### Response
**Success (200):**
```json
{
  "user": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com"
  },
  "token": "<JWT Token>"
}
```

**Error (401):**
```json
{
  "message": "Invalid email and password"
}
```

---

### GET `/profile`
Retrieves the authenticated user's profile.

#### Request Headers
```json
{
  "Authorization": "Bearer <JWT Token>"
}
```

#### Response
**Success (200):**
```json
{
  "user": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com"
  }
}
```

**Error (401):**
```json
{
  "message": "Your are not authorized"
}
```

---

### POST `/logout`
Logs out the authenticated user.

#### Request Headers
```json
{
  "Authorization": "Bearer <JWT Token>"
}
```

#### Response
**Success (200):**
```json
{
  "message": "Successfully logged out"
}
```

**Error (401):**
```json
{
  "message": "Your are not authorized"
}
```

---

## Validation Rules

### `/register`
- `firstName`: Minimum 3 characters.
- `email`: Valid email format, minimum 6 characters.
- `password`: Minimum 6 characters.

### `/login`
- `email`: Valid email format, minimum 6 characters.
- `password`: Minimum 6 characters.

---

## Error Codes

| Status Code | Meaning                               |
|-------------|---------------------------------------|
| 400         | Validation errors or bad request.     |
| 401         | Unauthorized or authentication failed.|
| 201         | Resource successfully created.        |
| 200         | Successful request.                   |

---

## Example Usage

### Registration
**Request:**
```bash
curl -X POST \
  http://localhost:3000/users/register \
  -H 'Content-Type: application/json' \
  -d '{
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "user": {
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com"
  },
  "token": "<JWT Token>"
}
```

### Login
**Request:**
```bash
curl -X POST \
  http://localhost:3000/users/login \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "jane.doe@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "user": {
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com"
  },
  "token": "<JWT Token>"
}
```

### Profile Access
**Request:**
```bash
curl -X GET \
  http://localhost:3000/users/profile \
  -H 'Authorization: Bearer <JWT Token>'
```

**Response:**
```json
{
  "user": {
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com"
  }
}
```

### Logout
**Request:**
```bash
curl -X POST \
  http://localhost:3000/users/logout \
  -H 'Authorization: Bearer <JWT Token>'
```

**Response:**
```json
{
  "message": "Successfully logged out"
}
```

