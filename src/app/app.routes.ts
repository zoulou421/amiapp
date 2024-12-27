import { Routes } from '@angular/router';
import { HomeComponent } from './pages/auth/home/home.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { LogInComponent } from './pages/auth/log-in/log-in.component';
import { authGuard, publicGuard } from './core/guards';
import { AboutComponent } from './pages/auth/about/about.component';
import { SujetMemoireComponent } from './pages/auth/sujet-memoire/sujet-memoire.component';
import { RendezvousListComponent } from './pages/auth/rendezvous-list/rendezvous-list.component';
import { TemoignagesComponent } from './pages/auth/temoignages/temoignages.component';
import { PlagiatComponent } from './pages/auth/plagiat/plagiat.component';
import { PortfolioComponent } from './pages/auth/portfolio/portfolio.component';

export const routes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        component: HomeComponent,
    },
    {
        path: 'about',
        canActivate: [authGuard],
        component: AboutComponent,
    },
    {
        path: 'memoire',
        canActivate: [authGuard],
        component: SujetMemoireComponent,
    },

    {
        path: 'RendezvousList####',
        canActivate: [authGuard],
        component: RendezvousListComponent,
    },

    {
        path: 'Temoignages',
        canActivate: [authGuard],
        component: TemoignagesComponent,
    },

    {
        path: 'Plagiat',
        canActivate: [authGuard],
        component: PlagiatComponent,
    },

    {
        path: 'Portfolio',
        canActivate: [authGuard],
        component: PortfolioComponent,
    },
    
    {
        path: 'auth',
        canActivate: [publicGuard],
        children: [
            {
                path: 'sign-up',
                component: SignUpComponent,
            },
            {
                path: 'login-in',
                component: LogInComponent,
            },
        ],
    },
    {
        path: '**', // Route pour redirection en cas de chemin non trouvé
        redirectTo: '', // Redirection vers la page d'accueil
        pathMatch: 'full',
    },
];
