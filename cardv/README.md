# vCard QR Generator - Professional Edition

A professional vCard QR code generator with authentication, allowing users to create and manage digital business cards.

## Features

✅ **Landing Page** - Beautiful landing page with sign in/sign up
✅ **Google Authentication** - Sign in with Google
✅ **Email/Password Auth** - Traditional authentication
✅ **Protected Routes** - Secure access to card creation
✅ **vCard Creator** - Create professional digital business cards
✅ **QR Code Generation** - Generate scannable QR codes
✅ **Customizable Design** - Choose colors and themes
✅ **Live Preview** - See changes in real-time

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password
   - Enable Google Sign-in
4. Get your Firebase config:
   - Go to Project Settings > General
   - Scroll to "Your apps" section
   - Copy the Firebase configuration

5. Update `src/firebase.js` with your Firebase credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 3. Run the Application

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

## Project Structure

```
cardv/
├── src/
│   ├── components/
│   │   └── ProtectedRoute.jsx    # Route protection
│   ├── context/
│   │   └── AuthContext.jsx       # Authentication state
│   ├── pages/
│   │   ├── Landing.jsx            # Landing page with auth
│   │   └── CreateCard.jsx         # vCard creation page
│   ├── styles/
│   │   └── Landing.css            # Landing page styles
│   ├── firebase.js                # Firebase configuration
│   ├── main.jsx                   # App entry point
│   └── index.css                  # Global styles
├── package.json
└── README.md
```

## Usage

1. **Sign Up/Sign In**: Create an account or sign in with Google
2. **Create vCard**: Fill in your contact information
3. **Customize**: Choose colors and add profile image
4. **Preview**: See live preview on mobile mockup
5. **Generate QR**: Switch to QR view to see your QR code
6. **Save**: Save your vCard for future use

## Technologies Used

- React 19
- Vite
- Firebase (Auth, Firestore, Storage)
- React Router DOM
- QRCode.react
- Lucide React Icons

## License

MIT
