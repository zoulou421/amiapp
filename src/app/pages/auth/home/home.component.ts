import { Component, inject, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports:  [MatToolbarModule,MatButtonModule, RouterLink],
  templateUrl: './home.component.html',
  /*template: `
  <mat-toolbar color="accent">
    <span>Home</span>
    <button mat-flat-button (click)="logOut()">Log out</button>
  </mat-toolbar>
`,*/
  styleUrl: './home.component.css'
  /*styles: [`
    mat-toolbar{
      display:flex;
      justify-content:space-between;
    }
  `]*/,
  
  
})
export class HomeComponent implements OnInit{
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
