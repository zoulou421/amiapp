/// <reference types="@angular/localize" />


import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
