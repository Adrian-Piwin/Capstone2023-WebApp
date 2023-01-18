import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBQ7qHjjGSYgX2dBbYSaIlIjzkyCS-6K24",
    authDomain: "capstone2023-83950.firebaseapp.com",
    databaseURL: "https://capstone2023-83950-default-rtdb.firebaseio.com",
    projectId: "capstone2023-83950",
    storageBucket: "gs://capstone2023-83950.appspot.com",
    messagingSenderId: "266546915325",
    appId: "1:266546915325:web:bc705fa0d46d06df5e9b94",
    measurementId: "G-HX6Z022EJK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);

export const loginUsername = "admin"
export const loginPassword = "test123"