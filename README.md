# 💄 Becky Beauty Boutique

An e-commerce platform built with the MERN stack for makeup and beauty lovers. Becky Beauty Boutique offers a sleek, responsive UI with a secure backend, real-time functionality, and fully integrated cart, wishlist, and order management.

> ✅ Complete full-stack deployment with backend, frontend, real-time communication, authentication, API, testing, and documentation.

---

## 🚀 Live Demo

- 🌐 Frontend:  
- 📡 Backend: [https://becky-beauty-botique-1.onrender.com](https://becky-beauty-botique-1.onrender.com)
---

## 📂 Project Directory Structure

```bash
├── .next/
├── app/
│   ├── cart/page.tsx
│   ├── contact/page.tsx
│   ├── cookies/page.tsx
│   ├── faq/page.tsx
│   ├── FindYourFit/page.tsx
│   ├── login/page.tsx
│   ├── orders/page.tsx
│   ├── privacy/page.tsx
│   ├── products/page.tsx
│   ├── profile/page.tsx
│   ├── returns/page.tsx
│   ├── shipping/page.tsx
│   ├── signup/page.tsx
│   ├── terms/page.tsx
│   ├── wishlist/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── backend/
│   ├── middleware/auth.js
│   ├── models/
│   │   ├── Cart.js
│   │   ├── Order.js
│   │   ├── Product.js
│   │   ├── User.js
│   │   └── Wishlist.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── cart.js
│   │   ├── orders.js
│   │   ├── products.js
│   │   ├── profile.js
│   │   └── wishlist.js
│   ├── .gitignore
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── seedData.js
│   └── server.js
├── components/
│   ├── ui/
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── ProductCard.tsx
│   └── theme-provider.tsx
├── contexts/
│   ├── AuthContext.tsx
│   └── CartContext.tsx
├── hooks/
├── lib/
├── public/
├── styles/
├── .gitignore
├── components.json
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```
---

## 🧠 Project Overview

Name: Becky Beauty Boutique
Category: E-Commerce Platform
Purpose: Sell beauty & makeup products with full online shop experience
Core Features:
-Product browsing & filtering
-Shopping cart & checkout flow
-Wishlist & profile management
-Authentication (login/signup)
-Admin product management
-Real-time confirmation via Socket.io
-Mobile-friendly responsive design

---

## 🛠️ Tech Stack

### Frontend
-React + Vite
-TailwindCSS
-React Router
-Axios
-Socket.io-client

### Backend
-Express.js
-MongoDB Atlas
-Mongoose
-Socket.io
-JWT for auth
-dotenv, helmet, morgan

### Testing
-Jest
-Supertest
-React Testing Library

### Deployment
-Render (Frontend + Backend)

---
## 📐 Architecture Overview
```
Frontend (React/Vite)
│
├── Pages (app directory with Next.js routing)
├── Contexts for Auth & Cart
├── Components (Header, Footer, ProductCard)
└── Socket.io-client for real-time features

Backend (Express)
│
├── Routes (auth, cart, wishlist, products, etc.)
├── Middleware (auth, error handling)
├── Models (Mongoose schemas)
└── Socket.io Server for notifications
```
 ---

 ## 🧾 API Endpoints
 Base URL
```
https://becky-beauty-api.onrender.com/api
```
| Method | Endpoint         | Description             |
|--------|------------------|-------------------------|
| GET    | /products        | Get all products        |
| POST   | /products        | Create new product (Admin) |
| POST   | /auth/register   | User registration       |
| POST   | /auth/login      | User login              |
| GET    | /cart            | Get user's cart         |
| POST   | /cart            | Add to cart             |
| GET    | /wishlist        | Get wishlist items      |
| POST   | /wishlist        | Add to wishlist         |


---
# 🧭 Roadmap

-Mockups & UI planning
-DB schema design
-Full RESTful API
-Real-time cart/order confirmation
-Secure JWT auth
-Testing & debugging
-Deployment
-Admin dashboard enhancements
-Payment gateway integration

---
 👩🏽‍💻 Created by Mahoro Belyse








