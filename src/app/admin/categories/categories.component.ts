import { Component, OnInit } from '@angular/core';
import { Observable, mergeMap } from 'rxjs';
import { ICategory } from '../../shared/interfaces/category.intertface';
import { CommonModule, AsyncPipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CategoryService } from '../services/category.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    CardModule,
    AsyncPipe,
    ReactiveFormsModule,
    InputTextModule,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  isSubmitting = false;
  categories$: Observable<ICategory[]>;
  form = this.fb.group({
    title: ['', Validators.required],
  });
  constructor(
    private categoriesService: CategoryService,
    private fb: FormBuilder,
  ) {}
  ngOnInit(): void {
    this.categories$ = this.categoriesService.getAll();
  }

  onDeleteCategory(id) {
    this.categories$ = this.categoriesService.delete(id).pipe(
      // Handle loading state if necessary (e.g., using `switchMap`, `concatMap`, etc.)
      mergeMap(() => (this.categories$ = this.categoriesService.getAll())), // Fetch updated categories after deletion
    );
  }

  onSubmit() {
    this.isSubmitting = true;
    if (this.form.invalid) {
      return;
    }
    this.categories$ = this.categoriesService
      .insert(this.form.value.title)
      .pipe(
        tap(() => {
          // Use tap for side effects without influencing data flow
          this.isSubmitting = false;
          this.form.reset();
        }),
        mergeMap(() => this.categoriesService.getAll()), // Fetch updated categories
      );
  }
}
