import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.routes').then((x) => x.adminRoutes),
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
