import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, Router } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-sujet-memoire',
  standalone: true,
  imports: [MatToolbarModule,MatButtonModule, RouterLink,AboutComponent,HomeComponent],
  templateUrl: './sujet-memoire.component.html',
  styleUrl: './sujet-memoire.component.css'
})
export class SujetMemoireComponent implements OnInit{
  ngOnInit(): void {
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
