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
import { LiveUpdatesService } from '../../services/liveUpdates.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-live-update-item-create',
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
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './live-update-item-create.component.html',
  styleUrl: './live-update-item-create.component.css',
})
export class LiveUpdateItemCreateComponent implements OnInit {
  form = this.fb.group({
    liveUpdateTitle: ['', Validators.required],
    liveUpdateDescription: ['', Validators.required],
    liveUpdateRichDescription: [''],
    liveUpdateImage: [],
    isImportant: [false, Validators.required],
  });
  imagePreview: string | ArrayBuffer;
  isSubmitting = false;
  liveUpdateId: string;

  ngOnInit(): void {
    this.liveUpdateId = this.activatedRoutes.snapshot.paramMap.get('id');
  }

  constructor(
    private fb: FormBuilder,
    private LiveUpdatesService: LiveUpdatesService,
    private activatedRoutes: ActivatedRoute,
  ) {}

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
    this.form.patchValue({ liveUpdateImage: file });
    this.form.get('liveUpdateImage').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    this.isSubmitting = true;
    const formData = new FormData();
    Object.keys(this.form.controls).map((key) => {
      formData.append(key, this.form.controls[key].value);
    });

    this.LiveUpdatesService.CreateLiveUpdateItem(
      this.liveUpdateId,
      formData,
    ).subscribe({
      next: () => {
        this.form.reset();
        this.isSubmitting = false;
        this.imagePreview = '';
      },
    });
  }
}
