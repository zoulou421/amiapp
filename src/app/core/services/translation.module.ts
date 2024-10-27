// src/core/services/translation.module.ts

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CustomTranslateLoader } from './translate.loader'; // Adjust path as needed

@NgModule({
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader // Use your custom loader
      }
    })
  ],
  exports: [TranslateModule]
})
export class TranslationModule {}
