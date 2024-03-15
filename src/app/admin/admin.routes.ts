import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { NewsComponent } from './news/news.component';
import { AuthorsComponent } from './authors/authors.component';
import { CreateNewsComponent } from './news/create-news/create-news.component';
import { UpdateNewsComponent } from './news/update-news/update-news.component';
import { UsersComponent } from './users/users.component';

export const adminRoutes: Routes = [
  {
    path: 'categories',
    component: CategoriesComponent,
  },
  {
    path: 'authors',
    component: AuthorsComponent,
  },
  {
    path: 'news',
    component: NewsComponent,
  },
  {
    path: 'create-news',
    component: CreateNewsComponent,
  },
  {
    path: 'update-news/:id',
    component: UpdateNewsComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
];
