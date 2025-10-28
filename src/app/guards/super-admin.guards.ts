import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IRoleType } from '../interfaces';

export const superAdminGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isSuperAdmin()) {
    return true;
  } else {
    // Redirigir a access-denied si no es super admin
    router.navigate(['/app/access-denied']);
    return false;
  }
};