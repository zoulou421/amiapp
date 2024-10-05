import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SujetMemoireComponent } from '../sujet-memoire/sujet-memoire.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, RouterLink, SujetMemoireComponent, HomeComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']  // Corrected "styleUrl" to "styleUrls"
})
export class AboutComponent implements OnInit {
  private _router = inject(Router);
  private authservice = inject(AuthService);

  ngOnInit(): void {
    // Initialization logic can go here
  }

  async logOut(): Promise<void> {
    try {
      await this.authservice.logOut();
      this._router.navigateByUrl('/auth/login-in');
    } catch (error) {
      console.log(error);
    }
  }
}
