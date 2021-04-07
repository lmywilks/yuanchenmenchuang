import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { TranslateModule } from '@ngx-translate/core';
import { ToastsComponent } from './toasts/toasts.component';
import { LoadingComponent } from './loading/loading.component';
import { AlbumComponent } from './album/album.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuildImageUrlPipe } from '../core/pipes/build-image-url.pipe';
import { FileUploadModule } from 'ng2-file-upload';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
      HeaderComponent,
      ToastsComponent,
      LoadingComponent,
      AlbumComponent,
      ProductDetailComponent,
      BuildImageUrlPipe,
      FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule
  ],
  exports: [
      HeaderComponent,
      LoadingComponent,
      AlbumComponent,
      ProductDetailComponent,
      BuildImageUrlPipe,
      FooterComponent
  ]
})
export class SharedModule { }
