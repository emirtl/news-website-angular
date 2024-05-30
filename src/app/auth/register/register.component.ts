import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../services/auth.service';
import { IUser } from '../../shared/interfaces/user.interface';
import { RouterLink } from '@angular/router';
import { DockModule } from 'primeng/dock';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
    ButtonModule,
    RouterLink,
    DockModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  isSubmitting = false;
  form = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    repeatPassword: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {}

  onRegisterUser() {
    // this.isSubmitting = true;
    // if (this.form.value.repeatPassword !== this.form.value.password) {
    //   return this.form.reset();
    // }
    // const reqRegisterInterface: Partial<IUser> = {
    //   ...this.form.value,
    // };
    // this.authService.register(reqRegisterInterface).subscribe({
    //   next: () => {
    //     this.form.reset();
    //     this.isSubmitting = false;
    //   },
    //   error: () => {
    //     this.isSubmitting = false;
    //   },
    // });
  }
}
