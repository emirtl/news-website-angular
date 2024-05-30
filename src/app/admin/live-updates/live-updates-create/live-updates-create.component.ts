import { Component } from '@angular/core';
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
import { LiveUpdatesService } from '../../services/liveUpdates.service';

@Component({
  selector: 'app-live-updates-create',
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
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './live-updates-create.component.html',
  styleUrl: './live-updates-create.component.css',
})
export class LiveUpdatesCreateComponent {
  form = this.fb.group({
    coverTitle: [''],
    mainCoverImage: [],
  });
  isSubmitting = false;
  mainCoverImagePreview: string | ArrayBuffer;
  liveUpdateImagePreview: string | ArrayBuffer;

  constructor(
    private fb: FormBuilder,
    private liveUpdateService: LiveUpdatesService,
  ) {}

  onSubmit() {
    this.isSubmitting = true;
    const formData = new FormData();
    Object.keys(this.form.value).map((key) => {
      formData.append(key, this.form.controls[key].value);
    });

    this.liveUpdateService.insert(formData).subscribe({
      next: () => {
        this.form.reset();
        this.isSubmitting = false;
        this.mainCoverImagePreview = null;
        this.liveUpdateImagePreview = null;
      },
      error: () => {
        this.form.reset();
        this.isSubmitting = false;
        this.mainCoverImagePreview = null;
        this.liveUpdateImagePreview = null;
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
    this.form.patchValue({ mainCoverImage: file });
    this.form.get('mainCoverImage').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.mainCoverImagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
