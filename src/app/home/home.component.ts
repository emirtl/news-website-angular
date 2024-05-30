import { Component, OnInit } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { NewsComponent } from '../news/news.component';
import { CarouselComponent } from './carousel/carousel.component';
import { NewsService } from '../admin/services/news.service';
import { Observable } from 'rxjs';
import { INews } from '../shared/interfaces/news.interface';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { CategoryService } from '../admin/services/category.service';
import { ICategory } from '../shared/interfaces/category.intertface';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import {
  SelectButtonChangeEvent,
  SelectButtonModule,
} from 'primeng/selectbutton';
import { RegisterComponent } from '../auth/register/register.component';
import { TableModule } from 'primeng/table';
import { SearchToolbarComponent } from './search-toolbar/search-toolbar.component';
import { map } from 'rxjs/operators';
import { BreakingNewsComponent } from '../news/breaking-news/breaking-news.component';
import { MostReadComponent } from '../news/most-read/most-read.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { OpinionsComponent } from '../opinions/opinions.component';
import { LiveUpdatesComponent } from '../live-updates/live-updates.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    DividerModule,
    NewsComponent,
    CarouselComponent,
    AsyncPipe,
    TabMenuModule,
    TabViewModule,
    NgForOf,
    RadioButtonModule,
    FormsModule,
    SelectButtonModule,
    RegisterComponent,
    TableModule,
    SearchToolbarComponent,
    NgIf,
    BreakingNewsComponent,
    MostReadComponent,
    SidebarModule,
    ButtonModule,
    OpinionsComponent,
    LiveUpdatesComponent,
    NgClass,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  featuredNews$: Observable<INews[]>;
  categories$: Observable<ICategory[]>;
  news$: Observable<INews[]>;
  searchedNews: INews[] = [];
  isSearching = false;
  isBreakingNewsExists = false;

  constructor(
    private newsService: NewsService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAll();
    this.featuredNews$ = this.newsService
      .getAll(true)
      .pipe(map((news) => news.sort((a, b) => -1)));

    this.news$ = this.newsService
      .getAll()
      .pipe(
        map((news) =>
          news
            .filter((news) => !news.isBreakingNews && !news.isFeatured)
            .sort((a, b) => -1),
        ),
      );
  }

  onSelectBtn($event: SelectButtonChangeEvent) {
    // this.news$ = this.newsService.getAll(false, $event.value);
    this.news$ = this.newsService
      .getAll(false, $event.value)
      .pipe(
        map((news) =>
          news
            .filter((news) => !news.isBreakingNews && !news.isFeatured)
            .sort((a, b) => -1),
        ),
      );
  }

  searchedNewsFn($event: INews[]) {
    this.isSearching = true;
    this.searchedNews = $event;
  }

  onResetFilterEvent($event: boolean) {
    this.isSearching = false;
    this.searchedNews = [];
  }

  isBreakingExists($event: boolean) {
    this.isBreakingNewsExists = $event;
  }
}
