// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCfqbP88lvbzLc_n8I9uA_CZE9PaCOifIw",
  authDomain: "gameplanai-3fe07.firebaseapp.com",
  projectId: "gameplanai-3fe07",
  storageBucket: "gameplanai-3fe07.firebasestorage.app",
  messagingSenderId: "321563341183",
  appId: "1:321563341183:web:608f5cfc66f1b12e1f6a4a",
  measurementId: "G-1QYVWJDTFL"
};

const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
export default app;