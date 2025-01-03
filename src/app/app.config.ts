// app.config.ts

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { CustomTranslateLoader } from './core/services/translate.loader'; // Ensure correct path

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp({
      projectId: "angular18auth",
      appId: "1:90710170117:web:77d9bb3d15205bf0d71a6c",
      storageBucket: "angular18auth.appspot.com",
      apiKey: "AIzaSyA_Uu7zI0zyaNiTIpUflTIRHyJm7wzeRgg",
      authDomain: "ami-platform.com",
      messagingSenderId: "90710170117"
    })),
    provideAuth(() => getAuth()), // Provides Firebase Authentication service
    provideFirestore(() => getFirestore()), // Provides Firebase Firestore service
    provideStorage(() => getStorage()), // Provides Firebase Storage service
    { provide: LocationStrategy, useClass: HashLocationStrategy } // Use HashLocationStrategy
  ]
};

// This is where you can configure your translation directly
// If using standalone components, import TranslationModule in each component where you need translation
//authDomain: "angular18auth.firebaseapp.com" angular18auth.firebaseapp.com replace by 
