
# 🏌️ GolfImpact

GolfImpact is a **full-stack MERN application** that simulates a score-based lottery and reward system with real-world features like authentication, payments, and role-based access.

---

## 🚀 Live Demo

🌐 Frontend: https://golf-imapct.vercel.app/

---

## 🎯 Features

### 🔐 Authentication
- User Registration & Login (JWT-based)
- Secure password hashing using bcrypt
- Persistent login using token storage

### 👤 User Dashboard
- Add and manage scores
- View latest scores and history
- View rewards and claim earnings
- Subscription status tracking

### 👑 Admin Panel
- Role-based access control
- Run lottery draws
- Generate random numbers
- Automatically determine winners

### 🏆 Reward System
- Match user scores with draw numbers
- Assign rewards dynamically
- Claim system with status tracking

### 💳 Stripe Integration
- Subscription-based model
- Secure payment flow using Stripe Checkout
- Automatic subscription activation after success

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- JWT Authentication

### Tools & Deployment
- Vercel (Frontend)
- Render (Backend)
- Postman (API Testing)

---

## 🔐 Demo Credentials

### 👤 User
Email: user@test.com  
Password: user123

### 👑 Admin
Email: admin@test.com  
Password: admin123 

---

## 🔄 Application Flow

1. User registers and logs in
2. User adds scores
3. Admin runs draw
4. System checks matches and assigns rewards
5. Users claim rewards
6. Users can subscribe via Stripe for premium features

---

## 🧠 Key Concepts Implemented

- RESTful API Design
- JWT Authentication & Authorization
- Role-Based Access Control
- Payment Gateway Integration
- State Management in React
- Secure Deployment Practices

---

## ⚠️ Challenges Solved

- CORS issues between frontend and backend
- MongoDB Atlas connection (IP whitelisting)
- Stripe redirect handling
- Deployment bugs on Vercel & Render
- Environment variable management

---

## 📌 Future Improvements

- Admin dashboard analytics
- Email notifications
- Multi-tier subscription plans
- Real-time updates using WebSockets

---

## 👨‍💻 Author

Samir Shaikh  
📧 samirshaikh050505@gmail.com  

---

## ⭐ Final Note

This project demonstrates the ability to build a **production-ready full-stack system** with real-world features including authentication, payments, and role management.
