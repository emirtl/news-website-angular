import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { INews } from '../../shared/interfaces/news.interface';
import { NewsService } from './news.service';
import { tap } from 'rxjs/operators';
import { ICategory } from '../../shared/interfaces/category.intertface';
import { CategoryService } from './category.service';

@Injectable({ providedIn: 'root' })
export class CategoriesStore {
  private categoriesSubject$ = new BehaviorSubject<ICategory[]>([]);
  categories$: Observable<ICategory[]> = this.categoriesSubject$.asObservable();

  constructor(private categoryService: CategoryService) {
    this.loadAllCategories();
  }

  private loadAllCategories() {
    this.categoryService
      .getAll()
      .pipe(tap((categories) => this.categoriesSubject$.next(categories)))
      .subscribe();
  }
}
