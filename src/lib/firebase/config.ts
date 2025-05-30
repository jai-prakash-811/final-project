// IMPORTANT: This is a placeholder for Firebase configuration.
// In a real project, replace with your actual Firebase config and initialize Firebase App.
// Example:
// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
//
// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID"
// };
//
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const auth = getAuth(app);
//
// export { app, auth };

// For scaffolding and demonstration purposes, we export mock objects.
// These do not connect to Firebase.
export const firebaseConfig = {
  apiKey: "AIzaSyYOUR_API_KEY_HERE_MOCK",
  authDomain: "your-project-id.firebaseapp.com_MOCK",
  projectId: "your-project-id_MOCK",
  storageBucket: "your-project-id.appspot.com_MOCK",
  messagingSenderId: "your-sender-id_MOCK",
  appId: "your-app-id_MOCK",
};

export const app = {
  // Mock Firebase App object
  name: "[DEFAULT]",
  options: firebaseConfig,
  automaticDataCollectionEnabled: false,
};

export const auth = {
  // Mock Firebase Auth object
  // Add mock methods if needed for type compatibility in deeper integrations
  // For example:
  // onAuthStateChanged: (callback: (user: any) => void) => {
  //   console.warn("Firebase Auth Mock: onAuthStateChanged called. No actual auth state changes will be emitted.");
  //   // To simulate, you could call callback(null) or callback({ uid: 'mockUser', email: 'mock@example.com' })
  //   return () => {}; // Return an unsubscribe function
  // },
  // signInWithEmailAndPassword: async (email, password) => { /* mock */ },
  // createUserWithEmailAndPassword: async (email, password) => { /* mock */ },
  // signOut: async () => { /* mock */ },
};

// Note: The AuthProvider in this scaffold uses its own mock user management (localStorage based)
// and does not rely on this mock auth object's methods.
// This file is primarily for structural completeness and to allow imports.
