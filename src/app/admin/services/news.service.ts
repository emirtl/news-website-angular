import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ICategory } from '../../shared/interfaces/category.intertface';
import { INews } from '../../shared/interfaces/news.interface';
import { IAuthor } from '../../shared/interfaces/authors.interface';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private NEWS_URL = 'http://localhost:9000/api/v1/news';

  constructor(private http: HttpClient) {}

  getAll(
    isFeatured?: boolean,
    categories?: string[],
    minNumViews?: number,
    searchText?: string,
    isBreaking?: boolean,
  ): Observable<INews[]> {
    let params = new HttpParams();
    if (isFeatured) {
      params = params.append('isFeatured', true);
    }

    if (categories && categories.length > 0) {
      params = params.append('categories', categories.join(','));
    }
    if (minNumViews) {
      params = params.append('minNumViews', minNumViews);
    }
    if (searchText) {
      params = params.append('$search', searchText);
      console.log(searchText);
    }
    if (isBreaking) {
      params = params.append('isBreaking', true);
    }
    return this.http
      .get<INews[]>(`${this.NEWS_URL}/getAll`, {
        params,
      })
      .pipe(
        map((res) => {
          return res['news'].map((news) => {
            return {
              id: news.id,
              title: news.title,
              description: news.description,
              richDescription: news.richDescription,
              image: news.image,
              images: news.images,
              author: news.author,
              category: news.category,
              createdAt: news.createdAt,
              numReviews: news.numReviews,
              isFeatured: news.isFeatured,
              isBreakingNews: news.isBreakingNews,
              coverImage: news.coverImage,
            };
          });
        }),
        shareReplay(),
      );
  }

  get(id: string): Observable<INews> {
    return this.http.get<INews>(`${this.NEWS_URL}/get/${id}`).pipe(
      // Map the emitted news object to the desired format
      map((res) => ({
        id: res['news'].id,
        title: res['news'].title,
        description: res['news'].description,
        richDescription: res['news'].richDescription,
        image: res['news'].image,
        images: res['news'].images,
        author: res['news'].author,
        category: res['news'].category,
        createdAt: res['news'].createdAt,
        isFeatured: res['news'].isFeatured,
        numReviews: res['news'].numReviews,
        isBreakingNews: res['news'].isBreakingNews,
        coverImage: res['news'].coverImage,
      })),
      // (Optional) Share the observable to avoid redundant requests
      shareReplay(),
    );
  }

  insert(news: FormData) {
    return this.http
      .post<INews>(`${this.NEWS_URL}/insert`, news)
      .pipe(shareReplay());
  }

  update(id: string, news: FormData) {
    return this.http
      .put<INews>(`${this.NEWS_URL}/update/${id}`, news)
      .pipe(shareReplay());
  }

  delete(id: string): Observable<any> {
    return this.http
      .delete<any>(`${this.NEWS_URL}/delete/${id}`)
      .pipe(shareReplay());
  }
}
