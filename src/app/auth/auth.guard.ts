import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { concatMap, Observable, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn$.pipe(
    concatMap((isLoggedIn) =>
      authService.isAdmin$.pipe(
        map((isAdmin) => {
          if (isLoggedIn && isAdmin) {
            return true; // Allow access
          } else {
            router.navigate(['/auth/login']); // Return UrlTree for redirection
            return false; // Allow access
          }
        }),
      ),
    ),
  );
};
