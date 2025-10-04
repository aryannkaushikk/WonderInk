# WonderInk 📝

A simple blogging platform built with React where users can register, log in, create posts, and comment.  
It’s designed with a clean **purple theme**, smooth animations, and real-time updates (polling).

## Features
- 🔑 **Authentication** – Register, login, logout  
- 📝 **Posts** – Create, edit, delete posts  
- 💬 **Comments** – Add, edit, delete comments on posts  
- 🎨 **UI/UX** – Modern design with TailwindCSS, consistent purple theme  
- ⚡ **Live updates** – New posts appear with animation (via polling)  

## Tech Stack
- **Frontend**: React + Vite  
- **Styling**: TailwindCSS  
- **State/Auth**: React Context API (`AuthContext`)  
- **Routing**: React Router  
- **Backend**: Any REST API exposing endpoints for auth, posts, and comments  

## Getting Started

### Prerequisites
- Node.js 18+  
- npm or yarn  

### Setup
```bash
# Clone the repo
git clone https://github.com/yourusername/wonderink.git
cd blogify

# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser at `http://localhost:5173`.

## Environment Variables
Create a `.env` file in the project root with:

```bash
VITE_API=http://localhost:5000
```

Change the URL to point to your backend API.

## Folder Structure
```
src/
 ├─ components/   # Reusable UI components
 ├─ context/      # Auth context
 ├─ pages/        # Page-level components (Login, Register, Dashboard, Home)
 ├─ App.jsx       # Routes and app entry
 └─ main.jsx      # React root
```

## Roadmap
- ✅ Authentication (login/register)  
- ✅ Posts CRUD  
- ✅ Comments CRUD  
- 🔄 Rich text editor for posts  
- 🔄 Image upload  
- 🔄 Likes & reactions  

## License
MIT
