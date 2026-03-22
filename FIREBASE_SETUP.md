# Firebase Setup Guide

This guide will help you set up Firebase authentication for Gold Rush.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name: `Gold Rush`
4. Click **Create project**
5. Wait for the project to initialize (1-2 minutes)

## Step 2: Enable Authentication

1. In the Firebase Console, go to **Authentication**
2. Click **Get Started**
3. Click **Email/Password**
4. Toggle **Enable** and click **Save**

## Step 3: Get Your Firebase Config

1. Go to **Project Settings** (gear icon in top left)
2. Scroll to **Your apps** section
3. Click **Web** icon (looks like `</>`), or create a web app
4. Register with any app name (e.g., "Gold Rush Web")
5. Copy the Firebase config

Example config structure:
```javascript
{
  apiKey: "ABC123...",
  authDomain: "gold-rush-xxx.firebaseapp.com",
  projectId: "gold-rush-xxx",
  storageBucket: "gold-rush-xxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123..."
}
```

## Step 4: Add to Your .env File

Create a `.env` file in the root directory (copy from `.env.example`):

```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

Replace each value with what you copied from Firebase Console.

## Step 5: Install Dependencies and Run

```bash
npm install
npm start
```

## Step 6: Test It Out

1. Click **Sign Up** to create an account
2. Enter:
   - Outlaw Name (optional)
   - Email address
   - Password (minimum 6 characters)
3. Click **Sign Up**
4. You should be logged in and see the dashboard!

## For Production

When you're ready to deploy:

1. Go to **Authentication** in Firebase Console
2. Click **Settings** tab
3. Under **Authorized domains**, add your deployed domain
4. Update `.env` with production credentials

## Troubleshooting

**"Firebase config is not defined"**
- Make sure your `.env` file has all 6 Firebase variables
- Restart the app after updating `.env`

**"Authentication is not enabled"**
- Go to Firebase Console → Authentication → Enable Email/Password

**"Email already in use"**
- That email is already registered. Use a different email or click "Log in"

---

**Need help?** Check the [Firebase docs](https://firebase.google.com/docs/auth)
