import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ForgotPasswordComponent } from '../components/forgot-password/forgot-password.component';
import { UserServiceService } from '../services/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class UpdatePasswordGuard implements CanActivate {

  constructor(private router:Router, private user_service:UserServiceService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.user_service.isOtpAvailable()){
      return true;
    }else{
      this.router.navigate(['update-password']);
      return false;
    }
      
  }
  
}
