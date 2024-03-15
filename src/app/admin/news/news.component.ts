import { Component, OnInit } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { concatMap, Observable } from 'rxjs';
import { INews } from '../../shared/interfaces/news.interface';

import { InputTextareaModule } from 'primeng/inputtextarea';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NewsService } from '../services/news.service';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    AsyncPipe,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    SharedModule,
    TableModule,
    InputTextareaModule,
    RouterLink,
    ImageModule,
    DatePipe,
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
})
export class NewsComponent implements OnInit {
  news$: Observable<INews[]>;

  isSubmitting = false;

  constructor(
    private newsService: NewsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.news$ = this.newsService.getAll();
  }

  onDeleteNews(id) {
    this.news$ = this.newsService
      .delete(id)
      .pipe(concatMap(() => this.newsService.getAll()));
  }

  onUpdate(id) {
    this.router.navigate([`/admin/update-news/${id}`]);
  }
}
