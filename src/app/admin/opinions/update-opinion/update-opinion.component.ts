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
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { Observable } from 'rxjs';
import { IAuthor } from '../../../shared/interfaces/authors.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorsService } from '../../services/authors.service';
import { OpinionsService } from '../../services/opinion.service';

@Component({
  selector: 'app-update-opinion',
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
    InputSwitchModule,
    InputTextModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './update-opinion.component.html',
  styleUrl: './update-opinion.component.css',
})
export class UpdateOpinionComponent implements OnInit {
  authors$: Observable<IAuthor[]>;

  isSubmitting = false;

  coverImagePreview: string | ArrayBuffer;

  opinionId: string;

  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    richDescription: ['', Validators.required],
    author: ['', Validators.required],
    coverImage: [],
  });

  ngOnInit(): void {
    this.authors$ = this.authorsService.getAll();
    this.opinionId = this.activatedRoute.snapshot.params['id'];
    console.log(this.opinionId);
    this.opinionService.get(this.opinionId).subscribe({
      next: (opinion) => {
        console.log(opinion);
        if (opinion.coverImage) {
          this.coverImagePreview = opinion.coverImage;
        }
        this.form.setValue({
          title: opinion.title,
          author: opinion.author.id,
          description: opinion.description,
          richDescription: opinion.richDescription,
          coverImage: opinion.coverImage,
        });
      },
    });
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private opinionService: OpinionsService,
    private authorsService: AuthorsService,
    private activatedRoute: ActivatedRoute,
  ) {}

  onUpdate() {
    this.isSubmitting = true;
    const formData = new FormData();
    Object.keys(this.form.controls).map((key) => {
      formData.append(key, this.form.controls[key].value);
    });
    this.opinionService.update(this.opinionId, formData).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.form.reset();
        this.router.navigate(['/admin/opinions']);
      },
    });
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
