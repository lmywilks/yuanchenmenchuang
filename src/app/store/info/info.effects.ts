import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { ToastrService } from "ngx-toastr";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { I18nService } from "src/app/core/service/i18n.service";
import { InfoService } from "src/app/core/service/info.service";
import * as infoActions from "./info.actions";


@Injectable()
export class InfoEffects {
    constructor(
        private actions$: Actions,
        private infoService: InfoService,
        private toastr: ToastrService,
        private translation: I18nService
    ) {}

    @Effect()
    Get: Observable<any> = this.actions$.pipe(
        ofType(infoActions.InfoActionType.GET),
        switchMap(() => {
            return this.infoService.Retrieve().pipe(
                map((res: any) => {                    
                    return new infoActions.GetSuccess({ info: res.info });
                }),
                catchError(err => {
                    return of(new infoActions.GetFailure({ error: err.error }));
                })
            );
        })
    );

    @Effect()
    Update: Observable<any> = this.actions$.pipe(
        ofType(infoActions.InfoActionType.UPDATE),
        map((action: infoActions.Update) => action.info),
        switchMap(payload => {
            return this.infoService.Update(payload).pipe(
                map((res: any) => {                    
                    this.toastr.success(this.translation.getLanguage(res.message));
                    return new infoActions.UpdateSuccess({ message: res.message });
                }),
                catchError(err => {
                    return of(new infoActions.UpdateFailure({ error: err.error }));
                })
            );
        })
    );
}
