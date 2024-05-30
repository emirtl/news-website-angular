import { Component, OnInit } from '@angular/core';
import { AsyncPipe, DatePipe, NgIf, TitleCasePipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { SharedModule } from 'primeng/api';
import { OpinionsService } from '../../admin/services/opinion.service';
import { Observable } from 'rxjs';
import { IOpinion } from '../../shared/interfaces/opinion.interface';
import { ActivatedRoute } from '@angular/router';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-opinion-page',
  standalone: true,
  imports: [
    AsyncPipe,
    CardModule,
    DatePipe,
    NgIf,
    SharedModule,
    TitleCasePipe,
    ImageModule,
  ],
  templateUrl: './opinion-page.component.html',
  styleUrl: './opinion-page.component.css',
})
export class OpinionPageComponent implements OnInit {
  opinion$: Observable<IOpinion>;

  constructor(
    private opinionService: OpinionsService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.opinion$ = this.opinionService.get(id);
  }
}
