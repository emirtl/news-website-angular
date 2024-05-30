import { Component, OnInit } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { concatMap, Observable } from 'rxjs';
import { INews } from '../../shared/interfaces/news.interface';
import { IOpinion } from '../../shared/interfaces/opinion.interface';
import { ImageModule } from 'primeng/image';
import { TableModule } from 'primeng/table';
import { OpinionsService } from '../services/opinion.service';
import { Router, RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-opinions',
  standalone: true,
  imports: [
    AsyncPipe,
    ButtonModule,
    DatePipe,
    ImageModule,
    TableModule,
    RouterLink,
  ],
  templateUrl: './opinions.component.html',
  styleUrl: './opinions.component.css',
})
export class OpinionsComponent implements OnInit {
  constructor(
    private opinionsService: OpinionsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.opinions$ = this.opinionsService.getAll();
  }

  opinions$: Observable<IOpinion[]>;
  isSubmitting = false;

  onDelete(id) {
    this.opinions$ = this.opinionsService
      .delete(id)
      .pipe(concatMap(() => this.opinionsService.getAll()));
  }

  onUpdate(id) {
    this.router.navigate([`/admin/update-opinion/${id}`]);
  }
}
