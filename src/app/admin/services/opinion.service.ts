import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { INews } from '../../shared/interfaces/news.interface';
import { IOpinion } from '../../shared/interfaces/opinion.interface';

@Injectable({ providedIn: 'root' })
export class OpinionsService {
  private OPINIONS_URL = 'http://localhost:9000/api/v1/opinions';

  constructor(private http: HttpClient) {}

  getAll(): Observable<IOpinion[]> {
    return this.http.get<IOpinion[]>(`${this.OPINIONS_URL}/getAll`, {}).pipe(
      map((res) => {
        return res['opinions'].map((opinion) => {
          return {
            id: opinion.id,
            title: opinion.title,
            description: opinion.description,
            richDescription: opinion.richDescription,
            author: opinion.author,
            createdAt: opinion.createdAt,
            numReviews: opinion.numReviews,
            coverImage: opinion.coverImage,
          };
        });
      }),
      shareReplay(),
    );
  }

  get(id: string): Observable<IOpinion> {
    return this.http.get<IOpinion>(`${this.OPINIONS_URL}/get/${id}`).pipe(
      // Map the emitted news object to the desired format
      map((res) => {
        console.log(res);
        return {
          id: res['opinion'].id,
          title: res['opinion'].title,
          description: res['opinion'].description,
          richDescription: res['opinion'].richDescription,
          author: res['opinion'].author,
          createdAt: res['opinion'].createdAt,
          numReviews: res['opinion'].numReviews,
          coverImage: res['opinion'].coverImage,
        };
      }),

      shareReplay(),
    );
  }

  insert(opinion: FormData) {
    console.log('formData', opinion);
    return this.http
      .post<IOpinion>(`${this.OPINIONS_URL}/insert`, opinion)
      .pipe(shareReplay());
  }

  update(id: string, opinions: FormData) {
    return this.http
      .put<IOpinion>(`${this.OPINIONS_URL}/update/${id}`, opinions)
      .pipe(shareReplay());
  }

  delete(id: string): Observable<any> {
    return this.http
      .delete<any>(`${this.OPINIONS_URL}/delete/${id}`)
      .pipe(shareReplay());
  }
}
