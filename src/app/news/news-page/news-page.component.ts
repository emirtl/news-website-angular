import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../admin/services/news.service';
import { Observable } from 'rxjs';
import { INews } from '../../shared/interfaces/news.interface';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-news-page',
  standalone: true,
  imports: [AsyncPipe, DatePipe, CardModule],
  templateUrl: './news-page.component.html',
  styleUrl: './news-page.component.css',
})
export class NewsPageComponent implements OnInit {
  news$: Observable<INews>;

  constructor(
    private newsService: NewsService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.news$ = this.newsService.get(id);
  }
}
