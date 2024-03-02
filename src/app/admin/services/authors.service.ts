import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ICategory } from '../../shared/interfaces/category.intertface';
import { IAuthor } from '../../shared/interfaces/authors.interface';

@Injectable({ providedIn: 'root' })
export class AuthorsService {
  private AUTHORS_URL = 'http://localhost:9000/api/v1/authors';
  constructor(private http: HttpClient) {}

  getAll(): Observable<IAuthor[]> {
    return this.http.get<IAuthor[]>(`${this.AUTHORS_URL}/getAll`).pipe(
      map((res) => {
        return res['authors'].map((author) => {
          return {
            id: author.id,
            name: author.name,
            position: author.position,
            description: author.description,
          };
        });
      }),
      shareReplay(),
    );
  }

  getOne(id: string): Observable<IAuthor> {
    return this.http.get<IAuthor>(`${this.AUTHORS_URL}/getOne/${id}`).pipe(
      map((res) => res['author']),
      shareReplay(),
    );
  }

  insert(author: Partial<IAuthor>): Observable<IAuthor> {
    return this.http
      .post<IAuthor>(`${this.AUTHORS_URL}/insert`, author)
      .pipe(shareReplay());
  }

  update(author: Partial<IAuthor>, id: string): Observable<IAuthor> {
    return this.http
      .put<IAuthor>(`${this.AUTHORS_URL}/update/${id}`, author)
      .pipe(shareReplay());
  }

  delete(id: string): Observable<any> {
    return this.http
      .delete<any>(`${this.AUTHORS_URL}/delete/${id}`)
      .pipe(shareReplay());
  }
}
