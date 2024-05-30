import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { ImageModule } from 'primeng/image';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IAuthor } from '../../../shared/interfaces/authors.interface';

import { AuthorsService } from '../../services/authors.service';
import { OpinionsService } from '../../services/opinion.service';

@Component({
  selector: 'app-create-opinion',
  standalone: true,
  imports: [
    AsyncPipe,
    ButtonModule,
    CardModule,
    DividerModule,
    DropdownModule,
    EditorComponent,
    ImageModule,
    InputSwitchModule,
    InputTextModule,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './create-opinion.component.html',
  styleUrl: './create-opinion.component.css',
})
export class CreateOpinionComponent implements OnInit {
  authors$: Observable<IAuthor[]>;
  isSubmitting = false;
  coverImagePreview: string | ArrayBuffer;

  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    richDescription: ['', Validators.required],
    author: [Validators.required],
    coverImage: [],
  });

  constructor(
    private fb: FormBuilder,
    private authorsService: AuthorsService,
    private opinionsService: OpinionsService,
  ) {}

  ngOnInit(): void {
    this.authors$ = this.authorsService.getAll();
  }

  onPhotoPicked($event: Event) {}

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

  onSubmit() {
    this.isSubmitting = true;
    const formData = new FormData();
    Object.keys(this.form.value).map((key) => {
      formData.append(key, this.form.controls[key].value);
    });
    console.log(this.form.value);

    this.opinionsService.insert(formData).subscribe({
      next: () => {
        this.coverImagePreview = '';
        this.form.reset();
      },
    });
  }
}
