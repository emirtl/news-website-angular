import { Component, OnInit } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { NewsComponent } from '../news/news.component';
import { CarouselComponent } from './carousel/carousel.component';
import { NewsService } from '../admin/services/news.service';
import { Observable } from 'rxjs';
import { INews } from '../shared/interfaces/news.interface';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
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
import { NewsStore } from '../admin/services/news.store';
import { SearchToolbarComponent } from './search-toolbar/search-toolbar.component';
import { map } from 'rxjs/operators';

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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  featuredNews$: Observable<INews[]>;
  categories$: Observable<ICategory[]>;
  news$: Observable<INews[]>;
  mostRead$: Observable<INews[]>;
  searchedNews: INews[] = [];
  isSearching = false;

  constructor(
    private newsService: NewsService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAll();
    this.featuredNews$ = this.newsService
      .getAll(true)
      .pipe(map((news) => news.sort((a, b) => -1)));
    this.mostRead$ = this.newsService.getAll(false, [], 100);

    this.news$ = this.newsService
      .getAll()
      .pipe(map((news) => news.sort((a, b) => -1)));
  }

  onSelectBtn($event: SelectButtonChangeEvent) {
    this.news$ = this.newsService.getAll(false, $event.value);
  }

  searchedNewsFn($event: INews[]) {
    this.isSearching = true;
    this.searchedNews = $event;
  }

  onResetFilterEvent($event: boolean) {
    this.isSearching = false;
    this.searchedNews = [];
  }
}
