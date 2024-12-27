import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports:[RouterLink],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  // Exemple de tableau d'applications professionnelles
  applications = [
    { title: 'Application 1', description: 'Gestion des utilisateurs', imgSrc: 'assets/images/app1.jpg' },
    { title: 'Application 2', description: 'Application mobile de gestion de tâches', imgSrc: 'assets/images/app2.jpg' },
    { title: 'Application 3', description: 'Système de gestion d’inventaire', imgSrc: 'assets/images/app3.jpg' },
    // Vous pouvez ajouter plus d'applications ici
  ];

  // Fonction pour charger plus d'applications
  loadMoreApplications() {
    const moreApps = [
      { title: 'Application 4', description: 'Plateforme d’e-commerce', imgSrc: 'assets/images/app4.jpg' },
      { title: 'Application 5', description: 'Outil de gestion de projet', imgSrc: 'assets/images/app5.jpg' },
      { title: 'Application 6', description: 'Système de réservation en ligne', imgSrc: 'assets/images/app6.jpg' },
    ];

    // Ajouter les nouvelles applications au tableau existant
    this.applications.push(...moreApps);
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

