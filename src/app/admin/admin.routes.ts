import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { NewsComponent } from './news/news.component';
import { AuthorsComponent } from './authors/authors.component';
import { CreateNewsComponent } from './news/create-news/create-news.component';
import { UpdateNewsComponent } from './news/update-news/update-news.component';
import { UsersComponent } from './users/users.component';
import { OpinionsComponent } from './opinions/opinions.component';
import { CreateOpinionComponent } from './opinions/create-opinion/create-opinion.component';
import { UpdateOpinionComponent } from './opinions/update-opinion/update-opinion.component';
import { LiveUpdatesComponent } from './live-updates/live-updates.component';
import { LiveUpdatesCreateComponent } from './live-updates/live-updates-create/live-updates-create.component';
import { LiveUpdateItemCreateComponent } from './live-updates/live-update-item-create/live-update-item-create.component';
import { UpdateLiveUpdateComponent } from './live-updates/update-live-update/update-live-update.component';
import { AuthGuard } from '../auth/auth.guard';

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
    canActivate: [],
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
  {
    path: 'opinions',
    component: OpinionsComponent,
  },
  {
    path: 'create-opinion',
    component: CreateOpinionComponent,
  },
  {
    path: 'update-opinion/:id',
    component: UpdateOpinionComponent,
  },
  {
    path: 'live-updates',
    component: LiveUpdatesComponent,
  },
  {
    path: 'live-updates-create',
    component: LiveUpdatesCreateComponent,
  },
  {
    path: 'live-updates-item-create/:id',
    component: LiveUpdateItemCreateComponent,
  },
  {
    path: 'update-liveUpdate/:id',
    component: UpdateLiveUpdateComponent,
  },
];
