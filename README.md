# 🔥 Firebase React TypeScript Application

A modern web application built with **React**, **TypeScript**, **Firebase**, and **Tailwind CSS** that includes authentication system, protected routes, and scalable architecture.

## 📋 Project Description

This is a full-stack application that combines frontend development best practices with Firebase backend services. The application includes:

- **Complete authentication system** with Google OAuth
- **Protected routes** for administrative areas
- **Modular architecture** with separate layouts
- **Modern UI** with Tailwind CSS and DaisyUI
- **TypeScript** for enhanced robustness and scalability

## 🚀 Implemented Technologies

### Frontend Core
- **React 19.1.0** - User interface library
- **TypeScript** - Static typing for JavaScript
- **Vite** - Fast build tool
- **React Router v7** - Navigation and routing

### Backend Services
- **Firebase 9.23.0** - Application development platform
  - Firebase Authentication (Google Authentication)
  - Firestore Database (NoSQL database)
  - Firebase Storage (File storage)
- **ReactFire 4.2.3** - React hooks for Firebase

### Styling and UI
- **Tailwind CSS v4.1.11** - Utility-first CSS framework
- **DaisyUI 5.0.50** - UI components for Tailwind
- **@tailwindcss/vite** - Vite plugin for Tailwind

### Development Tools
- **ESLint** - Linter for JavaScript/TypeScript code
- **TypeScript ESLint** - TypeScript-specific rules
- **React Hooks ESLint** - Rules for React hooks

## 🏗️ Project Architecture

### Folder Structure
```
src/
├── config/           # Firebase configuration
│   ├── firebase.ts
│   └── FirebaseServices.tsx
├── layout/           # Application layouts
│   ├── RootLayout.tsx
│   ├── PublicLayout.tsx
│   ├── AdminLayout.tsx
│   └── AuthLayout.tsx
├── pages/            # Application pages
│   ├── public/       # Public pages
│   ├── admin/        # Protected pages
│   └── auth/         # Authentication pages
└── assets/           # Static resources
```

### Routing System
- **Public Routes** (`/`): Accessible without authentication
- **Authentication Routes** (`/auth/*`): Login and registration
- **Administrative Routes** (`/admin/*`): Protected, require authentication

### Implemented Layouts
1. **RootLayout**: Base layout wrapping the entire application
2. **PublicLayout**: For public pages
3. **AuthLayout**: For authentication pages
4. **AdminLayout**: With route protection and authentication verification

## 🔐 Authentication System

### Implemented Features
- **Google OAuth Authentication**: Using Firebase Auth
- **Route protection**: `useSigninCheck` hook from ReactFire
- **State management**: Loading, authenticated, unauthenticated
- **Automatic redirection**: To login if not authenticated

### Authentication Pages
- **LoginPage**: Login page
- **RegisterPage**: Registration with Google OAuth

## 🎨 Styling System

### Tailwind CSS v4 Configuration
- **Native CSS variables**: Automatic generation
- **DaisyUI**: Pre-built components
- **Optimized configuration**: Integrated Vite plugin

### UI Components
- Buttons with DaisyUI styles
- Responsive layout
- Tailwind utility classes

## 🛠️ Environment Setup

### Required Environment Variables
```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGE_SENDER=
VITE_FIREBASE_APP_ID=
```

### Available Scripts
```bash
npm run dev      # Development server
npm run build    # Production build
npm run lint     # Code analysis
npm run preview  # Build preview
```

## 🔧 Firebase Configuration

### Enabled Services
1. **Firebase Authentication**
2. **Firestore Database**
3. **Firebase Storage**

### ReactFire Configuration
- **FirebaseAppProvider**: Main application provider
- **AuthProvider**: Authentication provider
- **FirestoreProvider**: Database provider
- **StorageProvider**: Storage provider

## 📦 Installation and Execution

### Prerequisites
- Node.js (LTS version recommended)
- npm or yarn
- Configured Firebase project

### Installation Steps
1. **Clone the repository**
   ```bash
   git clone https://github.com/AndHoyosGarzon/TS_React_firebase.git
   cd firebase_react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Create .env file and add Firebase variables
   ```

4. **Run in development**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173/
   ```

## 🔮 Future Features

### Upcoming Implementations
- [ ] Custom authentication forms
- [ ] Role and permission system
- [ ] Complete administrative dashboard



**Developed with ❤️ using the latest React and Firebase technologies**