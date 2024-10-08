import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: 
  [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
      provideAnimationsAsync(), 
      provideFirebaseApp(() => initializeApp(
        { "projectId": "angular18auth", 
          "appId": "1:90710170117:web:77d9bb3d15205bf0d71a6c",
           "storageBucket": "angular18auth.appspot.com", 
           "apiKey": "AIzaSyA_Uu7zI0zyaNiTIpUflTIRHyJm7wzeRgg",
            "authDomain": "angular18auth.firebaseapp.com", 
            "messagingSenderId": "90710170117" 
        })), 
      provideAuth(() => getAuth()),
      { provide: LocationStrategy, useClass: HashLocationStrategy } // Use HashLocationStrategy
  ]
};



