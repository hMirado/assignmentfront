import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAdmin().then((admin) => {
      if (admin) {
        return true;
      } else {
        // On renvoie vers la page d'accueil
        console.log("GUARD : vous n'êtes pas autorisé à naviguer vers EDIT (vous n'êtes pas admin))");
        this.router.navigate(['/home']);
        return false;
      }
    });
  }
  
}
