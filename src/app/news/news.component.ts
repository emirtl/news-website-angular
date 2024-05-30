import { Component, Inject, Input, input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { INews } from '../shared/interfaces/news.interface';
import { NewsService } from '../admin/services/news.service';
import { NewsItemComponent } from './news-item/news-item.component';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ImageModule } from 'primeng/image';
import { RouterLink } from '@angular/router';
import { DataViewModule } from 'primeng/dataview';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    NewsItemComponent,
    CommonModule,
    CardModule,
    SharedModule,
    TableModule,
    ImageModule,
    RouterLink,
    DataViewModule,
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
})
export class NewsComponent implements OnInit {
  constructor() {}

  @Input() news: INews[];

  @Input() isBreakingNews: boolean;

  ngOnInit(): void {}
}
