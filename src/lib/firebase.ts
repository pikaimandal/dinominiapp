// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCUrL4JbNEfaElTrYTPmc1Lq_6o7mU1yt0",
    authDomain: "dinoworldcoin.firebaseapp.com",
    projectId: "dinoworldcoin",
    storageBucket: "dinoworldcoin.firebasestorage.app",
    messagingSenderId: "515948974888",
    appId: "1:515948974888:web:1f3ad0bb7dc0b2384df61d",
    measurementId: "G-SVFEE8QV36"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
