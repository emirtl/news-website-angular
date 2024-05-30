import { Component, OnInit } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterLink } from '@angular/router';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../auth/services/auth.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { INews } from '../interfaces/news.interface';
import { NewsService } from '../../admin/services/news.service';
import { log } from 'util';
import { ImageModule } from 'primeng/image';
import { IUser } from '../interfaces/user.interface';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    RouterLink,
    TieredMenuModule,
    NgIf,
    AsyncPipe,
    ImageModule,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent implements OnInit {
  constructor(
    private authservice: AuthService,
    private router: Router,
  ) {}

  isAdmin$: Observable<boolean>;
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  items: MenuItem[] | undefined;

  // user$: Observable<IUser>;

  ngOnInit(): void {
    this.isAdmin$ = this.authservice.isAdmin$;
    this.isLoggedIn$ = this.authservice.isLoggedIn$;
    this.isLoggedOut$ = this.authservice.isLoggedOut$;
    // this.user$ = this.authservice.user$;

    this.items = [
      {
        label: 'Categories',
        icon: 'pi pi-file',
        routerLink: '/admin/categories',
      },
      {
        label: 'authors',
        icon: 'pi pi-pencil',
        routerLink: '/admin/authors',
      },
      {
        label: 'News',
        icon: 'pi pi-envelope',
        routerLink: '/admin/news',
      },
      {
        label: 'Opinions',
        icon: 'pi pi-comments',
        routerLink: '/admin/opinions',
      },
      {
        label: 'Users',
        icon: 'pi pi-user',
        routerLink: '/admin/users',
      },
      {
        label: 'Live Updates',
        icon: 'pi pi-eye',
        routerLink: '/admin/live-updates',
      },
    ];
  }

  onLogOut() {
    this.authservice.logOut();
    return this.router.navigate(['/']);
  }
}
