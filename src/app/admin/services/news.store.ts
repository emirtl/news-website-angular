import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { INews } from '../../shared/interfaces/news.interface';
import { NewsService } from './news.service';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NewsStore {
  private newsSubject$ = new BehaviorSubject<INews[]>([]);
  news$: Observable<INews[]> = this.newsSubject$.asObservable();

  constructor(private newsService: NewsService) {
    this.loadAllNews();
  }

  private loadAllNews() {
    this.newsService
      .getAll()
      .pipe(tap((news) => this.newsSubject$.next(news)))
      .subscribe();
  }
}
