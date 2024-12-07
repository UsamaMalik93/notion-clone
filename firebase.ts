import {initializeApp, getApps , getApp} from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDZEy15FnlQ7hotbBx4zHHwXNTuUdG26fI",
  authDomain: "notion-3a86f.firebaseapp.com",
  projectId: "notion-3a86f",
  storageBucket: "notion-3a86f.firebasestorage.app",
  messagingSenderId: "37126171252",
  appId: "1:37126171252:web:98a377dac911591c5c3f21",
  measurementId: "G-2SBXRQT90L"
};

const app =getApps().length===0 ? initializeApp(firebaseConfig) :getApp();
const db=getFirestore(app)

export {db}