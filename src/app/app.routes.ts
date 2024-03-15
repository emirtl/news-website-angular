import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewsPageComponent } from './news/news-page/news-page.component';
import { AuthGuard } from './auth/auth.guard';

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
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.routes').then((x) => x.adminRoutes),
    // canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((x) => x.authRoutes),
  },
  {
    path: '**',
    redirectTo: '',
  },
  // {
  //   path: 'admin/categories',
  //   component: CategoriesComponent,
  // },
];
