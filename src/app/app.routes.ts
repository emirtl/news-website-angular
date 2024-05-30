import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewsPageComponent } from './news/news-page/news-page.component';
import { AuthGuard } from './auth/auth.guard';
import { LiveUpdatePageComponent } from './live-updates/live-update-page/live-update-page.component';
import { OpinionPageComponent } from './opinions/opinion-page/opinion-page.component';
import { AuthService } from './auth/services/auth.service';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'news-page/:id',
    component: NewsPageComponent,
  },

  {
    path: 'live-update-page/:id',
    component: LiveUpdatePageComponent,
  },
  {
    path: 'opinion-page/:id',
    component: OpinionPageComponent,
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.routes').then((x) => x.adminRoutes),
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((x) => x.authRoutes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
