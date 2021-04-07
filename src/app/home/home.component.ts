import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { InfoModel } from '../core/interfaces/info';
import { ProductModel } from '../core/interfaces/product';
import { AppState } from '../store/app.state';
import { getInfo } from '../store/info/info.selectors';
import { getProductList } from '../store/product/product.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  info: InfoModel;
  productList: ProductModel[];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
      combineLatest([
          this.store.select(getInfo),
          this.store.select(getProductList)
      ])
        .subscribe(([info, list]) => {
            this.info = info as InfoModel;
            this.productList = list as ProductModel[];
        });
  }

}
