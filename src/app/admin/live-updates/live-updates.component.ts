import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { Router, RouterLink } from '@angular/router';
import { LiveUpdatesService } from '../services/liveUpdates.service';
import { concatMap, Observable } from 'rxjs';
import { ILiveUpdate } from '../../shared/interfaces/liveUpdates.interface';
import { ImageModule } from 'primeng/image';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-live-updates',
  standalone: true,
  imports: [
    AsyncPipe,
    ButtonModule,
    TableModule,
    TooltipModule,
    RouterLink,
    ImageModule,
    NgIf,
  ],
  templateUrl: './live-updates.component.html',
  styleUrl: './live-updates.component.css',
})
export class LiveUpdatesComponent implements OnInit {
  liveUpdates$: Observable<ILiveUpdate[]>;

  ngOnInit(): void {
    this.liveUpdates$ = this.liveUpdatesService.getAll();
  }

  constructor(
    private liveUpdatesService: LiveUpdatesService,
    private router: Router,
  ) {}

  onDeleteLiveUpdate(id) {
    this.liveUpdates$ = this.liveUpdatesService
      .delete(id)
      .pipe(concatMap(() => this.liveUpdatesService.getAll()));
  }

  onUpdateLiveUpdateItem(id) {
    this.router.navigate(['/admin/live-updates-item-create', id]);
  }

  onUpdateLiveUpdate(id) {
    this.router.navigate([`/admin/update-liveUpdate/${id}`]);
  }
}
