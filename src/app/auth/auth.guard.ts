import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Inject, inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IUser } from '../shared/interfaces/user.interface';

// export class AuthGuard {
//   constructor() {}
//
//   AuthGuard: CanActivateFn = (
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot,
//   ) => {
//     return inject(AuthService).isLoggedIn$.pipe(
//       tap((isLoggedIn) => {
//         if (isLoggedIn) {
//           return true;
//         }
//         return inject(Router).navigate(['/auth/login']);
//       }),
//     );
//   };
// }
export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const router = inject(Router);
  const currentUser = inject(AuthService).currentUser;
  return inject(AuthService).isLoggedIn$.pipe(
    tap((isLoggedIn) => {
      if (isLoggedIn && currentUser?.admin) {
        return true;
      } else if (isLoggedIn && !currentUser?.admin) {
        router.navigate(['/auth/login']);
        return false;
      } else {
        router.navigate(['/auth/login']);
        return false;
      }
    }),
  );
};
