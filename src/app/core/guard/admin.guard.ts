import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getToken } from 'src/app/store/admin/admin.selectors';
import { AppState } from 'src/app/store/app.state';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
      private router: Router,
      private store: Store<AppState>
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
        return this.store.select(getToken)
            .pipe(map(token => {
                if (!token) this.router.navigateByUrl('/admin/login');

                return true;
            }));        
  }
  
}
