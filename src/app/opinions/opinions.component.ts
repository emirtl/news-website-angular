import { Component, OnInit } from '@angular/core';
import { OpinionsService } from '../admin/services/opinion.service';
import { Observable } from 'rxjs';
import { IOpinion } from '../shared/interfaces/opinion.interface';
import { OpinionItemComponent } from './opinion-item/opinion-item.component';
import { AsyncPipe, NgClass, NgForOf } from '@angular/common';
import { map } from 'rxjs/operators';
import { DataViewModule } from 'primeng/dataview';
import { SharedModule } from 'primeng/api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-opinions',
  standalone: true,
  imports: [
    OpinionItemComponent,
    NgForOf,
    AsyncPipe,
    DataViewModule,
    SharedModule,
    RouterLink,
    NgClass,
  ],
  templateUrl: './opinions.component.html',
  styleUrl: './opinions.component.css',
})
export class OpinionsComponent implements OnInit {
  opinions$: Observable<IOpinion[]>;

  constructor(private opinionService: OpinionsService) {}

  ngOnInit(): void {
    this.opinions$ = this.opinionService
      .getAll()
      .pipe(map((opinions) => opinions.sort(() => -1)));
  }
}
