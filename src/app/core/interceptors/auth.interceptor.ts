import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getToken } from 'src/app/store/admin/admin.selectors';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  token: string | null;

  constructor(
      private store: Store<AppState>,
      private router: Router
  ) {
      this.store.select(getToken).subscribe(token => this.token = token);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.router.url.indexOf('admin') === -1) {
        return next.handle(request);
    }

    if (!this.token) {
        this.router.navigateByUrl('/admin/login');
    }
    
    request = request.clone({
        setHeaders: {
            Authorization: `Bearer ${ this.token }`
        }
    });

    return next.handle(request);
  }
}
