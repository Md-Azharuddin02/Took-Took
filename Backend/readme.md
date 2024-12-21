# Register API

This document describes the `/register` endpoint, including its workflow, validation, expected responses, and example usage.

---

## Workflow

1. **Client Request:** The client sends a POST request to the `/register` endpoint with user data.
2. **Validation:** Incoming data is validated using `express-validator` to ensure required fields are present and meet criteria.
3. **Password Hashing:** The password is hashed using `bcrypt` before being stored.
4. **Database Interaction:** A new user document is created in the MongoDB database.
5. **JWT Token Generation:** A JWT token is generated and sent back to the client.
6. **Response:** The client receives the created user data (excluding the password) and a token.

---

## Endpoint

### POST `/register`

### Request Body

| Field       | Type   | Required | Validation                                       |
| ----------- | ------ | -------- | ------------------------------------------------ |
| `firstName` | String | Yes      | Must be at least 3 characters long.              |
| `email`     | String | Yes      | Must be a valid email and at least 6 characters. |
| `password`  | String | Yes      | Must be at least 6 characters long.              |

### Example Request

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "securePassword"
}
```

---

## Example Response

### Success (201 Created)

```json
{
  "user": {
    "_id": "64c9e1f9c4e1e8b8bcee4567",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGM5ZTFmOWM0ZTFlOGI4YmNlZTQ1NjciLCJpYXQiOjE2NzI5MzUyNTN9.8-rZn8TwNp6c2sEF0gRfZwex_2nW-K1Jh7NG8kEAwPQ"
}
```

### Error (400 Bad Request)

```json
{
  "error": [
    {
      "msg": "Full name must be greater than 3 charector",
      "param": "firstName",
      "location": "body"
    }
  ]
}
```

### Error (500 Internal Server Error)

```json
{
  "error": "User not created: <detailed error message>"
}
```

---

## Status Codes

| Code | Description                          |
| ---- | ------------------------------------ |
| 201  | User successfully registered.        |
| 400  | Validation errors or missing fields. |
| 500  | Internal server error.               |

---

## Validation Rules

1. `firstName`: Must be at least 3 characters.
2. `email`: Must be a valid email and at least 6 characters long.
3. `password`: Must be at least 6 characters.

---

## Error Handling

- Validation errors return a `400` status with an array of errors.
- Database errors or unexpected exceptions return a `500` status with a detailed error message.

---

## Notes

- Ensure that the `JWT_SECRET` environment variable is set for token generation.
- Passwords are hashed using `bcrypt` for security.
- MongoDB ensures that the `email` field is unique.

---
