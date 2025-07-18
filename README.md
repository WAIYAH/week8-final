# 🏥 FirstAidGuru – First Aid Tutorial Web Application (MERN Stack)

A comprehensive, responsive, and accessible web application built with the **MERN stack** (MongoDB, Express, React, Node.js) that educates users on **life-saving first aid techniques**. Designed to empower communities, especially in underserved areas, with quick, step-by-step emergency guidance.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- pnpm package manager
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd firstaidguru
```

2. **Install dependencies**
```bash
# Install server dependencies
cd server
pnpm install

# Install client dependencies
cd ../client
pnpm install
```

3. **Set up environment variables**
```bash
# Server environment (.env in server directory)
cp server/.env.example server/.env
# Edit server/.env with your MongoDB URI and JWT secret

# Client environment (.env in client directory)  
cp client/.env.example client/.env
# Edit client/.env with your API URLs
```

4. **Seed the database (optional)**
```bash
cd server
node utils/seedData.js
```

5. **Start the development servers**
```bash
# Terminal 1 - Start backend server
cd server
pnpm run dev

# Terminal 2 - Start frontend server
cd client
pnpm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

### Default Admin Credentials
- Email: admin@firstaidguru.com
- Password: password123

---

## 📂 Project Structure

```
firstaidguru/
├── client/                     # React frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   └── __tests__/      # Component tests
│   │   ├── pages/              # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Tutorials.jsx
│   │   │   ├── TutorialDetail.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── context/            # React Context providers
│   │   │   └── AuthContext.jsx
│   │   ├── test/               # Test setup
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── vitest.config.js
│   └── .env
├── server/                     # Express backend
│   ├── models/                 # Mongoose schemas
│   │   ├── Tutorial.js
│   │   └── Admin.js
│   ├── controllers/            # Route handlers
│   │   ├── tutorialController.js
│   │   └── authController.js
│   ├── routes/                 # API routes
│   │   ├── tutorials.js
│   │   └── auth.js
│   ├── middleware/             # Custom middleware
│   │   ├── auth.js
│   │   └── validation.js
│   ├── utils/                  # Utility functions
│   │   └── seedData.js
│   ├── tests/                  # API tests
│   │   └── tutorials.test.js
│   ├── server.js               # Main server file
│   ├── package.json
│   ├── jest.config.js
│   └── .env
├── README.md
└── assignment.md
```

---

## ✅ Features

### 👨‍⚕️ Public Features:
- **Browse Tutorials**: View categorized first aid tutorials (bleeding, burns, fractures, etc.)
- **Detailed Instructions**: Step-by-step emergency response guides
- **Search & Filter**: Find specific tutorials by category or keywords
- **Video Integration**: Embedded YouTube instructional videos
- **Real-time Viewers**: See how many people are currently viewing each tutorial
- **Mobile-First Design**: Fully responsive across all devices
- **Accessibility**: WCAG compliant design for all users

### 🛠 Admin Features:
- **Secure Authentication**: JWT-based admin login system
- **Tutorial Management**: Create, edit, and delete tutorials
- **Rich Form Validation**: Comprehensive input validation and error handling
- **Dashboard Analytics**: View tutorial statistics and management overview

---

## 🧰 Tech Stack

### Frontend:
- **React 18** with Vite for fast development
- **React Router** for client-side routing
- **Tailwind CSS** for modern, responsive styling
- **React Hook Form** for form management and validation
- **Axios** for API communication
- **Socket.io Client** for real-time features
- **Lucide React** for consistent iconography

### Backend:
- **Node.js** with **Express.js** framework
- **MongoDB** with **Mongoose** ODM
- **Socket.io** for real-time viewer tracking
- **JWT** for secure authentication
- **bcryptjs** for password hashing
- **Express Validator** for input validation
- **Helmet** for security headers
- **Morgan** for request logging
- **CORS** for cross-origin requests

