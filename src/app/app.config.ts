import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import {provideAuth , getAuth} from '@angular/fire/auth';
import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: "AIzaSyAOCuprpn5F_0DdhCNV7QTaUACi94kabR4",
  authDomain: "auth-angular-project-91bd1.firebaseapp.com",
  projectId: "auth-angular-project-91bd1",
  storageBucket: "auth-angular-project-91bd1.firebasestorage.app",
  messagingSenderId: "518064970627",
  appId: "1:518064970627:web:6b379c7f90c47332c8b4b6"
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideFirebaseApp(() => initializeApp(firebaseConfig)),
     provideAuth(()=>getAuth()),
    provideFirestore(() => getFirestore()),
  ]
};
