# Node.js Homework - Express + MongoDB

Express.js server with **MongoDB** via **Mongoose**
Branch: **02-mongodb**

## Features
- PORT & MONGO_URL via `.env`
- CORS + JSON body parsing
- HTTP logging with **pino-http**
- Middleware: 404 handler & error handler (`http-errors`)
- CRUD for notes:
  - `GET /notes` → all notes
  - `GET /notes/:noteId` → note by ID or 404
  - `POST /notes` → create a note
  - `PATCH /notes/:noteId` → update a note
  - `DELETE /notes/:noteId` → delete a note

## Setup
```bash
npm install
# .env
PORT=3000
MONGO_URL=<your-mongodb-url>
npm run dev
```

Logs:
✅ MongoDB connection established successfully
Server is running on port 3000

Project Structure:
src/
├─ controllers/notesController.js
├─ routes/notesRoutes.js
├─ models/note.js
├─ middleware/logger.js
├─ middleware/errorHandler.js
├─ middleware/notFoundHandler.js
├─ db/connectMongoDB.js
└─ server.js

✅ All requirements are implemented, server connects to MongoDB, full CRUD ready.

