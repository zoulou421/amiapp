import { Component, inject } from '@angular/core';
import { SafeUrlPipe } from '../../../pipes/safe-url.pipe';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-temoignages',
  standalone: true,
  imports: [SafeUrlPipe,CommonModule,RouterLink], // Ajout du pipe dans les imports
  templateUrl: './temoignages.component.html',
  styleUrls: ['./temoignages.component.css'],
})
export class TemoignagesComponent {
  videos = [
    {
      title: 'Témoignage de Jean Dupont',
      description: 'Jean parle de son expérience avec notre nous.',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
    {
      title: 'Témoignage de Marie Curie',
      description: 'Marie partage comment elle a réussi avec nous.',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
    {
      title: 'Témoignage de Marie Curie',
      description: 'Marie partage comment elle a réussi avec nous.',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
    {
      title: 'Témoignage de Marie Curie',
      description: 'Marie partage comment elle a réussi avec nous.',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
    {
      title: 'Témoignage de Marie Curie',
      description: 'Marie partage comment elle a réussi avec nous.',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
    {
      title: 'Témoignage de Marie Curie',
      description: 'Marie partage comment elle a réussi avec nous.',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
    {
      title: 'Témoignage de Marie Curie',
      description: 'Marie partage comment elle a réussi avec nous.',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
    {
      title: 'Témoignage de Marie Curie',
      description: 'Marie partage comment elle a réussi avec nous.',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
    {
      title: 'Témoignage de Marie Curie',
      description: 'Marie partage comment elle a réussi avec nous.',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
    
    
  ];

  hasMoreVideos = true;

  loadMoreVideos() {
    console.log('Chargement de plus de vidéos...');
  }

    private _router = inject(Router);
    private authservice = inject(AuthService);
  
    async logOut(): Promise<void> {
      try {
        await this.authservice.logOut();
        this._router.navigateByUrl('/auth/login-in');
      } catch (error) {
        console.log(error);
      }
    }
}
