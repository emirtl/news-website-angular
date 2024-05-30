import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NewsService } from '../../admin/services/news.service';
import { Observable } from 'rxjs';
import { INews } from '../../shared/interfaces/news.interface';
import { CardModule } from 'primeng/card';
import {
  AsyncPipe,
  DatePipe,
  NgClass,
  NgForOf,
  NgIf,
  NgOptimizedImage,
} from '@angular/common';
import { ImageModule } from 'primeng/image';
import { RouterLink } from '@angular/router';
import { NewsComponent } from '../news.component';

import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { tap } from 'rxjs/operators';
import { DataViewModule } from 'primeng/dataview';

@Component({
  selector: 'app-breaking-news',
  standalone: true,
  imports: [
    CardModule,
    AsyncPipe,
    NgForOf,
    ImageModule,
    RouterLink,
    NewsComponent,
    NgIf,
    MessagesModule,
    ToastModule,
    DatePipe,
    DataViewModule,
    NgClass,
    NgOptimizedImage,
  ],
  templateUrl: './breaking-news.component.html',
  styleUrl: './breaking-news.component.css',
})
export class BreakingNewsComponent implements OnInit {
  breakingNews$: Observable<INews[]>;
  @Output()
  isBreakingNews = new EventEmitter<boolean>();

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.breakingNews$ = this.newsService
      .getAll(false, [], null, null, true)
      .pipe(
        tap((breakingNews) => {
          breakingNews.length > 0
            ? this.isBreakingNews.emit(true)
            : this.isBreakingNews.emit(false);
        }),
      );
  }
}
