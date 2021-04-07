import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { ToastrService } from "ngx-toastr";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { ProductModel } from "src/app/core/interfaces/product";
import { I18nService } from "src/app/core/service/i18n.service";
import { ProductService } from "src/app/core/service/product.service";
import * as productActions from "./product.actions";


@Injectable()
export class ProductEffects {
    constructor(
        private actions$: Actions,
        private productService: ProductService,
        private router: Router,
        private toastr: ToastrService,
        private translation: I18nService
    ) {}

    @Effect()
    Create: Observable<any> = this.actions$.pipe(
        ofType(productActions.ProductActionType.CREATE),
        map((action: productActions.Create) => action.product),
        switchMap((product) => {
            return this.productService.Create(product)
                .pipe(
                    map((res: any) => {
                        return new productActions.CreateSuccess({ product: res.product });                        
                    }),
                    catchError(err => {
                        return of(new productActions.CreateFailure({ error: err.error }));
                    })
                );
        })
    );

    @Effect({ dispatch: false })
    CreateSuccess: Observable<any> = this.actions$.pipe(
        ofType(productActions.ProductActionType.CREATE_SUCCESS),
        map((action: productActions.CreateSuccess) => action.payload.product),
        switchMap((product) => {
            this.router.navigate(['admin', 'products', 'edit', product.productId]);
            return of(product);
        })
    );

    @Effect()
    Fetch: Observable<any> = this.actions$.pipe(
        ofType(productActions.ProductActionType.FETCH),
        switchMap(() => {
            return this.productService.List()
                .pipe(
                    map((res: any) => {
                        return new productActions.FetchSuccess({ products: res.products });
                    }),
                    catchError(err => {
                        return of(new productActions.FetchFailure({ error: err.error }));
                    })
                );
        })
    );

    @Effect()
    Retrieve: Observable<any> = this.actions$.pipe(
        ofType(productActions.ProductActionType.RETRIEVE),
        map((action: productActions.Retrieve) => action.productId),
        switchMap((productId: string) => {
            return this.productService.Retrieve(productId)
                .pipe(map((res: any) => {
                    return new productActions.RetrieveSuccess({ product: res.product });
                }),
                catchError(err => {
                    return of(new productActions.RetrieveFailure({ error: err.error }));
                }));
        })
    );

    @Effect()
    Update: Observable<any> = this.actions$.pipe(
        ofType(productActions.ProductActionType.UPDATE),
        map((action: productActions.Update) => action.product),
        switchMap((product: ProductModel) => {
            return this.productService.Update(product)
                .pipe(map((res: any) => {
                    return new productActions.UpdateSuccess({ message: res.message, product: product });
                }),
                catchError(err => {
                    return of(new productActions.UpdateFailure({ error: err.error }));
                }));
        })
    );

    @Effect()
    Delete: Observable<any> = this.actions$.pipe(
        ofType(productActions.ProductActionType.DELETE),
        map((action: productActions.Delete) => action.productId),
        switchMap((productId: string) => {
            return this.productService.Delete(productId)
                .pipe(map((res: any) => {
                    return new productActions.DeleteSuccess({ message: res.message, productId: productId });
                }),
                catchError(err => {
                    return of(new productActions.DeleteFailure({ error: err.error }));
                }));
        })
    );

    @Effect({ dispatch: false })
    DeleteSuccess: Observable<any> = this.actions$.pipe(
        ofType(productActions.ProductActionType.DELETE_SUCCESS),
        switchMap(() => {
            if (this.router.url.indexOf('/edit/') > -1) {
                this.router.navigateByUrl('/admin/products');
            }
            return of(true);
        })
    );

    @Effect()
    Upload: Observable<any> = this.actions$.pipe(
        ofType(productActions.ProductActionType.UPLOAD),
        map((action: productActions.Upload) => action.payload),
        switchMap((res: any) => {
            return this.productService.Upload(res.file, res.productId)
                .pipe(map((res: any) => {
                    if (res && res.body) {
                        return new productActions.UploadSuccess(res.body);
                    } 
                    return new productActions.UploadSuccess({ skip: true });;
                }),
                catchError(err => {
                    return of(new productActions.UploadFailure({ error: err.error }));
                }));
        })
    );

    @Effect()
    DeleteImage: Observable<any> = this.actions$.pipe(
        ofType(productActions.ProductActionType.DELETE_IMAGE),
        map((action: productActions.DeleteImage) => action.payload),
        switchMap((payload: any) => {
            return this.productService.DeleteImage(payload.productId, payload.filename)
                .pipe(map((res: any) => {
                    this.toastr.success(this.translation.getLanguage(res.message));
                    return new productActions.DeleteImageSuccess({ message: res.message, filename: payload.filename });
                }),
                catchError(err => {
                    return of(new productActions.DeleteImageFailure({ error: err.error }));
                }));
        })
    );

}
