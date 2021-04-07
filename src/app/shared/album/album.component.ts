import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductModel } from 'src/app/core/interfaces/product';
import { AppState } from 'src/app/store/app.state';
import { Delete } from 'src/app/store/product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  @Input() isAdmin: boolean;
  @Input() product: ProductModel;

  constructor(
      private router: Router,
      private store: Store<AppState>
  ) { }

  ngOnInit(): void {
  }

  buildImageUrl(productId: string | undefined, name: string) {
      if (name) {
          return environment.storage + productId + '%2F' + name;
      }

      return;
  }

  view() {
      this.router.navigate(['product', this.product.productId]);
  }

  edit() {
      this.router.navigate(['admin', 'products', 'edit', this.product.productId]);
  }

  delete(productId: string | undefined) {
      if (productId) 
        this.store.dispatch(new Delete(productId));
  }

}
