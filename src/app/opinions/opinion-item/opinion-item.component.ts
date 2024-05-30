import { Component, Input } from '@angular/core';
import { IOpinion } from '../../shared/interfaces/opinion.interface';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { AsyncPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-opinion-item',
  standalone: true,
  imports: [
    CardModule,
    ImageModule,
    DatePipe,
    RouterLink,
    AsyncPipe,
    NgForOf,
    NgIf,
  ],
  templateUrl: './opinion-item.component.html',
  styleUrl: './opinion-item.component.css',
})
export class OpinionItemComponent {
  @Input()
  opinion: IOpinion;
}
