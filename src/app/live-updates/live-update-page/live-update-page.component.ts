import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { LiveUpdatesService } from '../../admin/services/liveUpdates.service';
import { Observable } from 'rxjs';
import { ILiveUpdate } from '../../shared/interfaces/liveUpdates.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  AsyncPipe,
  DatePipe,
  NgClass,
  NgForOf,
  NgIf,
  NgStyle,
  ViewportScroller,
} from '@angular/common';
import { ImageModule } from 'primeng/image';
import { ILiveUpdateItem } from '../../shared/interfaces/liveUpdateItems.interface';
import { map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { TimelineModule } from 'primeng/timeline';
import { TreeModule } from 'primeng/tree';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-live-update-page',
  standalone: true,
  imports: [
    AsyncPipe,
    ImageModule,
    FormsModule,
    NgForOf,
    DatePipe,
    NgStyle,
    NgClass,
    NgIf,
    TimelineModule,
    TreeModule,
    RouterLink,
    ButtonModule,
  ],
  templateUrl: './live-update-page.component.html',
  styleUrl: './live-update-page.component.css',
})
export class LiveUpdatePageComponent implements OnInit {
  liveUpdate$: Observable<ILiveUpdate>;
  liveUpdateItems: ILiveUpdateItem[] = [];
  liveUpdateId: string;
  isADmin$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private liveUpdateService: LiveUpdatesService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.isADmin$ = this.authService.isAdmin$;
    this.liveUpdateId = this.activatedRoute.snapshot.paramMap.get('id');
    this.liveUpdate$ = this.liveUpdateService.get(this.liveUpdateId);
    this.liveUpdate$
      .pipe(
        map((liveUpdate) =>
          liveUpdate.liveUpdateItems.map((liveUpdateItem) => {
            this.liveUpdateItems.push(liveUpdateItem);
            this.liveUpdateItems.sort(() => -1);
          }),
        ),
      )
      .subscribe();
  }

  scrolToItem(id) {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' }); // Smooth scrolling
    } else {
      console.error('Element with ID', id, 'not found');
    }
  }

  onDeleteLiveUpdateItem(id: string) {
    this.liveUpdateService
      .deleteLiveUpdateItem(id, this.liveUpdateId)
      .subscribe({
        next: (res) => {
          this.liveUpdateItems = res['updatedLiveUpdate'].liveUpdateItems;
        },
      });
  }
}
