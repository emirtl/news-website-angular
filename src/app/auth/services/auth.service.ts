import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { IUser } from '../../shared/interfaces/user.interface';
import { map, tap } from 'rxjs/operators';
import { isPlatformServer } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private AUTH_URL = 'http://localhost:9000/api/v1/auth';
  private userSubject = new BehaviorSubject<IUser>(null);
  private isAdminSubject = new BehaviorSubject<boolean>(false);

  isAdmin$: Observable<boolean> = this.isAdminSubject.asObservable();
  user$: Observable<IUser> = this.userSubject.asObservable();
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  currentUser: IUser;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.isLoggedIn$ = this.user$.pipe(map((user) => !!user));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((isLoggedIn) => !isLoggedIn));

    const user = this.getUserFromLocalStorage();
    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }

  getUserFromLocalStorage() {
    if (isPlatformServer(this.platformId)) {
      return null;
    } else {
      return localStorage.getItem('user');
    }
  }

  register(regRequestInterface: Partial<IUser>): Observable<IUser> {
    return this.http
      .post<IUser>(`${this.AUTH_URL}/register`, regRequestInterface)
      .pipe(shareReplay());
  }

  login(loginRequestInterface: Partial<IUser>): Observable<IUser> {
    return this.http
      .post<IUser>(`${this.AUTH_URL}/login`, loginRequestInterface)
      .pipe(
        tap((user) => {
          this.currentUser = user['user'];
          if (user['user'].admin === true) {
            this.isAdminSubject.next(true);
          }
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
        }),
        shareReplay(),
      );
  }

  logOut() {
    this.userSubject.next(null);
    this.isAdminSubject.next(false);

    localStorage.removeItem('user');
  }
}
