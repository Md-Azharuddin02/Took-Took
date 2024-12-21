# User Authentication API

This API provides user registration and login functionality using Node.js and Express.

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
  http://localhost:3000/register \
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
  http://localhost:3000/login \
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
