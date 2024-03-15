import {
  Component,
  Output,
  EventEmitter,
  viewChild,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { NewsService } from '../../admin/services/news.service';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RouterLink } from '@angular/router';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { AsyncPipe, NgIf } from '@angular/common';

import { INews } from '../../shared/interfaces/news.interface';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-search-toolbar',
  standalone: true,
  imports: [
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    RouterLink,
    TieredMenuModule,
    NgIf,
    AsyncPipe,
  ],
  templateUrl: './search-toolbar.component.html',
  styleUrl: './search-toolbar.component.css',
})
export class SearchToolbarComponent {
  searchText: string = '';
  @Output()
  searchedNews = new EventEmitter<INews[]>();
  @Output()
  resetFilterEvent = new EventEmitter<boolean>();

  @ViewChild('searchInput') searchInput: ElementRef;

  constructor(private newsService: NewsService) {}

  onInputChange($event: Event) {
    this.searchText = $event.target['value'];
  }

  onSearchBtn() {
    this.newsService
      .getAll(false, [], null, this.searchText)
      .pipe(tap((news) => this.searchedNews.next(news)))
      .subscribe();
  }

  onDeleteBtn() {
    this.searchText = '';
    this.searchInput.nativeElement.value = '';
    this.resetFilterEvent.next(true);
  }
}
