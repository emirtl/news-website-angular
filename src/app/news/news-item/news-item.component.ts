import { Component, Input, OnInit, Output } from '@angular/core';
import { INews } from '../../shared/interfaces/news.interface';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { RouterLink } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { NgForOf, NgIf } from '@angular/common';
import { ImageModule } from 'primeng/image';

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
  ],
  templateUrl: './news-item.component.html',
  styleUrl: './news-item.component.css',
})
export class NewsItemComponent implements OnInit {
  @Input() news: INews;
  fileFormat: string;

  constructor() {}

  ngOnInit(): void {
    this.fileFormat = this.news.image.split('.')[1];
  }
}
