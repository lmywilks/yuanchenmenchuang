import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { AuthService } from "src/app/core/service/auth.service";
import * as adminActions from "./admin.actions";

@Injectable()
export class AdminEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router
    ) {}

    @Effect()
    Login: Observable<any> = this.actions$.pipe(
        ofType(adminActions.AdminActionType.LOGIN),
        map((action: adminActions.Login) => action.payload),
        switchMap((payload) => {
            return this.authService.Login(payload.username, payload.password)
                .pipe(
                    map((res: any) => {
                        return new adminActions.LoginSuccess({ token: res.token });
                    }),
                    catchError(err => {
                        return of(new adminActions.LoginFailure({ error: err.error }));
                    })
                );
        })
    );

    @Effect({ dispatch: false })
    LoginSuccess: Observable<any> = this.actions$.pipe(
        ofType(adminActions.AdminActionType.LOGIN_SUCCESS),
        tap((res: any) => {
            localStorage.setItem('YCMC-token', res.payload.token);
        })
    );

    @Effect({ dispatch: false })
    Logout: Observable<any> = this.actions$.pipe(
        ofType(adminActions.AdminActionType.LOGOUT),
        tap(() => {
            localStorage.removeItem('YCMC-token');
            this.router.navigateByUrl('/login');
        })
    );
}