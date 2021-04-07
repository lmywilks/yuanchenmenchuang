import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getProductList, isLoading } from 'src/app/store/product/product.selectors';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  isLoading$ = this.store.select(isLoading);

  productList$ = this.store.select(getProductList);
  
  constructor(
      private store: Store<AppState>
  ) { }

  ngOnInit(): void {
  }

}
