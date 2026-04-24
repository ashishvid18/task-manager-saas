 # 🚀 Task Manager SaaS (Full Stack)

A production-ready **Mini SaaS Task Management Application** built using modern full-stack technologies.
It allows users to securely manage their personal tasks with authentication and multi-user support.

---

## 🌐 Live Demo

* 🔗 Frontend: https://task-manager-saas-sigma.vercel.app/
* 🔗 Backend API: https://task-manager-saas-1.onrender.com

---

## 🧠 Features

### 🔐 Authentication

* User Signup & Login
* Password hashing using **bcrypt**
* JWT-based authentication
* Protected routes

### 📋 Task Management

* Create tasks
* View only your own tasks
* Update task status (Pending → Completed)
* Delete tasks
* Multi-user isolation (secure data separation)

### ⚙️ Backend

* Node.js + Express
* Sequelize ORM with PostgreSQL
* Structured architecture (routes, controllers, models)
* Error handling middleware
* Input validation

### 🎨 Frontend

* React (Vite)
* Tailwind CSS
* API integration using Axios
* Client-side routing
* Clean and minimal UI

---

## 🏗️ Tech Stack

**Frontend**

* React
* Tailwind CSS
* Axios
* React Router

**Backend**

* Node.js
* Express.js
* Sequelize ORM
* PostgreSQL

**Deployment**

* Vercel (Frontend)
* Render (Backend)

---

## 📁 Project Structure

```plaintext
task-manager-backend/
 ├── task-manager-backend/
 │   ├── controllers/
 │   ├── models/
 │   ├── routes/
 │   ├── middleware/
 │   ├── config/
 │   └── server.js
 │
 └── task-manager-frontend/
     ├── src/
     │   ├── pages/
     │   ├── services/
     │   └── App.jsx
     └── index.html
```

---

## ⚙️ Setup Instructions

### 🔹 1. Clone Repository

```bash
git clone https://github.com/your-username/task-manager-saas.git
cd task-manager-saas
```

---

### 🔹 2. Backend Setup

```bash
cd task-manager-backend/task-manager-backend
npm install
```

Create `.env` file:

```env
PORT=5000
DB_URI=your_postgres_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

### 🔹 3. Frontend Setup

```bash
cd ../../task-manager-frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

### Backend

* `PORT`
* `DB_URI`
* `JWT_SECRET`

### Frontend

* API base URL configured in:

```plaintext
src/services/api.js
```

---
 🚀 Future Improvements

* Task filtering & search
* Drag & drop tasks
* Notifications
* Dark mode

---

🙌 Author

**Ashish Vidyarthi**



---

## ⭐ Why this project stands out

* Real-world SaaS architecture
* Secure authentication system
* Clean backend structure
* Full deployment (Frontend + Backend)
* Production-ready approach

---

⭐ If you like this project, feel free to star the repository!

