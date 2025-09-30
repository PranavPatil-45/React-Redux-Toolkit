💬 WhatsApp Web Clone - React Redux Toolkit & Firebase
<div align="center">
https://img.shields.io/badge/React-18.2.0-blue?logo=react
https://img.shields.io/badge/Redux_Toolkit-1.9.7-purple?logo=redux
https://img.shields.io/badge/Firebase-9.23.0-orange?logo=firebase
https://img.shields.io/badge/React_Router-6.8.0-red?logo=reactrouter

A real-time chat application built with React, Redux Toolkit, and Firebase that mimics WhatsApp Web's functionality and design.

https://img.shields.io/badge/%F0%9F%9A%80_Live_Demo-Click_Here-green?style=for-the-badge
https://img.shields.io/badge/%F0%9F%90%9B_Report_Bug-Github_Issues-yellow?style=for-the-badge
https://img.shields.io/badge/%F0%9F%92%A1_Request_Feature-Github_Issues-lightgrey?style=for-the-badge

</div>
📸 Screenshots
<div align="center">
Sign In Page	Chat Interface	User List
https://via.placeholder.com/300x200/667eea/ffffff?text=Sign+In	https://via.placeholder.com/300x200/00a884/ffffff?text=Chat+UI	https://via.placeholder.com/300x200/111b21/ffffff?text=User+List
</div>
✨ Features
🔐 Authentication
✅ Google Authentication - Sign in with Google account

✅ Email/Password - Traditional email and password signup/login

✅ Secure Sessions - Persistent login state with Firebase Auth

✅ Protected Routes - Automatic redirect based on auth status

💬 Real-time Chat
⚡ Instant Messaging - Real-time message delivery

👥 User List - See all registered users

🔍 Search Users - Find users by name or email

💾 Message History - All chats stored in Firebase Firestore

🕒 Timestamps - Message time tracking

🎨 User Interface
🎯 WhatsApp-like Design - Familiar and intuitive interface

🌙 Dark Theme - Eye-friendly dark mode

📱 Responsive Design - Works on different screen sizes

⚡ Fast Loading - Optimized performance with Redux Toolkit

🛠️ Tech Stack
Frontend
React 18 - UI framework

Redux Toolkit - State management

React Router v6 - Navigation

CSS3 - Styling and animations

Backend & Database
Firebase Authentication - User management

Cloud Firestore - Real-time database

Firebase Security Rules - Data protection

Development Tools
Vite - Build tool and dev server

ESLint - Code linting

Git - Version control

🚀 Quick Start
Prerequisites
Node.js (v16 or higher)

npm or yarn

Firebase account

Installation
Clone the repository

bash
git clone https://github.com/PranavPatil-45/React-Redux-Toolkit.git
cd React-Redux-Toolkit/Chat-App
Install dependencies

bash
npm install
# or
yarn install
Firebase Configuration

Create a new Firebase project at Firebase Console

Enable Authentication (Email/Password & Google)

Create a Firestore Database

Copy your Firebase config

Environment Setup
Create a .env file in the root directory:

env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
Start Development Server

bash
npm run dev
# or
yarn dev
Open your browser
Navigate to http://localhost:5173

