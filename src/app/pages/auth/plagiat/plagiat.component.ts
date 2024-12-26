/*
THE FIRST CODE COMMENTED IS OK:

import { CommonModule } from '@angular/common';
import { Component, inject, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-plagiat',
  templateUrl: './plagiat.component.html',
  styleUrls: ['./plagiat.component.css'],
  standalone:true,
   imports: [
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatButtonModule,
      RouterModule,
      ReactiveFormsModule,
      CommonModule,
      FormsModule
      
    ]
})
export class PlagiatComponent {
  textInput: string = ''; // For manual text input
  selectedFile: File | null = null; // For uploaded file
  result: { plagiarismDetected: boolean, similarityPercentage: number } | null = null;

  private _router = inject(Router);
  private authservice = inject(AuthService);

  // Handle file selection
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // Simulate plagiarism detection
  analyzeText(): void {
    // For demonstration, just use a mock result
    if (this.textInput || this.selectedFile) {
      this.result = {
        plagiarismDetected: Math.random() > 0.5, // Randomly decide if plagiarism is detected
        similarityPercentage: Math.random() * 100 // Random similarity percentage
      };
    } else {
      alert('Veuillez entrer du texte ou télécharger un fichier.');
    }
  }

  async logOut(): Promise<void> {
    try {
      await this.authservice.logOut();
      this._router.navigateByUrl('/auth/login-in');
    } catch (error) {
      console.log(error);
    }
  }
}*/


import { CommonModule } from '@angular/common';
import { Component, inject, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-plagiat',
  templateUrl: './plagiat.component.html',
  styleUrls: ['./plagiat.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ]
})
export class PlagiatComponent {
  textInput: string = ''; // For manual text input
  selectedFile: File | null = null; // For uploaded file
  isLoading: boolean = false; // Loading state for analysis
  result: { plagiarismDetected: boolean, similarityPercentage: number } | null = null;

  private _router = inject(Router);
  private authservice = inject(AuthService);

  // Handle file selection
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // Simulate plagiarism detection
  analyzeText(): void {
    if (this.textInput || this.selectedFile) {
      this.isLoading = true; // Start loading animation
      setTimeout(() => {
        this.result = {
          plagiarismDetected: Math.random() > 0.5, // Randomly decide if plagiarism is detected
          similarityPercentage: Math.random() * 100 // Random similarity percentage
        };
        this.isLoading = false; // Stop loading animation
      }, 2000); // Simulated delay of 2 seconds
    } else {
      alert('Veuillez entrer du texte ou télécharger un fichier.');
    }
  }

  // Reset form and results
  reset(): void {
    this.textInput = '';
    this.selectedFile = null;
    this.result = null;
  }

  async logOut(): Promise<void> {
    try {
      await this.authservice.logOut();
      this._router.navigateByUrl('/auth/login-in');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }
}


