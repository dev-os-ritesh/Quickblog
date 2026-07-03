# ⚡ QuickBlog

<div align="center">

**An AI-powered, full-stack MERN blogging platform with Groq LLaMA content generation, rich-text editing, and a secure admin dashboard.**

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-quickblog.vercel.app-5044E5?style=for-the-badge)](https://quickblog-client.vercel.app/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express%205-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

</div>

---

## 📖 Overview

QuickBlog is a modern blogging platform built with the **MERN stack**, designed for speed, simplicity, and smart content creation. Writers can use the built-in **Groq AI (LLaMA 3.3 70B)** to auto-generate full blog post drafts from a simple prompt, craft and format posts with the **Quill rich-text editor**, and publish to the world in seconds. All images are automatically compressed and served in WebP format via **ImageKit** CDN.

The platform includes a fully protected **Admin Panel** for managing posts, moderating reader comments, and monitoring blog statistics from a live dashboard.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🧠 **AI Content Generation** | Generate full blog post drafts from a topic prompt using Groq LLaMA 3.3 70B |
| ✍️ **Rich Text Editor** | Format posts with Quill Editor — headings, bold, lists, links, and more |
| 🖼️ **Smart Image Hosting** | Upload images auto-optimized to WebP & served via ImageKit CDN |
| 📊 **Admin Dashboard** | View live stats: total blogs, drafts, and comment count at a glance |
| 💬 **Comment Moderation** | Readers submit comments; admin approves or deletes before they go live |
| 📝 **Draft / Publish Toggle** | Save posts as drafts and publish when ready with a single click |
| 🔐 **Secure Admin Auth** | JWT-based login to protect all admin routes and actions |
| 📰 **Newsletter Section** | Email subscription call-to-action section on the homepage |
| 📱 **Responsive Design** | Fully optimized for mobile, tablet, and desktop screens |
| 🎞️ **Smooth Animations** | Micro-animations powered by Motion (Framer Motion) for a premium feel |

---

## 🛠️ Tech Stack

### Frontend
- **[React 19](https://react.dev/)** — UI framework
- **[Vite](https://vitejs.dev/)** — Lightning-fast build tool
- **[React Router DOM v7](https://reactrouter.com/)** — Client-side routing
- **[Tailwind CSS v4](https://tailwindcss.com/)** — Utility-first styling
- **[Quill](https://quilljs.com/)** — Rich-text editor
- **[Marked](https://marked.js.org/)** — Markdown-to-HTML renderer
- **[Motion](https://motion.dev/)** — Animation library
- **[Axios](https://axios-http.com/)** — HTTP client
- **[React Hot Toast](https://react-hot-toast.com/)** — Notifications

### Backend
- **[Node.js](https://nodejs.org/) + [Express 5](https://expressjs.com/)** — REST API server
- **[MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)** — Database & ODM
- **[Multer](https://github.com/expressjs/multer)** — File upload middleware (memory storage, Vercel-safe)
- **[JWT](https://jwt.io/)** — Stateless authentication
- **[dotenv](https://github.com/motdotla/dotenv)** — Environment variable management

### Cloud & AI
- **[Groq API](https://groq.com/)** (`llama-3.3-70b-versatile`) — Ultra-fast AI content generation
- **[ImageKit](https://imagekit.io/)** — Real-time image optimization & CDN delivery
- **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)** — Cloud database

---

## 📁 Project Structure

```
QuickBlog/
├── client/                          # React Frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Admin/               # Admin UI components
│   │   │   │   ├── BlogTableItem.jsx
│   │   │   │   ├── CommentTableItem.jsx
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Sidebar.jsx
│   │   │   ├── BlogCard.jsx
│   │   │   ├── BlogList.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Newsletter.jsx
│   │   ├── pages/
│   │   │   ├── admin/               # Admin panel pages
│   │   │   │   ├── AddBlog.jsx      # Create / AI-generate posts
│   │   │   │   ├── Comments.jsx     # Moderate comments
│   │   │   │   ├── Dashboard.jsx    # Stats overview
│   │   │   │   ├── Layout.jsx       # Admin shell layout
│   │   │   │   └── ListBlog.jsx     # Manage all posts
│   │   │   ├── Blog.jsx             # Single blog post view
│   │   │   └── Home.jsx             # Public blog feed
│   │   ├── context/                 # React context (global state)
│   │   ├── index.css                # Tailwind + custom styles
│   │   └── App.jsx                  # Route definitions
│   ├── vercel.json                  # Vercel SPA routing config
│   └── package.json
│
└── server/                          # Express Backend API
    ├── configs/
    │   ├── db.js                    # MongoDB connection
    │   ├── gemini.js                # Groq AI API setup
    │   └── imageKit.js              # ImageKit SDK setup
    ├── controllers/
    │   ├── adminController.js       # Auth, dashboard, comment actions
    │   └── blogController.js        # Blog CRUD + AI generation
    ├── middleware/
    │   ├── auth.js                  # JWT auth middleware
    │   └── multer.js                # File upload (memory storage)
    ├── models/
    │   ├── Blog.js                  # Blog schema
    │   └── Comment.js               # Comment schema
    ├── routes/
    │   ├── adminRoutes.js
    │   └── blogRoutes.js
    ├── server.js                    # Express entry point
    ├── vercel.json                  # Vercel serverless config
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18+`
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster
- An [ImageKit](https://imagekit.io/) account
- A [Groq API Key](https://console.groq.com/) (free tier available)

---

### 1. Clone the Repository

```bash
git clone https://github.com/dev-os-ritesh/Quickblog.git
cd Quickblog
```

---

### 2. Configure Environment Variables

**`server/.env`**
```env
ADMIN_EMAIL=your-admin@example.com
ADMIN_PASSWORD=your-secure-password
JWT_SECRET=your-random-jwt-secret
MONGODB_URL=mongodb+srv://<user>:<pass>@cluster.mongodb.net
IMAGEKIT_PUBLIC_KEY=your-imagekit-public-key
IMAGEKIT_PRIVATE_KEY=your-imagekit-private-key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your-id
GROQ_API_KEY=your-groq-api-key
CLIENT_URL=http://localhost:5173
```

**`client/.env`**
```env
VITE_BACKEND_URL=http://localhost:3000
```

---

### 3. Start the Backend

```bash
cd server
npm install
npm run server     # Runs with nodemon (hot-reload)
```

Server starts at `http://localhost:3000`

---

### 4. Start the Frontend

```bash
cd client
npm install
npm run dev        # Vite dev server
```

Client starts at `http://localhost:5173`

---

## 🌐 Deployment (Vercel)

Both `client/` and `server/` are pre-configured for Vercel deployment as **two separate projects**.

### Step 1 — Deploy the Server
1. Go to [vercel.com](https://vercel.com) → **Add New Project** → Import your repo
2. Set **Root Directory** → `server`
3. Add all environment variables (see table below)
4. Deploy — note your server URL (e.g. `https://quickblog-server.vercel.app`)

#### Server Environment Variables for Vercel:
| Key | Value |
|---|---|
| `ADMIN_EMAIL` | Your admin email |
| `ADMIN_PASSWORD` | Your admin password |
| `JWT_SECRET` | A long random string |
| `MONGODB_URL` | Your MongoDB Atlas connection string |
| `IMAGEKIT_PUBLIC_KEY` | From ImageKit dashboard |
| `IMAGEKIT_PRIVATE_KEY` | From ImageKit dashboard |
| `IMAGEKIT_URL_ENDPOINT` | From ImageKit dashboard |
| `GROQ_API_KEY` | From [console.groq.com](https://console.groq.com/) |
| `CLIENT_URL` | Your frontend Vercel URL (set after Step 2) |

### Step 2 — Deploy the Client
1. Add New Project → Import same repo
2. Set **Root Directory** → `client`
3. Add `VITE_BACKEND_URL` = your server URL from Step 1
4. Deploy

### Step 3 — Wire Together
After the client is deployed, go back to the **server project** on Vercel:
- Add/update `CLIENT_URL` = your client's Vercel URL
- Redeploy the server

> **MongoDB Atlas**: Make sure your Atlas cluster has Network Access set to `0.0.0.0/0` so Vercel serverless functions can connect.

---

## 📡 API Reference

### Blog Routes (`/api/blog`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/all` | — | Fetch all published blogs |
| `GET` | `/:BlogId` | — | Fetch a single blog post |
| `POST` | `/add` | ✅ | Add a new blog (with image upload) |
| `POST` | `/delete` | ✅ | Delete a blog post |
| `POST` | `/togglePublish` | ✅ | Toggle draft / published status |
| `POST` | `/addComment` | — | Submit a comment for review |
| `POST` | `/comments` | — | Get approved comments for a blog |
| `POST` | `/generate` | ✅ | Generate content via Groq AI |

### Admin Routes (`/api/admin`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/login` | — | Admin login → returns JWT token |
| `GET` | `/blogs` | ✅ | Fetch all blogs including drafts |
| `GET` | `/comments` | ✅ | Fetch all pending/approved comments |
| `GET` | `/dashboard` | ✅ | Get dashboard stats |
| `POST` | `/deleteComment` | ✅ | Delete a comment |
| `POST` | `/approveComment` | ✅ | Approve a pending comment |

> ✅ = Requires `Authorization: Bearer <token>` header

---

## 📄 License

This project is licensed under the **ISC License**.

---

<div align="center">

Made with ❤️ by [dev-os-ritesh](https://github.com/dev-os-ritesh)

⭐ Star this repo if you found it helpful!

</div>
