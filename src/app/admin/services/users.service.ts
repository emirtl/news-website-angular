import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { IUser } from '../../shared/interfaces/user.interface';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private USERS_URL = 'http://localhost:9000/api/v1/auth';

  constructor(private http: HttpClient) {}

  getAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.USERS_URL}/getAllUsers`).pipe(
      map((res) => res['users']),
      shareReplay(),
    );
  }

  delete(id: string): Observable<any> {
    return this.http
      .delete<any>(`${this.USERS_URL}/deleteUser/${id}`)
      .pipe(shareReplay());
  }
}
