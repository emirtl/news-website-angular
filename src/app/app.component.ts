import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { NewsStore } from './admin/services/news.store';
import { FooterComponent } from './shared/footer/footer.component';
import { AuthService } from './auth/services/auth.service';
import { Observable } from 'rxjs';
import { IUser } from './shared/interfaces/user.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterOutlet, ToolbarComponent, FooterComponent],
})
export class AppComponent implements OnInit {
  user$: Observable<IUser>;
  isAdmin$: Observable<boolean>;
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor() {}

  ngOnInit(): void {}
}
