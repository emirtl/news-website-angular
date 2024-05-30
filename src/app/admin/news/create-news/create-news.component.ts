import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { IAuthor } from '../../../shared/interfaces/authors.interface';
import { ListboxModule } from 'primeng/listbox';
import { ICategory } from '../../../shared/interfaces/category.intertface';
import { AuthorsService } from '../../services/authors.service';
import { CategoryService } from '../../services/category.service';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ImageModule } from 'primeng/image';
import { NewsService } from '../../services/news.service';
import { InputSwitchModule } from 'primeng/inputswitch';

@Component({
  selector: 'app-create-news',
  standalone: true,
  imports: [
    CardModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    FileUploadModule,
    AsyncPipe,
    ListboxModule,
    DropdownModule,
    DividerModule,
    EditorModule,
    ImageModule,
    NgIf,
    InputSwitchModule,
  ],
  templateUrl: './create-news.component.html',
  styleUrl: './create-news.component.css',
})
export class CreateNewsComponent implements OnInit {
  authors$: Observable<IAuthor[]>;
  categories$: Observable<ICategory[]>;
  isSubmitting = false;
  imagePreview: string | ArrayBuffer;
  coverImagePreview: string | ArrayBuffer;

  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    richDescription: ['', Validators.required],
    image: [],
    author: [Validators.required],
    category: [Validators.required],
    isFeatured: [false, Validators.required],
    isBreakingNews: [false, Validators.required],
    coverImage: [],
  });

  constructor(
    private fb: FormBuilder,
    private authorsService: AuthorsService,
    private categoriesService: CategoryService,
    private newsService: NewsService,
  ) {}

  ngOnInit(): void {
    this.authors$ = this.authorsService.getAll();
    this.categories$ = this.categoriesService.getAll();
  }

  onUpload() {}

  onSubmit() {
    this.isSubmitting = true;
    const formData = new FormData();
    Object.keys(this.form.value).map((key) => {
      formData.append(key, this.form.controls[key].value);
    });
    console.log(this.form.value);

    this.newsService.insert(formData).subscribe({
      next: () => {
        this.imagePreview = '';
        this.coverImagePreview = '';
        this.form.reset();
      },
    });
  }

  onPhotoPicked($event: Event) {
    const file = ($event.target as HTMLInputElement).files![0];
    if (
      file.name.split('.')[1] === 'jpg' ||
      file.name.split('.')[1] === 'jpeg' ||
      file.name.split('.')[1] === 'gif' ||
      file.name.split('.')[1] === 'png'
    ) {
      console.log('file format is not video');
      return;
    }
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onCoverPicked($event: Event) {
    const file = ($event.target as HTMLInputElement).files![0];
    if (
      file.name.split('.')[1] === 'mp4' ||
      file.name.split('.')[1] === 'webm' ||
      file.name.split('.')[1] === 'mov'
    ) {
      console.log('file format is not an image');
      return;
    }
    this.form.patchValue({ coverImage: file });
    this.form.get('coverImage').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.coverImagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
