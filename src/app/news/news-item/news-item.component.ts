import { Component, input, Input, OnInit, Output } from '@angular/core';
import { INews } from '../../shared/interfaces/news.interface';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { RouterLink } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { style } from '@angular/animations';

@Component({
  selector: 'app-news-item',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    DividerModule,
    RouterLink,
    BadgeModule,
    NgForOf,
    ImageModule,
    NgIf,
    AsyncPipe,
  ],
  templateUrl: './news-item.component.html',
  styleUrl: './news-item.component.css',
})
export class NewsItemComponent implements OnInit {
  fileFormat: string;

  @Input() news: INews;
  @Input() isBreakingNews: boolean;

  constructor() {}

  ngOnInit(): void {
    if (this.news.image) {
      this.fileFormat = this.news.image.split('.')[1];
    }
  }

  protected readonly style = style;
}
