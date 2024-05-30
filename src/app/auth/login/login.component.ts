import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IUser } from '../../shared/interfaces/user.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  onLogedIn() {
    if (this.form.invalid) {
      return;
    }
    this.isSubmitting = true;
    const loginRequestInterface: Partial<IUser> = {
      ...this.form.value,
    };

    this.authService.login(loginRequestInterface).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.form.reset();
        this.router.navigate(['/']);
      },
    });
  }
}
