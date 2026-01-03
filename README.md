# Contact Management

A simple contact management app built with React (Vite) frontend and a Node/Express + MongoDB backend. The app allows creating, searching, updating, and deleting contacts.

---

## 🚀 Features

- Create and store contacts (name, email, number, message)
- Search contacts (name, email, number)
- Edit and delete contacts
- Simple REST API with MongoDB (Mongoose)

---

## 🧩 Tech Stack

- Frontend: React + Vite, TailwindCSS
- Backend: Node.js, Express, Mongoose (MongoDB)
- HTTP client: Axios

---

## 📁 Repository Structure

```
backend/
  package.json
  server.js
  routes/
    contactRoutes.js
  models/
    contactModel.js
frontend/
  package.json
  vite.config.js
  src/
    components/
      ContactForm.jsx
      ContactList.jsx
    main.jsx
    App.jsx
```

---

## 🔧 Prerequisites

- Node.js (v16+ recommended)
- MongoDB (local or Atlas)

---

## ⚙️ Backend Setup

1. Open a terminal and go to `backend`:

```bash
cd backend
npm install
```

2. Create a `.env` file in `backend/` with the following variables:

```
MONGO_URI=<your-mongodb-connection-string>
PORT=5000
```

3. Start the backend:

```bash
npm run dev
```

The server will connect to MongoDB and listen on the configured `PORT` (default: `5000`).

---

## ⚙️ Frontend Setup

1. Open a terminal and go to `frontend`:

```bash
cd frontend
npm install
```

2. Start the frontend dev server:

```bash
npm run dev
```

Vite typically serves the app at `http://localhost:5173` (check the console output).

> Note: The frontend currently calls the backend at `http://localhost:5000`. If your backend runs on a different host/port, update the URLs in `frontend/src/components/*` or add an environment variable.

---

## 🔗 API Endpoints

Base URL: `http://localhost:5000`

- POST `/contacts` — Create a new contact
  - Body: `{ name, email, number, message? }`
- GET `/contacts` — Get all contacts (supports `?search=term` to filter by name/email/number)
- PUT `/contacts/:id` — Update contact by ID
- DELETE `/contacts/:id` — Delete contact by ID

Example curl:

```bash
# Create
curl -X POST http://localhost:5000/contacts -H "Content-Type: application/json" -d '{"name":"Alice","email":"a@example.com","number":"123","message":"Hi"}'

# List
curl http://localhost:5000/contacts

# Search
curl http://localhost:5000/contacts?search=alice
```

---

## 📝 Notes & Tips

- The backend uses Mongoose models in `backend/models/contactModel.js`.
- Searching uses a case-insensitive regex across name, email, and number.
- To run both servers concurrently, open two terminals (one for backend, one for frontend).

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome. Feel free to open a PR or issue.

---

## 🧾 License

This project is provided as-is. Add a license if you intend to distribute it.
