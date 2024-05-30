import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ICategory } from '../../shared/interfaces/category.intertface';
import { INews } from '../../shared/interfaces/news.interface';
import { IAuthor } from '../../shared/interfaces/authors.interface';
import { ILiveUpdate } from '../../shared/interfaces/liveUpdates.interface';

@Injectable({ providedIn: 'root' })
export class LiveUpdatesService {
  private LIVE_UPDATES_URL = 'http://localhost:9000/api/v1/liveUpdates';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ILiveUpdate[]> {
    return this.http.get<ILiveUpdate[]>(`${this.LIVE_UPDATES_URL}/getAll`).pipe(
      map((res) => {
        return res['liveUpdates'].map((liveUpdate) => {
          return {
            id: liveUpdate.id,
            coverTitle: liveUpdate.coverTitle,
            mainCoverImage: liveUpdate.mainCoverImage,
            liveUpdateItems: liveUpdate.liveUpdateItems,
          };
        });
      }),
      shareReplay(),
    );
  }

  get(id: string): Observable<ILiveUpdate> {
    return this.http
      .get<ILiveUpdate>(`${this.LIVE_UPDATES_URL}/get/${id}`)
      .pipe(
        map((res) => ({
          id: res['liveUpdate'].id,
          coverTitle: res['liveUpdate'].coverTitle,
          mainCoverImage: res['liveUpdate'].mainCoverImage,
          liveUpdateItems: res['liveUpdate'].liveUpdateItems,
        })),
        shareReplay(),
      );
  }

  insert(liveUpdates: FormData) {
    return this.http
      .post<ILiveUpdate>(`${this.LIVE_UPDATES_URL}/insert`, liveUpdates)
      .pipe(shareReplay());
  }

  CreateLiveUpdateItem(id: string, liveUpdate: FormData) {
    return this.http
      .put<ILiveUpdate>(
        `${this.LIVE_UPDATES_URL}/createLiveUpdateItem/${id}`,
        liveUpdate,
      )
      .pipe(shareReplay());
  }

  update(id: string, liveUpdate: FormData) {
    return this.http
      .put<ILiveUpdate>(`${this.LIVE_UPDATES_URL}/update/${id}`, liveUpdate)
      .pipe(shareReplay());
  }

  delete(id: string): Observable<any> {
    return this.http
      .delete<any>(`${this.LIVE_UPDATES_URL}/delete/${id}`)
      .pipe(shareReplay());
  }

  deleteLiveUpdateItem(
    id: string,
    liveUpdateId: string,
  ): Observable<ILiveUpdate> {
    const params = new HttpParams();

    return this.http
      .delete<ILiveUpdate>(
        `${this.LIVE_UPDATES_URL}/delete-liveUpdateItem/${id}`,
        {
          params: params.append('liveUpdateId', liveUpdateId),
        },
      )
      .pipe(shareReplay());
  }
}
