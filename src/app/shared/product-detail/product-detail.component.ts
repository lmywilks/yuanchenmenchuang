import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { ProductModel } from 'src/app/core/interfaces/product';
import { I18nService } from 'src/app/core/service/i18n.service';
import { ProductService } from 'src/app/core/service/product.service';
import { AppState } from 'src/app/store/app.state';
import { Create, Delete, DeleteImage, Retrieve, Update, Upload } from 'src/app/store/product';
import { getProduct, isLoading } from 'src/app/store/product/product.selectors';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { getToken } from 'src/app/store/admin/admin.selectors';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  mode: string;

  isLoading$ = this.store.select(isLoading);

  productDetailForm: FormGroup;
  productFileForm: FormGroup;

  productDetail: ProductModel;
  productId: string | null;  

  albumList: any[] = [];

  constructor(
      private route: ActivatedRoute,
      private store: Store<AppState>,
      private fb: FormBuilder,
      private _lightbox: Lightbox
  ) { 
      this.mode = this.route.snapshot.data.mode;      
    
      switch (this.mode) {
          case 'detail':
          case 'edit':
            this.route.paramMap.subscribe(params => {
                this.productId = params.get('productId');
                if (this.productId) {
                    this.store.dispatch(new Retrieve(this.productId));

                    setTimeout(() => {
                        this.store.select(getProduct).subscribe(p => {
                            this.productDetail = Object.assign({}, p);
                            if (!this.productDetail.imageUrls) this.productDetail.imageUrls = [];

                            this.productDetailForm = this.fb.group({
                                name: [p?.name, Validators.required],
                                desc: [p?.desc, Validators.required],
                                price: [p?.price]
                            });

                            if (this.mode === 'detail') {
                                for (let i = 0; i < this.productDetail.imageUrls.length; i++) {
                                    const src = environment.storage + this.productDetail.productId + '%2F' + this.productDetail.imageUrls[i] + '?alt=media';                                                                        
                                    this.albumList.push({
                                        src: src,                                        
                                        thumb: src
                                    });
                                }
                            }
                        });
                    }, 500);
                }                
            });
              
              break;
          case 'add':
          default:
              this.productDetailForm = this.fb.group({
                  name: ['', Validators.required],
                  desc: ['', Validators.required],
                  price: ['']
              });
              break;
      }
  }

  ngOnInit(): void {
      this.productFileForm = this.fb.group({
        file: [null, Validators.required]
      });
  }

  submit() {
      if (this.productDetailForm.valid) {               
          if (this.mode === 'add') {
            this.productDetail = this.productDetailForm.value;
            this.store.dispatch(new Create(this.productDetail));
          } else {
              if (this.productId) {
                this.productDetail.name = this.productDetailForm.get('name')?.value;
                this.productDetail.desc = this.productDetailForm.get('desc')?.value;
                this.productDetail.price = this.productDetailForm.get('price')?.value;
                this.store.dispatch(new Update(this.productDetail));
              }
          }
      }
  }

  onChangeImage(event: any) {
    if (event && event.target && event.target.files && event.target.files.length) {
        this.productFileForm.patchValue({ file: event.target.files[0] });
    } 
  }  

  upload() {
      if (this.productFileForm.valid) {
        this.store.dispatch(new Upload({ file: this.productFileForm.get('file')?.value, productId: this.productId }));
      }
  }

  delete() {
      if (this.productId) {
        this.store.dispatch(new Delete(this.productId));
      }
  }

  setDefault(filename: string) {
      this.productDetail.defaultImage = filename;
      this.store.dispatch(new Update(this.productDetail));
  }

  deleteImage(filename: string) {
      if (filename) {
          this.store.dispatch(new DeleteImage({ productId: this.productId, filename }));
      }
  }

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this.albumList, index);
  }
 
  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

}
