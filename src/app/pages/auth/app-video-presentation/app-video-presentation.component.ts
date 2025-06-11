import { Component } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-app-video-presentation',
  standalone: true,
  imports: [],
  templateUrl: './app-video-presentation.component.html',
  styleUrl: './app-video-presentation.component.css'
})
export class AppVideoPresentationComponent {
  // Utilise bien le lien embed YouTube, pas le lien watch
  videoUrl = 'https://www.youtube.com/embed/oNlRmM6Rojw?si=3PYiMTkzlZTcY_uM';
  safeVideoUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
  }
}
