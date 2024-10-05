import { Routes } from '@angular/router';
import { HomeComponent } from './pages/auth/home/home.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { LogInComponent } from './pages/auth/log-in/log-in.component';
import { authGuard, publicGuard } from './core/guards';
import { AboutComponent } from './pages/auth/about/about.component';
import { SujetMemoireComponent } from './pages/auth/sujet-memoire/sujet-memoire.component';

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
];
