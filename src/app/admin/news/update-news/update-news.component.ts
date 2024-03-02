import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { EditorComponent } from '@tinymce/tinymce-angular';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { Observable } from 'rxjs';
import { IAuthor } from '../../../shared/interfaces/authors.interface';
import { ICategory } from '../../../shared/interfaces/category.intertface';
import { ActivatedRoute, Router } from '@angular/router';
import { LogicalFileSystem } from '@angular/compiler-cli';
import { NewsService } from '../../services/news.service';
import { CategoryService } from '../../services/category.service';
import { AuthorsService } from '../../services/authors.service';
import { INews } from '../../../shared/interfaces/news.interface';

@Component({
  selector: 'app-update-news',
  standalone: true,
  imports: [
    AsyncPipe,
    ButtonModule,
    CardModule,
    DividerModule,
    DropdownModule,
    EditorComponent,
    FormsModule,
    ImageModule,
    InputTextModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './update-news.component.html',
  styleUrl: './update-news.component.css',
})
export class UpdateNewsComponent implements OnInit {
  authors$: Observable<IAuthor[]>;

  categories$: Observable<ICategory[]>;

  isSubmitting = false;

  imagePreview: string | ArrayBuffer;

  newsId: string;

  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    richDescription: ['', Validators.required],
    image: [],
    author: ['', Validators.required],
    category: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private newsService: NewsService,
    private categoriesService: CategoryService,
    private authorsService: AuthorsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoriesService.getAll();
    this.authors$ = this.authorsService.getAll();
    this.newsId = this.activatedRoute.snapshot.params['id'];
    this.newsService.get(this.newsId).subscribe({
      next: (news) => {
        this.imagePreview = news.image;
        this.form.setValue({
          title: news.title,
          author: news.author.id,
          category: news.category.id,
          description: news.description,
          image: news.image,
          richDescription: news.richDescription,
        });
      },
    });
  }

  onUpdate() {
    this.isSubmitting = true;
    const formDate = new FormData();
    Object.keys(this.form.controls).map((key) => {
      formDate.append(key, this.form.controls[key].value);
    });
    this.newsService.update(this.newsId, formDate).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.form.reset();
        this.router.navigate(['/admin/news']);
      },
    });
  }

  onPhotoPicked($event: Event) {
    const file = ($event.target as HTMLInputElement).files![0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
