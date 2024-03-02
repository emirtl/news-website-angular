import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ICategory } from '../../shared/interfaces/category.intertface';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private CATEGORIES_URL = 'http://localhost:9000/api/v1/categories';
  constructor(private http: HttpClient) {}

  getAll(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.CATEGORIES_URL}/getAll`).pipe(
      map((res) => {
        return res['categories'].map((category) => {
          return {
            id: category._id,
            title: category.title,
          };
        });
      }),
      shareReplay(),
    );
  }

  insert(title: string): Observable<ICategory> {
    return this.http
      .post<ICategory>(`${this.CATEGORIES_URL}/insert`, { title })
      .pipe(shareReplay());
  }
  delete(id: string): Observable<any> {
    return this.http
      .delete<ICategory[]>(`${this.CATEGORIES_URL}/delete/${id}`)
      .pipe(shareReplay());
  }
}
