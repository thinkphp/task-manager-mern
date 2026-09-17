# Tasks-React-Express-MongoDB

```
#!/bin/bash
mkdir -p "$1"/{models,controllers,routes}
touch "$1"/models/Task.js "$1"/controllers/tasksController.js "$1"/routes/tasks.js "$1"/db.js "$1"/server.js "$1"/.env
cd "$1" && npm init -y && npm install express mongoose dotenv
echo "Backend creat în ./$1"
```
A Todo List application built on the MERN stack: **MongoDB**, **Express**, **React**, and **Node.js**.

Tasks are persisted in a MongoDB database, accessed through a REST API written in Express, and displayed/managed from a React interface.

## Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Express.js
- **Database:** MongoDB + Mongoose
- **Other:** dotenv (environment variables)

## Project Structure

```
.
├── backend/
│   ├── models/
│   │   └── Task.js
│   ├── controllers/
│   │   └── tasksController.js
│   ├── routes/
│   │   └── tasks.js
│   ├── db.js
│   ├── server.js
│   ├── .env
│   └── package.json
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── TaskItem.jsx
    │   └── index.css
    ├── vite.config.js
    └── package.json
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally, **or** a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster (cloud)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/<username>/Tasks-React-Express-MongoDB.git
cd Tasks-React-Express-MongoDB
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create the `.env` file (or edit the existing one) with the following content:

```
MONGODB_URI=mongodb://127.0.0.1:27017/todoapp
PORT=3000
```

> If you're using MongoDB Atlas, replace `MONGODB_URI` with the connection string provided by Atlas.

### 3. Set up the frontend

```bash
cd ../frontend
npm install
```

Make sure `vite.config.js` includes a proxy to the backend, so requests to `/api` work correctly:

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
});
```

## Running the App

### 1. Start MongoDB (if running locally)

```bash
sudo systemctl start mongod
```

### 2. Start the backend

```bash
cd backend
node server.js
```

You should see the following in your terminal:

```
Connected to MongoDB
Todo app running on http://localhost:3000
```

### 3. Start the frontend

In a separate terminal:

```bash
cd frontend
npm run dev
```

The app will be available at the address shown in the terminal (by default `http://localhost:5173`).

## API Endpoints

| Method | Route                | Description                     |
|--------|------------------------|----------------------------------|
| GET    | `/api/tasks`            | Returns all tasks               |
| POST   | `/api/tasks`             | Creates a new task               |
| PUT    | `/api/tasks/:id`         | Updates an existing task         |
| DELETE | `/api/tasks/:id`         | Deletes a task                   |

### Example POST request

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"text":"Buy milk"}'
```

### Response format (task)

```json
{
  "id": "671f2a3b9c1e4a0012a34567",
  "text": "Buy milk"
}
```

## Features

- Add a new task
- Edit an existing task
- Delete a task (with confirmation)
- Full persistence in MongoDB

## Useful MongoDB Commands (debugging)

```javascript
mongosh
use todoapp
db.tasks.find().pretty()      // view all tasks
db.tasks.deleteMany({})        // delete all tasks (reset)
```

## Roadmap / Future Ideas

- [ ] User authentication (JWT)
- [ ] Mark task as "completed" (checkbox)
- [ ] Categories/tags for tasks
- [ ] Sorting and filtering from the UI

## License

This project is available under the MIT license.
