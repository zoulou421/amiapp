import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ButtonProviders } from '../components/button-providers/button-providers.component';

// Define or import the Credential type if needed
interface Credential {
  email: string;
  password: string;
}

interface SignUpForm {
  names: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    ButtonProviders,
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],  // Corrected 'styleUrl' to 'styleUrls'
})
export class SignUpComponent {
  hide = true;

  formBuilder = inject(FormBuilder);

  form: FormGroup<SignUpForm> = this.formBuilder.group({
    names: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    lastName: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    email: this.formBuilder.control('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  private authService = inject(AuthService);
  private router = inject(Router);  // Removed underscore
  private snackBar = inject(MatSnackBar);  // Removed underscore

  get isEmailValid(): string | boolean {
    const control = this.form.get('email');

    if (control?.invalid && control.touched) {
      return control.hasError('required')
        ? 'This field is required'
        : 'Enter a valid email';
    }

    return false;
  }

  async signUp(): Promise<void> {
    if (this.form.invalid) return;

    const credential: Credential = {
      email: this.form.value.email || '',
      password: this.form.value.password || '',
    };

    try {
      await this.authService.signUpWithEmailAndPassword(credential);

      const snackBarRef = this.openSnackBar();

      snackBarRef.afterDismissed().subscribe(() => {
        this.router.navigateByUrl('/');
      });
    } catch (error) {
      console.error(error);
      // Optionally show an error message to the user
      this.snackBar.open('Sign up failed. Please try again.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'end',
      });
    }
  }

  openSnackBar() {
    return this.snackBar.open('Successfully signed up 😀', 'Close', {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }
}
