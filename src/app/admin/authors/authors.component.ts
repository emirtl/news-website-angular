import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { mergeMap, Observable } from 'rxjs';
import { AuthorsService } from '../services/authors.service';
import { IAuthor } from '../../shared/interfaces/authors.interface';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [
    AsyncPipe,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    SharedModule,
    TableModule,
    NgIf,
  ],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css',
})
export class AuthorsComponent implements OnInit {
  isSubmitting = false;
  state: 'create' | 'update' = 'create';
  authors$: Observable<IAuthor[]>;
  authorId: string;
  form = this.fb.group({
    name: ['', Validators.required],
    position: ['', Validators.required],
    description: ['', Validators.required],
  });
  constructor(
    private authorsService: AuthorsService,
    private fb: FormBuilder,
  ) {}
  ngOnInit(): void {
    this.authors$ = this.authorsService.getAll();
  }

  onDeleteAuthor(id) {
    this.authors$ = this.authorsService
      .delete(id)
      .pipe(mergeMap(() => this.authorsService.getAll()));
  }

  onSubmit() {
    this.state = 'create';
    this.isSubmitting = true;
    if (this.form.invalid) {
      return;
    }
    const author: Partial<IAuthor> = { ...this.form.value };
    this.authors$ = this.authorsService.insert(author).pipe(
      mergeMap(() => this.authorsService.getAll()),
      tap(() => {
        this.isSubmitting = false;
        this.form.reset();
      }),
    );
  }

  onGetAUthor(id) {
    this.state = 'update';
    this.authorsService.getOne(id).subscribe({
      next: (author) => {
        this.form.patchValue({
          name: author.name,
          description: author.description,
          position: author.position,
        });
        this.form.updateValueAndValidity();
        this.authorId = author.id;
      },
    });
  }

  onUpdateAuthor() {
    return (this.authors$ = this.authorsService
      .update(this.form.value, this.authorId)
      .pipe(
        mergeMap(() => this.authorsService.getAll()),
        tap(() => {
          this.isSubmitting = false;
          this.form.reset();
          this.state = 'create';
        }),
      ));
  }
}
