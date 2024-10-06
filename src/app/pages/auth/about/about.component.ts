import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { SujetMemoireComponent } from '../sujet-memoire/sujet-memoire.component';


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
