import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../service/auth/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router)
  const authService: AuthService = inject(AuthService)

  if(!authService.token){
    return router.navigateByUrl('/login')
  }

  return true;
};
