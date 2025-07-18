# 🏥 FirstAidGuru – First Aid Tutorial Web Application (MERN Stack)

A full-stack, responsive, and accessible web application built with the **MERN stack** (MongoDB, Express, React, Node.js) that educates users on **life-saving first aid techniques**. Designed to empower communities, especially in underserved areas, with quick, step-by-step emergency guidance.

---

## 🚀 Live Demo

🌐 [Live Application on Vercel](https://firstaidguru.vercel.app)  
🔗 [Backend API on Render](https://firstaidguru-api.onrender.com) *(example)*

---

## 📽️ Project Demo (Video)

🎥 [Watch 5–10 Minute Demo Video](https://youtu.be/demo-video-link)

---

## 📂 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Technical Architecture](#technical-architecture)
- [Testing](#testing)
- [CI/CD Pipeline](#cicd-pipeline)
- [Real-Time Features](#real-time-features)
- [Contributing](#contributing)

---

## ✅ Features

### 👨‍⚕️ User Features:
- View categorized first aid tutorials
- Step-by-step instructions for emergencies
- Search/filter functionality
- Embedded instructional videos
- Mobile-friendly and accessible design

### 🛠 Admin Features:
- Add/Edit/Delete tutorials via a simple dashboard
- Authentication for admin access
- Live notifications when a user views a tutorial *(real-time feature)*

---

## 🧰 Tech Stack

### Frontend:
- React.js
- React Router
- Tailwind CSS (or Bootstrap)
- Axios

### Backend:
- Node.js + Express.js
- MongoDB + Mongoose
- Socket.io (for real-time interactions)
- JWT (for admin authentication)
- CORS, Helmet, Morgan, dotenv

### Deployment:
- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)
- GitHub Actions (CI/CD)

---

## 🖼️ Screenshots

| Homepage | Tutorial Page | Admin Panel |
|---------|----------------|-------------|
| ![Home](screenshots/home.png) | ![Tutorial](screenshots/tutorial.png) | ![Admin](screenshots/admin.png) |

---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/firstaidguru.git
cd firstaidguru
2. Install Dependencies
Backend:

bash
Copy
Edit
cd server
npm install
Frontend:

bash
Copy
Edit
cd ../client
npm install
3. Set Up .env Files
Backend (server/.env):

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
Frontend (client/.env):

env
Copy
Edit
VITE_API_URL=https://your-api-url.onrender.com/api
4. Run Locally
bash
Copy
Edit
# In one terminal (backend)
cd server
npm run dev

# In another terminal (frontend)
cd client
npm run dev
📡 API Documentation
Base URL: /api/tutorials

Method	Endpoint	Description
GET	/	Get all tutorials
GET	/:id	Get one tutorial
POST	/	Create new tutorial
PUT	/:id	Update tutorial
DELETE	/:id	Delete tutorial

Auth Route (Admin Only)
Method	Endpoint	Description
POST	/auth	Admin login

🧠 Database Schema
Tutorial Model:

js
Copy
Edit
{
  title: String,
  category: String,
  description: String,
  steps: [String],
  videoUrl: String,
  createdAt: { type: Date, default: Date.now }
}
Admin User (Optional):

js
Copy
Edit
{
  email: String,
  passwordHash: String
}
🧱 Technical Architecture
java
Copy
Edit
React Client (Vercel)
    |
    ↓
Express API (Render) ←→ MongoDB Atlas
    |
Socket.io for real-time tutorial viewer count
🧪 Testing
API Testing:
Jest + Supertest for backend routes

Component Testing:
React Testing Library for unit tests

E2E Testing:
Cypress (optional)

Example Test Command:
bash
Copy
Edit
npm run test
⚡ Real-Time Features
Socket.io integrated into frontend and backend

Displays live count of users viewing a tutorial

🔁 CI/CD Pipeline
GitHub Actions used to:

Lint and run tests on every push

Deploy frontend to Vercel

Deploy backend to Render (or Railway)

🧾 User Guide
Visit homepage and browse tutorials.

Search for specific conditions.

Click on a tutorial to view instructions.

Admins can log in and manage content.

🙌 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

🧠 Author & License
Developer: Lucky Nakola – @nakolaexpert
License: MIT

📎 Final Submission Checklist
 Deployed frontend on Vercel

 Deployed backend on Render

 GitHub repo with commits and docs

 Real-time feature (Socket.io)

 RESTful API + Auth

 Testing implemented

 Video demo and screenshots included
