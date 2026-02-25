# ✦ Santhosh's AI Chat

A sleek, full-stack AI chat application inspired by ChatGPT - built from scratch. Supports real-time AI conversations, voice input, image uploads, multi-chat management, and Firebase-powered auth.

![Tech Stack](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?style=flat-square&logo=react)
![Backend](https://img.shields.io/badge/Backend-Python%20%2B%20FastAPI-009688?style=flat-square&logo=fastapi)
![Auth](https://img.shields.io/badge/Auth-Firebase-FFCA28?style=flat-square&logo=firebase)
![AI](https://img.shields.io/badge/AI-OpenRouter-6366f1?style=flat-square)
![Deploy](https://img.shields.io/badge/Deployed-Netlify%20%2B%20Render-00C7B7?style=flat-square&logo=netlify)

---

## 🚀 Live Demo

🔗 **https://santhosh-aiagent.netlify.app/

---

## ✨ Features

- 🤖 **AI Chat** — Powered by OpenRouter (supports multiple LLMs)
- 🔐 **Authentication** — Firebase Auth with Google Sign-In + Email/Password
- 🎙️ **Voice Input** — Web Speech API for hands-free messaging
- 🖼️ **Image Uploads** — Send images and ask the AI about them
- 💬 **Multi-Chat** — Create, switch, rename, and delete conversations
- 🌙 **Dark / Light Mode** — Toggle between themes
- 📱 **Mobile-First** — Fully responsive with iOS keyboard fix via `visualViewport` API
- 👤 **Guest Mode** — 5 free messages before login is required
- 📋 **Copy Messages** — One-click copy for AI responses

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React, Vite |
| **Backend** | Python (FastAPI / Flask) |
| **AI Provider** | [OpenRouter](https://openrouter.ai) |
| **Auth** | Firebase Authentication |
| **Frontend Deploy** | [Netlify](https://netlify.com) |
| **Backend Deploy** | [Render](https://render.com) |
| **Styling** | Inline CSS + DM Sans font |

---

## 📁 Project Structure

```
├── frontend/                  # React + Vite app
│   ├── src/
│   │   ├── App.jsx            # Root component & auth state
│   │   ├── ChatPage.jsx       # Main chat UI
│   │   ├── AuthPage.jsx       # Login / Sign-up page
│   │   └── firebase.js        # Firebase config
│   └── vite.config.js
│
└── backend/                   # Python API server
    └── main.py                # /chat endpoint → OpenRouter
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- Python 3.10+
- Firebase project
- OpenRouter API key

---

### 1. Clone the repo

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

---

### 2. Backend Setup

```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

Run locally:

```bash
python main.py
```

The backend will start at `http://localhost:8000`.

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_BACKEND_URL=http://localhost:8000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_APP_ID=your_app_id
```

Run locally:

```bash
npm run dev
```

---

### 4. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable **Authentication** → Sign-in methods → **Email/Password** and **Google**
4. Copy your Firebase config values into the `.env` file above

---

## 🌐 Deployment

### Frontend → Netlify

1. Push your frontend to GitHub
2. Connect repo to [Netlify](https://netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add your environment variables in Netlify's dashboard

### Backend → Render

1. Push your backend to GitHub
2. Create a new **Web Service** on [Render](https://render.com)
3. Set start command: `python main.py` (or `uvicorn main:app`)
4. Add your `OPENROUTER_API_KEY` as an environment variable

---


| Dark Mode | Light Mode |
|---|---|
| ![dark](./screenshots/dark.png) | ![light](./screenshots/light.png) |

---

## 🔮 Roadmap

- [ ] Persistent chat history (Firestore)
- [ ] Model selector (GPT-4, Claude, Gemini)
- [ ] Markdown rendering with syntax highlighting
- [ ] Export chat as PDF
- [ ] Mobile app (React Native)

---

## 👨‍💻 Author

**Santhosh**  
Built with Passion ♥.

<p align="center">Made with ✦ by Santhosh</p>
