# Task Manager

A full-stack Task Management application featuring user authentication and task CRUD operations. The backend uses Node.js, Express, and raw MySQL queries, while the frontend is built with React and Vite.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Scripts](#scripts)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Features
- **User Authentication:** Register and login with JWT-based authentication.
- **Task Management:** Create, read, update, and delete tasks.
- **Protected Routes:** Task endpoints require authentication.
- **Responsive UI:** Simple React dashboard with task management features.

## Project Structure
```
Edtech/
├── backend/                # Backend source code
│   ├── src/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login.ts
│   │   │   │   └── register.ts
│   │   │   └── tasks/
│   │   │       ├── create.ts
│   │   │       ├── delete.ts
│   │   │       ├── list.ts
│   │   │       └── update.ts
│   │   ├── config/
│   │   │   └── db.ts
│   │   ├── middleware/
│   │   │   └── auth.ts
│   │   ├── models/
│   │   │   └── task.ts    # Contains updateTask function
│   │   └── index.ts
│   ├── .env              # Environment variables (not tracked)
│   ├── package.json
│   └── tsconfig.json
├── frontend/             # Frontend source code
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   └── Header.tsx
│   │   │   └── dashboard/
│   │   │       ├── TaskList.tsx
│   │   │       ├── TaskItem.tsx
│   │   │       ├── TaskForm.tsx
│   │   │       └── AddTaskButton.tsx
│   │   ├── data/
│   │   │   └── tasks.ts
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   └── tsconfig.json
└── README.md             # This file
```

## Prerequisites
- **Node.js:** v18.x or higher (v20.x recommended)
- **MySQL:** v8.x or higher
- **npm:** v9.x or higher (bundled with Node.js)

## Setup Instructions
### Backend Setup
1. Navigate to Backend Directory:
   ```bash
   cd backend
   ```
2. Install Dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   Create a `.env` file in `backend/` with:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=task_management
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
   ```
   Replace `your_password` with your MySQL password and `your_jwt_secret_key` with a secure key.

4. Set Up MySQL Database:
   ```bash
   mysql -u root -p
   ```
   Then, execute:
   ```sql
   CREATE DATABASE task_management;
   USE task_management;
   
   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     username VARCHAR(50) UNIQUE NOT NULL,
     email VARCHAR(100) UNIQUE NOT NULL,
     password VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   
   CREATE TABLE tasks (
     id INT AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(100) NOT NULL,
     description TEXT,
     due_date DATE NOT NULL,
     completed BOOLEAN DEFAULT FALSE,
     user_id INT NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (user_id) REFERENCES users(id)
   );
   
   EXIT;
   ```
5. Run the Backend:
   ```bash
   npm start
   ```
   Look for "Connected to MySQL database: task_management" and "Server running on port 5000".

### Frontend Setup
1. Navigate to Frontend Directory:
   ```bash
   cd ../frontend
   ```
2. Install Dependencies:
   ```bash
   npm install
   ```
3. Run the Frontend:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173/](http://localhost:5173/) in your browser.

## Usage
- **Register:** Visit [http://localhost:5173/register](http://localhost:5173/register) to create an account.
- **Login:** Go to [http://localhost:5173/](http://localhost:5173/) to log in.
- **Dashboard:** After login, you’ll be redirected to [http://localhost:5173/dashboard](http://localhost:5173/dashboard) to manage tasks.
- **Logout:** Click "Logout" in the header to clear the session.

## Dependencies
### Backend
- express
- mysql2
- jsonwebtoken
- bcrypt
- cors
- dotenv
- **Dev:** @types/*, ts-node, typescript

### Frontend
- react
- react-dom
- react-router-dom
- axios
- jwt-decode
- react-icons
- **Dev:** @types/*, vite, @vitejs/plugin-react

## Scripts
### Backend (`backend/package.json`)
- `start`: `ts-node src/index.ts` - Runs the server

### Frontend (`frontend/package.json`)
- `dev`: `vite` - Starts the development server
- `build`: `tsc && vite build` - Builds for production
- `preview`: `vite preview` - Previews the built app

## Troubleshooting
- **Backend Fails to Start:** Verify `.env` values and MySQL connection.
- **Ensure MySQL tables are created (see Setup [#backend-setup]).**
- **Frontend Errors:** Confirm backend is running at `http://localhost:5000`.
- **CORS Issues:** Check `src/index.ts` has `cors` set to `origin: 'http://localhost:5173'`.

## Contributing
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request.


