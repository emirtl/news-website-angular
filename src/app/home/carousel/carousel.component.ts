import { Component, Input } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { INews } from '../../shared/interfaces/news.interface';
import { TableModule } from 'primeng/table';
import { ImageModule } from 'primeng/image';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DataViewModule } from 'primeng/dataview';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    CarouselModule,
    ButtonModule,
    TableModule,
    ImageModule,
    CardModule,
    FormsModule,
    RouterLink,
    DataViewModule,
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent {
  @Input() news: INews[];

  responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '991px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
}
