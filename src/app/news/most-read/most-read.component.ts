import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { NewsService } from '../../admin/services/news.service';
import { Observable } from 'rxjs';
import { INews } from '../../shared/interfaces/news.interface';
import { TableModule } from 'primeng/table';
import { AsyncPipe, NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataViewModule } from 'primeng/dataview';

@Component({
  selector: 'app-most-read',
  standalone: true,
  imports: [TableModule, AsyncPipe, RouterLink, DataViewModule, NgForOf],
  templateUrl: './most-read.component.html',
  styleUrl: './most-read.component.css',
})
export class MostReadComponent implements OnInit {
  mostRead$: Observable<INews[]>;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.mostRead$ = this.newsService
      .getAll(false, [], 100)
      .pipe(map((news) => news.sort(() => 1)));
  }
}
