import { Component, OnInit } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { LiveUpdatesService } from '../admin/services/liveUpdates.service';
import { Observable } from 'rxjs';
import { ILiveUpdate } from '../shared/interfaces/liveUpdates.interface';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-live-updates',
  standalone: true,
  imports: [ImageModule, NgForOf, AsyncPipe, RouterLink, NgIf],
  templateUrl: './live-updates.component.html',
  styleUrl: './live-updates.component.css',
})
export class LiveUpdatesComponent implements OnInit {
  liveUpdate$: Observable<ILiveUpdate[]>;

  constructor(private liveUpdateService: LiveUpdatesService) {}

  ngOnInit(): void {
    this.liveUpdate$ = this.liveUpdateService.getAll();
  }
}
