Task Manager
A full-stack Task Management application with user authentication and task CRUD functionality. The backend is built with Node.js, Express, and raw MySQL queries, while the frontend uses React with Vite.
Features
User Authentication: Register and login with JWT-based authentication.

Task Management: Create, read, update, and delete tasks.

Protected Routes: Only authenticated users can access task endpoints.

Responsive UI: Simple React frontend with a dashboard for task management.

Project Structure

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
│   ├── .env              # Environment variables
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

Prerequisites
Node.js: v18.x or higher (v20.x recommended).

MySQL: v8.x or higher.

npm: v9.x or higher (comes with Node.js).

Setup Instructions
1. Clone the Repository
bash

git clone <repository-url>
cd Edtech

2. Backend Setup
a. Navigate to Backend Directory
bash

cd backend

b. Install Dependencies
bash

npm install

c. Configure Environment Variables
Create a .env file in backend/ with the following:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=task_management
PORT=5000
JWT_SECRET=your_jwt_secret_key

Replace your_password with your MySQL password and your_jwt_secret_key with a secure key.

d. Set Up MySQL Database
Log into MySQL:
bash

mysql -u root -p

Create the database and tables:
sql

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

e. Run the Backend
bash

npm start

You should see "Connected to MySQL database: task_management" and "Server running on port 5000".

3. Frontend Setup
a. Navigate to Frontend Directory
bash

cd ../frontend

b. Install Dependencies
bash

npm install

c. Run the Frontend
bash

npm run dev

Open http://localhost:5173/ in your browser to access the app.

4. Usage
Register: Go to http://localhost:5173/register to create an account.

Login: Use http://localhost:5173/ to log in.

Dashboard: After login, you’ll be redirected to http://localhost:5173/dashboard to manage tasks.

Logout: Click the "Logout" button in the header to clear the session.

Dependencies
Backend
express: Web framework.

mysql2: MySQL driver for raw queries.

jsonwebtoken: JWT authentication.

bcrypt: Password hashing.

cors: Cross-origin resource sharing.

dotenv: Environment variable management.

Dev: @types/* for TypeScript, ts-node, typescript.

Frontend
react: UI library.

react-dom: React DOM rendering.

react-router-dom: Routing.

axios: HTTP requests.

jwt-decode: JWT decoding for browser.

react-icons: Icons for UI.

Dev: @types/* for TypeScript, vite, @vitejs/plugin-react.

Scripts
Backend (backend/package.json)
npm start: Runs the server with ts-node src/index.ts.

Frontend (frontend/package.json)
npm run dev: Starts the Vite development server.

npm run build: Builds the app for production.

npm run preview: Previews the built app.