### Testing:
- **Jest** and **Supertest** for backend API testing
- **Vitest** and **React Testing Library** for frontend testing
- **MongoDB Memory Server** for isolated test environments

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Tutorials Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/tutorials` | Get all tutorials | No |
| GET | `/tutorials/:id` | Get single tutorial | No |
| POST | `/tutorials` | Create new tutorial | Yes |
| PUT | `/tutorials/:id` | Update tutorial | Yes |
| DELETE | `/tutorials/:id` | Delete tutorial | Yes |

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | Admin login |
| POST | `/auth/register` | Create admin account |

### Example Request/Response

**GET /api/tutorials**
```json
[
  {
    "_id": "64a7b8c9d1e2f3a4b5c6d7e8",
    "title": "How to Treat Minor Cuts and Bleeding",
    "category": "bleeding",
    "description": "Learn the essential steps to properly clean and bandage minor cuts...",
    "steps": [
      "Wash your hands thoroughly with soap and water",
      "Apply direct pressure to the wound with a clean cloth",
      "..."
    ],
    "videoUrl": "https://www.youtube.com/watch?v=example",
    "createdAt": "2023-07-07T10:30:00.000Z",
    "updatedAt": "2023-07-07T10:30:00.000Z"
  }
]
```

---

## 🧠 Database Schema

### Tutorial Model
```javascript
{
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['bleeding', 'burns', 'fractures', 'choking', 'cardiac', 'poisoning', 'other']
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  steps: [{
    type: String,
    required: true
  }],
  videoUrl: {
    type: String,
    trim: true,
    validate: URL_VALIDATOR
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

### Admin Model
```javascript
{
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

---

## 🧪 Testing

### Backend Testing
```bash
cd server
pnpm test
```

**Test Coverage:**
- API endpoint testing with Supertest
- Database operations with MongoDB Memory Server
- Authentication middleware testing
- Input validation testing

### Frontend Testing
```bash
cd client
pnpm test
```

**Test Coverage:**
- Component rendering tests
- User interaction testing
- Context provider testing
- Form validation testing

---

## ⚡ Real-Time Features

### Live Viewer Count
- **Technology**: Socket.io WebSocket connections
- **Implementation**: Room-based viewer tracking per tutorial
- **User Experience**: Real-time updates showing current viewers
- **Performance**: Efficient connection management with automatic cleanup

### How It Works
1. User opens tutorial detail page
2. Client connects to Socket.io server and joins tutorial-specific room
3. Server tracks active connections per tutorial
4. Real-time viewer count broadcasted to all users in the room
5. Automatic cleanup when users leave or disconnect

---

## 🚀 Deployment

### Environment Variables

**Server (.env)**
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/firstaidguru
JWT_SECRET=your_super_secure_jwt_secret_key
NODE_ENV=production
CLIENT_URL=https://your-frontend-domain.vercel.app
```

**Client (.env)**
```env
VITE_API_URL=https://your-backend-api.render.com/api
VITE_SOCKET_URL=https://your-backend-api.render.com
```

### Deployment Steps

**Frontend (Vercel)**
```bash
cd client
pnpm build
# Deploy to Vercel
```

**Backend (Render/Railway)**
```bash
cd server
# Set environment variables in hosting platform
# Deploy to Render or Railway
```

**Database (MongoDB Atlas)**
- Cloud-hosted MongoDB with global clusters
- Automatic backups and scaling
- Built-in security features

---

## 🧾 User Guide

### For General Users
1. **Browse Tutorials**: Visit the homepage and click "Browse Tutorials"
2. **Search & Filter**: Use the search bar or category filters to find specific topics
3. **View Instructions**: Click on any tutorial card to see detailed step-by-step instructions
4. **Watch Videos**: Many tutorials include embedded instructional videos
5. **Real-time Info**: See how many others are currently viewing the same tutorial

### For Administrators
1. **Login**: Navigate to Admin Login and use your credentials
2. **Dashboard**: Access the admin dashboard to manage tutorials
3. **Create Tutorial**: Click "Add Tutorial" and fill out the comprehensive form
4. **Edit/Delete**: Use the action buttons in the tutorial table to modify content
5. **Validation**: The system provides real-time validation and error feedback

### Emergency Usage
- **Quick Access**: Bookmark frequently needed tutorials
- **Offline Preparation**: Review tutorials before emergencies occur
- **Mobile Ready**: Access from any device during emergencies
- **Clear Instructions**: Follow numbered steps in order
- **Emergency Services**: Always call 911 for serious emergencies

---

## 🙌 Contributing

We welcome contributions to FirstAidGuru! Here's how you can help:

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style and conventions
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting
- Keep commits focused and descriptive

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🧠 Author & Acknowledgments

**Developer**: Lucky Nakola – [@nakolaexpert](https://github.com/nakolaexpert)

### Acknowledgments
- Medical professionals who reviewed tutorial content
- Open source community for excellent tools and libraries
- First aid organizations for educational resources
- Beta testers who provided valuable feedback

---

## 📎 Final Submission Checklist

✅ **Deployed frontend** on Vercel  
✅ **Deployed backend** on Render  
✅ **GitHub repo** with commits and comprehensive documentation  
✅ **Real-time feature** implemented with Socket.io  
✅ **RESTful API** with JWT authentication  
✅ **Testing** implemented for both frontend and backend  
✅ **Video demo** and screenshots included  
✅ **Mobile-responsive** design with Tailwind CSS  
✅ **Admin dashboard** with full CRUD operations  
✅ **Search and filtering** functionality  

---

*This application was built as part of a MERN stack capstone project, demonstrating full-stack development skills including React, Node.js, Express, MongoDB, real-time features, testing, and deployment.*