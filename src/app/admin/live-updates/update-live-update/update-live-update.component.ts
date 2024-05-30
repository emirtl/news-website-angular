import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LiveUpdatesService } from '../../services/liveUpdates.service';

@Component({
  selector: 'app-update-live-update',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    DividerModule,
    FormsModule,
    ImageModule,
    InputTextModule,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './update-live-update.component.html',
  styleUrl: './update-live-update.component.css',
})
export class UpdateLiveUpdateComponent implements OnInit {
  form = this.fb.group({
    coverTitle: ['', Validators.required],
    mainCoverImage: [],
  });

  liveUpdateId: string;
  isSubmitting = false;
  mainCoverImagePreview: string | ArrayBuffer;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private liveUpdateService: LiveUpdatesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.liveUpdateId = this.activatedRoute.snapshot.paramMap.get('id');
    this.liveUpdateService.get(this.liveUpdateId).subscribe({
      next: (liveUpdate) => {
        if (liveUpdate.mainCoverImage) {
          this.mainCoverImagePreview = liveUpdate.mainCoverImage;
        }

        this.form.setValue({
          coverTitle: liveUpdate.coverTitle,
          mainCoverImage: liveUpdate.mainCoverImage
            ? liveUpdate.mainCoverImage
            : null,
        });
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

  onSubmit() {
    this.isSubmitting = true;
    const formData = new FormData();
    Object.keys(this.form.controls).map((key) => {
      formData.append(key, this.form.controls[key].value);
    });
    this.liveUpdateService.update(this.liveUpdateId, formData).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.form.reset();
        this.router.navigate(['/admin/live-updates']);
      },
    });
  }
}
