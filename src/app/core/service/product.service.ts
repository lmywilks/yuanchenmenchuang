import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductModel } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly API = environment.api_root;

  constructor(private http: HttpClient) { }

  List() {
      return this.http.get(`${ this.API }/products`);
  }

  Retrieve(productId: string) {
      return this.http.get(`${ this.API }/products/${ productId }`);
  }

  Create(product: ProductModel) {
    return this.http.post(`${ this.API }/products`, product);
  }

  Update(product: ProductModel) {
      return this.http.put(`${ this.API }/products/${ product.productId }`, product);
  }

  Delete(productId: string) {
      return this.http.delete(`${ this.API }/products/${ productId }`);
  }

  Upload(file: File, productId: string) {
      const formData: FormData = new FormData();
      formData.append('file', file);

      return this.http.post(`${ this.API }/products/${ productId }/image`, formData, {
          responseType: 'json',
          observe: 'events'
      });
  }

  DeleteImage(productId: string, filename: string) {
      return this.http.delete(`${ this.API }/products/${ productId }/image/${ filename }`);
  }
}
