import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { IUser } from '../../shared/interfaces/user.interface';
import { concatMap, Observable } from 'rxjs';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    AsyncPipe,
    ButtonModule,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule,
    SharedModule,
    TableModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  users$: Observable<IUser[]>;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.users$ = this.usersService.getAll();
  }

  onDeleteUser(id) {
    this.users$ = this.usersService
      .delete(id)
      .pipe(concatMap((res) => this.usersService.getAll()));
  }
}
