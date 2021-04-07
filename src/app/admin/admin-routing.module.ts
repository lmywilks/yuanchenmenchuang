import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../core/guard/admin.guard';
import { ProductDetailComponent } from '../shared/product-detail/product-detail.component';
import { AdminComponent } from './admin.component';
import { InfoComponent } from './info/info.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';


const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },        
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: 'info',
                component: InfoComponent,
                canActivate: [AdminGuard]
            },
            
            {
                path: 'products',
                component: ProductComponent,
                canActivate: [AdminGuard],
            },
            {
                path: 'products/add',
                component: ProductDetailComponent,
                canActivate: [AdminGuard],
                data: { mode: 'add' }
            },
            {
                path: 'products/edit/:productId',
                component: ProductDetailComponent,
                canActivate: [AdminGuard],
                data: { mode: 'edit' }
            },
            {
                path: '',
                redirectTo: 'info',
                pathMatch: 'full'
            },
            {
                path: '**',
                redirectTo: 'info',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
