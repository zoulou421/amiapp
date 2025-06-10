import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { SujetMemoireComponent } from '../sujet-memoire/sujet-memoire.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IFormData } from '../../../core/interface/form-data.interface';
import { RendezvousService } from '../../../core/services/rendezvous-service';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var M: any; // Declare Materialize CSS


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatToolbarModule, MatButtonModule, RouterLink, AboutComponent, SujetMemoireComponent, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  formData!: FormGroup;
  private fb = inject(FormBuilder);
  private rendezvousService = inject(RendezvousService);
  private snackBar = inject(MatSnackBar);


  ngAfterViewInit() {
    // Initialize the sidenav
    const elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);
  }

  formObject: IFormData = {
    id: '',
    name: '',
    email: '',
    phone: '',
    rendezvousDate: '',
    rendezvousTime: '',
    academicLevel: 'licence',
    objectif: '',
    questions: '',
    memoireFile: null
  };

  ngOnInit(): void {
    this.formData = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      rendezvousDate: ['', [Validators.required]],
      rendezvousTime: ['', [Validators.required]],
      academicLevel: ['licence', [Validators.required]],
      objectif: ['', [Validators.required]],
      questions: [''],
      memoireFile: [null]
    });
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

  // Method to handle file input changes with validation for allowed formats
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

      // Validate file type
      if (allowedTypes.includes(file.type)) {
        this.formData.patchValue({ memoireFile: file });
      } else {
        this.snackBar.open('Type de fichier non autorisé! Formats acceptés: PDF, JPG, PNG, DOCX.', 'Fermer', { duration: 3000 });
        this.formData.patchValue({ memoireFile: null }); // Reset file input
      }
    }
  }

  submitForm(): void {
    if (this.formData.valid) {
      console.log(this.formData.value);

      this.rendezvousService.addRendezvous(this.formData.value).then(() => {
        console.log('Data successfully written to Firestore');
        this.snackBar.open('Rendez-vous enregistré avec succès!', 'Fermer', {
          duration: 5000,
          panelClass: ['custom-snackbar'] // Apply the custom class here
        });
        this.formData.reset();
      }).catch((error) => {
        console.error('Error writing document: ', error);
      });
    } else {
      console.log('Form is invalid');
    }
  }

  testimonials = [
    {
      name: 'Fatou S.',
      feedback: 'Grâce à AMI, mon mémoire a été validé du premier coup !',
      date: 'Mai 2024'
    },
    {
      name: 'Moussa D.',
      feedback: 'L’accompagnement personnalisé est vraiment un plus.',
      date: 'Avril 2024'
    },
    {
      name: 'Awa N.',
      feedback: 'J’ai trouvé mon sujet de mémoire en moins d’une semaine.',
      date: 'Mars 2024'
    }
    // Ajoute d’autres témoignages si besoin
  ];


  subscribeNewsletter() {
    M.toast({ html: 'Merci pour votre abonnement à la newsletter ! 🙌', classes: 'rounded purple darken-3 white-text' });
  }


}
