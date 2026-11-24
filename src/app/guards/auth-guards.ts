import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isloggedIn) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.isloggedIn) {
    router.navigate(['/login']);
    return false;
  }
  if (auth.isAdmin()) {
    return true;
  }
  router.navigate(['/forbidden']);
  return false;
};