# NoteHub Backend

REST API for NoteHub, a fullstack notes management application with user authentication, protected notes, profile management, avatar upload, search, filtering, sorting, and password reset by email.

This backend is built with Express.js and MongoDB. It uses HTTP-only cookies for session handling, Mongoose for data modeling, Celebrate/Joi for validation, Cloudinary for avatar storage, and Nodemailer for password reset emails.

## Features

- User registration and login
- Session-based authentication with access and refresh tokens stored in HTTP-only cookies
- Session refresh, logout, and active session check
- Password reset flow with email delivery
- Protected notes API scoped to the authenticated user
- Notes CRUD operations
- Pagination, search, filtering by tag, and sorting
- User profile endpoint
- Username update
- Avatar upload to Cloudinary
- Request validation with Celebrate/Joi
- Centralized error handling
- CORS configuration for frontend integration
- Security headers with Helmet
- HTTP request logging with Pino

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Cookie Parser
- bcrypt
- Celebrate / Joi
- Cloudinary
- Multer
- Nodemailer
- Handlebars
- JSON Web Token
- Helmet
- Pino HTTP

## Project Structure

```text
src/
  constants/
  controllers/
  db/
  middleware/
  models/
  routes/
  services/
  templates/
  utils/
  validations/
  server.js
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Oleksandr-Sulyma/nodejs-hw.git
cd nodejs-hw
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and use `.env.example` as a reference.

```env
PORT=9999
MONGO_URL=your_mongodb_connection_string

SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_user
SMTP_PASSWORD=your_smtp_password
SMTP_FROM=your_sender_email

JWT_SECRET=your_jwt_secret
FRONTEND_DOMAIN=http://localhost:3000

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 4. Run the server

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The server will run on the port specified in `.env`.

## Environment Variables

| Variable | Description |
| --- | --- |
| `PORT` | Server port |
| `MONGO_URL` | MongoDB connection string |
| `SMTP_HOST` | SMTP provider host |
| `SMTP_PORT` | SMTP provider port |
| `SMTP_USER` | SMTP username |
| `SMTP_PASSWORD` | SMTP password |
| `SMTP_FROM` | Sender email address for password reset emails |
| `JWT_SECRET` | Secret used to sign password reset tokens |
| `FRONTEND_DOMAIN` | Frontend URL used for CORS and password reset links |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

## API Overview

### Authentication

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| `POST` | `/auth/register` | Register a new user | Public |
| `POST` | `/auth/login` | Log in user and create session cookies | Public |
| `POST` | `/auth/refresh` | Refresh user session | Public, requires refresh cookie |
| `POST` | `/auth/logout` | Log out user and clear cookies | Public |
| `GET` | `/auth/session` | Check current session | Public, uses cookies |
| `POST` | `/auth/request-reset-email` | Send password reset email | Public |
| `POST` | `/auth/reset-password` | Reset password with token | Public |

### Users

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| `GET` | `/users/me` | Get current user profile | Private |
| `PATCH` | `/users/me/username` | Update username | Private |
| `PATCH` | `/users/me/avatar` | Upload and update avatar | Private |

### Notes

All `/notes` routes are protected and require a valid `accessToken` cookie.

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| `GET` | `/notes` | Get notes for the current user | Private |
| `GET` | `/notes/:noteId` | Get one note by ID | Private |
| `POST` | `/notes` | Create a note | Private |
| `PATCH` | `/notes/:noteId` | Update a note | Private |
| `DELETE` | `/notes/:noteId` | Delete a note | Private |

## Notes Query Parameters

`GET /notes` supports pagination, search, filtering, and sorting.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `page` | number | `1` | Page number |
| `perPage` | number | `10` | Items per page, from 5 to 20 |
| `search` | string | - | Search by note title or content |
| `tag` | string | - | Filter by note tag |
| `sortBy` | string | `createdAt` | Sort by `_id`, `title`, `tag`, or `createdAt` |
| `sortOrder` | string | `asc` | Sort direction: `asc` or `desc` |

Available note tags:

```text
Work, Personal, Meeting, Shopping, Ideas, Travel, Finance, Health, Important, Todo
```

Example:

```http
GET /notes?page=1&perPage=10&search=react&tag=Work&sortBy=createdAt&sortOrder=desc
```

## Request Examples

### Register

```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

After successful login, the API sets `accessToken`, `refreshToken`, and `sessionId` as HTTP-only cookies.

### Create Note

```http
POST /notes
Content-Type: application/json

{
  "title": "Project ideas",
  "content": "Build a fullstack notes app",
  "tag": "Ideas"
}
```

### Update Username

```http
PATCH /users/me/username
Content-Type: application/json

{
  "username": "Oleksandr"
}
```

### Upload Avatar

```http
PATCH /users/me/avatar
Content-Type: multipart/form-data

avatar: <file>
```

## Data Models

### User

```js
{
  username: String,
  email: String,
  password: String,
  avatar: String
}
```

### Note

```js
{
  title: String,
  content: String,
  tag: String,
  userId: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

### Session

```js
{
  userId: ObjectId,
  accessToken: String,
  refreshToken: String,
  accessTokenValidUntil: Date,
  refreshTokenValidUntil: Date
}
```

## Security Notes

- Passwords are hashed with bcrypt before saving.
- Auth tokens are stored in HTTP-only cookies.
- Notes are always scoped to the authenticated user.
- CORS uses `FRONTEND_DOMAIN` and allows credentials.
- Helmet is enabled for secure HTTP headers.
- Validation is applied to request body, params, and query values.

## Author

Oleksandr Sulyma

- GitHub: [Oleksandr-Sulyma](https://github.com/Oleksandr-Sulyma)
- LinkedIn: [oleksandr-sulyma](https://www.linkedin.com/in/oleksandr-sulyma/)
