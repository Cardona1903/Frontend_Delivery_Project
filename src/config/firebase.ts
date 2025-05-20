// src/config/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Tu configuración de Firebase (obtenida del panel de Firebase)
const firebaseConfig = {
    apiKey: "AIzaSyB6WZxP1cLjN_GjeNrIagoHnJqXD51OyRQ",
    authDomain: "deliveryproject-2943c.firebaseapp.com",
    projectId: "deliveryproject-2943c",
    storageBucket: "deliveryproject-2943c.firebasestorage.app",
    messagingSenderId: "756506304517",
    appId: "1:756506304517:web:89a79e5c6cbd173d23fc6c",
    measurementId: "G-P8QWP1LGPF"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar auth y provider para usarlos en la aplicación
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();